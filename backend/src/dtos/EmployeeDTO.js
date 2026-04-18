const BaseDTO = require('./BaseDTO');

// ─── Create Employee ─────────────────────────────────────────
class CreateEmployeeDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'type', required: true, type: 'string', enum: ['sale', 'accountant', 'manager'] },
            { field: 'name', required: true, type: 'string', maxLength: 200 },
            { field: 'salary', required: false, type: 'number', min: 0 },
            { field: 'branch_id', required: true, type: 'integer' },
            // Sale-specific
            { field: 'target_quota', required: false, type: 'number', min: 0 },
            // Manager-specific
            { field: 'appointment_date', required: false, type: 'date' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Update Employee ─────────────────────────────────────────
class UpdateEmployeeDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'salary', required: false, type: 'number', min: 0 },
            { field: 'branch_id', required: false, type: 'integer' },
            { field: 'target_quota', required: false, type: 'number', min: 0 },
            { field: 'appointment_date', required: false, type: 'date' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    CreateEmployeeDTO,
    UpdateEmployeeDTO
};
