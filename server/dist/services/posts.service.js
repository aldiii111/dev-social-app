import prisma from '../lib/prismaClient.js';
import { LookingFor } from '../../generated/prisma/index.js';
const mapToPrismaEnum = (val) => {
    return (val === "UI/UX" ? "UI_UX" : val);
};
const mapToClientEnum = (val) => {
    return val === "UI_UX" ? "UI/UX" : val;
};
export const getAllPosts = async ({ search, userId } = {}) => {
    const where = {};
    if (userId) {
        where.user_id = userId;
    }
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { stacks: { some: { stack_name: { contains: search, mode: 'insensitive' } } } },
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
        looking_for: mapToClientEnum(posts.looking_for)
    }));
};
export const createNewPost = async (payload, userId) => {
    const { title, description, looking_for, stacks, image_url } = payload;
    const newPost = await prisma.post.create({
        data: {
            title,
            description,
            looking_for: mapToPrismaEnum(looking_for),
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
        looking_for: mapToClientEnum(newPost.looking_for)
    };
};
export const getTrendingStacks = async (limit = 10) => {
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
//# sourceMappingURL=posts.service.js.map