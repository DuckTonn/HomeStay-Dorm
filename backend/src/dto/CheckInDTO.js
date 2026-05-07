const BaseDTO = require('./BaseDTO');

class CheckInDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            // Check Stay Conditions
            { field: 'deposit_receipt_id', required: false, type: 'integer' },
            { field: 'members', required: false, type: 'array' },
            
            // Contract
            { field: 'tenant_id', required: false, type: 'integer' },
            { field: 'room_id', required: false, type: 'integer' },
            { field: 'rental_type', required: false, type: 'string', enum: ['Whole Room', 'Shared Room'] },
            { field: 'start_date', required: false, type: 'date' },
            { field: 'end_date', required: false, type: 'date' },
            { field: 'employee_id', required: false, type: 'integer' },
            { field: 'bed_ids', required: false, type: 'array' },
            { field: 'service_ids', required: false, type: 'array' },
            
            // Sign Contract
            { field: 'document_proof', required: false, type: 'string' },
            
            // CheckInPayment
            { field: 'contract_id', required: false, type: 'integer' },
            { field: 'amount', required: false, type: 'number', min: 0 },
            { field: 'method', required: false, type: 'string', enum: ['Cash', 'Bank Transfer'] },
            
            // Handover Room
            { field: 'note', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }

    validate() {
        const result = super.validate();

        // Check end_date > start_date
        if (this.start_date && this.end_date) {
            const start = new Date(this.start_date);
            const end = new Date(this.end_date);
            if (end <= start) {
                result.valid = false;
                result.errors.push({
                    field: 'end_date',
                    message: 'end_date must be after start_date'
                });
            }
        }

        return result;
    }
}

module.exports = {
    CheckInDTO
};
