const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountRepository = require('../repositories/AccountRepository');

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
}

module.exports = new AuthService();
