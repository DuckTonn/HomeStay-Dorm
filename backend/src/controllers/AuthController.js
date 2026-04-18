const authService = require('../services/AuthService');

class AuthController {
    /**
     * POST /api/auth/login
     * Body: { username, password }
     */
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);

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
     * POST /api/auth/register
     * Chỉ admin được tạo tài khoản mới.
     * Body: { username, password, role, employee_id?, tenant_id? }
     */
    async register(req, res, next) {
        try {
            const { username, password, role, employee_id, tenant_id } = req.body;

            if (!username || !password || !role) {
                return res.status(400).json({
                    success: false,
                    message: 'username, password và role là bắt buộc'
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
                username,
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
}

module.exports = new AuthController();
