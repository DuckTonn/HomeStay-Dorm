const BaseRepository = require('./BaseRepository');

class RegulationRepository extends BaseRepository {
    constructor() {
        super('regulation');
    }

    async findById(id) {
        return super.findById(id, 'regulation_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'regulation_id');
    }

    async delete(id) {
        return super.delete(id, 'regulation_id');
    }

    async findByBranch(branchId) {
        return this.findAll({ branch_id: branchId });
    }
}

module.exports = new RegulationRepository();
