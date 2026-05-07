const express = require('express');
const router = express.Router();
const registrationBUS = require('../bus/RegistrationBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { RegistrationDTO } = require('../dto');

router.get('/request', async (req, res, next) => {
    try {
        const result = await registrationBUS.getAllRequests(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.get('/request/:requestId', async (req, res, next) => {
    try {
        const data = await registrationBUS.getRequestById(req.params.requestId);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.post('/request', validateDTO(RegistrationDTO), async (req, res, next) => {
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
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.post('/appointment', validateDTO(RegistrationDTO), async (req, res, next) => {
    try {
        const result = await registrationBUS.createAppointment(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.put('/appointment/:id/confirm', async (req, res, next) => {
    try {
        const result = await registrationBUS.confirmAppointment(req.params.id);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.get('/criteria', async (req, res, next) => {
    try {
        const result = await registrationBUS.getAllCriteria(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.post('/criteria', validateDTO(RegistrationDTO), async (req, res, next) => {
    try {
        const data = await registrationBUS.createCriteria(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
});

module.exports = router;
