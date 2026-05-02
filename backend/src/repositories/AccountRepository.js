const BaseRepository = require('./BaseRepository');

class AccountRepository extends BaseRepository {
    constructor() {
        super('account');
    }

    async findByUsername(username) {
        const { data, error } = await this.db
            .from(this.tableName)
            .select(`
                *,
                employee:employee_id (employee_id, name, role, branch_id),
                tenant:tenant_id (tenant_id, name, email, phone)
            `)
            .eq('username', username)
            .eq('is_active', true)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // not found
            throw error;
        }
        return data;
    }

    async update(id, updates) {
        return super.update(id, updates, 'account_id');
    }

    async findByIdWithRelations(accountId) {
        const { data, error } = await this.db
            .from(this.tableName)
            .select(`
                account_id, username, role, is_active, created_at,
                employee:employee_id (employee_id, name, role, branch_id),
                tenant:tenant_id (tenant_id, name, email, phone, gender, nationality, cccd_number)
            `)
            .eq('account_id', accountId)
            .eq('is_active', true)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }
        return data;
    }

    async createAccount({ username, passwordHash, role, employeeId = null, tenantId = null }) {
        const { data, error } = await this.db
            .from(this.tableName)
            .insert({
                username,
                password_hash: passwordHash,
                role,
                employee_id: employeeId,
                tenant_id: tenantId
            })
            .select('account_id, username, role, is_active, created_at')
            .single();

        if (error) throw error;
        return data;
    }
    async updatePassword(username, newPasswordHash) {
        const { data, error } = await this.db
            .from(this.tableName)
            .update({ password_hash: newPasswordHash })
            .eq('username', username)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }
        return data;
    }
}

module.exports = new AccountRepository();
