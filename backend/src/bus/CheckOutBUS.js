const contractDAO = require('../dao/ContractDAO');
const depositReceiptDAO = require('../dao/DepositReceiptDAO');
const bedDAO = require('../dao/BedDAO');
const roomDAO = require('../dao/RoomDAO');
const recordDAO = require('../dao/RecordDAO');
const paymentDAO = require('../dao/PaymentDAO');
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

        return {
            contract,
            beds
        };
    }

    /**
     * Step 2: Confirm check-out - create check-out record
     */
    async confirmCheckOut(data) {
        const {
            contract_id,
            check_out_date,
            accountant_id,
            record_note
        } = data;

        const contract = await contractDAO.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        // Create check-out record
        const record = await recordDAO.create({
            created_at: check_out_date ? new Date(check_out_date).toISOString() : new Date().toISOString(),
            note: record_note || 'Check-out record and asset inspection',
            contract_id,
            type: 'Check-out'
        });

        return { record };
    }

    /**
     * Step 3: Complete check-out - terminate contract and restore beds
     */
    async completeCheckOut(data) {
        const { contract_id } = data;

        const contract = await contractDAO.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        // Terminate contract
        await contractDAO.update(contract_id, {
            confirmation_status: Contract.CONFIRMATION_STATUSES.TERMINATED
        });

        // Restore beds
        const contractBeds = await contractDAO.getBeds(contract_id);
        const bedIds = contractBeds.map(x => x.bed_id);

        if (bedIds.length > 0) {
            await bedDAO.updateStatusMany(bedIds, 'Empty');

            // Update room availability
            if (contract.room_id) {
                await roomDAO.updateAvailableBedCount(contract.room_id);
            }
        }

        // Update deposit receipt status if linked
        if (contract.deposit_receipt_id) {
            await depositReceiptDAO.update(contract.deposit_receipt_id, {
                status: DepositReceipt.STATUSES.REFUNDED
            });
        }

        return { message: 'Check-out completed; contract terminated' };
    }
}

module.exports = new CheckOutBUS();
