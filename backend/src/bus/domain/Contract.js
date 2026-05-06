/**
 * Domain Entity: Contract
 * Contains constants and pure business rule methods for rental contracts.
 */
class Contract {
    static RENTAL_TYPES = {
        WHOLE_ROOM: 'Whole Room',
        SHARED_ROOM: 'Shared Room'
    };

    static CONFIRMATION_STATUSES = {
        UNCONFIRMED: 'Unconfirmed',
        CONFIRMED: 'Confirmed',
        TERMINATED: 'Terminated'
    };

    /**
     * Check if a contract has been confirmed (signed).
     * @param {Object} contract
     * @returns {boolean}
     */
    static isConfirmed(contract) {
        return contract.confirmation_status === Contract.CONFIRMATION_STATUSES.CONFIRMED;
    }

    /**
     * Check if a contract has been terminated.
     * @param {Object} contract
     * @returns {boolean}
     */
    static isTerminated(contract) {
        return contract.confirmation_status === Contract.CONFIRMATION_STATUSES.TERMINATED;
    }

    /**
     * Check if a contract is still active (not terminated).
     * @param {Object} contract
     * @returns {boolean}
     */
    static isActive(contract) {
        return contract.confirmation_status !== Contract.CONFIRMATION_STATUSES.TERMINATED;
    }

    /**
     * Calculate the number of months a tenant has stayed.
     * @param {Object} contract - Contract with start_date
     * @param {Date} [asOfDate=new Date()] - Reference date for calculation
     * @returns {number} Months stayed (can be fractional, floored)
     */
    static monthsStayed(contract, asOfDate = new Date()) {
        const start = new Date(contract.start_date);
        const to = new Date(asOfDate);
        return (to.getFullYear() - start.getFullYear()) * 12
            + (to.getMonth() - start.getMonth());
    }

    /**
     * Check if the tenant has checked out after the contract end date.
     * @param {Object} contract - Contract with end_date
     * @param {Date} checkOutDate
     * @returns {boolean}
     */
    static isFullTerm(contract, checkOutDate) {
        return new Date(checkOutDate) >= new Date(contract.end_date);
    }

    /**
     * Calculate the total duration in months (start → end).
     * @param {Object} contract
     * @returns {number}
     */
    static totalDurationMonths(contract) {
        const start = new Date(contract.start_date);
        const end = new Date(contract.end_date);
        return (end.getFullYear() - start.getFullYear()) * 12
            + (end.getMonth() - start.getMonth());
    }
}

module.exports = Contract;
