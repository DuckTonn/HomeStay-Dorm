const registrationService = require('../services/RegistrationService');

/**
 * Controller: Registration flow
 */
class RegistrationController {
    // Create new registration
    async createRegistration(req, res, next) {
        try {
            const result = await registrationService.createRegistration(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Find available rooms for a request
    async checkAvailableRooms(req, res, next) {
        try {
            const result = await registrationService.checkAvailableRooms(req.params.requestId);
            res.json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Create viewing appointment
    async createAppointment(req, res, next) {
        try {
            const result = await registrationService.createAppointment(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // Confirm appointment
    async confirmAppointment(req, res, next) {
        try {
            const result = await registrationService.confirmAppointment(req.params.id);
            res.json({ success: true, data: result });
        } catch (error) { next(error); }
    }

    // List upcoming appointments
    async getUpcomingAppointments(req, res, next) {
        try {
            const data = await registrationService.getUpcomingAppointments();
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // Get request by id
    async getRequestById(req, res, next) {
        try {
            const data = await registrationService.getRequestById(req.params.requestId);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // List requests
    async getAllRequests(req, res, next) {
        try {
            const data = await registrationService.getAllRequests(req.query);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // List criteria
    async getAllCriteria(req, res, next) {
        try {
            const data = await registrationService.getAllCriteria();
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // Create criterion
    async createCriteria(req, res, next) {
        try {
            const data = await registrationService.createCriteria(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) { next(error); }
    }
}

module.exports = new RegistrationController();
