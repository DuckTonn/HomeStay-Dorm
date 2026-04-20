const checkOutService = require('../services/CheckOutService');

/**
 * Controller: Check-out and deposit refund flow
 */
class CheckOutController {
    // Register check-out
    async registerCheckOut(req, res, next) {
        try {
            const result = await checkOutService.registerCheckOut(req.params.contractId);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Calculate refund (preview)
    async calculateRefund(req, res, next) {
        try {
            const result = await checkOutService.calculateRefund(req.body);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Confirm check-out (create refund receipt + record)
    async confirmCheckOut(req, res, next) {
        try {
            const result = await checkOutService.confirmCheckOut(req.body);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Complete check-out (terminate contract, restore beds)
    async completeCheckOut(req, res, next) {
        try {
            const result = await checkOutService.completeCheckOut(req.body);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }

    // Check-out without contract (deposit only)
    async checkOutWithoutContract(req, res, next) {
        try {
            const result = await checkOutService.checkOutWithoutContract(req.body);
            res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
        } catch (error) { next(error); }
    }
}

module.exports = new CheckOutController();
