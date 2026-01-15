import express from 'express';
import { getAllUsers, createUser, deleteUser } from '../controllers/admin.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/authToken.js';

const router = express.Router();

// Aplicar ambos middlewares a todas las rutas de este router
router.use(authenticateToken, requireAdmin);

// Rutas
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

export default router;