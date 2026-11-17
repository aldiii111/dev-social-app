import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized: Missing token' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
        const decoded = jwt.verify(token, jwtSecret);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar_url: true,
                github_url: true,
                created_at: true,
            },
        });
        if (!user) {
            res.status(401).json({ message: 'Unauthorized: User not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
//# sourceMappingURL=authMiddleware.js.map