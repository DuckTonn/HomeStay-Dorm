const RefundStrategy = require('./RefundStrategy');

class DepositOnlyRefund extends RefundStrategy {
    calculateRefundRate(context) {
        return 0.8;
    }

    getName() {
        return 'No contract signed - Refund 80%';
    }
}

module.exports = DepositOnlyRefund;
