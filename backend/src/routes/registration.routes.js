const express = require('express');
const router = express.Router();
const controller = require('../controllers/RegistrationController');


router.get('/request', (req, res, next) => controller.getAllRequests(req, res, next));
router.get('/request/:requestId', (req, res, next) => controller.getRequestById(req, res, next));
router.post('/request', (req, res, next) => controller.createRegistration(req, res, next));


router.get('/request/:requestId/available-rooms', (req, res, next) => controller.checkAvailableRooms(req, res, next));


router.get('/appointment', (req, res, next) => controller.getUpcomingAppointments(req, res, next));
router.post('/appointment', (req, res, next) => controller.createAppointment(req, res, next));
router.put('/appointment/:id/confirm', (req, res, next) => controller.confirmAppointment(req, res, next));
router.get('/criteria', (req, res, next) => controller.getAllCriteria(req, res, next));
router.post('/criteria', (req, res, next) => controller.createCriteria(req, res, next));

module.exports = router;
