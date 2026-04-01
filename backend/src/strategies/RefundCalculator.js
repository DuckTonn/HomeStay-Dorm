const DepositOnlyRefund = require('./DepositOnlyRefund');
const ShortTermRefund = require('./ShortTermRefund');
const LongTermRefund = require('./LongTermRefund');
const FullTermRefund = require('./FullTermRefund');


class RefundCalculator {
    constructor() {
        this.strategies = {
            deposit_only: new DepositOnlyRefund(),
            short_term: new ShortTermRefund(),
            long_term: new LongTermRefund(),
            full_term: new FullTermRefund()
        };
    }

    /**
     * Determine refund strategy based on contract dates.
     * @param {Object|null} contract
     * @param {Date} checkOutDate
     * @returns {string} strategy key
     */
    determineStrategy(contract, checkOutDate) {
        if (!contract) {
            return 'deposit_only';
        }

        const startDate = new Date(contract.start_date);
        const endDate = new Date(contract.end_date);
        const checkOut = new Date(checkOutDate);

        // Contract term ended
        if (checkOut >= endDate) {
            return 'full_term';
        }

        // Calculate months stayed
        const months = (checkOut.getFullYear() - startDate.getFullYear()) * 12
            + (checkOut.getMonth() - startDate.getMonth());

        return months >= 6 ? 'long_term' : 'short_term';
    }

    /**
     * Calculate refund.
     * @param {Object} params
     * @param {number} params.depositAmount
     * @param {Object|null} params.contract
     * @param {Date} params.checkOutDate
     * @param {Object} params.extraCosts
     * @returns {Object}
     */
    calculate({ depositAmount, contract, checkOutDate, extraCosts = {} }) {
        const strategyKey = this.determineStrategy(contract, checkOutDate);
        const strategy = this.strategies[strategyKey];

        const refundRate = strategy.calculateRefundRate({ contract, checkOutDate });
        const baseRefund = depositAmount * refundRate;

        const {
            unpaidRent = 0,
            unpaidUtilities = 0,
            repairCosts = 0,
            violationPenalty = 0
        } = extraCosts;

        const totalDeduction = unpaidRent + unpaidUtilities + repairCosts + violationPenalty;

        const net = baseRefund - totalDeduction;
        const refundAmount = Math.max(0, net);
        const additionalAmountDue = net < 0 ? Math.abs(net) : 0;

        return {
            strategyKey,
            strategyName: strategy.getName(),
            refundRate,
            depositAmount,
            baseRefund,
            deductions: {
                unpaidRent,
                unpaidUtilities,
                repairCosts,
                violationPenalty,
                totalDeduction
            },
            refundAmount,
            additionalAmountDue,
            shouldRefund: refundAmount > 0
        };
    }
}

module.exports = new RefundCalculator();
