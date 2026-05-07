const tenantDAO = require('../dao/TenantDAO');
const tenantGroupDAO = require('../dao/TenantGroupDAO');
const registrationRequestDAO = require('../dao/RegistrationRequestDAO');
const viewingAppointmentDAO = require('../dao/ViewingAppointmentDAO');
const roomBUS = require('./RoomBUS');
const rentalCriteriaDAO = require('../dao/RentalCriteriaDAO');
const supabase = require('../config/supabase');
const { createBusinessError } = require('../middlewares/validator');


class RegistrationBUS {
    constructor() {
        this.db = supabase.getClient();
    }
    async createRegistration(data) {
        // Create or load tenant
        const inputTenant = data.tenant;
        if (!inputTenant) throw createBusinessError('Missing tenant payload');

        const tenant = inputTenant.tenant_id
            ? await tenantDAO.findById(inputTenant.tenant_id)
            : await tenantDAO.create(inputTenant);

        // Optional tenant group
        let tenantGroup = null;
        const group = data.tenant_group;
        if (group && group.quantity > 1) {
            tenantGroup = await tenantGroupDAO.create({
                quantity: group.quantity,
                representative_tenant_id: tenant.tenant_id
            });

            await tenantGroupDAO.addMember(tenantGroup.tenant_group_id, tenant.tenant_id);
        }

        // Create registration request
        const requestInput = data.request;
        if (!requestInput) throw createBusinessError('Missing request payload');

        const request = await registrationRequestDAO.create({
            gender_policy: requestInput.gender_policy,
            area: requestInput.area,
            room_type_id: requestInput.room_type_id,
            price_level: requestInput.price_level,
            expected_date: requestInput.expected_date,
            duration: requestInput.duration,
            rental_type: requestInput.rental_type,
            status: 'New',
            tenant_id: tenant.tenant_id,
            sales_employee_id: requestInput.sales_employee_id,
            number_of_people: requestInput.number_of_people || 1
        });

        // Link criteria
        if (data.criteria && data.criteria.length > 0) {
            for (const criterion of data.criteria) {
                await registrationRequestDAO.addCriteria(
                    request.registration_request_id,
                    criterion.criteria_id,
                    criterion.value
                );
            }
        }

        return { tenant, tenantGroup, request };
    }

    async checkAvailableRooms(requestId) {
        const request = await registrationRequestDAO.findById(requestId);
        if (!request) throw createBusinessError('Registration request not found');

        const availableRoomsResult = await roomBUS.getAllRooms({
            area: request.area,
            gender_policy: request.gender_policy,
            room_type_id: request.room_type_id,
            price_level: request.price_level
        });

        const availableRooms = availableRoomsResult.data;

        return {
            request,
            availableRooms,
            totalRooms: availableRooms.length
        };
    }

    async createAppointment(data) {
        const request = await registrationRequestDAO.findById(data.registration_request_id);
        if (!request) throw createBusinessError('Registration request not found');

        const appointment = await viewingAppointmentDAO.create({
            appointment_time: data.appointment_time,
            status: 'Pending Confirmation',
            confirmation_status: 'Unconfirmed',
            appointment_type: data.appointment_type || 'Viewing',
            registration_request_id: data.registration_request_id,
            sales_employee_id: data.sales_employee_id || request.sales_employee_id
        });

        await registrationRequestDAO.update(data.registration_request_id, { status: 'Appointment Scheduled' });

        return appointment;
    }

    async confirmAppointment(idAppointment) {
        return viewingAppointmentDAO.update(idAppointment, {
            status: 'Confirmed',
            confirmation_status: 'Confirmed'
        });
    }

    async getUpcomingAppointments(filters = {}) {
        return viewingAppointmentDAO.findUpcoming(filters);
    }

    async getAllCriteria(filters = {}) {
        return rentalCriteriaDAO.findAll(filters);
    }


    async createCriteria(data) {
        return rentalCriteriaDAO.create(data);
    }

    async getRequestById(requestId) {
        const request = await registrationRequestDAO.findById(requestId);
        if (!request) throw createBusinessError('Registration request not found');

        const criteria = await registrationRequestDAO.getCriteria(requestId);
        return { ...request, criteria };
    }

    async getAllRequests(filters = {}) {
        return registrationRequestDAO.findAll(filters);
    }
}

module.exports = new RegistrationBUS();
