const express = require('express');
const router = express.Router();
const viewingAppointmentBUS = require('../bus/ViewingAppointmentBUS');
const { AppointmentResponse } = require('../dto/RegistrationDTO');
const BaseDTO = require('../dto/BaseDTO');

router.get('/', async (req, res, next) => {
    try {
        const result = await viewingAppointmentBUS.getUpcomingAppointments(req.query);
        const serialized = BaseDTO.serializeList(result, AppointmentResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.post('/', async (req, res, next) => {
    try {
        const result = await viewingAppointmentBUS.createViewingAppointment(req.body);
        res.status(201).json({ success: true, data: AppointmentResponse.serialize(result) });
    } catch (error) { next(error); }
});
router.put('/:id/confirm', async (req, res, next) => {
    try {
        const result = await viewingAppointmentBUS.confirmAppointment(req.params.id);
        res.json({ success: true, data: AppointmentResponse.serialize(result) });
    } catch (error) { next(error); }
});

module.exports = router;
