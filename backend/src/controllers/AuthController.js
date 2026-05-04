const authService = require('../services/AuthService');

class AuthController {
    /**
     * POST /api/auth/login
     * Body: { username, password }
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * GET /api/auth/me
     * Header: Authorization: Bearer <token>
     */
    async getMe(req, res, next) {
        try {
            const account = await authService.getMe(req.user.account_id);

            return res.status(200).json({
                success: true,
                data: account
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * PUT /api/auth/me
     * Header: Authorization: Bearer <token>
     * Body: { name, email, phone, gender, nationality, cccd_number, address }
     */
    async updateMe(req, res, next) {
        try {
            const account = await authService.updateProfile(req.user.account_id, req.body);
            return res.status(200).json({
                success: true,
                message: 'Cập nhật thông tin thành công',
                data: account
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * POST /api/auth/register
     * Chỉ admin được tạo tài khoản mới.
     * Body: { username, password, role, employee_id?, tenant_id? }
     */
    async register(req, res, next) {
        try {
            const { email, password, role, employee_id, tenant_id } = req.body;

            if (!email || !password || !role) {
                return res.status(400).json({
                    success: false,
                    message: 'email, password và role là bắt buộc'
                });
            }

            const validRoles = ['admin', 'employee', 'customer'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: `role phải là một trong: ${validRoles.join(', ')}`
                });
            }

            const newAccount = await authService.register({
                email,
                password,
                role,
                employeeId: employee_id || null,
                tenantId: tenant_id || null
            });

            return res.status(201).json({
                success: true,
                message: 'Tạo tài khoản thành công',
                data: newAccount
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * POST /api/auth/forgot-password
     * Body: { username }
     */
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const result = await authService.forgotPassword(email);

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * POST /api/auth/reset-password
     * Body: { username, otp, newPassword }
     */
    async resetPassword(req, res, next) {
        try {
            const { email, otp, newPassword } = req.body;
            const result = await authService.resetPassword(email, otp, newPassword);

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
