const express = require('express');
const router = express.Router();
const employeeBUS = require('../bus/EmployeeBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { EmployeeDTO } = require('../dto');

router.get('/', async (req, res, next) => {
    try {
        const result = await employeeBUS.getAllEmployees(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.get('/sale', async (req, res, next) => {
    try {
        const result = await employeeBUS.getSaleEmployees(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
    try {
        const data = await employeeBUS.getEmployeeById(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.post('/', validateDTO(EmployeeDTO), async (req, res, next) => {
    try {
        const { type, ...data } = req.body;
        const result = await employeeBUS.createEmployee(type, data);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});
router.put('/:id', validateDTO(EmployeeDTO), async (req, res, next) => {
    try {
        const data = await employeeBUS.updateEmployee(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const data = await employeeBUS.deleteEmployee(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});

module.exports = router;
