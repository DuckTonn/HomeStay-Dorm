const paymentDAO = require('../dao/PaymentDAO');

class PaymentBUS {
    async getAllPayment(filters = {}) {
        return paymentDAO.findAll(filters);
    }

    async getPaymentById(paymentId) {
        return paymentDAO.findById(paymentId);
    }

    async getByTenant(tenantId) {
        return paymentDAO.findByTenant(tenantId);
    }

    async getByDepositReceipt(depositReceiptId) {
        return paymentDAO.findByDepositReceipt(depositReceiptId);
    }

    async getByContract(contractId) {
        return paymentDAO.findByContract(contractId);
    }

    async createPayment(data) {
        return paymentDAO.create(data);
    }

    async updatePayment(paymentId, data) {
        return paymentDAO.update(paymentId, data);
    }

    /**
     * Confirm payment success
     */
    async confirmPayment(paymentId) {
        return paymentDAO.update(paymentId, {
            status: 'Paid'
        });
    }
}

module.exports = new PaymentBUS();
