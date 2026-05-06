const express = require('express');
const router = express.Router();
const roomBUS = require('../bus/RoomBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const upload = require('../middlewares/upload');
const { RoomResponse, BedResponse, RoomTypeResponse } = require('../dto/RoomDTO');
const BaseDTO = require('../dto/BaseDTO');
const {
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO
} = require('../dto');


// Room types (static routes first)
router.get('/room-type/all', async (req, res, next) => {
    try {
        const result = await roomBUS.getAllRoomTypes(req.query);
        const serialized = BaseDTO.serializeList(result, RoomTypeResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.post('/room-type', validateDTO(CreateRoomTypeDTO), async (req, res, next) => {
    try {
        const data = await roomBUS.createRoomType(req.body);
        res.status(201).json({ success: true, data: RoomTypeResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.put('/room-type/:id', validateDTO(UpdateRoomTypeDTO), async (req, res, next) => {
    try {
        const data = await roomBUS.updateRoomType(req.params.id, req.body);
        res.json({ success: true, data: RoomTypeResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.delete('/room-type/:id', async (req, res, next) => {
    try {
        const data = await roomBUS.deleteRoomType(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});


// Beds
router.get('/:roomId/bed', async (req, res, next) => {
    try {
        const result = await roomBUS.getBedsByRoom(req.params.roomId);
        const serialized = BaseDTO.serializeList(result, BedResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/:roomId/available-bed', async (req, res, next) => {
    try {
        const result = await roomBUS.getAvailableBedsByRoom(req.params.roomId);
        const serialized = BaseDTO.serializeList(result, BedResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.post('/bed', validateDTO(CreateBedDTO), async (req, res, next) => {
    try {
        const data = await roomBUS.createBed(req.body);
        res.status(201).json({ success: true, data: BedResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.put('/bed/:id', validateDTO(UpdateBedDTO), async (req, res, next) => {
    try {
        const data = await roomBUS.updateBed(req.params.id, req.body);
        res.json({ success: true, data: BedResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.delete('/bed/:id', async (req, res, next) => {
    try {
        await roomBUS.deleteBed(req.params.id);
        res.json({ success: true, message: 'Đã xóa giường' });
    } catch (error) { next(error); }
});


// Rooms
router.get('/', async (req, res, next) => {
    try {
        const result = await roomBUS.getAllRooms(req.query);
        const serialized = BaseDTO.serializeList(result, RoomResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/:id/tenants', async (req, res, next) => {
    try {
        const tenants = await roomBUS.getRoomTenants(req.params.id);
        res.json({ success: true, data: tenants });
    } catch (error) { next(error); }
});
router.delete('/:id/tenants/:tenantId', async (req, res, next) => {
    try {
        const { id, tenantId } = req.params;
        await roomBUS.removeTenantFromRoom(id, tenantId);
        res.json({ success: true, message: 'Đã xóa người thuê khỏi phòng' });
    } catch (error) { next(error); }
});
router.get('/:id/similar', async (req, res, next) => {
    try {
        const result = await roomBUS.getSimilarRooms(req.params.id);
        const serialized = BaseDTO.serializeList(result, RoomResponse.serialize);
        res.json({ success: true, ...serialized });
    } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
    try {
        const data = await roomBUS.getRoomById(req.params.id);
        res.json({ success: true, data: RoomResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.post('/', validateDTO(CreateRoomDTO), async (req, res, next) => {
    try {
        const data = await roomBUS.createRoom(req.body);
        res.status(201).json({ success: true, data: RoomResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.put('/:id', validateDTO(UpdateRoomDTO), async (req, res, next) => {
    try {
        const data = await roomBUS.updateRoom(req.params.id, req.body);
        res.json({ success: true, data: RoomResponse.serialize(data) });
    } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const data = await roomBUS.deleteRoom(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.post('/:id/images', upload.array('images', 10), async (req, res, next) => {
    try {
        const result = await roomBUS.addImages(req.params.id, req.files);
        const serialized = BaseDTO.serializeOne(result, RoomResponse.serialize);
        res.json({ success: true, data: serialized });
    } catch (error) { next(error); }
});

module.exports = router;
