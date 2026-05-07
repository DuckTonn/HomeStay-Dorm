const BaseDTO = require('./BaseDTO');

// ─── Room ────────────────────────────────────────────────────
class RoomDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'gender_policy', required: false, type: 'string', enum: ['Male', 'Female', 'Mixed'] },
            { field: 'total_beds', required: false, type: 'integer', min: 0 },
            { field: 'available_beds', required: false, type: 'integer', min: 0 },
            { field: 'status', required: false, type: 'string' },
            { field: 'area', required: false, type: 'string', maxLength: 100 },
            { field: 'room_type_id', required: false, type: 'integer' },
            { field: 'branch_id', required: false, type: 'integer' },
            { field: 'room_description', required: false, type: 'string' },
            { field: 'bed_price', required: false, type: 'number', min: 0 }
        ]);
        Object.assign(this, data);
    }
}

// ─── Bed ─────────────────────────────────────────────────────
class BedDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'price', required: false, type: 'number', min: 0 },
            { field: 'room_id', required: false, type: 'integer' },
            { field: 'status', required: false, type: 'string', enum: ['Empty', 'Reserved', 'Deposited', 'Occupied'] }
        ]);
        Object.assign(this, data);
    }
}

// ─── Room Type ───────────────────────────────────────────────
class RoomTypeDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: false, type: 'string', maxLength: 100 }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    RoomDTO,
    BedDTO,
    RoomTypeDTO
};
