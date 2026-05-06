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

// ─── Response Serializers ────────────────────────────────────
class DepositReceiptResponse {
    static serialize(receipt) {
        if (!receipt) return null;
        return {
            deposit_receipt_id: receipt.deposit_receipt_id,
            status: receipt.status,
            total_deposit: Number(receipt.total_deposit || 0),
            payment_deadline: receipt.payment_deadline ?? null,
            note: receipt.note ?? null,
            tenant_id: receipt.tenant_id,
            sales_employee_id: receipt.sales_employee_id,
            manager_id: receipt.manager_id,
            beds: Array.isArray(receipt.beds)
                ? receipt.beds.map(b => ({ bed_id: b.bed_id, status: b.status, price: Number(b.price || 0) }))
                : undefined
        };
    }
}

module.exports = {
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO,
    DepositReceiptResponse
};
