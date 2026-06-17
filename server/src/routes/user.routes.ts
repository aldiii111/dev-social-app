import { Router } from 'express';
import { getMe, updateMe } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateMe);

export default router;
