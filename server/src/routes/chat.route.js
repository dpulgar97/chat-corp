import { Router } from 'express';
import { authenticateToken } from '../middleware/authToken.js';
import { getChats } from '../controllers/chat.controller.js';

const router = Router();

router.get('/', authenticateToken, getChats);

export default router;