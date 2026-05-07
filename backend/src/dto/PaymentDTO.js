const BaseDTO = require('./BaseDTO');

// ─── Payment ─────────────────────────────────────────────────
class PaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'amount', required: false, type: 'number', min: 0 },
            { field: 'method', required: false, type: 'string', enum: ['Cash', 'Bank Transfer'] },
            { field: 'status', required: false, type: 'string', enum: ['Pending Payment', 'Paid'] },
            { field: 'tenant_id', required: false, type: 'integer' },
            { field: 'note', required: false, type: 'string' },
            { field: 'deposit_receipt_id', required: false, type: 'integer' },
            { field: 'contract_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    PaymentDTO
};
