import { Router } from 'express';
import { getPosts, createPost, getTrending } from '../controllers/posts.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();
router.get('/trending', getTrending);
router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
export default router;
//# sourceMappingURL=posts.routes.js.map