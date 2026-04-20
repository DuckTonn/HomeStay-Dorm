const branchService = require('../services/BranchService');


class BranchController {
    // --- Branches ---
    async getAllBranches(req, res, next) {
        try {
            const data = await branchService.getAllBranches(req.query);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async getBranchById(req, res, next) {
        try {
            const data = await branchService.getBranchById(req.params.id);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async createBranch(req, res, next) {
        try {
            const data = await branchService.createBranch(req.body);
            res.status(201).json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async updateBranch(req, res, next) {
        try {
            const data = await branchService.updateBranch(req.params.id, req.body);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async deleteBranch(req, res, next) {
        try {
            const data = await branchService.deleteBranch(req.params.id);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    // --- Regulations ---
    async getAllRegulations(req, res, next) {
        try {
            const data = await branchService.getAllRegulations(req.query);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async createRegulation(req, res, next) {
        try {
            const data = await branchService.createRegulation(req.body);
            res.status(201).json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async updateRegulation(req, res, next) {
        try {
            const data = await branchService.updateRegulation(req.params.id, req.body);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async deleteRegulation(req, res, next) {
        try {
            const data = await branchService.deleteRegulation(req.params.id);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    // --- Services ---
    async getAllServices(req, res, next) {
        try {
            const data = await branchService.getAllServices(req.query);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async createService(req, res, next) {
        try {
            const data = await branchService.createService(req.body);
            res.status(201).json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async updateService(req, res, next) {
        try {
            const data = await branchService.updateService(req.params.id, req.body);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }

    async deleteService(req, res, next) {
        try {
            const data = await branchService.deleteService(req.params.id);
            res.json({ success: true, ...(data?.pagination ? { data: data.data, pagination: data.pagination } : { data }) });
        } catch (error) { next(error); }
    }
}

module.exports = new BranchController();
