// ─── Branch DTOs ─────────────────────────────────────────────
const {
    CreateBranchDTO,
    UpdateBranchDTO,
    CreateRegulationDTO,
    UpdateRegulationDTO,
    CreateServiceDTO,
    UpdateServiceDTO,
    BranchResponse,
    RegulationResponse,
    ServiceResponse
} = require('./BranchDTO');

// ─── Room DTOs ───────────────────────────────────────────────
const {
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO,
    RoomResponse,
    BedResponse,
    RoomTypeResponse
} = require('./RoomDTO');

// ─── Employee DTOs ───────────────────────────────────────────
const {
    CreateEmployeeDTO,
    UpdateEmployeeDTO,
    EmployeeResponse
} = require('./EmployeeDTO');

// ─── Registration DTOs ──────────────────────────────────────
const {
    TenantDTO,
    RegistrationRequestDTO,
    CreateRegistrationDTO,
    CreateAppointmentDTO,
    CreateCriteriaDTO,
    RegistrationRequestResponse,
    AppointmentResponse
} = require('./RegistrationDTO');

// ─── Deposit DTOs ───────────────────────────────────────────
const {
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO,
    DepositReceiptResponse
} = require('./DepositDTO');

// ─── Check-In DTOs ──────────────────────────────────────────
const {
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO,
    ContractResponse
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
    UpdatePaymentDTO,
    PaymentResponse
} = require('./PaymentDTO');

module.exports = {
    // Branch
    CreateBranchDTO,
    UpdateBranchDTO,
    CreateRegulationDTO,
    UpdateRegulationDTO,
    CreateServiceDTO,
    UpdateServiceDTO,
    BranchResponse,
    RegulationResponse,
    ServiceResponse,

    // Room
    CreateRoomDTO,
    UpdateRoomDTO,
    CreateBedDTO,
    UpdateBedDTO,
    CreateRoomTypeDTO,
    UpdateRoomTypeDTO,
    RoomResponse,
    BedResponse,
    RoomTypeResponse,

    // Employee
    CreateEmployeeDTO,
    UpdateEmployeeDTO,
    EmployeeResponse,

    // Registration
    TenantDTO,
    RegistrationRequestDTO,
    CreateRegistrationDTO,
    CreateAppointmentDTO,
    CreateCriteriaDTO,
    RegistrationRequestResponse,
    AppointmentResponse,

    // Deposit
    CheckDepositAbilityDTO,
    CreateDepositReceiptDTO,
    CreateDepositPaymentDTO,
    ConfirmDepositPaymentDTO,
    DepositReceiptResponse,

    // Check-In
    CheckStayConditionsDTO,
    CreateContractDTO,
    SignContractDTO,
    CreateCheckInPaymentDTO,
    HandoverRoomDTO,
    ContractResponse,

    // Check-Out
    CalculateRefundDTO,
    ConfirmCheckOutDTO,
    CompleteCheckOutDTO,
    CheckOutWithoutContractDTO,

    // Payment
    CreatePaymentDTO,
    UpdatePaymentDTO,
    PaymentResponse
};
