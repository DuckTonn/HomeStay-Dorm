const express = require('express');
const router = express.Router();
const employeeBUS = require('../bus/EmployeeBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { EmployeeResponse } = require('../dto/EmployeeDTO');
const BaseDTO = require('../dto/BaseDTO');
const { CreateEmployeeDTO, UpdateEmployeeDTO } = require('../dto');

router.get('/', async (req, res, next) => {
    try {
        const result = await employeeBUS.getAllEmployees(req.query);
        const serialized = BaseDTO.serializeList(result, EmployeeResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/sale', async (req, res, next) => {
    try {
        const result = await employeeBUS.getSaleEmployees(req.query);
        const serialized = BaseDTO.serializeList(result, EmployeeResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
    try {
        const data = await employeeBUS.getEmployeeById(req.params.id);
        res.json({ success: true, data: EmployeeResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.post('/', validateDTO(CreateEmployeeDTO), async (req, res, next) => {
    try {
        const { type, ...data } = req.body;
        const result = await employeeBUS.createEmployee(type, data);
        res.status(201).json({ success: true, data: EmployeeResponse.serialize(result) });
    } catch (error) { next(error); }
});
router.put('/:id', validateDTO(UpdateEmployeeDTO), async (req, res, next) => {
    try {
        const data = await employeeBUS.updateEmployee(req.params.id, req.body);
        res.json({ success: true, data: EmployeeResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const data = await employeeBUS.deleteEmployee(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});

module.exports = router;
