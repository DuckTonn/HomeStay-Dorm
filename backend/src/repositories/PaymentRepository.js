const BaseRepository = require('./BaseRepository');

class PaymentRepository extends BaseRepository {
    constructor() {
        super('payment');
    }

    async findById(id) {
        return super.findById(id, 'payment_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'payment_id');
    }

    async findByTenant(tenantId) {
        return this.findAll({ tenant_id: tenantId });
    }

    async findByDepositReceipt(depositReceiptId) {
        return this.findAll({ deposit_receipt_id: depositReceiptId });
    }

    async findByContract(contractId) {
        return this.findAll({ contract_id: contractId });
    }
}

module.exports = new PaymentRepository();
