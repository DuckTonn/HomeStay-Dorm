const contractRepository = require('../repositories/ContractRepository');
const depositReceiptRepository = require('../repositories/DepositReceiptRepository');
const bedRepository = require('../repositories/BedRepository');
const roomRepository = require('../repositories/RoomRepository');
const recordRepository = require('../repositories/RecordRepository');
const paymentRepository = require('../repositories/PaymentRepository');
const tenantRepository = require('../repositories/TenantRepository');
const { createBusinessError } = require('../middlewares/validator');


class CheckInService {

    async checkDeposit(depositReceiptId) {
        const depositReceipt = await depositReceiptRepository.findById(depositReceiptId);
        if (!depositReceipt) throw createBusinessError('Deposit receipt not found');

        if (depositReceipt.status !== 'Paid') {
            throw createBusinessError('Deposit receipt is not paid or has been cancelled');
        }

        const depositBeds = await depositReceiptRepository.getBeds(depositReceiptId);
        const tenant = await tenantRepository.findById(depositReceipt.tenant_id);

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
                    const room = await roomRepository.findById(roomId);
                    const memberGender = member.gender;
                    if (room && room.gender_policy !== 'Mixed' && memberGender && memberGender !== room.gender_policy) {
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
        const depositReceipt = await depositReceiptRepository.findById(deposit_receipt_id);
        if (!depositReceipt || depositReceipt.status !== 'Paid') {
            throw createBusinessError('Invalid deposit receipt or not paid');
        }

        // Determine bed price (from first bed)
        let priceBed = 0;
        if (bed_ids && bed_ids.length > 0) {
            const bed = await bedRepository.findById(bed_ids[0]);
            priceBed = bed ? bed.price : 0;
        }

        // Create contract
        const contract = await contractRepository.create({
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
            await contractRepository.addBedMany(contract.contract_id, bed_ids);
        }

        // Link services
        if (service_ids && service_ids.length > 0) {
            await contractRepository.addServiceMany(contract.contract_id, service_ids);
        }

        return contract;
    }

    /**
        * Step 4: Sign/confirm contract
     */
    async signContract(contractId, documentProof) {
        return contractRepository.update(contractId, {
            confirmation_status: 'Confirmed',
            document_proof: documentProof
        });
    }

    /**
        * Step 5: Create check-in payment (first period rent + fees)
     */
    async createCheckInPayment(data) {
        const { contract_id, amount, method, note, tenant_id } = data;

        return paymentRepository.create({
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

        const contract = await contractRepository.findById(contract_id);
        if (!contract) throw createBusinessError('Contract not found');

        if (contract.confirmation_status !== 'Confirmed') {
            throw createBusinessError('Contract is not confirmed');
        }

        // Update bed status to occupied
        const contractBeds = await contractRepository.getBeds(contract_id);
        const bedIds = contractBeds.map(x => x.bed_id);
        await bedRepository.updateStatusMany(bedIds, 'Occupied');

        // Update room availability
        if (contract.room_id) {
            await roomRepository.updateAvailableBedCount(contract.room_id);
        }

        // Create handover record
        const record = await recordRepository.create({
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
        const contract = await contractRepository.findById(contractId);
        if (!contract) throw createBusinessError('Contract not found');

        const bed = await contractRepository.getBeds(contractId);
        const service = await contractRepository.getServices(contractId);
        return { ...contract, bed, service };
    }

    /**
     * Get all contracts
     */
    async getAllContracts(filters = {}) {
        return contractRepository.findAll(filters);
    }
}

module.exports = new CheckInService();
