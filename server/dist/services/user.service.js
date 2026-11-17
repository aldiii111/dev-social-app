import prisma from '../lib/prismaClient.js';
const userSelect = {
    id: true,
    name: true,
    email: true,
    avatar_url: true,
    github_url: true,
    created_at: true,
};
export const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        select: userSelect,
    });
};
export const updateUserGithubUrl = async (id, githubUrl) => {
    return prisma.user.update({
        where: { id },
        data: {
            github_url: githubUrl,
        },
        select: userSelect,
    });
};
//# sourceMappingURL=user.service.js.map