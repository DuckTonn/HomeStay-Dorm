/**
 * Domain Entity: DepositReceipt
 * Contains constants and pure business rule methods for deposit receipts.
 */
class DepositReceipt {
    static STATUSES = {
        PENDING: 'Pending Payment',
        PAID: 'Paid',
        CANCELLED: 'Cancelled',
        REFUNDED: 'Refunded'
    };

    /** Number of months' rent used as deposit amount */
    static DEPOSIT_MONTHS = 2;

    /**
     * Check if a deposit receipt has been paid.
     * @param {Object} receipt
     * @returns {boolean}
     */
    static isPaid(receipt) {
        return receipt.status === DepositReceipt.STATUSES.PAID;
    }

    /**
     * Check if a deposit receipt is still awaiting payment.
     * @param {Object} receipt
     * @returns {boolean}
     */
    static isPending(receipt) {
        return receipt.status === DepositReceipt.STATUSES.PENDING;
    }

    /**
     * Check if the payment deadline has passed.
     * @param {Object} receipt - Deposit receipt with payment_deadline field
     * @returns {boolean}
     */
    static isExpired(receipt) {
        if (!receipt.payment_deadline) return false;
        return new Date() > new Date(receipt.payment_deadline);
    }

    /**
     * Calculate the total deposit amount from a list of beds.
     * Deposit = DEPOSIT_MONTHS × sum of all bed monthly prices.
     * @param {Array<Object>} beds - Beds with price field
     * @returns {number}
     */
    static calculateTotalDeposit(beds) {
        const totalMonthly = beds.reduce((sum, bed) => sum + Number(bed.price || 0), 0);
        return totalMonthly * DepositReceipt.DEPOSIT_MONTHS;
    }
}

module.exports = DepositReceipt;
