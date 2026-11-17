import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';
const userSelect = {
    id: true,
    name: true,
    email: true,
    avatar_url: true,
    github_url: true,
    created_at: true,
};
const signToken = (userId) => {
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
};
export const registerUser = async (payload) => {
    const email = payload.email.trim().toLowerCase();
    const name = payload.name.trim();
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error('Email sudah terdaftar');
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: userSelect,
    });
    const token = signToken(user.id);
    return { user, token };
};
export const loginUser = async (payload) => {
    const email = payload.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('Email atau password salah');
    }
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Email atau password salah');
    }
    const token = signToken(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
            github_url: user.github_url,
            created_at: user.created_at,
        },
        token,
    };
};
//# sourceMappingURL=auth.service.js.map