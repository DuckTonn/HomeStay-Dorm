const express = require('express');
const router = express.Router();
const depositBUS = require('../bus/DepositBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { DepositReceiptResponse } = require('../dto/DepositDTO');
const BaseDTO = require('../dto/BaseDTO');
const {
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO
} = require('../dto');


router.get('/', async (req, res, next) => {
    try {
        const result = await depositBUS.getAllDepositReceipts(req.query);
        const serialized = BaseDTO.serializeList(result, DepositReceiptResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/:receiptId', async (req, res, next) => {
    try {
        const data = await depositBUS.getDepositReceiptById(req.params.receiptId);
        res.json({ success: true, data: DepositReceiptResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.post('/', validateDTO(CreateDepositReceiptDTO), async (req, res, next) => {
    try {
        const result = await depositBUS.createDepositReceipt(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.post('/check-ability', validateDTO(CheckDepositAbilityDTO), async (req, res, next) => {
    try {
        const result = await depositBUS.checkDepositAbility(req.body.bed_ids);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.post('/:receiptId/payment', validateDTO(CreateDepositPaymentDTO), async (req, res, next) => {
    try {
        const result = await depositBUS.createDepositPayment(req.params.receiptId, req.body.method);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.put('/:receiptId/confirm-payment', validateDTO(ConfirmDepositPaymentDTO), async (req, res, next) => {
    try {
        const result = await depositBUS.confirmDepositPayment(req.params.receiptId, req.body.payment_id);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.put('/:receiptId/cancel', async (req, res, next) => {
    try {
        const result = await depositBUS.cancelDepositReceipt(req.params.receiptId);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

module.exports = router;
