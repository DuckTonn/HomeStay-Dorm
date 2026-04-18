const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');


router.post('/login', authController.login.bind(authController));

router.get('/me', authenticate, authController.getMe.bind(authController));

router.post('/register', authenticate, authorize('admin'), authController.register.bind(authController));

module.exports = router;
