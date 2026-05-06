const BaseDAO = require('./BaseDAO');

class RecordDAO extends BaseDAO {
    constructor() {
        super('record');
    }

    async findById(id) {
        return super.findById(id, 'record_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'record_id');
    }

    async delete(id) {
        return super.delete(id, 'record_id');
    }

    async findByContract(contractId) {
        return this.findAll({ contract_id: contractId });
    }

    async findByType(type) {
        return this.findAll({ type });
    }
}

module.exports = new RecordDAO();
