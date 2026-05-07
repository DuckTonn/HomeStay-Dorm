const BaseDTO = require('./BaseDTO');

// ─── Employee ────────────────────────────────────────────────
class EmployeeDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'type', required: false, type: 'string', enum: ['sale', 'accountant', 'manager'] },
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'salary', required: false, type: 'number', min: 0 },
            { field: 'branch_id', required: false, type: 'integer' },
            // Sale-specific
            { field: 'target_quota', required: false, type: 'number', min: 0 },
            // Manager-specific
            { field: 'appointment_date', required: false, type: 'date' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    EmployeeDTO
};
