const depositService = require('../services/DepositService');

/**
 * Controller: Deposit and deposit payment flow
 */
class DepositController {
    // Check if beds are available for deposit
    async checkDepositAbility(req, res, next) {
        try {
            const result = await depositService.checkDepositAbility(req.body.bed_ids);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Create deposit receipt
    async createDepositReceipt(req, res, next) {
        try {
            const result = await depositService.createDepositReceipt(req.body);
            res.status(201).json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Create deposit payment
    async createPayment(req, res, next) {
        try {
            const result = await depositService.createDepositPayment(
                req.params.receiptId,
                req.body.method
            );
            res.status(201).json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Confirm deposit payment
    async confirmPayment(req, res, next) {
        try {
            const result = await depositService.confirmDepositPayment(
                req.params.receiptId,
                req.body.payment_id
            );
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Cancel deposit receipt
    async cancelDepositReceipt(req, res, next) {
        try {
            const result = await depositService.cancelDepositReceipt(req.params.receiptId);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Get deposit receipt by id
    async getDepositReceiptById(req, res, next) {
        try {
            const data = await depositService.getDepositReceiptById(req.params.receiptId);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    // List deposit receipts
    async getAllDepositReceipts(req, res, next) {
        try {
            const data = await depositService.getAllDepositReceipts(req.query);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }
}

module.exports = new DepositController();
