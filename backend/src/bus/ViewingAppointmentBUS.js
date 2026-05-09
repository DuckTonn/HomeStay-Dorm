const viewingAppointmentDAO = require('../dao/ViewingAppointmentDAO');
const roomDAO = require('../dao/RoomDAO');
const supabase = require('../config/supabase');
const { createBusinessError } = require('../middlewares/validator');

class ViewingAppointmentBUS {
    constructor() {
        this.db = supabase.getClient();
    }

    async createViewingAppointment(data) {
        const { tenant_id, room_id, appointment_time, number_of_people } = data;

        // ── Validate appointment_time ──────────────────────────────
        if (!appointment_time) throw createBusinessError('Vui lòng chọn ngày và giờ hẹn.');
        const apptDate = new Date(appointment_time);
        if (isNaN(apptDate.getTime())) throw createBusinessError('Ngày giờ hẹn không hợp lệ.');
        if (apptDate <= new Date()) throw createBusinessError('Thời gian hẹn phải là thời điểm trong tương lai.');

        // ── Validate number_of_people ──────────────────────────────
        const peopleCount = parseInt(number_of_people, 10);
        if (!number_of_people || isNaN(peopleCount) || peopleCount < 1)
            throw createBusinessError('Số giường phải là số nguyên lớn hơn 0.');

        // Get room details
        const room = await roomDAO.findById(room_id);
        if (!room) throw createBusinessError('Room not found.');
        if (peopleCount > room.available_beds)
            throw createBusinessError(`Phòng chỉ còn ${room.available_beds} giường trống, không đủ cho ${peopleCount} người.`);

        // Assign a sale employee (pick the first one for simplicity)
        const { data: saleEmployees } = await this.db
            .from('employee')
            .select('employee_id')
            .eq('role', 'sale')
            .limit(1);
        
        const assignedEmployeeId = saleEmployees && saleEmployees.length > 0 ? saleEmployees[0].employee_id : null;

        // Create viewing appointment directly linked to the room
        const appointment = await viewingAppointmentDAO.create({
            appointment_time: appointment_time,
            status: 'Pending Confirmation',
            confirmation_status: 'Unconfirmed',
            room_id: room_id,
            tenant_id: tenant_id,
            employee_id: assignedEmployeeId
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
