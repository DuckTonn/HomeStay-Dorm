const BaseDTO = require('./BaseDTO');

// ─── Check Stay Conditions ──────────────────────────────────
class CheckStayConditionsDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'deposit_receipt_id', required: true, type: 'integer' },
            { field: 'members', required: false, type: 'array' }
        ]);
        this.deposit_receipt_id = data.deposit_receipt_id;
        this.members = data.members;
    }
}

// ─── Create Contract ────────────────────────────────────────
class CreateContractDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'deposit_receipt_id', required: true, type: 'integer' },
            { field: 'tenant_id', required: true, type: 'integer' },
            { field: 'room_id', required: true, type: 'integer' },
            { field: 'rental_type', required: true, type: 'string', enum: ['Whole Room', 'Shared Room'] },
            { field: 'start_date', required: true, type: 'date' },
            { field: 'end_date', required: true, type: 'date' },
            { field: 'employee_id', required: true, type: 'integer' },
            { field: 'bed_ids', required: true, type: 'array', custom: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return 'bed_ids must be a non-empty array';
                }
                return null;
            }},
            { field: 'service_ids', required: false, type: 'array' }
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

// ─── Sign Contract ──────────────────────────────────────────
class SignContractDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'document_proof', required: true, type: 'string' }
        ]);
        this.document_proof = data.document_proof;
    }
}

// ─── Create Check-In Payment ────────────────────────────────
class CreateCheckInPaymentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: true, type: 'integer' },
            { field: 'amount', required: true, type: 'number', min: 0 },
            { field: 'method', required: true, type: 'string', enum: ['Cash', 'Bank Transfer'] },
            { field: 'tenant_id', required: true, type: 'integer' },
            { field: 'note', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Room Handover ──────────────────────────────────────────
class HandoverRoomDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'contract_id', required: true, type: 'integer' },
            { field: 'note', required: false, type: 'string' }
        ]);
        this.contract_id = data.contract_id;
        this.note = data.note;
    }
}

// ─── Response Serializers ────────────────────────────────────
class ContractResponse {
    static serialize(contract) {
        if (!contract) return null;
        return {
            contract_id: contract.contract_id,
            confirmation_status: contract.confirmation_status,
            rental_type: contract.rental_type,
            start_date: contract.start_date,
            end_date: contract.end_date,
            bed_count: contract.bed_count,
            bed_price: Number(contract.bed_price || 0),
            tenant_id: contract.tenant_id,
            room_id: contract.room_id,
            employee_id: contract.employee_id,
            deposit_receipt_id: contract.deposit_receipt_id ?? null,
            document_proof: contract.document_proof ?? null,
            beds: Array.isArray(contract.bed) ? contract.bed : undefined,
            services: Array.isArray(contract.service) ? contract.service : undefined
        };
    }
}

module.exports = {
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO,
    ContractResponse
};
