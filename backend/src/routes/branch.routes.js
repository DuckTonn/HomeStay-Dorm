const express = require('express');
const router = express.Router();
const controller = require('../controllers/BranchController');


router.get('/', (req, res, next) => controller.getAllBranches(req, res, next));
router.get('/:id', (req, res, next) => controller.getBranchById(req, res, next));
router.post('/', (req, res, next) => controller.createBranch(req, res, next));
router.put('/:id', (req, res, next) => controller.updateBranch(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteBranch(req, res, next));


router.get('/regulation/all', (req, res, next) => controller.getAllRegulations(req, res, next));
router.post('/regulation', (req, res, next) => controller.createRegulation(req, res, next));
router.put('/regulation/:id', (req, res, next) => controller.updateRegulation(req, res, next));
router.delete('/regulation/:id', (req, res, next) => controller.deleteRegulation(req, res, next));


router.get('/service/all', (req, res, next) => controller.getAllServices(req, res, next));
router.post('/service', (req, res, next) => controller.createService(req, res, next));
router.put('/service/:id', (req, res, next) => controller.updateService(req, res, next));
router.delete('/service/:id', (req, res, next) => controller.deleteService(req, res, next));

module.exports = router;
