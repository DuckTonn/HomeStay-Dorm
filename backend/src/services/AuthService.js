const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountRepository = require('../repositories/AccountRepository');
const crypto = require('crypto');

const otpStore = new Map(); // In-memory store for OTPs { username: { otp, expiresAt } }

const JWT_SECRET = process.env.JWT_SECRET || 'homestay_dorm_super_secret_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

class AuthService {
    async login(username, password) {
        if (!username || !password) {
            const err = new Error('Username và password là bắt buộc');
            err.type = 'business';
            err.status = 400;
            throw err;
        }

        const account = await accountRepository.findByUsername(username);
        if (!account) {
            const err = new Error('Tên đăng nhập hoặc mật khẩu không đúng');
            err.type = 'business';
            err.status = 401;
            throw err;
        }

        const isPasswordValid = await bcrypt.compare(password, account.password_hash);
        if (!isPasswordValid) {
            const err = new Error('Tên đăng nhập hoặc mật khẩu không đúng');
            err.type = 'business';
            err.status = 401;
            throw err;
        }

        const payload = {
            account_id: account.account_id,
            username: account.username,
            role: account.role,
            employee_id: account.employee_id || null,
            tenant_id: account.tenant_id || null
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return {
            token,
            user: {
                account_id: account.account_id,
                username: account.username,
                role: account.role,
                employee: account.employee || null,
                tenant: account.tenant || null
            }
        };
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            const error = new Error('Token không hợp lệ hoặc đã hết hạn');
            error.type = 'unauthorized';
            error.status = 401;
            throw error;
        }
    }

    async getMe(accountId) {
        const account = await accountRepository.findByIdWithRelations(accountId);
        if (!account) {
            const err = new Error('Tài khoản không tồn tại');
            err.type = 'business';
            err.status = 404;
            throw err;
        }
        return account;
    }

    async register({ username, password, role, employeeId, tenantId }) {
        const SALT_ROUNDS = 10;
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        return accountRepository.createAccount({ username, passwordHash, role, employeeId, tenantId });
    }

    async registerCustomer({ username, password }) {
        // Automatically assign 'customer' role
        return this.register({ username, password, role: 'customer' });
    }

    async forgotPassword(username) {
        if (!username) {
            const err = new Error('Vui lòng nhập username');
            err.type = 'business';
            err.status = 400;
            throw err;
        }

        const account = await accountRepository.findByUsername(username);
        if (!account) {
            const err = new Error('Tài khoản không tồn tại');
            err.type = 'business';
            err.status = 404;
            throw err;
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

        otpStore.set(username, { otp, expiresAt });

        // Generate an email template string
        const emailTemplate = `
            <h2>Xin chào ${username},</h2>
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Mã OTP của bạn là: <strong>${otp}</strong></p>
            <p>Mã này sẽ hết hạn trong 15 phút.</p>
            <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
        `;

        // In a real app, send the email here.
        // For now, we will return the template in the response so the frontend can mock or display it.
        return {
            message: 'OTP đã được gửi (Mock)',
            otp, // Only returning this for demo/testing purposes
            emailTemplate
        };
    }

    async resetPassword(username, otp, newPassword) {
        if (!username || !otp || !newPassword) {
            const err = new Error('Thông tin không đầy đủ');
            err.type = 'business';
            err.status = 400;
            throw err;
        }

        const storeData = otpStore.get(username);
        if (!storeData) {
            const err = new Error('Không tìm thấy yêu cầu OTP hoặc OTP đã hết hạn');
            err.type = 'business';
            err.status = 400;
            throw err;
        }

        if (storeData.otp !== otp) {
            const err = new Error('Mã OTP không chính xác');
            err.type = 'business';
            err.status = 400;
            throw err;
        }

        if (Date.now() > storeData.expiresAt) {
            otpStore.delete(username);
            const err = new Error('Mã OTP đã hết hạn');
            err.type = 'business';
            err.status = 400;
            throw err;
        }

        // OTP is valid
        const SALT_ROUNDS = 10;
        const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await accountRepository.updatePassword(username, passwordHash);

        // Clear OTP
        otpStore.delete(username);

        return { message: 'Đổi mật khẩu thành công' };
    }
}

module.exports = new AuthService();
