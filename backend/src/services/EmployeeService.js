const employeeRepository = require('../repositories/EmployeeRepository');
const employeeFactory = require('../factories/EmployeeFactory');


class EmployeeService {
    async getAllEmployees(filters = {}) {
        return employeeRepository.findAll(filters);
    }

    async getEmployeeById(employeeId) {
        const employee = await employeeRepository.findById(employeeId);
        if (!employee) throw Object.assign(new Error('Employee not found'), { type: 'business' });
        return employee;
    }

    async createEmployee(role, data) {
        return employeeFactory.create(role, data);
    }

    async updateEmployee(employeeId, data) {
        return employeeRepository.update(employeeId, data);
    }

    async deleteEmployee(employeeId) {
        return employeeRepository.delete(employeeId);
    }

    async getEmployeesByBranch(branchId) {
        return employeeRepository.findByBranch(branchId);
    }

    async getSaleEmployees() {
        return employeeRepository.findByRole('sale');
    }
}

module.exports = new EmployeeService();
