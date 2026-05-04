const viewingAppointmentService = require('../services/ViewingAppointmentService');
const { AppointmentResponse } = require('../dtos/RegistrationDTO');
const BaseDTO = require('../dtos/BaseDTO');

class ViewingAppointmentController {
    async createAppointment(req, res, next) {
        try {
            const result = await viewingAppointmentService.createViewingAppointment(req.body);
            res.status(201).json({ success: true, data: AppointmentResponse.serialize(result) });
        } catch (error) { next(error); }
    }

    async getUpcomingAppointments(req, res, next) {
        try {
            const result = await viewingAppointmentService.getUpcomingAppointments(req.query);
            const serialized = BaseDTO.serializeList(result, AppointmentResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async confirmAppointment(req, res, next) {
        try {
            const result = await viewingAppointmentService.confirmAppointment(req.params.id);
            res.json({ success: true, data: AppointmentResponse.serialize(result) });
        } catch (error) { next(error); }
    }
}

module.exports = new ViewingAppointmentController();
