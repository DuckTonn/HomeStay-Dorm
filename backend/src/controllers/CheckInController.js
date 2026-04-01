const checkInService = require('../services/CheckInService');

/**
 * Controller: Check-in, contract signing, and room handover
 */
class CheckInController {
    // Validate a paid deposit receipt
    async checkDeposit(req, res, next) {
        try {
            const result = await checkInService.checkDeposit(req.params.depositReceiptId);
            res.json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Check stay conditions
    async checkStayConditions(req, res, next) {
        try {
            const result = await checkInService.checkStayConditions(req.body);
            res.json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Create rental contract
    async createContract(req, res, next) {
        try {
            const result = await checkInService.createContract(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Sign/confirm contract
    async signContract(req, res, next) {
        try {
            const result = await checkInService.signContract(
                req.params.contractId,
                req.body.document_proof
            );
            res.json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Create check-in payment
    async createCheckInPayment(req, res, next) {
        try {
            const result = await checkInService.createCheckInPayment(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Room handover
    async handoverRoom(req, res, next) {
        try {
            const result = await checkInService.handoverRoom(req.body);
            res.json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Get contract by ID
    async getContractById(req, res, next) {
        try {
            const data = await checkInService.getContractById(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // Get all contracts
    async getAllContracts(req, res, next) {
        try {
            const data = await checkInService.getAllContracts(req.query);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }
}

module.exports = new CheckInController();
