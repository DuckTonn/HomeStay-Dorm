const BaseRepository = require('./BaseRepository');

class ViewingAppointmentRepository extends BaseRepository {
    constructor() {
        super('viewing_appointment');
    }

    async findById(id) {
        return super.findById(id, 'appointment_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'appointment_id');
    }

    async delete(id) {
        return super.delete(id, 'appointment_id');
    }

    async findByRequestId(requestId) {
        return this.findAll({ registration_request_id: requestId });
    }

    async findBySaleEmployee(employeeId) {
        return this.findAll({ sales_employee_id: employeeId });
    }

    async findUpcoming(filters = {}) {
        const { page, limit } = filters;
        const pageNum = page ? Math.max(1, parseInt(page, 10)) : 1;
        const limitNum = limit ? Math.max(1, parseInt(limit, 10)) : 10;

        const from = (pageNum - 1) * limitNum;
        const to = from + limitNum - 1;

        const { data, count, error } = await this.db
            .from(this.tableName)
            .select('*', { count: 'exact' })
            .eq('status', 'Pending Confirmation')
            .gte('appointment_time', new Date().toISOString())
            .order('appointment_time', { ascending: true })
            .range(from, to);
        if (error) throw error;

        return {
            data,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalItems: count || 0,
                totalPages: Math.ceil((count || 0) / limitNum)
            }
        };
    }
}

module.exports = new ViewingAppointmentRepository();
