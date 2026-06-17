import { Router } from 'express';
import { getPosts, createPost } from '../controllers/posts.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);

export default router;
