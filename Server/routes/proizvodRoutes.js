import express from 'express';
import { createProizvod, getProizvodi, getProizvodById, updateProizvod, deleteProizvod} from '../controllers/proizvodController.js';
import { authenticateJWT, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticateJWT, adminMiddleware, createProizvod);

router.get('/', getProizvodi);
router.get('/:id', getProizvodById);

router.put('/:id', authenticateJWT, adminMiddleware, updateProizvod);

router.delete('/:id', authenticateJWT, adminMiddleware, deleteProizvod);

export default router;

