import { registerUser, loginUser } from '../services/auth.service.js';
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
            return;
        }
        if (typeof password !== 'string' || password.length < 6) {
            res.status(400).json({ message: 'Password minimal 6 karakter' });
            return;
        }
        const result = await registerUser({ name, email, password });
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Register error:', error);
        const status = error.message === 'Email sudah terdaftar' ? 409 : 400;
        res.status(status).json({ message: error.message || 'Gagal mendaftarkan akun' });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email dan password wajib diisi' });
            return;
        }
        const result = await loginUser({ email, password });
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: error.message || 'Autentikasi gagal' });
    }
};
//# sourceMappingURL=auth.controller.js.map