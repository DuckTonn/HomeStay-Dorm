const BaseRepository = require('./BaseRepository');

class BranchRepository extends BaseRepository {
    constructor() {
        super('branch');
    }

    async findById(id) {
        return super.findById(id, 'branch_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'branch_id');
    }

    async delete(id) {
        return super.delete(id, 'branch_id');
    }
}

module.exports = new BranchRepository();
