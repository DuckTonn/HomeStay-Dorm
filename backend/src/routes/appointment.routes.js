const express = require('express');
const router = express.Router();
const viewingAppointmentBUS = require('../bus/ViewingAppointmentBUS');

router.get('/', async (req, res, next) => {
    try {
        const result = await viewingAppointmentBUS.getUpcomingAppointments(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.post('/', async (req, res, next) => {
    try {
        const result = await viewingAppointmentBUS.createViewingAppointment(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.put('/:id/confirm', async (req, res, next) => {
    try {
        const result = await viewingAppointmentBUS.confirmAppointment(req.params.id);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

module.exports = router;
