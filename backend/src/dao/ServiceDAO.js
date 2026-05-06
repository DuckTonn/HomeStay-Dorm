const BaseDAO = require('./BaseDAO');

class ServiceDAO extends BaseDAO {
    constructor() {
        super('service');
    }

    async findById(id) {
        return super.findById(id, 'service_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'service_id');
    }

    async delete(id) {
        return super.delete(id, 'service_id');
    }
}

module.exports = new ServiceDAO();
