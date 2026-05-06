const BaseDTO = require('./BaseDTO');

// ─── Calculate Refund ───────────────────────────────────────
class CalculateRefundDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: true, type: 'integer' },
            { field: 'check_out_date', required: false, type: 'date' },
            { field: 'extra_costs', required: false, type: 'object' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Confirm Check-Out ──────────────────────────────────────
class ConfirmCheckOutDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: true, type: 'integer' },
            { field: 'check_out_date', required: false, type: 'date' },
            { field: 'extra_costs', required: false, type: 'object' },
            { field: 'accountant_id', required: true, type: 'integer' },
            { field: 'record_note', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Complete Check-Out ─────────────────────────────────────
class CompleteCheckOutDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: true, type: 'integer' },
            { field: 'refund_receipt_id', required: true, type: 'integer' }
        ]);
        this.contract_id = data.contract_id;
        this.refund_receipt_id = data.refund_receipt_id;
    }
}

// ─── Check-Out Without Contract ─────────────────────────────
class CheckOutWithoutContractDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'deposit_receipt_id', required: true, type: 'integer' },
            { field: 'accountant_id', required: true, type: 'integer' }
        ]);
        this.deposit_receipt_id = data.deposit_receipt_id;
        this.accountant_id = data.accountant_id;
    }
}

module.exports = {
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO
};
