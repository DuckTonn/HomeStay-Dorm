/**
 * Domain Entity: Employee
 * Contains constants and pure business rule methods for employees.
 */
class Employee {
    static ROLES = {
        SALE: 'sale',
        ACCOUNTANT: 'accountant',
        MANAGER: 'manager'
    };

    /**
     * Check if a given role string is a valid employee role.
     * @param {string} role
     * @returns {boolean}
     */
    static isValidRole(role) {
        return Object.values(Employee.ROLES).includes(role);
    }

    /**
     * Check if an employee is a sales employee.
     * @param {Object} employee
     * @returns {boolean}
     */
    static isSale(employee) {
        return employee.role === Employee.ROLES.SALE;
    }

    /**
     * Check if an employee is a manager.
     * @param {Object} employee
     * @returns {boolean}
     */
    static isManager(employee) {
        return employee.role === Employee.ROLES.MANAGER;
    }

    /**
     * Check if an employee is an accountant.
     * @param {Object} employee
     * @returns {boolean}
     */
    static isAccountant(employee) {
        return employee.role === Employee.ROLES.ACCOUNTANT;
    }
}

module.exports = Employee;
