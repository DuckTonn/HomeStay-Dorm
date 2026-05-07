const BaseDTO = require('./BaseDTO');

class RegistrationDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            // Tenant
            { field: 'tenant_id', required: false, type: 'integer' },
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'phone', required: false, type: 'string', maxLength: 20 },
            { field: 'email', required: false, type: 'string', maxLength: 200 },
            { field: 'gender', required: false, type: 'string', enum: ['Male', 'Female'] },
            { field: 'nationality', required: false, type: 'string', maxLength: 100 },
            
            // Registration Request
            { field: 'gender_policy', required: false, type: 'string', enum: ['Male', 'Female', 'Mixed'] },
            { field: 'area', required: false, type: 'string', maxLength: 100 },
            { field: 'room_type_id', required: false, type: 'integer' },
            { field: 'price_level', required: false, type: 'number', min: 0 },
            { field: 'expected_date', required: false, type: 'date' },
            { field: 'duration', required: false, type: 'string', maxLength: 100 },
            { field: 'rental_type', required: false, type: 'string', enum: ['Whole Room', 'Shared Room'] },
            { field: 'sales_employee_id', required: false, type: 'integer' },
            { field: 'number_of_people', required: false, type: 'integer', min: 1 },
            
            // Nested objects for create Registration (kept for backward compatibility with BUS logic if any)
            { field: 'tenant', required: false, type: 'object' },
            { field: 'request', required: false, type: 'object' },
            { field: 'tenant_group', required: false, type: 'object' },
            { field: 'criteria', required: false, type: 'array' },

            // Appointment
            { field: 'registration_request_id', required: false, type: 'integer' },
            { field: 'appointment_time', required: false, type: 'date' },
            { field: 'appointment_type', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    RegistrationDTO
};
