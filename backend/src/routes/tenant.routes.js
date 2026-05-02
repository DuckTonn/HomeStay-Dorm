const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/AuthController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');


router.get('/:id', authController.login.bind(authController));

router.get('/me', authenticate, authController.getMe.bind(authController));
router.put('/me', authenticate, authController.updateMe.bind(authController));

router.post('/register', authController.register.bind(authController));

router.post('/forgot-password', authController.forgotPassword.bind(authController));

router.post('/reset-password', authController.resetPassword.bind(authController));

module.exports = router;
