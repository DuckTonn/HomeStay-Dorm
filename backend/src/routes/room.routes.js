const express = require('express');
const router = express.Router();
const controller = require('../controllers/RoomController');
const { validateDTO } = require('../middlewares/validateDTO');
const upload = require('../middlewares/upload');
const {
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO
} = require('../dtos');


// Room types (static routes first)
router.get('/room-type/all', (req, res, next) => controller.getAllRoomTypes(req, res, next));
router.post('/room-type', validateDTO(CreateRoomTypeDTO), (req, res, next) => controller.createRoomType(req, res, next));
router.put('/room-type/:id', validateDTO(UpdateRoomTypeDTO), (req, res, next) => controller.updateRoomType(req, res, next));
router.delete('/room-type/:id', (req, res, next) => controller.deleteRoomType(req, res, next));


// Beds
router.get('/:roomId/bed', (req, res, next) => controller.getBedsByRoom(req, res, next));
router.get('/:roomId/available-bed', (req, res, next) => controller.getAvailableBedsByRoom(req, res, next));
router.post('/bed', validateDTO(CreateBedDTO), (req, res, next) => controller.createBed(req, res, next));
router.put('/bed/:id', validateDTO(UpdateBedDTO), (req, res, next) => controller.updateBed(req, res, next));
router.delete('/bed/:id', (req, res, next) => controller.deleteBed(req, res, next));


// Rooms
router.get('/', (req, res, next) => controller.getAllRooms(req, res, next));
router.get('/:id/tenants', (req, res, next) => controller.getRoomTenants(req, res, next));
router.delete('/:id/tenants/:tenantId', (req, res, next) => controller.removeTenantFromRoom(req, res, next));
router.get('/:id/similar', (req, res, next) => controller.getSimilarRooms(req, res, next));
router.get('/:id', (req, res, next) => controller.getRoomById(req, res, next));
router.post('/', validateDTO(CreateRoomDTO), (req, res, next) => controller.createRoom(req, res, next));
router.put('/:id', validateDTO(UpdateRoomDTO), (req, res, next) => controller.updateRoom(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteRoom(req, res, next));
router.post('/:id/images', upload.array('images', 10), (req, res, next) => controller.addRoomImages(req, res, next));

module.exports = router;
