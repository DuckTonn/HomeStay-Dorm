const express = require('express');
const router = express.Router();
const controller = require('../controllers/EmployeeController');


router.get('/', (req, res, next) => controller.getAllEmployee(req, res, next));
router.get('/sale', (req, res, next) => controller.getSaleEmployee(req, res, next));
router.get('/:id', (req, res, next) => controller.getEmployeeById(req, res, next));
router.post('/', (req, res, next) => controller.createEmployee(req, res, next));
router.put('/:id', (req, res, next) => controller.updateEmployee(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteEmployee(req, res, next));

module.exports = router;
