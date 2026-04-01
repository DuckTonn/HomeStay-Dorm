const express = require('express');
const router = express.Router();
const controller = require('../controllers/CheckOutController');

router.get('/contract/:contractId', (req, res, next) => controller.registerCheckOut(req, res, next));


router.post('/calculate-refund', (req, res, next) => controller.calculateRefund(req, res, next));


router.post('/confirm', (req, res, next) => controller.confirmCheckOut(req, res, next));


router.post('/complete', (req, res, next) => controller.completeCheckOut(req, res, next));


router.post('/without-contract', (req, res, next) => controller.checkOutWithoutContract(req, res, next));

module.exports = router;
