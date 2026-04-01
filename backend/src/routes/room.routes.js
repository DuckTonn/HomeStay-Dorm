const express = require('express');
const router = express.Router();
const controller = require('../controllers/RoomController');


// Room types (static routes first)
router.get('/room-type/all', (req, res, next) => controller.getAllRoomTypes(req, res, next));
router.post('/room-type', (req, res, next) => controller.createRoomType(req, res, next));
router.put('/room-type/:id', (req, res, next) => controller.updateRoomType(req, res, next));
router.delete('/room-type/:id', (req, res, next) => controller.deleteRoomType(req, res, next));


// Beds
router.get('/:roomId/bed', (req, res, next) => controller.getBedsByRoom(req, res, next));
router.get('/:roomId/available-bed', (req, res, next) => controller.getAvailableBedsByRoom(req, res, next));
router.post('/bed', (req, res, next) => controller.createBed(req, res, next));
router.put('/bed/:id', (req, res, next) => controller.updateBed(req, res, next));


// Rooms
router.get('/', (req, res, next) => controller.getAllRooms(req, res, next));
router.get('/:id', (req, res, next) => controller.getRoomById(req, res, next));
router.post('/', (req, res, next) => controller.createRoom(req, res, next));
router.put('/:id', (req, res, next) => controller.updateRoom(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteRoom(req, res, next));

module.exports = router;
