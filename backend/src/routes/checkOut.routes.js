const express = require('express');
const router = express.Router();
const controller = require('../controllers/CheckOutController');
const { validateDTO } = require('../middlewares/validateDTO');
const {
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO
} = require('../dtos');

router.get('/contract/:contractId', (req, res, next) => controller.registerCheckOut(req, res, next));


router.post('/calculate-refund', validateDTO(CalculateRefundDTO), (req, res, next) => controller.calculateRefund(req, res, next));


router.post('/confirm', validateDTO(ConfirmCheckOutDTO), (req, res, next) => controller.confirmCheckOut(req, res, next));


router.post('/complete', validateDTO(CompleteCheckOutDTO), (req, res, next) => controller.completeCheckOut(req, res, next));


router.post('/without-contract', validateDTO(CheckOutWithoutContractDTO), (req, res, next) => controller.checkOutWithoutContract(req, res, next));

module.exports = router;
