const contractDAO = require('../dao/ContractDAO');
const depositReceiptDAO = require('../dao/DepositReceiptDAO');
const bedDAO = require('../dao/BedDAO');
const roomDAO = require('../dao/RoomDAO');
const recordDAO = require('../dao/RecordDAO');
const paymentDAO = require('../dao/PaymentDAO');
const tenantDAO = require('../dao/TenantDAO');
const { createBusinessError } = require('../middlewares/validator');
const DepositReceipt = require('./domain/DepositReceipt');
const Contract = require('./domain/Contract');
const Room = require('./domain/Room');


class CheckInBUS {

    async checkDeposit(depositReceiptId) {
        const depositReceipt = await depositReceiptDAO.findById(depositReceiptId);
        if (!depositReceipt) throw createBusinessError('Deposit receipt not found');

        if (!DepositReceipt.isPaid(depositReceipt)) {
            throw createBusinessError('Deposit receipt is not paid or has been cancelled');
        }

        const depositBeds = await depositReceiptDAO.getBeds(depositReceiptId);
        const tenant = await tenantDAO.findById(depositReceipt.tenant_id);

        return {
            depositReceipt,
            tenant,
            depositBeds,
            bedCount: depositBeds.length
        };
    }

    /**
     * Step 2: Check stay conditions
     */
    async checkStayConditions(data) {
        const { deposit_receipt_id, members } = data;
        const { depositBeds } = await this.checkDeposit(deposit_receipt_id);

        const results = [];

        if (members && members.length > 0) {
            for (const member of members) {
                const conditions = { passed: true, reasons: [] };

                // Gender policy check (if room can be determined from deposit beds)
                if (depositBeds.length > 0 && depositBeds[0].bed?.room_id) {
                    const roomId = depositBeds[0].bed.room_id;
                    const room = await roomDAO.findById(roomId);
                    const memberGender = member.gender;
                    if (room && !Room.isGenderCompatible(room.gender_policy, memberGender)) {
                        conditions.passed = false;
                        conditions.reasons.push(`Gender does not match room policy (required: ${room.gender_policy})`);
                    }
                }

                results.push({
                    name: member.name,
                    ...conditions
                });
            }
        }

        // Check capacity
        const peopleCount = members ? members.length : 1;
        const bedCount = depositBeds.length;
        if (peopleCount > bedCount) {
            throw createBusinessError(`People count (${peopleCount}) exceeds deposited beds (${bedCount})`);
        }

        return {
            checkResults: results,
            allPassed: results.every(r => r.passed)
        };
    }

    /**
        * Step 3: Create rental contract
     */
    async createContract(data) {
        const {
            deposit_receipt_id,
            tenant_id,
            room_id,
            rental_type,
            start_date,
            end_date,
            employee_id,
            bed_ids,
            service_ids
        } = data;

        // Validate deposit receipt
        const depositReceipt = await depositReceiptDAO.findById(deposit_receipt_id);
        if (!depositReceipt || !DepositReceipt.isPaid(depositReceipt)) {
            throw createBusinessError('Invalid deposit receipt or not paid');
        }

        // Determine bed price (from first bed)
        let priceBed = 0;
        if (bed_ids && bed_ids.length > 0) {
            const bed = await bedDAO.findById(bed_ids[0]);
            priceBed = bed ? bed.price : 0;
        }

        // Create contract
        const contract = await contractDAO.create({
            created_at: new Date().toISOString(),
            bed_count: bed_ids ? bed_ids.length : 1,
            bed_price: priceBed,
            confirmation_status: 'Unconfirmed',
            rental_type,
            tenant_id,
            deposit_receipt_id,
            room_id,
            employee_id,
            start_date,
            end_date
        });

        // Link beds
        if (bed_ids && bed_ids.length > 0) {
            await contractDAO.addBedMany(contract.contract_id, bed_ids);
        }

        // Link services
        if (service_ids && service_ids.length > 0) {
            await contractDAO.addServiceMany(contract.contract_id, service_ids);
        }

        return contract;
    }

    /**
        * Step 4: Sign/confirm contract
     */
    async signContract(contractId, documentProof) {
        return contractDAO.update(contractId, {
            confirmation_status: 'Confirmed',
            document_proof: documentProof
        });
    }

    /**
        * Step 5: Create check-in payment (first period rent + fees)
     */
    async createCheckInPayment(data) {
        const { contract_id, amount, method, note, tenant_id } = data;

        return paymentDAO.create({
            note: note || `Check-in payment - Contract ${contract_id}`,
            amount,
            method,
            status: 'Pending Payment',
            tenant_id,
            contract_id
        });
    }

    /**
        * Step 6: Handover room/beds and create record
     */
    async handoverRoom(data) {
        const { contract_id, note } = data;

        const contract = await contractDAO.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        if (!Contract.isConfirmed(contract)) {
            throw createBusinessError('Contract is not confirmed');
        }

        // Update bed status to occupied
        const contractBeds = await contractDAO.getBeds(contract_id);
        const bedIds = contractBeds.map(x => x.bed_id);
        await bedDAO.updateStatusMany(bedIds, 'Occupied');

        // Update room availability
        if (contract.room_id) {
            await roomDAO.updateAvailableBedCount(contract.room_id);
        }

        // Create handover record
        const record = await recordDAO.create({
            created_at: new Date().toISOString(),
            note: note || 'Room/bed handover record',
            contract_id,
            type: 'Handover'
        });

        return { record, message: 'Room handover completed' };
    }

    /**
        * Get contract by ID
     */
    async getContractById(contractId) {
        const contract = await contractDAO.findById(contractId);
        if (!contract) throw createBusinessError('Contract not found');

        const bed = await contractDAO.getBeds(contractId);
        const service = await contractDAO.getServices(contractId);
        return { ...contract, bed, service };
    }

    /**
     * Get all contracts
     */
    async getAllContracts(filters = {}) {
        return contractDAO.findAll(filters);
    }
}

module.exports = new CheckInBUS();
