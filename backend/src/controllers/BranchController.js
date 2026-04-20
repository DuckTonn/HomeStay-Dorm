const branchService = require('../services/BranchService');
const { BranchResponse, RegulationResponse, ServiceResponse } = require('../dtos/BranchDTO');
const BaseDTO = require('../dtos/BaseDTO');


class BranchController {
    // --- Branches ---
    async getAllBranches(req, res, next) {
        try {
            const result = await branchService.getAllBranches(req.query);
            const serialized = BaseDTO.serializeList(result, BranchResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async getBranchById(req, res, next) {
        try {
            const data = await branchService.getBranchById(req.params.id);
            res.json({ success: true, data: BranchResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async createBranch(req, res, next) {
        try {
            const data = await branchService.createBranch(req.body);
            res.status(201).json({ success: true, data: BranchResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async updateBranch(req, res, next) {
        try {
            const data = await branchService.updateBranch(req.params.id, req.body);
            res.json({ success: true, data: BranchResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteBranch(req, res, next) {
        try {
            const data = await branchService.deleteBranch(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // --- Regulations ---
    async getAllRegulations(req, res, next) {
        try {
            const result = await branchService.getAllRegulations(req.query);
            const serialized = BaseDTO.serializeList(result, RegulationResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async createRegulation(req, res, next) {
        try {
            const data = await branchService.createRegulation(req.body);
            res.status(201).json({ success: true, data: RegulationResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async updateRegulation(req, res, next) {
        try {
            const data = await branchService.updateRegulation(req.params.id, req.body);
            res.json({ success: true, data: RegulationResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteRegulation(req, res, next) {
        try {
            const data = await branchService.deleteRegulation(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    // --- Services ---
    async getAllServices(req, res, next) {
        try {
            const result = await branchService.getAllServices(req.query);
            const serialized = BaseDTO.serializeList(result, ServiceResponse.serialize);
            res.json({ success: true, ...serialized });
        } catch (error) { next(error); }
    }

    async createService(req, res, next) {
        try {
            const data = await branchService.createService(req.body);
            res.status(201).json({ success: true, data: ServiceResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async updateService(req, res, next) {
        try {
            const data = await branchService.updateService(req.params.id, req.body);
            res.json({ success: true, data: ServiceResponse.serialize(data) });
        } catch (error) { next(error); }
    }

    async deleteService(req, res, next) {
        try {
            const data = await branchService.deleteService(req.params.id);
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }
}

module.exports = new BranchController();
