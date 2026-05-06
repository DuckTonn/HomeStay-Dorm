/**
 * Domain Entity: Bed
 * Contains constants and pure business rule methods for beds.
 */
class Bed {
    static STATUSES = {
        EMPTY: 'Empty',
        RESERVED: 'Reserved',
        DEPOSITED: 'Deposited',
        OCCUPIED: 'Occupied'
    };

    /**
     * Check if a bed is available to be deposited (reserved).
     * @param {Object} bed
     * @returns {boolean}
     */
    static isAvailableForDeposit(bed) {
        return bed.status === Bed.STATUSES.EMPTY;
    }

    /**
     * Check if a bed is currently occupied by a tenant.
     * @param {Object} bed
     * @returns {boolean}
     */
    static isOccupied(bed) {
        return bed.status === Bed.STATUSES.OCCUPIED;
    }

    /**
     * Check if a bed is in an active (non-empty) state.
     * @param {Object} bed
     * @returns {boolean}
     */
    static isActive(bed) {
        return bed.status !== Bed.STATUSES.EMPTY;
    }

    /**
     * Calculate the monthly total price for a set of beds.
     * @param {Array<Object>} beds - Array of bed objects with price field
     * @returns {number}
     */
    static totalMonthlyPrice(beds) {
        return beds.reduce((sum, bed) => sum + Number(bed.price || 0), 0);
    }
}

module.exports = Bed;
