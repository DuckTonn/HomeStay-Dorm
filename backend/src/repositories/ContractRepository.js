const BaseRepository = require('./BaseRepository');

class ContractRepository extends BaseRepository {
    constructor() {
        super('contract');
    }

    async findById(id) {
        return super.findById(id, 'contract_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'contract_id');
    }

    async delete(id) {
        return super.delete(id, 'contract_id');
    }

    async findByTenant(tenantId) {
        return this.findAll({ tenant_id: tenantId });
    }

    async findByRoom(roomId) {
        return this.findAll({ room_id: roomId });
    }

    async addBed(contractId, bedId) {
        const { data, error } = await this.db
            .from('contract_bed')
            .insert({ contract_id: contractId, bed_id: bedId })
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async addBedMany(contractId, bedIds) {
        const records = bedIds.map(bedId => ({ contract_id: contractId, bed_id: bedId }));
        const { data, error } = await this.db
            .from('contract_bed')
            .insert(records)
            .select();
        if (error) throw error;
        return data;
    }


    async addService(contractId, serviceId) {
        const { data, error } = await this.db
            .from('contract_service')
            .insert({ contract_id: contractId, service_id: serviceId })
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async addServiceMany(contractId, serviceIds) {
        const records = serviceIds.map(serviceId => ({ contract_id: contractId, service_id: serviceId }));
        const { data, error } = await this.db
            .from('contract_service')
            .insert(records)
            .select();
        if (error) throw error;
        return data;
    }

    async getBeds(contractId) {
        const { data, error } = await this.db
            .from('contract_bed')
            .select('*, bed(*)')
            .eq('contract_id', contractId);
        if (error) throw error;
        return data;
    }

    async getServices(contractId) {
        const { data, error } = await this.db
            .from('contract_service')
            .select('*, service(*)')
            .eq('contract_id', contractId);
        if (error) throw error;
        return data;
    }
}

module.exports = new ContractRepository();
