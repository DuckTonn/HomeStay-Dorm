const express = require('express');
const router = express.Router();
const checkInBUS = require('../bus/CheckInBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { CheckStayConditionsDTO, ContractDTO, SignContractDTO, CheckInPaymentDTO, HandoverRoomDTO } = require('../dto');

router.get('/contract', async (req, res, next) => {
    try {
        const result = await checkInBUS.getAllContracts(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.get('/contract/:id', async (req, res, next) => {
    try {
        const data = await checkInBUS.getContractById(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.post('/contract', validateDTO(ContractDTO), async (req, res, next) => {
    try {
        const result = await checkInBUS.createContract(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.get('/check-deposit/:depositReceiptId', async (req, res, next) => {
    try {
        const result = await checkInBUS.checkDeposit(req.params.depositReceiptId);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.post('/check-condition', validateDTO(CheckStayConditionsDTO), async (req, res, next) => {
    try {
        const result = await checkInBUS.checkStayConditions(req.body);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.put('/contract/:contractId/sign', validateDTO(SignContractDTO), async (req, res, next) => {
    try {
        const result = await checkInBUS.signContract(req.params.contractId, req.body.document_proof);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.post('/payment', validateDTO(CheckInPaymentDTO), async (req, res, next) => {
    try {
        const result = await checkInBUS.createCheckInPayment(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.post('/room-handover', validateDTO(HandoverRoomDTO), async (req, res, next) => {
    try {
        const result = await checkInBUS.handoverRoom(req.body);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

module.exports = router;
