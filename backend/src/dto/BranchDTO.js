const BaseDTO = require('./BaseDTO');

class BranchDTO extends BaseDTO {
    constructor(data) {
        super(data, [
            // Branch fields
            { field: 'address', required: false, type: 'string', minLength: 1 },
            { field: 'phone_number', required: false, type: 'string' },
            { field: 'email', required: false, type: 'string' },
            
            // Regulation fields
            { field: 'description', required: false, type: 'string' },
            { field: 'category', required: false, type: 'string', maxLength: 100 },
            { field: 'branch_id', required: false, type: 'integer' },
            
            // Service fields
            { field: 'name', required: false, type: 'string', maxLength: 200 },
            { field: 'price', required: false, type: 'number', min: 0 }
        ]);
        Object.assign(this, data);
    }
}

module.exports = {
    BranchDTO
};
