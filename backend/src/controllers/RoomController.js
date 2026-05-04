const roomService = require('../services/RoomService');
const { RoomResponse, BedResponse, RoomTypeResponse } = require('../dtos/RoomDTO');
const BaseDTO = require('../dtos/BaseDTO');

/**
 * Controller: Manage rooms, beds, and room types
 */
class RoomController {
    // --- Rooms ---
    async getAllRooms(req, res, next) {
        try {
            const result = await roomService.getAllRooms(req.query);
            const serialized = BaseDTO.serializeList(result, RoomResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async addRoomImages(req, res, next) {
        try {
            const result = await roomService.addImages(req.params.id, req.files);
            const serialized = BaseDTO.serializeOne(result, RoomResponse.serialize);
            res.json({ success: true, data: serialized });
        }
        catch (error) { next(error); }
    }

    async getRoomById(req, res, next) {
        try {
            const data = await roomService.getRoomById(req.params.id);
            res.json({ success: true, data: RoomResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async createRoom(req, res, next) {
        try {
            const data = await roomService.createRoom(req.body);
            res.status(201).json({ success: true, data: RoomResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async updateRoom(req, res, next) {
        try {
            const data = await roomService.updateRoom(req.params.id, req.body);
            res.json({ success: true, data: RoomResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteRoom(req, res, next) {
        try {
            const data = await roomService.deleteRoom(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async getRoomTenants(req, res, next) {
        try {
            const tenants = await roomService.getRoomTenants(req.params.id);
            res.json({ success: true, data: tenants });
        } catch (error) { next(error); }
    }

    async removeTenantFromRoom(req, res, next) {
        try {
            const { id, tenantId } = req.params;
            await roomService.removeTenantFromRoom(id, tenantId);
            res.json({ success: true, message: 'Đã xóa người thuê khỏi phòng' });
        } catch (error) { next(error); }
    }

    // --- Beds ---
    async getBedsByRoom(req, res, next) {
        try {
            const result = await roomService.getBedsByRoom(req.params.roomId);
            const serialized = BaseDTO.serializeList(result, BedResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async getAvailableBedsByRoom(req, res, next) {
        try {
            const result = await roomService.getAvailableBedsByRoom(req.params.roomId);
            const serialized = BaseDTO.serializeList(result, BedResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async createBed(req, res, next) {
        try {
            const data = await roomService.createBed(req.body);
            res.status(201).json({ success: true, data: BedResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async updateBed(req, res, next) {
        try {
            const data = await roomService.updateBed(req.params.id, req.body);
            res.json({ success: true, data: BedResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteBed(req, res, next) {
        try {
            await roomService.deleteBed(req.params.id);
            res.json({ success: true, message: 'Đã xóa giường' });
        } catch (error) { next(error); }
    }

    // --- Room types ---
    async getAllRoomTypes(req, res, next) {
        try {
            const result = await roomService.getAllRoomTypes(req.query);
            const serialized = BaseDTO.serializeList(result, RoomTypeResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async createRoomType(req, res, next) {
        try {
            const data = await roomService.createRoomType(req.body);
            res.status(201).json({ success: true, data: RoomTypeResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async updateRoomType(req, res, next) {
        try {
            const data = await roomService.updateRoomType(req.params.id, req.body);
            res.json({ success: true, data: RoomTypeResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteRoomType(req, res, next) {
        try {
            const data = await roomService.deleteRoomType(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async getSimilarRooms(req, res, next) {
        try {
            const result = await roomService.getSimilarRooms(req.params.id);
            const serialized = BaseDTO.serializeList(result, RoomResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }
}

module.exports = new RoomController();
