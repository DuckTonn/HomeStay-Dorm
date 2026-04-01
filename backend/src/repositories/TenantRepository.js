const BaseRepository = require('./BaseRepository');

class TenantRepository extends BaseRepository {
    constructor() {
        super('tenant');
    }

    async findById(id) {
        return super.findById(id, 'tenant_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'tenant_id');
    }

    async delete(id) {
        return super.delete(id, 'tenant_id');
    }

    async findByEmail(email) {
        const { data, error } = await this.db
            .from(this.tableName)
            .select('*')
            .eq('email', email)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }

    async findByPhone(phone) {
        const { data, error } = await this.db
            .from(this.tableName)
            .select('*')
            .eq('phone', phone)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }
}

module.exports = new TenantRepository();
