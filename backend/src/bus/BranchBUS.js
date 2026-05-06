const branchDAO = require('../dao/BranchDAO');
const regulationDAO = require('../dao/RegulationDAO');
const serviceDAO = require('../dao/ServiceDAO');

class BranchBUS {
    async getAllBranches(filters = {}) {
        return branchDAO.findAll(filters);
    }

    async getBranchById(branchId) {
        return branchDAO.findById(branchId);
    }

    async createBranch(data) {
        return branchDAO.create(data);
    }

    async updateBranch(branchId, data) {
        return branchDAO.update(branchId, data);
    }

    async deleteBranch(branchId) {
        return branchDAO.delete(branchId);
    }

    // --- Regulations ---
    async getBranchRegulations(branchId) {
        return regulationDAO.findByBranch(branchId);
    }

    async getAllRegulations(filters = {}) {
        return regulationDAO.findAll(filters);
    }

    async createRegulation(data) {
        return regulationDAO.create(data);
    }

    async updateRegulation(regulationId, data) {
        return regulationDAO.update(regulationId, data);
    }

    async deleteRegulation(regulationId) {
        return regulationDAO.delete(regulationId);
    }

    // --- Services ---
    async getAllServices(filters = {}) {
        return serviceDAO.findAll(filters);
    }

    async createService(data) {
        return serviceDAO.create(data);
    }

    async updateService(serviceId, data) {
        return serviceDAO.update(serviceId, data);
    }

    async deleteService(serviceId) {
        return serviceDAO.delete(serviceId);
    }
}

module.exports = new BranchBUS();
