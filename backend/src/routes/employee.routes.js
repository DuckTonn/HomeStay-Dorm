const express = require('express');
const router = express.Router();
const controller = require('../controllers/EmployeeController');
const { validateDTO } = require('../middlewares/validateDTO');
const { CreateEmployeeDTO, UpdateEmployeeDTO } = require('../dtos');


router.get('/', (req, res, next) => controller.getAllEmployee(req, res, next));
router.get('/sale', (req, res, next) => controller.getSaleEmployee(req, res, next));
router.get('/:id', (req, res, next) => controller.getEmployeeById(req, res, next));
router.post('/', validateDTO(CreateEmployeeDTO), (req, res, next) => controller.createEmployee(req, res, next));
router.put('/:id', validateDTO(UpdateEmployeeDTO), (req, res, next) => controller.updateEmployee(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteEmployee(req, res, next));

module.exports = router;
