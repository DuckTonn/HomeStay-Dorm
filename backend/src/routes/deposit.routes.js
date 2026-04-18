const express = require('express');
const router = express.Router();
const controller = require('../controllers/DepositController');
const { validateDTO } = require('../middlewares/validateDTO');
const {
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO
} = require('../dtos');


router.get('/', (req, res, next) => controller.getAllDepositReceipts(req, res, next));
router.get('/:receiptId', (req, res, next) => controller.getDepositReceiptById(req, res, next));
router.post('/', validateDTO(CreateDepositReceiptDTO), (req, res, next) => controller.createDepositReceipt(req, res, next));
router.post('/check-ability', validateDTO(CheckDepositAbilityDTO), (req, res, next) => controller.checkDepositAbility(req, res, next));

router.post('/:receiptId/payment', validateDTO(CreateDepositPaymentDTO), (req, res, next) => controller.createPayment(req, res, next));
router.put('/:receiptId/confirm-payment', validateDTO(ConfirmDepositPaymentDTO), (req, res, next) => controller.confirmPayment(req, res, next));

router.put('/:receiptId/cancel', (req, res, next) => controller.cancelDepositReceipt(req, res, next));

module.exports = router;
