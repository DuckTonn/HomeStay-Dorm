const BaseDTO = require('./BaseDTO');

class CreateRoomDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'gender_policy', required: true, type: 'string', enum: ['Male', 'Female', 'Mixed'] },
            { field: 'total_beds', required: true, type: 'integer', min: 0 },
            { field: 'available_beds', required: false, type: 'integer', min: 0 },
            { field: 'status', required: false, type: 'string' },
            { field: 'area', required: false, type: 'string', maxLength: 100 },
            { field: 'room_type_id', required: true, type: 'integer' },
            { field: 'branch_id', required: true, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

class UpdateRoomDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'gender_policy', required: false, type: 'string', enum: ['Male', 'Female', 'Mixed'] },
            { field: 'total_beds', required: false, type: 'integer', min: 0 },
            { field: 'available_beds', required: false, type: 'integer', min: 0 },
            { field: 'status', required: false, type: 'string' },
            { field: 'area', required: false, type: 'string', maxLength: 100 },
            { field: 'room_type_id', required: false, type: 'integer' },
            { field: 'branch_id', required: false, type: 'integer' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Bed ─────────────────────────────────────────────────────
class CreateBedDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'price', required: true, type: 'number', min: 0 },
            { field: 'room_id', required: true, type: 'integer' },
            { field: 'status', required: false, type: 'string', enum: ['Empty', 'Reserved', 'Deposited', 'Occupied'] }
        ]);
        this.price = data.price;
        this.room_id = data.room_id;
        this.status = data.status;
    }
}

class UpdateBedDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'price', required: false, type: 'number', min: 0 },
            { field: 'room_id', required: false, type: 'integer' },
            { field: 'status', required: false, type: 'string', enum: ['Empty', 'Reserved', 'Deposited', 'Occupied'] }
        ]);
        this.price = data.price;
        this.room_id = data.room_id;
        this.status = data.status;
    }
}

// ─── Room Type ───────────────────────────────────────────────
class CreateRoomTypeDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: true, type: 'string', maxLength: 100 }
        ]);
        this.name = data.name;
    }
}

class UpdateRoomTypeDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: false, type: 'string', maxLength: 100 }
        ]);
        this.name = data.name;
    }
}

// ─── Response Serializers ────────────────────────────────────
class RoomTypeResponse {
    static serialize(roomType) {
        if (!roomType) return null;
        return {
            room_type_id: roomType.room_type_id,
            name: roomType.name
        };
    }
}

class BedResponse {
    static serialize(bed) {
        if (!bed) return null;
        return {
            bed_id: bed.bed_id,
            status: bed.status,
            price: Number(bed.price || 0)
        };
    }
}

class RoomResponse {
    static serialize(room) {
        if (!room) return null;
        return {
            room_id: room.room_id,
            status: room.status,
            gender_policy: room.gender_policy,
            area: room.area ?? null,
            total_beds: room.total_beds,
            available_beds: room.available_beds,
            room_type: room.room_type ? RoomTypeResponse.serialize(room.room_type) : null,
            branch_id: room.branch_id ?? null,
            branch: room.branch ? { branch_id: room.branch.branch_id, address: room.branch.address } : null,
            beds: Array.isArray(room.bed) ? room.bed.map(BedResponse.serialize) : []
        };
    }
}

module.exports = {
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO,
    RoomResponse,
    BedResponse,
    RoomTypeResponse
};
