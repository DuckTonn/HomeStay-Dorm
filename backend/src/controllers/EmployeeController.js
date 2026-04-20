const employeeService = require('../services/EmployeeService');
const { EmployeeResponse } = require('../dtos/EmployeeDTO');
const BaseDTO = require('../dtos/BaseDTO');

/**
 * Controller: Employee management
 */
class EmployeeController {
    async getAllEmployee(req, res, next) {
        try {
            const result = await employeeService.getAllEmployees(req.query);
            const serialized = BaseDTO.serializeList(result, EmployeeResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async getEmployeeById(req, res, next) {
        try {
            const data = await employeeService.getEmployeeById(req.params.id);
            res.json({ success: true, data: EmployeeResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async createEmployee(req, res, next) {
        try {
            const { type, ...data } = req.body;
            const result = await employeeService.createEmployee(type, data);
            res.status(201).json({ success: true, data: EmployeeResponse.serialize(result) });
        } catch (error) { next(error); }
    }

    async updateEmployee(req, res, next) {
        try {
            const data = await employeeService.updateEmployee(req.params.id, req.body);
            res.json({ success: true, data: EmployeeResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteEmployee(req, res, next) {
        try {
            const data = await employeeService.deleteEmployee(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async getSaleEmployee(req, res, next) {
        try {
            const result = await employeeService.getSaleEmployees(req.query);
            const serialized = BaseDTO.serializeList(result, EmployeeResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }
}

module.exports = new EmployeeController();
