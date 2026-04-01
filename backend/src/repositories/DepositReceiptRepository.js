const BaseRepository = require('./BaseRepository');

class DepositReceiptRepository extends BaseRepository {
    constructor() {
        super('deposit_receipt');
    }

    async findById(id) {
        return super.findById(id, 'deposit_receipt_id');
    }

    async update(id, updates) {
        return super.update(id, updates, 'deposit_receipt_id');
    }

    async delete(id) {
        return super.delete(id, 'deposit_receipt_id');
    }

    async findByTenant(tenantId) {
        return this.findAll({ tenant_id: tenantId });
    }

    /**
     * Add a bed to a deposit receipt
     */
    async addBed(receiptId, bedId) {
        const { data, error } = await this.db
            .from('deposit_receipt_bed')
            .insert({ deposit_receipt_id: receiptId, bed_id: bedId })
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    /**
        * Add multiple beds to a deposit receipt
     */
    async addBedMany(receiptId, bedIds) {
        const records = bedIds.map(bedId => ({ deposit_receipt_id: receiptId, bed_id: bedId }));
        const { data, error } = await this.db
            .from('deposit_receipt_bed')
            .insert(records)
            .select();
        if (error) throw error;
        return data;
    }

    /**
        * Get beds linked to a deposit receipt
     */
    async getBeds(receiptId) {
        const { data, error } = await this.db
            .from('deposit_receipt_bed')
            .select('*, bed(*)')
            .eq('deposit_receipt_id', receiptId);
        if (error) throw error;
        return data;
    }

    /**
        * Find deposit receipts past the payment deadline
     */
    async findExpired() {
        const { data, error } = await this.db
            .from(this.tableName)
            .select('*')
            .eq('status', 'Pending Payment')
            .lt('payment_deadline', new Date().toISOString());
        if (error) throw error;
        return data;
    }
}

module.exports = new DepositReceiptRepository();
