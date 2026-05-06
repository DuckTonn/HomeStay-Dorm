const contractDAO = require('../dao/ContractDAO');
const depositReceiptDAO = require('../dao/DepositReceiptDAO');
const refundReceiptDAO = require('../dao/RefundReceiptDAO');
const bedDAO = require('../dao/BedDAO');
const roomDAO = require('../dao/RoomDAO');
const recordDAO = require('../dao/RecordDAO');
const paymentDAO = require('../dao/PaymentDAO');
const refundCalculator = require('./strategies/RefundCalculator');
const { createBusinessError } = require('../middlewares/validator');
const Contract = require('./domain/Contract');
const DepositReceipt = require('./domain/DepositReceipt');

class CheckOutBUS {
    /**
     * Step 1: Register check-out (load contract context)
     */
    async registerCheckOut(contractId) {
        const contract = await contractDAO.findById(contractId);
        if (!contract) throw createBusinessError('Contract not found');

        const beds = await contractDAO.getBeds(contractId);
        const depositReceipt = contract.deposit_receipt_id
            ? await depositReceiptDAO.findById(contract.deposit_receipt_id)
            : null;

        return {
            contract,
            beds,
            depositReceipt,
            depositAmount: depositReceipt ? Number(depositReceipt.total_deposit || 0) : 0
        };
    }

    /**
    * Step 2: Calculate refund (Strategy Pattern)
     */
    async calculateRefund(data) {
        const {
            contract_id,
            check_out_date,
            extra_costs = {}
        } = data;

        const contract = await contractDAO.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        let depositAmount = 0;
        if (contract.deposit_receipt_id) {
            const depositReceipt = await depositReceiptDAO.findById(contract.deposit_receipt_id);
            depositAmount = depositReceipt ? Number(depositReceipt.total_deposit || 0) : 0;
        }

        const result = refundCalculator.calculate({
            depositAmount,
            contract,
            checkOutDate: check_out_date || new Date(),
            extraCosts: extra_costs
        });

        return result;
    }

    /**
        * Step 3: Confirm check-out - create refund receipt + record
     */
    async confirmCheckOut(data) {
        const {
            contract_id,
            check_out_date,
            extra_costs = {},
            accountant_id,
            record_note
        } = data;

        const refundCalculation = await this.calculateRefund({
            contract_id,
            check_out_date,
            extra_costs
        });

        const contract = await contractDAO.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        // Create refund receipt
        const refundReceipt = await refundReceiptDAO.create({
            type: refundCalculation.strategyName,
            details: JSON.stringify(refundCalculation),
            refund_amount: refundCalculation.refundAmount,
            deduction_amount: refundCalculation.deductions?.totalDeduction ?? 0,
            additional_amount_due: refundCalculation.additionalAmountDue,
            deposit_receipt_id: contract.deposit_receipt_id,
            contract_id,
            accountant_id,
            status: 'Pending'
        });

        // Create check-out record
        const record = await recordDAO.create({
            created_at: new Date().toISOString(),
            note: record_note || 'Check-out record and asset inspection',
            contract_id,
            type: 'Check-out'
        });

        return {
            refundCalculation,
            refundReceipt,
            record
        };
    }

    /**
        * Step 4: Complete check-out - terminate contract and restore beds
     */
    async completeCheckOut(data) {
        const { contract_id, refund_receipt_id } = data;

        const contract = await contractDAO.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        // Mark refund receipt as completed
        await refundReceiptDAO.update(refund_receipt_id, {
            status: 'Completed'
        });

        // Terminate contract
        await contractDAO.update(contract_id, {
            confirmation_status: Contract.CONFIRMATION_STATUSES.TERMINATED
        });

        // Restore beds
        const contractBeds = await contractDAO.getBeds(contract_id);
        const bedIds = contractBeds.map(x => x.bed_id);

        if (bedIds.length > 0) {
            await bedDAO.updateStatusMany(bedIds, 'Empty');

            // Update room
            if (contract.room_id) {
                await roomDAO.updateAvailableBedCount(contract.room_id);
            }
        }

        // Update deposit receipt
        if (contract.deposit_receipt_id) {
            await depositReceiptDAO.update(contract.deposit_receipt_id, {
                status: DepositReceipt.STATUSES.REFUNDED
            });
        }

        return { message: 'Check-out completed; contract terminated' };
    }

    /**
        * Check-out without a signed contract (deposit receipt only)
     */
    async checkOutWithoutContract(data) {
        const { deposit_receipt_id, accountant_id } = data;

        const depositReceipt = await depositReceiptDAO.findById(deposit_receipt_id);
        if (!depositReceipt) throw createBusinessError('Deposit receipt not found');

        const depositAmount = Number(depositReceipt.total_deposit || 0);

        // Refund calculation (no contract)
        const refundCalculation = refundCalculator.calculate({
            depositAmount,
            contract: null,
            checkOutDate: new Date(),
            extraCosts: {}
        });

        // Create refund receipt (completed immediately)
        const refundReceipt = await refundReceiptDAO.create({
            type: refundCalculation.strategyName,
            details: JSON.stringify(refundCalculation),
            refund_amount: refundCalculation.refundAmount,
            deduction_amount: 0,
            additional_amount_due: 0,
            deposit_receipt_id,
            accountant_id,
            status: 'Completed'
        });

        // Restore beds
        const depositBeds = await depositReceiptDAO.getBeds(deposit_receipt_id);
        const bedIds = depositBeds.map(x => x.bed_id);

        if (bedIds.length > 0) {
            await bedDAO.updateStatusMany(bedIds, 'Empty');

            const roomIdSet = new Set(depositBeds.map(x => x.bed?.room_id).filter(Boolean));
            for (const roomId of roomIdSet) {
                await roomDAO.updateAvailableBedCount(roomId);
            }
        }

        await depositReceiptDAO.update(deposit_receipt_id, { status: DepositReceipt.STATUSES.REFUNDED });

        return { refundCalculation, refundReceipt };
    }
}

module.exports = new CheckOutBUS();
