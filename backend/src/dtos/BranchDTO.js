const BaseDTO = require('./BaseDTO');

// ─── Branch ──────────────────────────────────────────────────
class CreateBranchDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'address', required: true, type: 'string', minLength: 1 },
            { field: 'phone_number', required: true, type: 'string' },
            { field: 'email', required: true, type: 'string' }
        ]);
        this.address = data.address;
    }
}

class UpdateBranchDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'address', required: false, type: 'string', minLength: 1 }
        ]);
        this.address = data.address;
    }
}

// ─── Regulation ──────────────────────────────────────────────
class CreateRegulationDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'description', required: true, type: 'string' },
            { field: 'category', required: false, type: 'string', maxLength: 100 },
            { field: 'branch_id', required: false, type: 'integer' }
        ]);
        this.description = data.description;
        this.category = data.category;
        this.branch_id = data.branch_id;
    }
}

class UpdateRegulationDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'description', required: false, type: 'string' },
            { field: 'category', required: false, type: 'string', maxLength: 100 },
            { field: 'branch_id', required: false, type: 'integer' }
        ]);
        this.description = data.description;
        this.category = data.category;
        this.branch_id = data.branch_id;
    }
}

// ─── Service ─────────────────────────────────────────────────
class CreateServiceDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: true, type: 'string', maxLength: 200 },
            { field: 'price', required: true, type: 'number', min: 0 }
        ]);
        this.name = data.name;
        this.price = data.price;
    }
}

class UpdateServiceDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'price', required: false, type: 'number', min: 0 }
        ]);
        this.name = data.name;
        this.price = data.price;
    }
}

// ─── Response Serializers ────────────────────────────────────
class BranchResponse {
    static serialize(branch) {
        if (!branch) return null;
        return {
            branch_id: branch.branch_id,
            address: branch.address,
            phone_number: branch.phone_number,
            email: branch.email
        };
    }
}

class RegulationResponse {
    static serialize(regulation) {
        if (!regulation) return null;
        return {
            regulation_id: regulation.regulation_id,
            description: regulation.description,
            category: regulation.category ?? null,
            branch_id: regulation.branch_id ?? null
        };
    }
}

class ServiceResponse {
    static serialize(service) {
        if (!service) return null;
        return {
            service_id: service.service_id,
            name: service.name,
            price: Number(service.price || 0)
        };
    }
}

module.exports = {
    CreateBranchDTO,
    UpdateBranchDTO,
    CreateRegulationDTO,
    UpdateRegulationDTO,
    CreateServiceDTO,
    UpdateServiceDTO,
    BranchResponse,
    RegulationResponse,
    ServiceResponse
};
