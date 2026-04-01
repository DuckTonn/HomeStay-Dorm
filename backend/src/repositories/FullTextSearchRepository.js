const BaseRepository = require('./BaseRepository');

class FullTextSearchRepository extends BaseRepository {
    constructor() {
        super('full_text_search');
    }

    async searchRooms(params = {}) {
        const {
            keyword,
            branch_id,
            gender_policy,
            people_count,
            room_type_id,
            area,
            min_price,
            max_price,
            only_available = true,
            limit = 50,
            offset = 0
        } = params;

        const hasBedFilter =
            min_price !== undefined && min_price !== null
            || max_price !== undefined && max_price !== null;

        // If we filter by bed fields, use inner join to keep only matching rooms.
        const bedSelect = hasBedFilter
            ? 'bed!inner(bed_id,status,price)'
            : 'bed(bed_id,status,price)';

        let query = this.db
            .from('room')
            .select(`room_id, gender_policy, total_beds, available_beds, status, area, branch_id, room_type_id, branch(*), room_type(*), ${bedSelect}`);

        if (only_available) {
            query = query.gt('available_beds', 0);
        }

        if (branch_id !== undefined && branch_id !== null) {
            query = query.eq('branch_id', branch_id);
        }

        if (gender_policy) {
            query = query.eq('gender_policy', gender_policy);
        }

        if (room_type_id !== undefined && room_type_id !== null) {
            query = query.eq('room_type_id', room_type_id);
        }

        if (area) {
            query = query.eq('area', area);
        }

        if (people_count !== undefined && people_count !== null) {
            query = query.gte('available_beds', people_count);
        }

        // Simple keyword search (room-level). Cross-table keyword search would need a DB view.
        if (keyword) {
            query = query.ilike('area', `%${keyword}%`);
        }

        // Price filters apply to EMPTY beds only
        if (hasBedFilter) {
            query = query.eq('bed.status', 'Empty');
            if (min_price !== undefined && min_price !== null) {
                query = query.gte('bed.price', min_price);
            }
            if (max_price !== undefined && max_price !== null) {
                query = query.lte('bed.price', max_price);
            }
        }

        // Pagination
        if (offset !== undefined && offset !== null) {
            query = query.range(offset, offset + limit - 1);
        } else {
            query = query.limit(limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }
}

module.exports = new FullTextSearchRepository();