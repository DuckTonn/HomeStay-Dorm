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
            branch_id: parseNumber(filters.branch_id) ?? filters.branch_id,
            room_type_id: parseNumber(filters.room_type_id) ?? filters.room_type_id,
            people_count: parseNumber(filters.people_count) ?? filters.people_count,
            min_price: parseNumber(filters.min_price) ?? filters.min_price,
            max_price: parseNumber(filters.max_price) ?? filters.max_price,
            price_level: parseNumber(filters.price_level) ?? filters.price_level
        };

        return roomRepository.findAvailable(normalizedFilters);
    }

    async getRoomById(roomId) {
        const room = await roomRepository.findById(roomId);
        if (!room) throw Object.assign(new Error('Room not found'), { type: 'business' });
        return room;
    }

    async createRoom(data) {
        return roomRepository.create(data);
    }

    async updateRoom(roomId, data) {
        return roomRepository.update(roomId, data);
    }

    async deleteRoom(roomId) {
        return roomRepository.delete(roomId);
    }

    // --- Beds ---
    async getBedsByRoom(roomId) {
        return bedRepository.findAll({ room_id: roomId });
    }

    async getAvailableBedsByRoom(roomId) {
        return bedRepository.findAvailableByRoom(roomId);
    }

    async createBed(data) {
        const bed = await bedRepository.create(data);
        // Update room available beds
        await roomRepository.updateAvailableBedCount(data.room_id);
        return bed;
    }

    async updateBed(bedId, data) {
        const bed = await bedRepository.update(bedId, data);
        if (data.room_id) {
            await roomRepository.updateAvailableBedCount(data.room_id);
        }
        return bed;
    }

    // --- Room types ---
    async getAllRoomTypes() {
        return roomTypeRepository.findAll();
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
