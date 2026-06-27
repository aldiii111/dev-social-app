import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const verifyGoogleIdToken = async (idToken) => {
    const verifyOptions = {
        idToken,
    };
    if (process.env.GOOGLE_CLIENT_ID) {
        verifyOptions.audience = process.env.GOOGLE_CLIENT_ID;
    }
    const ticket = (await client.verifyIdToken(verifyOptions));
    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
        throw new Error('Invalid token payload');
    }
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || 'Anonymous Developer';
    const avatarUrl = payload.picture || null;
    // Cek apakah user sudah ada
    let user = await prisma.user.findUnique({
        where: { google_id: googleId },
    });
    let isNewUser = false;
    if (!user) {
        // Cek apakah email sudah terpakai
        const existingEmailUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingEmailUser) {
            // Hubungkan akun google ke email yang sudah ada
            user = await prisma.user.update({
                where: { email },
                data: { google_id: googleId },
            });
        }
        else {
            // Buat user baru
            user = await prisma.user.create({
                data: {
                    google_id: googleId,
                    email,
                    name,
                    avatar_url: avatarUrl,
                },
            });
            isNewUser = true;
        }
    }
    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });
    return {
        user,
        token,
        is_new_user: isNewUser,
    };
};
//# sourceMappingURL=auth.service.js.map