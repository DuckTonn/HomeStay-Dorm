const BaseDTO = require('./BaseDTO');

// ─── Create Payment ─────────────────────────────────────────
class CreatePaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'amount', required: true, type: 'number', min: 0 },
            { field: 'method', required: true, type: 'string', enum: ['Cash', 'Bank Transfer'] },
            { field: 'tenant_id', required: true, type: 'integer' },
            { field: 'note', required: false, type: 'string' },
            { field: 'deposit_receipt_id', required: false, type: 'integer' },
            { field: 'contract_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Update Payment ─────────────────────────────────────────
class UpdatePaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'amount', required: false, type: 'number', min: 0 },
            { field: 'method', required: false, type: 'string', enum: ['Cash', 'Bank Transfer'] },
            { field: 'status', required: false, type: 'string', enum: ['Pending Payment', 'Paid'] },
            { field: 'note', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Response Serializer ─────────────────────────────────────
class PaymentResponse {
    static serialize(payment) {
        if (!payment) return null;
        return {
            payment_id: payment.payment_id,
            amount: Number(payment.amount || 0),
            method: payment.method,
            status: payment.status,
            note: payment.note ?? null,
            tenant_id: payment.tenant_id,
            contract_id: payment.contract_id ?? null,
            deposit_receipt_id: payment.deposit_receipt_id ?? null
        };
    }
}

module.exports = {
    CreatePaymentDTO,
    UpdatePaymentDTO,
    PaymentResponse
};
