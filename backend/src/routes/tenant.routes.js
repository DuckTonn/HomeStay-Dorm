const express = require('express');
const router = express.Router();
const authBUS = require('../bus/AuthBUS');
const authenticate = require('../middlewares/authenticate');

router.get('/:id', authenticate, async (req, res, next) => {
    try {
        const account = await authBUS.getMe(req.params.id);
        return res.status(200).json({ success: true, data: account });
    } catch (err) { next(err); }
});

module.exports = router;
