const RefundStrategy = require('./RefundStrategy');

class LongTermRefund extends RefundStrategy {
    calculateRefundRate(context) {
        return 0.7;
    }

    getName() {
        return 'Stay 6+ months - Refund 70%';
    }
}

module.exports = LongTermRefund;
