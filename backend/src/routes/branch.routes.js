const express = require('express');
const router = express.Router();
const branchBUS = require('../bus/BranchBUS');
const { validateDTO } = require('../middlewares/validateDTO');
const { BranchDTO, RegulationDTO, ServiceDTO } = require('../dto');


// Branches
router.get('/', async (req, res, next) => {
    try {
        const result = await branchBUS.getAllBranches(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
    try {
        const data = await branchBUS.getBranchById(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.post('/', validateDTO(BranchDTO), async (req, res, next) => {
    try {
        const data = await branchBUS.createBranch(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
});
router.put('/:id', validateDTO(BranchDTO), async (req, res, next) => {
    try {
        const data = await branchBUS.updateBranch(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const data = await branchBUS.deleteBranch(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});


// Regulations
router.get('/regulation/all', async (req, res, next) => {
    try {
        const result = await branchBUS.getAllRegulations(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.post('/regulation', validateDTO(RegulationDTO), async (req, res, next) => {
    try {
        const data = await branchBUS.createRegulation(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
});
router.put('/regulation/:id', validateDTO(RegulationDTO), async (req, res, next) => {
    try {
        const data = await branchBUS.updateRegulation(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.delete('/regulation/:id', async (req, res, next) => {
    try {
        const data = await branchBUS.deleteRegulation(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});


// Services
router.get('/service/all', async (req, res, next) => {
    try {
        const result = await branchBUS.getAllServices(req.query);
        res.json({ success: true, ...result });
    } catch (error) { next(error); }
});
router.post('/service', validateDTO(ServiceDTO), async (req, res, next) => {
    try {
        const data = await branchBUS.createService(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
});
router.put('/service/:id', validateDTO(ServiceDTO), async (req, res, next) => {
    try {
        const data = await branchBUS.updateService(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});
router.delete('/service/:id', async (req, res, next) => {
    try {
        const data = await branchBUS.deleteService(req.params.id);
        res.json({ success: true, data });
    } catch (error) { next(error); }
});

module.exports = router;
