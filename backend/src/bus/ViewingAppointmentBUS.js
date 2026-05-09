const viewingAppointmentDAO = require('../dao/ViewingAppointmentDAO');
const roomDAO = require('../dao/RoomDAO');
const supabase = require('../config/supabase');
const { createBusinessError } = require('../middlewares/validator');

class ViewingAppointmentBUS {
    constructor() {
        this.db = supabase.getClient();
    }

    async createViewingAppointment(data) {
        const { tenant_id, room_id, appointment_time, appointment_type = 'Viewing' } = data;

        // Get room details
        const room = await roomDAO.findById(room_id);
        if (!room) throw createBusinessError('Room not found');

        // Assign a sale employee (pick the first one for simplicity)
        const { data: saleEmployees } = await this.db
            .from('employee')
            .select('employee_id')
            .eq('role', 'sale')
            .limit(1);
        
        const salesEmployeeId = saleEmployees && saleEmployees.length > 0 ? saleEmployees[0].employee_id : null;

        // Create viewing appointment directly linked to the room
        const appointment = await viewingAppointmentDAO.create({
            appointment_time: appointment_time,
            status: 'Pending Confirmation',
            confirmation_status: 'Unconfirmed',
            appointment_type: appointment_type,
            room_id: room_id,
            tenant_id: tenant_id,
            sales_employee_id: salesEmployeeId
        });

        return appointment;
    }

    async getUpcomingAppointments(filters = {}) {
        return viewingAppointmentDAO.findUpcoming(filters);
    }

    async confirmAppointment(id) {
        return viewingAppointmentDAO.update(id, {
            status: 'Confirmed',
            confirmation_status: 'Confirmed'
        });
    }

    async deleteAppointment(id) {
        return viewingAppointmentDAO.delete(id);
    }

    async updateAppointment(id, data) {
        const { appointment_time, room_id } = data;
        const updates = {};
        if (appointment_time) updates.appointment_time = appointment_time;
        if (room_id) updates.room_id = room_id;
        return viewingAppointmentDAO.update(id, updates);
    }
}

module.exports = new ViewingAppointmentBUS();
