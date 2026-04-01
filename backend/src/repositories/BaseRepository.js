const supabase = require('../config/supabase');

class BaseRepository {
    constructor(tableName) {
        this.tableName = tableName;
        this.db = supabase.getClient();
    }

    async findAll(filters = {}, select = '*') {
        let query = this.db.from(this.tableName).select(select);

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value);
            }
        });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async findById(id, idColumn = 'id', select = '*') {
        const { data, error } = await this.db
            .from(this.tableName)
            .select(select)
            .eq(idColumn, id)
            .single();
        if (error) throw error;
        return data;
    }

    async create(entity) {
        const { data, error } = await this.db
            .from(this.tableName)
            .insert(entity)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async createMany(entities) {
        const { data, error } = await this.db
            .from(this.tableName)
            .insert(entities)
            .select();
        if (error) throw error;
        return data;
    }

    async update(id, updates, idColumn = 'id') {
        const { data, error } = await this.db
            .from(this.tableName)
            .update(updates)
            .eq(idColumn, id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async delete(id, idColumn = 'id') {
        const { data, error } = await this.db
            .from(this.tableName)
            .delete()
            .eq(idColumn, id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async count(filters = {}) {
        let query = this.db.from(this.tableName).select('*', { count: 'exact', head: true });

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value);
            }
        });

        const { count, error } = await query;
        if (error) throw error;
        return count;
    }
}

module.exports = BaseRepository;
