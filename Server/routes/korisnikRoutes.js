import express from 'express';
import {
  registracijaKorisnik,
  prijavaKorisnik,
  dohvatiKorisnikPoId,
  //azurirajKorisnika,
  dohvatiSveKorisnike,
  deleteKorisnik,
  updateKorisnik
} from '../controllers/korisnikController.js';
import { authenticateJWT, adminMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/registracija', registracijaKorisnik);
router.post('/prijava', prijavaKorisnik);

router.get('/dohvatisvekorisnike', authenticateJWT, adminMiddleware, dohvatiSveKorisnike);
router.get('/:id', authenticateJWT, adminMiddleware, dohvatiKorisnikPoId);

//router.put('/:id', authenticateJWT, adminMiddleware, azurirajKorisnika);

router.put('/:id', authenticateJWT, adminMiddleware, updateKorisnik);

router.delete('/:id', authenticateJWT, adminMiddleware, deleteKorisnik);



export default router;
