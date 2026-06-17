import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js';
import { getAllPosts, createNewPost } from '../services/posts.service.js';
import type { CreatePostPayload } from '../services/posts.service.js';

export const getPosts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();
    res.status(200).json({
      data: posts,
      message: 'Posts retrieved successfully',
    });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const createPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found' });
      return;
    }

    const { title, description, looking_for, stacks, image_url } = req.body;

    // Simple validation
    if (!title || !description || !looking_for || !Array.isArray(stacks)) {
      res.status(400).json({ message: 'Invalid payload: missing required fields' });
      return;
    }

    const payload: CreatePostPayload = { title, description, looking_for, stacks, image_url };
    const newPost = await createNewPost(payload, userId);

    res.status(201).json({
      data: newPost,
      message: 'Post created successfully',
    });
  } catch (error: any) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
