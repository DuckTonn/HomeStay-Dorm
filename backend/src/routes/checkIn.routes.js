const express = require('express');
const router = express.Router();
const checkInBUS = require('../bus/CheckInBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { ContractResponse } = require('../dto/CheckInDTO');
const BaseDTO = require('../dto/BaseDTO');
const {
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO
} = require('../dto');

router.get('/contract', async (req, res, next) => {
    try {
        const result = await checkInBUS.getAllContracts(req.query);
        const serialized = BaseDTO.serializeList(result, ContractResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/contract/:id', async (req, res, next) => {
    try {
        const data = await checkInBUS.getContractById(req.params.id);
        res.json({ success: true, data: ContractResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.post('/contract', validateDTO(CreateContractDTO), async (req, res, next) => {
    try {
        const result = await checkInBUS.createContract(req.body);
        res.status(201).json({ success: true, data: ContractResponse.serialize(result) });
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
        res.json({ success: true, data: ContractResponse.serialize(result) });
    } catch (error) { next(error); }
});

router.post('/payment', validateDTO(CreateCheckInPaymentDTO), async (req, res, next) => {
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
