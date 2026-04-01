const BaseRepository = require('./BaseRepository');

class TenantGroupRepository extends BaseRepository {
    constructor() {
        super('tenant_group');
    }

    async findById(id) {
        return super.findById(id, 'tenant_group_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'tenant_group_id');
    }

    async delete(id) {
        return super.delete(id, 'tenant_group_id');
    }

    async addMember(groupId, tenantId) {
        const { data, error } = await this.db
            .from('tenant_group_member')
            .insert({ tenant_group_id: groupId, tenant_id: tenantId })
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async getMembers(groupId) {
        const { data, error } = await this.db
            .from('tenant_group_member')
            .select('*, tenant(*)')
            .eq('tenant_group_id', groupId);
        if (error) throw error;
        return data;
    }

    async removeMember(groupId, tenantId) {
        const { data, error } = await this.db
            .from('tenant_group_member')
            .delete()
            .eq('tenant_group_id', groupId)
            .eq('tenant_id', tenantId);
        if (error) throw error;
        return data;
    }
}

module.exports = new TenantGroupRepository();
