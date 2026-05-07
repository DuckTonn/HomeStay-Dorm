// ─── Branch DTOs ─────────────────────────────────────────────
const { BranchDTO, RegulationDTO, ServiceDTO } = require('./BranchDTO');

// ─── Room DTOs ───────────────────────────────────────────────
const { RoomDTO, BedDTO, RoomTypeDTO } = require('./RoomDTO');

// ─── Employee DTOs ───────────────────────────────────────────
const { EmployeeDTO } = require('./EmployeeDTO');

// ─── Registration DTOs ──────────────────────────────────────
const { TenantDTO, RegistrationRequestDTO, RegistrationDTO, AppointmentDTO, CriteriaDTO } = require('./RegistrationDTO');

// ─── Deposit DTOs ───────────────────────────────────────────
const { CheckDepositAbilityDTO, DepositReceiptDTO, DepositPaymentDTO, ConfirmDepositPaymentDTO } = require('./DepositDTO');

// ─── Check-In DTOs ──────────────────────────────────────────
const { CheckStayConditionsDTO, ContractDTO, SignContractDTO, CheckInPaymentDTO, HandoverRoomDTO } = require('./CheckInDTO');

// ─── Check-Out DTOs ─────────────────────────────────────────
const { CalculateRefundDTO, ConfirmCheckOutDTO, CompleteCheckOutDTO, CheckOutWithoutContractDTO } = require('./CheckOutDTO');

// ─── Payment DTOs ───────────────────────────────────────────
const { PaymentDTO } = require('./PaymentDTO');

module.exports = {
    // Branch
    BranchDTO, RegulationDTO, ServiceDTO,

    // Room
    RoomDTO, BedDTO, RoomTypeDTO,

    // Employee
    EmployeeDTO,

    // Registration
    TenantDTO, RegistrationRequestDTO, RegistrationDTO, AppointmentDTO, CriteriaDTO,

    // Deposit
    CheckDepositAbilityDTO, DepositReceiptDTO, DepositPaymentDTO, ConfirmDepositPaymentDTO,

    // Check-In
    CheckStayConditionsDTO, ContractDTO, SignContractDTO, CheckInPaymentDTO, HandoverRoomDTO,

    // Check-Out
    CalculateRefundDTO, ConfirmCheckOutDTO, CompleteCheckOutDTO, CheckOutWithoutContractDTO,

    // Payment
    PaymentDTO
};
