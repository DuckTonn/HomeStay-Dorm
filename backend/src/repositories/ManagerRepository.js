const BaseRepository = require('./BaseRepository');

class ManagerRepository extends BaseRepository {
    constructor() {
        super('manager');
    }

    async findById(id) {
        return super.findById(id, 'employee_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'employee_id');
    }

    async delete(id) {
        return super.delete(id, 'employee_id');
    }
}

module.exports = new ManagerRepository();
