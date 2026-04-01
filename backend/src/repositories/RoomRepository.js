const BaseRepository = require('./BaseRepository');

class RoomRepository extends BaseRepository {
    constructor() {
        super('room');
    }

    async findById(id) {
        return super.findById(id, 'room_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'room_id');
    }

    async delete(id) {
        return super.delete(id, 'room_id');
    }

    async findAvailable(filters = {}) {
        const {
            area,
            gender_policy,
            room_type_id,
            branch_id,
            people_count,
            min_price,
            max_price,
            // Back-compat with existing code
            price_level,
            only_available = true
        } = filters;

        const effectiveMaxPrice = max_price ?? price_level;
        const hasBedPriceFilter =
            (min_price !== undefined && min_price !== null)
            || (effectiveMaxPrice !== undefined && effectiveMaxPrice !== null);

        const bedSelect = hasBedPriceFilter ? 'bed!inner(*)' : 'bed(*)';

        let query = this.db
            .from(this.tableName)
            .select(`*, room_type(*), branch(*), ${bedSelect}`);

        if (area) query = query.eq('area', area);
        if (gender_policy) query = query.eq('gender_policy', gender_policy);
        if (room_type_id) query = query.eq('room_type_id', room_type_id);
        if (branch_id !== undefined && branch_id !== null) query = query.eq('branch_id', branch_id);
        if (people_count !== undefined && people_count !== null) query = query.gte('available_beds', people_count);

        if (only_available) {
            query = query.gt('available_beds', 0);
        }

        if (hasBedPriceFilter) {
            // Only consider empty beds when filtering by price
            query = query.eq('bed.status', 'Empty');
            if (min_price !== undefined && min_price !== null) {
                query = query.gte('bed.price', min_price);
            }
            if (effectiveMaxPrice !== undefined && effectiveMaxPrice !== null) {
                query = query.lte('bed.price', effectiveMaxPrice);
            }
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async updateAvailableBedCount(roomId) {
        // Count empty beds in the room
        const { count, error: countError } = await this.db
            .from('bed')
            .select('*', { count: 'exact', head: true })
            .eq('room_id', roomId)
            .eq('status', 'Empty');

        if (countError) throw countError;

        return this.update(roomId, {
            available_beds: count,
            status: count > 0 ? 'Available' : 'Full'
        });
    }
}

module.exports = new RoomRepository();
