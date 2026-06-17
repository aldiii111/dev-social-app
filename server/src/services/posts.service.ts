import prisma from '../lib/prismaClient.js';
import { LookingFor } from '../../generated/prisma/index.js';

export interface CreatePostPayload {
  title: string;
  description: string;
  looking_for: LookingFor;
  stacks: string[];
  image_url?: string;
}

export const getAllPosts = async () => {
  return prisma.post.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar_url: true,
          github_url: true,
          created_at: true,
        },
      },
      stacks: true,
    },
  });
};

export const createNewPost = async (payload: CreatePostPayload, userId: string) => {
  const { title, description, looking_for, stacks, image_url } = payload;

  return prisma.post.create({
    data: {
      title,
      description,
      looking_for,
      image_url: image_url || null,
      user_id: userId,
      stacks: {
        create: stacks.map((stack) => ({
          stack_name: stack,
        })),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar_url: true,
          github_url: true,
          created_at: true,
        },
      },
      stacks: true,
    },
  });
};
