const roomService = require('../services/RoomService');

/**
 * Controller: Manage rooms, beds, and room types
 */
class RoomController {
    // --- Rooms ---
    async getAllRooms(req, res, next) {
        try {
            const data = await roomService.getAllRooms(req.query);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async getRoomById(req, res, next) {
        try {
            const data = await roomService.getRoomById(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async createRoom(req, res, next) {
        try {
            const data = await roomService.createRoom(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) { next(error); }
    }

    async updateRoom(req, res, next) {
        try {
            const data = await roomService.updateRoom(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async deleteRoom(req, res, next) {
        try {
            const data = await roomService.deleteRoom(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // --- Beds ---
    async getBedsByRoom(req, res, next) {
        try {
            const data = await roomService.getBedsByRoom(req.params.roomId);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async getAvailableBedsByRoom(req, res, next) {
        try {
            const data = await roomService.getAvailableBedsByRoom(req.params.roomId);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async createBed(req, res, next) {
        try {
            const data = await roomService.createBed(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) { next(error); }
    }

    async updateBed(req, res, next) {
        try {
            const data = await roomService.updateBed(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // --- Room types ---
    async getAllRoomTypes(req, res, next) {
        try {
            const data = await roomService.getAllRoomTypes();
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async createRoomType(req, res, next) {
        try {
            const data = await roomService.createRoomType(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) { next(error); }
    }

    async updateRoomType(req, res, next) {
        try {
            const data = await roomService.updateRoomType(req.params.id, req.body);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    async deleteRoomType(req, res, next) {
        try {
            const data = await roomService.deleteRoomType(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }
}

module.exports = new RoomController();
