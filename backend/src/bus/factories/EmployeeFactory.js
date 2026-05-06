const employeeDAO = require('../../dao/EmployeeDAO');
const saleEmployeeDAO = require('../../dao/SaleEmployeeDAO');
const accountantDAO = require('../../dao/AccountantDAO');
const managerDAO = require('../../dao/ManagerDAO');

/**
 * Factory Pattern: EmployeeFactory
 * Create employees by role (sale, accountant, manager).
 */
class EmployeeFactory {
    /**
     * Create a new employee by role
     * @param {string} role - 'sale' | 'accountant' | 'manager'
     * @param {Object} data - Employee data
     * @returns {Object} Created employee
     */
    async create(role, data) {
        // Create base employee record
        const employee = await employeeDAO.create({
            name: data.name,
            salary: data.salary || 0,
            role,
            branch_id: data.branch_id
        });

        // Create matching sub-type record
        let subType = null;
        switch (role) {
            case 'sale':
                subType = await saleEmployeeDAO.create({
                    employee_id: employee.employee_id,
                    target_quota: data.target_quota || 0
                });
                break;
            case 'accountant':
                subType = await accountantDAO.create({
                    employee_id: employee.employee_id
                });
                break;
            case 'manager':
                subType = await managerDAO.create({
                    employee_id: employee.employee_id,
                    appointment_date: data.appointment_date || new Date().toISOString()
                });
                break;
            default:
                throw new Error(`Invalid employee role: ${role}`);
        }

        return { ...employee, ...subType };
    }
}

module.exports = new EmployeeFactory();
