const express = require('express');
const router = express.Router();
const checkOutBUS = require('../bus/CheckOutBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const {
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO
} = require('../dto');

router.get('/contract/:contractId', async (req, res, next) => {
    try {
        const result = await checkOutBUS.registerCheckOut(req.params.contractId);
        res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
    } catch (error) { next(error); }
});

router.post('/calculate-refund', validateDTO(CalculateRefundDTO), async (req, res, next) => {
    try {
        const result = await checkOutBUS.calculateRefund(req.body);
        res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
    } catch (error) { next(error); }
});

router.post('/confirm', validateDTO(ConfirmCheckOutDTO), async (req, res, next) => {
    try {
        const result = await checkOutBUS.confirmCheckOut(req.body);
        res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
    } catch (error) { next(error); }
});

router.post('/complete', validateDTO(CompleteCheckOutDTO), async (req, res, next) => {
    try {
        const result = await checkOutBUS.completeCheckOut(req.body);
        res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
    } catch (error) { next(error); }
});

router.post('/without-contract', validateDTO(CheckOutWithoutContractDTO), async (req, res, next) => {
    try {
        const result = await checkOutBUS.checkOutWithoutContract(req.body);
        res.json({ success: true, ...(result?.pagination ? { data: result.data, pagination: result.pagination } : { data: result }) });
    } catch (error) { next(error); }
});

module.exports = router;
