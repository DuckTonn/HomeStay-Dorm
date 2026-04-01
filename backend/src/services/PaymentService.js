const paymentRepository = require('../repositories/PaymentRepository');

class PaymentService {
    async getAllPayment(filters = {}) {
        return paymentRepository.findAll(filters);
    }

    async getPaymentById(paymentId) {
        return paymentRepository.findById(paymentId);
    }

    async getByTenant(tenantId) {
        return paymentRepository.findByTenant(tenantId);
    }

    async getByDepositReceipt(depositReceiptId) {
        return paymentRepository.findByDepositReceipt(depositReceiptId);
    }

    async getByContract(contractId) {
        return paymentRepository.findByContract(contractId);
    }

    async createPayment(data) {
        return paymentRepository.create(data);
    }

    async updatePayment(paymentId, data) {
        return paymentRepository.update(paymentId, data);
    }

    /**
     * Confirm payment success
     */
    async confirmPayment(paymentId) {
        return paymentRepository.update(paymentId, {
            status: 'Paid'
        });
    }
}

module.exports = new PaymentService();
