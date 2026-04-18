const express = require('express');
const router = express.Router();


const authRoutes = require('./auth.routes');
const registrationRoutes = require('./registration.routes');
const depositRoutes = require('./deposit.routes');
const checkInRoutes = require('./checkIn.routes');
const checkOutRoutes = require('./checkOut.routes');
const roomRoutes = require('./room.routes');
const employeeRoutes = require('./employee.routes');
const branchRoutes = require('./branch.routes');


router.use('/auth', authRoutes);
router.use('/registration', registrationRoutes);
router.use('/deposit', depositRoutes);
router.use('/check-in', checkInRoutes);
router.use('/check-out', checkOutRoutes);


router.use('/room', roomRoutes);
router.use('/employee', employeeRoutes);
router.use('/branch', branchRoutes);

module.exports = router;
