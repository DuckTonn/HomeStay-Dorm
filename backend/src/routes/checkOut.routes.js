const express = require('express');
const router = express.Router();
const checkOutBUS = require('../bus/CheckOutBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { CheckOutDTO } = require('../dto');

router.get('/contract/:contractId', async (req, res, next) => {
    try {
        const result = await checkOutBUS.registerCheckOut(req.params.contractId);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.post('/confirm', validateDTO(CheckOutDTO), async (req, res, next) => {
    try {
        const result = await checkOutBUS.confirmCheckOut(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});

router.put('/complete', validateDTO(CheckOutDTO), async (req, res, next) => {
    try {
        const result = await checkOutBUS.completeCheckOut(req.body);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

module.exports = router;
