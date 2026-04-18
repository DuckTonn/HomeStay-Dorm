const BaseDTO = require('./BaseDTO');

class TenantDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'tenant_id', required: false, type: 'integer' },
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'phone', required: false, type: 'string', maxLength: 20 },
            { field: 'email', required: false, type: 'string', maxLength: 200 },
            { field: 'gender', required: false, type: 'string', enum: ['Male', 'Female'] },
            { field: 'nationality', required: false, type: 'string', maxLength: 100 }
        ]);
        Object.assign(this, data);
    }
}

class RegistrationRequestDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'gender_policy', required: true, type: 'string', enum: ['Male', 'Female', 'Mixed'] },
            { field: 'area', required: false, type: 'string', maxLength: 100 },
            { field: 'room_type_id', required: false, type: 'integer' },
            { field: 'price_level', required: false, type: 'number', min: 0 },
            { field: 'expected_date', required: true, type: 'date' },
            { field: 'duration', required: false, type: 'string', maxLength: 100 },
            { field: 'rental_type', required: true, type: 'string', enum: ['Whole Room', 'Shared Room'] },
            { field: 'sales_employee_id', required: true, type: 'integer' },
            { field: 'number_of_people', required: false, type: 'integer', min: 1 }
        ]);
        Object.assign(this, data);
    }
}

class CreateRegistrationDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'tenant', required: true, type: 'object' },
            { field: 'request', required: true, type: 'object' },
            { field: 'tenant_group', required: false, type: 'object' },
            { field: 'criteria', required: false, type: 'array' }
        ]);
        Object.assign(this, data);
    }

    validate() {
        const baseResult = super.validate();

        // Validate nested tenant
        if (this.tenant) {
            const tenantDTO = new TenantDTO(this.tenant);
            const tenantResult = tenantDTO.validate();
            if (!tenantResult.valid) {
                baseResult.valid = false;
                baseResult.errors.push(
                    ...tenantResult.errors.map(e => ({
                        ...e,
                        field: `tenant.${e.field}`
                    }))
                );
            }
        }

        // Validate nested request
        if (this.request) {
            const requestDTO = new RegistrationRequestDTO(this.request);
            const requestResult = requestDTO.validate();
            if (!requestResult.valid) {
                baseResult.valid = false;
                baseResult.errors.push(
                    ...requestResult.errors.map(e => ({
                        ...e,
                        field: `request.${e.field}`
                    }))
                );
            }
        }

        return baseResult;
    }
}

// ─── Viewing Appointment ────────────────────────────────────
class CreateAppointmentDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'registration_request_id', required: true, type: 'integer' },
            { field: 'appointment_time', required: true, type: 'date' },
            { field: 'appointment_type', required: false, type: 'string' }
        ]);
        Object.assign(this, data);
    }
}

// ─── Rental Criteria ────────────────────────────────────────
class CreateCriteriaDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            { field: 'name', required: true, type: 'string', maxLength: 200 }
        ]);
        this.name = data.name;
    }
}

module.exports = {
    TenantDTO,
    RegistrationRequestDTO,
    CreateRegistrationDTO,
    CreateAppointmentDTO,
    CreateCriteriaDTO
};
