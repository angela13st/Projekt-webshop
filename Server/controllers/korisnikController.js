import Korisnik from "../models/Korisnik.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const registracijaKorisnik = async (req, res) => {
    try{
        const { username, email, lozinka, uloga } = req.body;
        const noviKorisnik = new Korisnik ({username, email, lozinka, uloga });
        await noviKorisnik.save();
        const token = jwt.sign({id: noviKorisnik._id, uloga: noviKorisnik.uloga}, 'tajni_kljuc', {expiresIn: '1h'});
        res.status(201).json({token});
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const prijavaKorisnik = async (req, res) => {
    try {
      const { email, lozinka } = req.body;
  

      const korisnik = await Korisnik.findOne({ email });
      if (!korisnik) return res.status(404).json({ message: 'Korisnik nije pronađen' });
  

      const isMatch = await korisnik.provjeriLozinku(lozinka);
      if (!isMatch) return res.status(400).json({ message: 'Lozinka se ne podudara' });
  

      const token = jwt.sign(
        { id: korisnik._id, uloga: korisnik.uloga }, 
        'tajni_kljuc', 
        { expiresIn: '1h' }
      );
  

      res.status(200).json({
        token,
        korisnik: {
          id: korisnik._id,
          email: korisnik.email,
          uloga: korisnik.uloga,
          username: korisnik.username
        }
      });
    } catch (error) {
      console.error('Greška kod prijave korisnika:', error);
      res.status(500).json({ error: error.message });
    }
  };
  


export const dohvatiKorisnikPoId = async (req, res) => {
    try{
        const korisnik = await Korisnik.findById(req.params.id);
        if( !korisnik ) return res.status(404).json({ message: 'Korisnik nije pronaden' });
        res.status(200).json(korisnik);
    } catch(error){
        res.status(500).json({ error: error.message });
    }

};

export const dohvatiSveKorisnike = async (req, res) => {
  try {
    console.log("Pozvan dohvatiSveKorisnike, korisnik:", req.user);
    const korisnici = await Korisnik.find();
    if (!korisnici || korisnici.length === 0) {
      return res.status(404).json({ message: 'Nema pronađenih korisnika.' });
    }
    res.status(200).json(korisnici);
  } catch (error) {
    console.error('Greška prilikom dohvaćanja korisnika:', error);
    res.status(500).json({ error: error.message });
  }
};



export const azurirajKorisnika = async (req, res) => {
  const { username, email, lozinka, uloga } = req.body;
  
  try {
    const korisnik = await Korisnik.findById(req.params.id);
    
    if (!korisnik) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    korisnik.username = username || korisnik.username;
    korisnik.email = email || korisnik.email;
    korisnik.uloga = uloga || korisnik.uloga;


    if (lozinka) {
      const salt = await bcrypt.genSalt(10);
      korisnik.lozinka = await bcrypt.hash(lozinka, salt);
    }

    await korisnik.save();

    res.status(200).json({ message: 'Korisnički podaci su ažurirani.' });
  } catch (error) {
    console.error('Greška kod ažuriranja korisnika:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateKorisnik = async (req, res) => {

  const { username, email, uloga } = req.body;
  
  try {
    const korisnik = await Korisnik.findById(req.params.id);
    
    if (!korisnik) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    korisnik.username = username || korisnik.username;
    korisnik.email = email || korisnik.email;
    korisnik.uloga = uloga || korisnik.uloga;


    await korisnik.save();

    res.status(200).json({ message: 'Korisnički podaci su ažurirani.' });
  } catch (error) {
    console.error('Greška kod ažuriranja korisnika:', error);
    res.status(500).json({ error: error.message });
  }
  
};

export const deleteKorisnik = async (req, res) => {
  try {
    const korisnik = await Korisnik.findByIdAndDelete(req.params.id);

    if (!korisnik) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    res.status(200).json({ message: 'Korisnik uspješno obrisan.' });
  } catch (error) {
    console.error('Greška kod brisanja korisnika:', error.message);
    res.status(500).json({ error: error.message });
  }
};