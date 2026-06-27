import { verifyGoogleIdToken } from '../services/auth.service.js';
export const loginWithIdToken = async (req, res) => {
    try {
        const { id_token } = req.body;
        if (!id_token) {
            res.status(400).json({ message: 'Missing id_token in request body' });
            return;
        }
        const result = await verifyGoogleIdToken(id_token);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Google login error:', error);
        res.status(401).json({ message: error.message || 'Authentication failed' });
    }
};
//# sourceMappingURL=auth.controller.js.map