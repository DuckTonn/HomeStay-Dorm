// ─── Branch DTOs ─────────────────────────────────────────────
const {
    CreateBranchDTO,
    UpdateBranchDTO,
    CreateRegulationDTO,
    UpdateRegulationDTO,
    CreateServiceDTO,
    UpdateServiceDTO
} = require('./BranchDTO');

// ─── Room DTOs ───────────────────────────────────────────────
const {
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO
} = require('./RoomDTO');

// ─── Employee DTOs ───────────────────────────────────────────
const {
    CreateEmployeeDTO,
    UpdateEmployeeDTO
} = require('./EmployeeDTO');

// ─── Registration DTOs ──────────────────────────────────────
const {
    TenantDTO,
    RegistrationRequestDTO,
    CreateRegistrationDTO,
    CreateAppointmentDTO,
    CreateCriteriaDTO
} = require('./RegistrationDTO');

// ─── Deposit DTOs ───────────────────────────────────────────
const {
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO
} = require('./DepositDTO');

// ─── Check-In DTOs ──────────────────────────────────────────
const {
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO
} = require('./CheckInDTO');

// ─── Check-Out DTOs ─────────────────────────────────────────
const {
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO
} = require('./CheckOutDTO');

// ─── Payment DTOs ───────────────────────────────────────────
const {
    CreatePaymentDTO,
    UpdatePaymentDTO
} = require('./PaymentDTO');

module.exports = {
    // Branch
    CreateBranchDTO,
    UpdateBranchDTO,
    CreateRegulationDTO,
    UpdateRegulationDTO,
    CreateServiceDTO,
    UpdateServiceDTO,

    // Room
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO,

    // Employee
    CreateEmployeeDTO,
    UpdateEmployeeDTO,

    // Registration
    TenantDTO,
    RegistrationRequestDTO,
    CreateRegistrationDTO,
    CreateAppointmentDTO,
    CreateCriteriaDTO,

    // Deposit
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO,

    // Check-In
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO,

    // Check-Out
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO,

    // Payment
    CreatePaymentDTO,
    UpdatePaymentDTO
};
