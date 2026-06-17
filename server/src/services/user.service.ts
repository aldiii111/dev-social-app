import prisma from '../lib/prismaClient.js';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUserGithubUrl = async (id: string, githubUrl: string | null) => {
  return prisma.user.update({
    where: { id },
    data: {
      github_url: githubUrl,
    },
  });
};
