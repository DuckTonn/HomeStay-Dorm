const BaseDTO = require('./BaseDTO');

// ─── Check Deposit Ability ──────────────────────────────────
class CheckDepositAbilityDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'bed_ids', required: true, type: 'array', custom: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return 'bed_ids must be a non-empty array';
                }
                return null;
            }}
        ]);
        this.bed_ids = data.bed_ids;
    }
}

// ─── Create Deposit Receipt ─────────────────────────────────
class CreateDepositReceiptDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'tenant_id', required: true, type: 'integer' },
            { field: 'sales_employee_id', required: true, type: 'integer' },
            { field: 'manager_id', required: true, type: 'integer' },
            { field: 'bed_ids', required: true, type: 'array', custom: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return 'bed_ids must be a non-empty array';
                }
                return null;
            }},
            { field: 'registration_request_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Create Deposit Payment ─────────────────────────────────
class CreateDepositPaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'method', required: true, type: 'string', enum: ['Cash', 'Bank Transfer'] }
        ]);
        this.method = data.method;
    }
}

// ─── Confirm Deposit Payment ────────────────────────────────
class ConfirmDepositPaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'payment_id', required: true, type: 'integer' }
        ]);
        this.payment_id = data.payment_id;
    }
}

module.exports = {
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO
};
