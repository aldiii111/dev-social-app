import prisma from '../lib/prismaClient.js';
import { LookingFor } from '../../generated/prisma/index.js';

export interface CreatePostPayload {
  title: string;
  description: string;
  looking_for: LookingFor;
  stacks: string[];
  image_url?: string;
}

const mapToPrismaEnum = (val: string): LookingFor => {
  return (val === "UI/UX" ? "UI_UX" : val) as LookingFor;
}

const mapToClientEnum = (val: string): string => {
  return val === "UI_UX" ? "UI/UX" : val;
}

interface GetAllPostsFilters {
  search?: string;
  userId?: string;
}

export const getAllPosts = async ({ search, userId }: GetAllPostsFilters = {}) => {
  const where: Record<string, unknown> = {};

  if (userId) {
    where.user_id = userId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' as const } },
      { description: { contains: search, mode: 'insensitive' as const } },
      { stacks: { some: { stack_name: { contains: search, mode: 'insensitive' as const } } } },
    ];
  }

  const post = await prisma.post.findMany({
    where,
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
  return post.map(posts => ({
    ...posts,
    looking_for: mapToClientEnum(posts.looking_for) as LookingFor
  }))
};

export const createNewPost = async (payload: CreatePostPayload, userId: string) => {
  const { title, description, looking_for, stacks, image_url } = payload;

  const newPost = await prisma.post.create({
    data: {
      title,
      description,
      looking_for: mapToPrismaEnum(looking_for as unknown as string),
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
  return {
    ...newPost,
    looking_for: mapToClientEnum(newPost.looking_for) as LookingFor  
  }
};

export const getTrendingStacks = async (limit: number = 10) => {
  const trending = await prisma.postStack.groupBy({
    by: ['stack_name'],
    _count: { post_id: true },
    orderBy: { _count: { post_id: 'desc' } },
    take: limit,
  });

  return trending.map((item) => ({
    tag: item.stack_name,
    postCount: item._count.post_id,
  }));
};
