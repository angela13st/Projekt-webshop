import express from 'express';
import { dodajFavorit, ukloniFavorit, dohvatiFavorite } from '../controllers/favoritiController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/dodaj', authenticateJWT, dodajFavorit);
router.delete('/:proizvodId', authenticateJWT, ukloniFavorit);
router.get('/', authenticateJWT, dohvatiFavorite);

export default router;
