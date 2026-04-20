const depositReceiptRepository = require('../repositories/DepositReceiptRepository');
const bedRepository = require('../repositories/BedRepository');
const roomRepository = require('../repositories/RoomRepository');
const paymentRepository = require('../repositories/PaymentRepository');
const registrationRequestRepository = require('../repositories/RegistrationRequestRepository');
const { createBusinessError } = require('../middlewares/validator');
const Bed = require('../domain/Bed');
const DepositReceipt = require('../domain/DepositReceipt');


class DepositService {
    async checkDepositAbility(bedIds) {
        const results = [];
        for (const bedId of bedIds) {
            const bed = await bedRepository.findById(bedId);
            if (!bed) {
                results.push({ bed_id: bedId, available: false, reason: 'Bed not found' });
                continue;
            }
            if (!Bed.isAvailableForDeposit(bed)) {
                results.push({ bed_id: bedId, available: false, reason: `Bed is ${bed.status}` });
                continue;
            }
            results.push({ bed_id: bedId, available: true, bed });
        }
        return results;
    }

    async createDepositReceipt(data) {
        const { tenant_id, sales_employee_id, manager_id, bed_ids, registration_request_id } = data;

        // Check deposit ability
        const check = await this.checkDepositAbility(bed_ids);
        const notAvailable = check.filter(r => !r.available);
        if (notAvailable.length > 0) {
            throw createBusinessError(
                `Cannot create deposit: ${notAvailable.map(r => `Bed ${r.bed_id}: ${r.reason}`).join(', ')}`
            );
        }

        // Deposit = 2 months of bed rent x number of beds
        const bedInfo = check.map(r => r.bed);
        const totalDeposit = DepositReceipt.calculateTotalDeposit(bedInfo);

        // 24h payment deadline
        const paymentDeadline = new Date();
        paymentDeadline.setHours(paymentDeadline.getHours() + 24);

        const depositReceipt = await depositReceiptRepository.create({
            note: `Deposit for ${bed_ids.length} bed(s)`,
            status: 'Pending Payment',
            tenant_id,
            sales_employee_id,
            manager_id,
            payment_deadline: paymentDeadline.toISOString(),
            total_deposit: totalDeposit
        });

        // Link beds
        await depositReceiptRepository.addBedMany(depositReceipt.deposit_receipt_id, bed_ids);

        // Update bed statuses
        await bedRepository.updateStatusMany(bed_ids, 'Reserved');

        // Update available bed counts for related rooms
        const roomIdSet = new Set(bedInfo.map(b => b.room_id).filter(Boolean));
        for (const roomId of roomIdSet) {
            await roomRepository.updateAvailableBedCount(roomId);
        }

        // Update registration request status if provided
        if (registration_request_id) {
            await registrationRequestRepository.update(registration_request_id, { status: 'Deposited' });
        }

        return {
            depositReceipt,
            totalDeposit,
            paymentDeadline: paymentDeadline.toISOString(),
            bedCount: bed_ids.length
        };
    }

    async createDepositPayment(receiptId, method) {
        const depositReceipt = await depositReceiptRepository.findById(receiptId);
        if (!depositReceipt) throw createBusinessError('Deposit receipt not found');

        if (!DepositReceipt.isPending(depositReceipt)) {
            throw createBusinessError('Deposit receipt has already been processed');
        }

        // Check payment deadline
        if (DepositReceipt.isExpired(depositReceipt)) {
            // Cancel receipt and restore beds
            await this.cancelDepositReceipt(receiptId);
            throw createBusinessError('Payment deadline exceeded; deposit receipt has been cancelled');
        }

        const payment = await paymentRepository.create({
            note: `Deposit payment - Receipt ${receiptId}`,
            amount: depositReceipt.total_deposit,
            method,
            status: 'Pending Payment',
            tenant_id: depositReceipt.tenant_id,
            deposit_receipt_id: receiptId
        });

        return payment;
    }

    async confirmDepositPayment(receiptId, paymentId) {
        // Mark payment as paid
        await paymentRepository.update(paymentId, { status: 'Paid' });

        // Update deposit receipt
        await depositReceiptRepository.update(receiptId, { status: 'Paid' });

        // Update bed statuses
        const bedLinks = await depositReceiptRepository.getBeds(receiptId);
        const bedIds = bedLinks.map(x => x.bed_id);
        await bedRepository.updateStatusMany(bedIds, 'Deposited');

        return { message: 'Deposit payment confirmed' };
    }

    /**
        * Cancel a deposit receipt (expired or cancelled by customer)
     */
    async cancelDepositReceipt(receiptId) {
        const depositReceipt = await depositReceiptRepository.findById(receiptId);
        if (!depositReceipt) throw createBusinessError('Deposit receipt not found');

        // Restore bed statuses
        const bedLinks = await depositReceiptRepository.getBeds(receiptId);
        const bedIds = bedLinks.map(x => x.bed_id);

        if (bedIds.length > 0) {
            await bedRepository.updateStatusMany(bedIds, 'Empty');

            // Update rooms
            const roomIdSet = new Set(bedLinks.map(x => x.bed?.room_id).filter(Boolean));
            for (const roomId of roomIdSet) {
                await roomRepository.updateAvailableBedCount(roomId);
            }
        }

        // Update receipt status
        await depositReceiptRepository.update(receiptId, { status: 'Cancelled' });

        return { message: 'Deposit receipt cancelled' };
    }

    /**
        * Get deposit receipt by ID
     */
    async getDepositReceiptById(receiptId) {
        const depositReceipt = await depositReceiptRepository.findById(receiptId);
        if (!depositReceipt) throw createBusinessError('Deposit receipt not found');

        const beds = await depositReceiptRepository.getBeds(receiptId);
        return { ...depositReceipt, beds };
    }

    /**
     * Get all deposit receipts
     */
    async getAllDepositReceipts(filters = {}) {
        return depositReceiptRepository.findAll(filters);
    }
}

module.exports = new DepositService();
