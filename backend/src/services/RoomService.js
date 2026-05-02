const roomRepository = require('../repositories/RoomRepository');
const bedRepository = require('../repositories/BedRepository');
const roomTypeRepository = require('../repositories/RoomTypeRepository');

class RoomService {
    async getAllRooms(filters = {}) {
        const parseBoolean = (value, defaultValue = false) => {
            if (value === undefined || value === null || value === '') return defaultValue;
            if (typeof value === 'boolean') return value;
            const normalized = String(value).trim().toLowerCase();
            if (['true', '1', 'yes', 'y'].includes(normalized)) return true;
            if (['false', '0', 'no', 'n'].includes(normalized)) return false;
            return defaultValue;
        };

        const parseNumber = (value) => {
            if (value === undefined || value === null || value === '') return undefined;
            const num = Number(value);
            return Number.isFinite(num) ? num : undefined;
        };

        // By default, list ALL rooms. If caller wants only available rooms,
        // they must pass only_available=true.
        const normalizedFilters = {
            ...filters,
            only_available: parseBoolean(filters.only_available, false),
            is_full: filters.is_full !== undefined && filters.is_full !== '' ? parseBoolean(filters.is_full) : undefined,
            branch_id: parseNumber(filters.branch_id) ?? filters.branch_id,
            room_type_id: parseNumber(filters.room_type_id) ?? filters.room_type_id,
            people_count: parseNumber(filters.people_count) ?? filters.people_count,
            min_price: parseNumber(filters.min_price) ?? filters.min_price,
            max_price: parseNumber(filters.max_price) ?? filters.max_price,
            price_level: parseNumber(filters.price_level) ?? filters.price_level,
            room_number: String(filters.room_number ?? '')
        };

        return roomRepository.findAvailable(normalizedFilters);
    }

    async getRoomById(roomId) {
        const room = await roomRepository.findById(roomId);
        if (!room) throw Object.assign(new Error('Room not found'), { type: 'business' });
        return room;
    }

    async createRoom(data) {
        const { bed_price, ...roomData } = data;

        if (roomData.branch_id) {
            const maxNumber = await roomRepository.getMaxRoomNumberForBranch(roomData.branch_id);
            roomData.room_number = maxNumber + 1;
        }

        // Sequential calls for room and beds
        const room = await roomRepository.create(roomData);

        if (room && room.total_beds > 0) {
            const beds = Array.from({ length: room.total_beds }, () => ({
                room_id: room.room_id,
                price: bed_price || 0,
                status: 'Empty'
            }));
            await bedRepository.createMany(beds);
        }

        return room;
    }

    async updateRoom(roomId, data) {
        const { bed_price, ...roomData } = data;
        const result = await roomRepository.update(roomId, roomData);
        if (bed_price !== undefined) {
            await bedRepository.updatePricesByRoom(roomId, bed_price);
        }
        return result;
    }

    async deleteRoom(roomId) {
        return roomRepository.delete(roomId);
    }

    // --- Tenants in a room ---
    async getRoomTenants(roomId) {
        const contractRepository = require('../repositories/ContractRepository');
        return contractRepository.findTenantsByRoom(roomId);
    }

    async removeTenantFromRoom(roomId, tenantId) {
        const contractRepository = require('../repositories/ContractRepository');
        return contractRepository.removeTenantFromRoom(roomId, tenantId);
    }

    // --- Beds ---
    async getBedsByRoom(roomId) {
        return bedRepository.findAll({ room_id: roomId });
    }

    async getAvailableBedsByRoom(roomId) {
        return bedRepository.findAvailableByRoom(roomId);
    }

    async createBed(data) {
        const bed = await bedRepository.create({
            ...data,
            status: 'Empty'
        });

        // Increment room capacity and availability
        const room = await roomRepository.findById(data.room_id);
        if (room) {
            await roomRepository.update(data.room_id, {
                total_beds: (room.total_beds || 0) + 1,
                available_beds: (room.available_beds || 0) + 1,
                status: 'Available'
            });
        }
        return bed;
    }

    async deleteBed(bedId) {
        const bed = await bedRepository.findById(bedId);
        if (!bed) throw Object.assign(new Error('Bed not found'), { type: 'business' });

        if (bed.status !== 'Empty') {
            throw Object.assign(new Error('Chỉ có thể xóa giường trống'), { type: 'business' });
        }

        const roomId = bed.room_id;
        await bedRepository.delete(bedId);

        // Decrement room capacity and availability
        const room = await roomRepository.findById(roomId);
        if (room) {
            await roomRepository.update(roomId, {
                total_beds: Math.max(0, (room.total_beds || 0) - 1),
                available_beds: Math.max(0, (room.available_beds || 0) - 1)
            });
        }
    }

    // --- Room types ---
    async getAllRoomTypes(filters = {}) {
        return roomTypeRepository.findAll(filters);
    }

    async createRoomType(data) {
        return roomTypeRepository.create(data);
    }

    async updateRoomType(roomTypeId, data) {
        return roomTypeRepository.update(roomTypeId, data);
    }

    async deleteRoomType(roomTypeId) {
        return roomTypeRepository.delete(roomTypeId);
    }
}

module.exports = new RoomService();
