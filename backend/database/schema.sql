-- ============================================================
-- HomeStay Dorm - Database Schema (English)
-- Run this file in Supabase SQL Editor
-- NOTE: This schema is not backward compatible with the old
-- Vietnamese/typo naming. Update backend code accordingly.
-- ============================================================

BEGIN;

-- ============================================================
-- Reset: drop all tables, then recreate
-- ============================================================
-- 1. Branch
CREATE TABLE branch (
    branch_id SERIAL PRIMARY KEY,
    address TEXT NOT NULL
);

-- 2. Regulation
CREATE TABLE regulation (
    regulation_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    category VARCHAR(100),
    branch_id INT REFERENCES branch(branch_id)
);

-- 3. Room type
CREATE TABLE room_type (
    room_type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 4. Service
CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(12,2) NOT NULL DEFAULT 0
);

-- 5. Room
CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    gender_policy VARCHAR(10) CHECK (gender_policy IN ('Male', 'Female', 'Mixed')),
    total_beds INT NOT NULL DEFAULT 0,
    available_beds INT NOT NULL DEFAULT 0,
    room_description TEXT DEFAULT '',
    status VARCHAR(50) DEFAULT 'Empty',
    area VARCHAR(100),
    room_number INT,
    room_type_id INT REFERENCES room_type(room_type_id),
    branch_id INT REFERENCES branch(branch_id),
    room_images TEXT[] DEFAULT '{}',
);

-- 6. Bed
CREATE TABLE bed (
    bed_id SERIAL PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'Empty',
    price DECIMAL(12,2) NOT NULL DEFAULT 0,
    room_id INT REFERENCES room(room_id)
);

-- 7. Employee (base)
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    salary DECIMAL(12,2) DEFAULT 0,
    role VARCHAR(20) CHECK (role IN ('sale', 'accountant', 'manager')),
    branch_id INT REFERENCES branch(branch_id)
);

-- 8. Sale employee
CREATE TABLE sale_employee (
    employee_id INT PRIMARY KEY REFERENCES employee(employee_id),
    target_quota DECIMAL(12,2) DEFAULT 0
);

-- 9. Accountant
CREATE TABLE accountant (
    employee_id INT PRIMARY KEY REFERENCES employee(employee_id)
);

-- 10. Manager
CREATE TABLE manager (
    employee_id INT PRIMARY KEY REFERENCES employee(employee_id),
    appointment_date DATE
);

-- 11. Tenant
CREATE TABLE tenant (
    tenant_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(10),
    cccd_number TEXT,
    nationality VARCHAR(100) DEFAULT 'Vietnam'
);

-- 12. Tenant group
CREATE TABLE tenant_group (
    tenant_group_id SERIAL PRIMARY KEY,
    quantity INT NOT NULL DEFAULT 1,
    representative_tenant_id INT REFERENCES tenant(tenant_id)
);

-- Junction: tenant belongs to tenant group
CREATE TABLE tenant_group_member (
    tenant_group_id INT REFERENCES tenant_group(tenant_group_id),
    tenant_id INT REFERENCES tenant(tenant_id),
    PRIMARY KEY (tenant_group_id, tenant_id)
);

