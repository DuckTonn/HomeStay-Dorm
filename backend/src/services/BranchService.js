const branchRepository = require('../repositories/BranchRepository');
const regulationRepository = require('../repositories/RegulationRepository');
const serviceRepository = require('../repositories/ServiceRepository');

class BranchService {
    async getAllBranches() {
        return branchRepository.findAll();
    }

    async getBranchById(branchId) {
        return branchRepository.findById(branchId);
    }

    async createBranch(data) {
        return branchRepository.create(data);
    }

    async updateBranch(branchId, data) {
        return branchRepository.update(branchId, data);
    }

    async deleteBranch(branchId) {
        return branchRepository.delete(branchId);
    }

    // --- Regulations ---
    async getBranchRegulations(branchId) {
        return regulationRepository.findByBranch(branchId);
    }

    async getAllRegulations() {
        return regulationRepository.findAll();
    }

    async createRegulation(data) {
        return regulationRepository.create(data);
    }

    async updateRegulation(regulationId, data) {
        return regulationRepository.update(regulationId, data);
    }

    async deleteRegulation(regulationId) {
        return regulationRepository.delete(regulationId);
    }

    // --- Services ---
    async getAllServices() {
        return serviceRepository.findAll();
    }

    async createService(data) {
        return serviceRepository.create(data);
    }

    async updateService(serviceId, data) {
        return serviceRepository.update(serviceId, data);
    }

    async deleteService(serviceId) {
        return serviceRepository.delete(serviceId);
    }
}

module.exports = new BranchService();
