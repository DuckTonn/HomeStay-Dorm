const express = require('express');
const router = express.Router();
const registrationBUS = require('../bus/RegistrationBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { RegistrationRequestResponse, AppointmentResponse } = require('../dto/RegistrationDTO');
const BaseDTO = require('../dto/BaseDTO');
const { CreateRegistrationDTO, CreateAppointmentDTO, CreateCriteriaDTO } = require('../dto');

router.get('/request', async (req, res, next) => {
    try {
        const result = await registrationBUS.getAllRequests(req.query);
        const serialized = BaseDTO.serializeList(result, RegistrationRequestResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/request/:requestId', async (req, res, next) => {
    try {
        const data = await registrationBUS.getRequestById(req.params.requestId);
        res.json({ success: true, data: RegistrationRequestResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.post('/request', validateDTO(CreateRegistrationDTO), async (req, res, next) => {
    try {
        const result = await registrationBUS.createRegistration(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.get('/request/:requestId/available-rooms', async (req, res, next) => {
    try {
        const result = await registrationBUS.checkAvailableRooms(req.params.requestId);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.get('/appointment', async (req, res, next) => {
    try {
        const result = await registrationBUS.getUpcomingAppointments(req.query);
        const serialized = BaseDTO.serializeList(result, AppointmentResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.post('/appointment', validateDTO(CreateAppointmentDTO), async (req, res, next) => {
    try {
        const result = await registrationBUS.createAppointment(req.body);
        res.status(201).json({ success: true, data: AppointmentResponse.serialize(result) });
    } catch (error) { next(error); }
});
router.put('/appointment/:id/confirm', async (req, res, next) => {
    try {
        const result = await registrationBUS.confirmAppointment(req.params.id);
        res.json({ success: true, data: AppointmentResponse.serialize(result) });
    } catch (error) { next(error); }
});
router.get('/criteria', async (req, res, next) => {
    try {
        const result = await registrationBUS.getAllCriteria(req.query);
        const serialized = BaseDTO.serializeList(result, item => item);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.post('/criteria', validateDTO(CreateCriteriaDTO), async (req, res, next) => {
    try {
        const data = await registrationBUS.createCriteria(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
});

module.exports = router;
