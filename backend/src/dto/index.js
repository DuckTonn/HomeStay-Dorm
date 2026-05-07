// ─── Branch DTOs ─────────────────────────────────────────────
const { BranchDTO } = require('./BranchDTO');

// ─── Room DTOs ───────────────────────────────────────────────
const { RoomDTO } = require('./RoomDTO');

// ─── Employee DTOs ───────────────────────────────────────────
const { EmployeeDTO } = require('./EmployeeDTO');

// ─── Registration DTOs ──────────────────────────────────────
const { RegistrationDTO } = require('./RegistrationDTO');

// ─── Deposit DTOs ───────────────────────────────────────────
const { DepositDTO } = require('./DepositDTO');

// ─── Check-In DTOs ──────────────────────────────────────────
const { CheckInDTO } = require('./CheckInDTO');

// ─── Check-Out DTOs ─────────────────────────────────────────
const { CheckOutDTO } = require('./CheckOutDTO');

// ─── Payment DTOs ───────────────────────────────────────────
const { PaymentDTO } = require('./PaymentDTO');

module.exports = {
    BranchDTO,
    RoomDTO,
    EmployeeDTO,
    RegistrationDTO,
    DepositDTO,
    CheckInDTO,
    CheckOutDTO,
    PaymentDTO
};
