import prisma from '../lib/prismaClient.js';
export const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};
export const updateUserGithubUrl = async (id, githubUrl) => {
    return prisma.user.update({
        where: { id },
        data: {
            github_url: githubUrl,
        },
    });
};
//# sourceMappingURL=user.service.js.map