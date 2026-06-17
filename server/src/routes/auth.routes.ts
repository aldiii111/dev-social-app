import { Router } from 'express';
import { loginWithIdToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/google/id-token', loginWithIdToken);

export default router;