-- 13. Rental criteria
CREATE TABLE rental_criteria (
    criteria_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

-- 14. Registration request
CREATE TABLE registration_request (
    registration_request_id SERIAL PRIMARY KEY,
    gender_policy VARCHAR(10),
    area VARCHAR(100),
    description TEXT,
    room_type_id INT REFERENCES room_type(room_type_id),
    price_level DECIMAL(12,2),
    expected_date DATE,
    duration VARCHAR(100),
    rental_type VARCHAR(50) CHECK (rental_type IN ('Whole Room', 'Shared Room')),
    status VARCHAR(50) DEFAULT 'New',
    tenant_id INT REFERENCES tenant(tenant_id),
    sales_employee_id INT REFERENCES employee(employee_id),
    number_of_people INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction: registration request - rental criteria
CREATE TABLE registration_request_criteria (
    registration_request_id INT REFERENCES registration_request(registration_request_id),
    criteria_id INT REFERENCES rental_criteria(criteria_id),
    value TEXT,
    PRIMARY KEY (registration_request_id, criteria_id)
);

-- 15. Viewing appointment
CREATE TABLE viewing_appointment (
    appointment_id SERIAL PRIMARY KEY,
    appointment_time TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending Confirmation',
    confirmation_status VARCHAR(50) DEFAULT 'Unconfirmed',
    appointment_type VARCHAR(50),
    registration_request_id INT REFERENCES registration_request(registration_request_id),
    room_id INT REFERENCES room(room_id),
    sales_employee_id INT REFERENCES employee(employee_id)
    room_id INT REFERENCES room(room_id),
);

-- 16. Deposit receipt
CREATE TABLE deposit_receipt (
    deposit_receipt_id SERIAL PRIMARY KEY,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Pending Payment',
    tenant_id INT REFERENCES tenant(tenant_id),
    sales_employee_id INT REFERENCES employee(employee_id),
    manager_id INT REFERENCES employee(employee_id),
    payment_deadline TIMESTAMPTZ,
    total_deposit DECIMAL(12,2) DEFAULT 0
);

-- Junction: deposit receipt - bed
CREATE TABLE deposit_receipt_bed (
    deposit_receipt_id INT REFERENCES deposit_receipt(deposit_receipt_id),
    bed_id INT REFERENCES bed(bed_id),
    PRIMARY KEY (deposit_receipt_id, bed_id)
);

-- 17. Contract
CREATE TABLE contract (
    contract_id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    bed_count INT NOT NULL DEFAULT 1,
    bed_price DECIMAL(12,2) NOT NULL DEFAULT 0,
    document_proof TEXT,
    confirmation_status VARCHAR(50) DEFAULT 'Unconfirmed',
    rental_type VARCHAR(50) CHECK (rental_type IN ('Whole Room', 'Shared Room')),
    tenant_id INT REFERENCES tenant(tenant_id),
    deposit_receipt_id INT REFERENCES deposit_receipt(deposit_receipt_id),
    room_id INT REFERENCES room(room_id),
    employee_id INT REFERENCES employee(employee_id),
    start_date DATE,
    end_date DATE
);

-- Junction: contract - bed
CREATE TABLE contract_bed (
    contract_id INT REFERENCES contract(contract_id),
    bed_id INT REFERENCES bed(bed_id),
    PRIMARY KEY (contract_id, bed_id)
);

-- Junction: contract - service
CREATE TABLE contract_service (
    contract_id INT REFERENCES contract(contract_id),
    service_id INT REFERENCES service(service_id),
    PRIMARY KEY (contract_id, service_id)
);

-- 18. Payment
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    note TEXT,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    method VARCHAR(50) CHECK (method IN ('Cash', 'Bank Transfer')),
    status VARCHAR(50) DEFAULT 'Pending Payment',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id INT REFERENCES tenant(tenant_id),
    deposit_receipt_id INT REFERENCES deposit_receipt(deposit_receipt_id),
    contract_id INT REFERENCES contract(contract_id)
);

-- 19. Record
CREATE TABLE record (
    record_id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    note TEXT,
    contract_id INT REFERENCES contract(contract_id),
    type VARCHAR(50) CHECK (type IN ('Handover', 'Check-out'))
);

-- 20. Refund receipt
CREATE TABLE refund_receipt (
    refund_receipt_id SERIAL PRIMARY KEY,
    type VARCHAR(100),
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    refund_amount DECIMAL(12,2) DEFAULT 0,
    deduction_amount DECIMAL(12,2) DEFAULT 0,
    additional_amount_due DECIMAL(12,2) DEFAULT 0,
    deposit_receipt_id INT REFERENCES deposit_receipt(deposit_receipt_id),
    contract_id INT REFERENCES contract(contract_id),
    accountant_id INT REFERENCES employee(employee_id),
    status VARCHAR(50) DEFAULT 'Pending'
);

-- 21. Account (Auth)
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    tenant_id INT REFERENCES tenant(tenant_id),
    employee_id INT REFERENCES employee(employee_id),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'employee', 'customer')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMIT;
