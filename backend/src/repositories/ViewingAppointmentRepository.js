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

    async findUpcoming() {
        const { data, error } = await this.db
            .from(this.tableName)
            .select('*')
            .eq('status', 'Pending Confirmation')
            .gte('appointment_time', new Date().toISOString())
            .order('appointment_time', { ascending: true });
        if (error) throw error;
        return data;
    }
}

module.exports = new ViewingAppointmentRepository();
