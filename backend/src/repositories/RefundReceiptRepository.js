const BaseRepository = require('./BaseRepository');

class RefundReceiptRepository extends BaseRepository {
    constructor() {
        super('refund_receipt');
    }

    async findById(id) {
        return super.findById(id, 'refund_receipt_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'refund_receipt_id');
    }

    async delete(id) {
        return super.delete(id, 'refund_receipt_id');
    }

    async findByDepositReceipt(depositReceiptId) {
        return this.findAll({ deposit_receipt_id: depositReceiptId });
    }

    async findByContract(contractId) {
        return this.findAll({ contract_id: contractId });
    }
}

module.exports = new RefundReceiptRepository();
