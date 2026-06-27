import { getAllPosts, createNewPost, getTrendingStacks } from '../services/posts.service.js';
export const getPosts = async (req, res) => {
    try {
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;
        const userId = typeof req.query.user_id === 'string' ? req.query.user_id : undefined;
        const posts = await getAllPosts({ search, userId });
        res.status(200).json({
            data: posts,
            message: 'Posts retrieved successfully',
        });
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
export const createPost = async (req, res) => {
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
        const payload = { title, description, looking_for, stacks, image_url };
        const newPost = await createNewPost(payload, userId);
        res.status(201).json({
            data: newPost,
            message: 'Post created successfully',
        });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
export const getTrending = async (_req, res) => {
    try {
        const trending = await getTrendingStacks();
        res.status(200).json({
            data: trending,
            message: 'Trending stacks retrieved successfully',
        });
    }
    catch (error) {
        console.error('Error fetching trending stacks:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
//# sourceMappingURL=posts.controller.js.map