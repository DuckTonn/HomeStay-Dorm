const BaseDTO = require('./BaseDTO');

class DepositDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'bed_ids', required: false, type: 'array' },
            { field: 'tenant_id', required: false, type: 'integer' },
            { field: 'sales_employee_id', required: false, type: 'integer' },
            { field: 'manager_id', required: false, type: 'integer' },
            { field: 'registration_request_id', required: false, type: 'integer' },
            { field: 'method', required: false, type: 'string', enum: ['Cash', 'Bank Transfer'] },
            { field: 'payment_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    DepositDTO
};
