import prisma from '../lib/prismaClient.js';

const userSelect = {
  id: true,
  name: true,
  email: true,
  avatar_url: true,
  github_url: true,
  created_at: true,
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
};

export const updateUserGithubUrl = async (id: string, githubUrl: string | null) => {
  return prisma.user.update({
    where: { id },
    data: {
      github_url: githubUrl,
    },
    select: userSelect,
  });
};
