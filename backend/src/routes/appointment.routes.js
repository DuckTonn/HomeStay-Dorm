const express = require('express');
const router = express.Router();
const controller = require('../controllers/ViewingAppointmentController');

router.get('/', (req, res, next) => controller.getUpcomingAppointments(req, res, next));
router.post('/', (req, res, next) => controller.createAppointment(req, res, next));
router.put('/:id/confirm', (req, res, next) => controller.confirmAppointment(req, res, next));

module.exports = router;
