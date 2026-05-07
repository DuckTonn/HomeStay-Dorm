const BaseDTO = require('./BaseDTO');

// ─── Check Deposit Ability ──────────────────────────────────
class CheckDepositAbilityDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'bed_ids', required: false, type: 'array' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Deposit Receipt ─────────────────────────────────────────
class DepositReceiptDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'tenant_id', required: false, type: 'integer' },
            { field: 'sales_employee_id', required: false, type: 'integer' },
            { field: 'manager_id', required: false, type: 'integer' },
            { field: 'bed_ids', required: false, type: 'array' },
            { field: 'registration_request_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Deposit Payment ─────────────────────────────────────────
class DepositPaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'method', required: false, type: 'string', enum: ['Cash', 'Bank Transfer'] }
        ]);
        Object.assign(this, data);
    }
}

// ─── Confirm Deposit Payment ─────────────────────────────────
class ConfirmDepositPaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'payment_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    CheckDepositAbilityDTO,
    DepositReceiptDTO,
    DepositPaymentDTO,
    ConfirmDepositPaymentDTO
};
