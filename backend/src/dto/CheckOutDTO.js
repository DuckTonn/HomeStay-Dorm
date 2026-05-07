const BaseDTO = require('./BaseDTO');

class CheckOutDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: false, type: 'integer' },
            { field: 'check_out_date', required: false, type: 'date' },
            { field: 'extra_costs', required: false, type: 'object' },
            { field: 'accountant_id', required: false, type: 'integer' },
            { field: 'record_note', required: false, type: 'string' },
            { field: 'refund_receipt_id', required: false, type: 'integer' },
            { field: 'deposit_receipt_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    CheckOutDTO
};
