import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js';
import { getUserById, updateUserGithubUrl } from '../services/user.service.js';

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const updateMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { github_url } = req.body;

    const updatedUser = await updateUserGithubUrl(userId, github_url || null);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
