/**
 * Domain Entity: Room
 * Contains constants and pure business rule methods for rooms.
 */
class Room {
    static STATUSES = {
        AVAILABLE: 'Available',
        FULL: 'Full'
    };

    static GENDER_POLICIES = {
        MALE: 'Male',
        FEMALE: 'Female',
        MIXED: 'Mixed'
    };

    /**
     * Check if a person's gender is compatible with the room's gender policy.
     * @param {string} genderPolicy - Room's gender policy
     * @param {string} personGender - Person's gender ('Male' | 'Female')
     * @returns {boolean}
     */
    static isGenderCompatible(genderPolicy, personGender) {
        if (genderPolicy === Room.GENDER_POLICIES.MIXED) return true;
        if (!personGender) return true; // no gender specified, allow
        return genderPolicy === personGender;
    }

    /**
     * Check if the room has enough available beds for a group.
     * @param {Object} room - Room object with available_beds field
     * @param {number} requiredCount - Number of people needing beds
     * @returns {boolean}
     */
    static hasAvailableCapacity(room, requiredCount = 1) {
        return (room.available_beds || 0) >= requiredCount;
    }

    /**
     * Determine the correct status string based on available beds.
     * @param {number} availableBeds
     * @returns {string}
     */
    static resolveStatus(availableBeds) {
        return availableBeds > 0 ? Room.STATUSES.AVAILABLE : Room.STATUSES.FULL;
    }
}

module.exports = Room;
