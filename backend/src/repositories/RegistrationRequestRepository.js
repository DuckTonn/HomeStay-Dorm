const BaseRepository = require('./BaseRepository');

class RegistrationRequestRepository extends BaseRepository {
    constructor() {
        super('registration_request');
    }

    async findById(id) {
        return super.findById(id, 'registration_request_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'registration_request_id');
    }

    async delete(id) {
        return super.delete(id, 'registration_request_id');
    }

    async findByTenant(tenantId) {
        return this.findAll({ tenant_id: tenantId });
    }

    async findBySales(salesEmployeeId) {
        return this.findAll({ sales_employee_id: salesEmployeeId });
    }

    /**
     * Add a criterion to a registration request
     */
    async addCriteria(requestId, criteriaId, value) {
        const { data, error } = await this.db
            .from('registration_request_criteria')
            .insert({ registration_request_id: requestId, criteria_id: criteriaId, value: value })
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    /**
        * Get criteria for a registration request
     */
    async getCriteria(requestId) {
        const { data, error } = await this.db
            .from('registration_request_criteria')
            .select('*, rental_criteria(*)')
            .eq('registration_request_id', requestId);
        if (error) throw error;
        return data;
    }
}

module.exports = new RegistrationRequestRepository();
