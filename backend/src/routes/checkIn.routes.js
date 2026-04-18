const express = require('express');
const router = express.Router();
const controller = require('../controllers/CheckInController');
const { validateDTO } = require('../middlewares/validateDTO');
const {
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO
} = require('../dtos');

router.get('/contract', (req, res, next) => controller.getAllContracts(req, res, next));
router.get('/contract/:id', (req, res, next) => controller.getContractById(req, res, next));
router.post('/contract', validateDTO(CreateContractDTO), (req, res, next) => controller.createContract(req, res, next));
router.get('/check-deposit/:depositReceiptId', (req, res, next) => controller.checkDeposit(req, res, next));


router.post('/check-condition', validateDTO(CheckStayConditionsDTO), (req, res, next) => controller.checkStayConditions(req, res, next));
router.put('/contract/:contractId/sign', validateDTO(SignContractDTO), (req, res, next) => controller.signContract(req, res, next));


router.post('/payment', validateDTO(CreateCheckInPaymentDTO), (req, res, next) => controller.createCheckInPayment(req, res, next));

router.post('/room-handover', validateDTO(HandoverRoomDTO), (req, res, next) => controller.handoverRoom(req, res, next));

module.exports = router;
