const RefundStrategy = require('./RefundStrategy');

class FullTermRefund extends RefundStrategy {
    calculateRefundRate(context) {
        return 1.0;
    }

    getName() {
        return 'Contract ended - Refund 100%';
    }
}

module.exports = FullTermRefund;
