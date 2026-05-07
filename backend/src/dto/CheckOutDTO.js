const BaseDTO = require('./BaseDTO');

// ─── Calculate Refund ───────────────────────────────────────
class CalculateRefundDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: false, type: 'integer' },
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
            { field: 'contract_id', required: false, type: 'integer' },
            { field: 'check_out_date', required: false, type: 'date' },
            { field: 'extra_costs', required: false, type: 'object' },
            { field: 'accountant_id', required: false, type: 'integer' },
            { field: 'record_note', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Complete Check-Out ─────────────────────────────────────
class CompleteCheckOutDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: false, type: 'integer' },
            { field: 'refund_receipt_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Check-Out Without Contract ─────────────────────────────
class CheckOutWithoutContractDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'deposit_receipt_id', required: false, type: 'integer' },
            { field: 'accountant_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO
};
