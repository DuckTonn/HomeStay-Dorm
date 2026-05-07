const BaseDTO = require('./BaseDTO');

// ─── Branch ──────────────────────────────────────────────────
class BranchDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'address', required: false, type: 'string', minLength: 1 },
            { field: 'phone_number', required: false, type: 'string' },
            { field: 'email', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Regulation ──────────────────────────────────────────────
class RegulationDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'description', required: false, type: 'string' },
            { field: 'category', required: false, type: 'string', maxLength: 100 },
            { field: 'branch_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Service ─────────────────────────────────────────────────
class ServiceDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'price', required: false, type: 'number', min: 0 }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    BranchDTO,
    RegulationDTO,
    ServiceDTO
};
