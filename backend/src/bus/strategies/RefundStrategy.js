class RefundStrategy {
    /**
     * Calculate refund rate.
     * @param {Object} context
     * @returns {number} refund rate (0 - 1)
     */
    calculateRefundRate(context) {
        throw new Error('calculateRefundRate must be implemented');
    }

    getName() {
        throw new Error('getName must be implemented');
    }
}

module.exports = RefundStrategy;
