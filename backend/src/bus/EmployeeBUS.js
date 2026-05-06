const employeeDAO = require('../dao/EmployeeDAO');
const employeeFactory = require('./factories/EmployeeFactory');


class EmployeeBUS {
    async getAllEmployees(filters = {}) {
        return employeeDAO.findAll(filters);
    }

    async getEmployeeById(employeeId) {
        const employee = await employeeDAO.findById(employeeId);
        if (!employee) throw Object.assign(new Error('Employee not found'), { type: 'business' });
        return employee;
    }

    async createEmployee(role, data) {
        return employeeFactory.create(role, data);
    }

    async updateEmployee(employeeId, data) {
        return employeeDAO.update(employeeId, data);
    }

    async deleteEmployee(employeeId) {
        return employeeDAO.delete(employeeId);
    }

    async getEmployeesByBranch(branchId) {
        return employeeDAO.findByBranch(branchId);
    }

    async getSaleEmployees(filters = {}) {
        return employeeDAO.findByRole('sale', filters);
    }
}

module.exports = new EmployeeBUS();
