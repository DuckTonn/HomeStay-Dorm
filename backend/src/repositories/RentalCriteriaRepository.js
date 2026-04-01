const BaseRepository = require('./BaseRepository');

class RentalCriteriaRepository extends BaseRepository {
    constructor() {
        super('rental_criteria');
    }

    async findById(id) {
        return super.findById(id, 'criteria_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'criteria_id');
    }

    async delete(id) {
        return super.delete(id, 'criteria_id');
    }
}

module.exports = new RentalCriteriaRepository();
