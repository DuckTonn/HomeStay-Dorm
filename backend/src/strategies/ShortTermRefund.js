const RefundStrategy = require('./RefundStrategy');

class ShortTermRefund extends RefundStrategy {
    calculateRefundRate(context) {
        return 0.5;
    }

    getName() {
        return 'Stay under 6 months - Refund 50%';
    }
}

module.exports = ShortTermRefund;
