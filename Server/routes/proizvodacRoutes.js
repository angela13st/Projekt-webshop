import express from 'express';
import { createProizvodac, getProizvodaci, getProizvodacById, updateProizvodac, deleteProizvodac} from '../controllers/proizvodacController.js';
import { authenticateJWT, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticateJWT, adminMiddleware, createProizvodac);

router.get('/', getProizvodaci);
router.get('/:id', getProizvodacById);

router.put('/:id', authenticateJWT, adminMiddleware, updateProizvodac);

router.delete('/:id', authenticateJWT, adminMiddleware, deleteProizvodac);

export default router;

