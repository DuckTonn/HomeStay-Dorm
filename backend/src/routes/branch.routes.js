const express = require('express');
const router = express.Router();
const controller = require('../controllers/BranchController');
const { validateDTO } = require('../middlewares/validateDTO');
const {
    CreateBranchDTO,
    UpdateBranchDTO,
    CreateRegulationDTO,
    UpdateRegulationDTO,
    CreateServiceDTO,
    UpdateServiceDTO
} = require('../dtos');


// Branches
router.get('/', (req, res, next) => controller.getAllBranches(req, res, next));
router.get('/:id', (req, res, next) => controller.getBranchById(req, res, next));
router.post('/', validateDTO(CreateBranchDTO), (req, res, next) => controller.createBranch(req, res, next));
router.put('/:id', validateDTO(UpdateBranchDTO), (req, res, next) => controller.updateBranch(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteBranch(req, res, next));


// Regulations
router.get('/regulation/all', (req, res, next) => controller.getAllRegulations(req, res, next));
router.post('/regulation', validateDTO(CreateRegulationDTO), (req, res, next) => controller.createRegulation(req, res, next));
router.put('/regulation/:id', validateDTO(UpdateRegulationDTO), (req, res, next) => controller.updateRegulation(req, res, next));
router.delete('/regulation/:id', (req, res, next) => controller.deleteRegulation(req, res, next));


// Services
router.get('/service/all', (req, res, next) => controller.getAllServices(req, res, next));
router.post('/service', validateDTO(CreateServiceDTO), (req, res, next) => controller.createService(req, res, next));
router.put('/service/:id', validateDTO(UpdateServiceDTO), (req, res, next) => controller.updateService(req, res, next));
router.delete('/service/:id', (req, res, next) => controller.deleteService(req, res, next));

module.exports = router;
