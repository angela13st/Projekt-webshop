import Favoriti from '../models/Favoriti.js';


export const dodajFavorit = async (req, res) => {
  try {
    const korisnikId = req.user.id;
    const { proizvodId } = req.body;

    let favoriti = await Favoriti.findOne({ korisnik: korisnikId });

    if (!favoriti) {
      favoriti = new Favoriti({ korisnik: korisnikId, proizvodi: [] });
    }

    if (favoriti.proizvodi.includes(proizvodId)) {
      return res.status(400).json({ message: 'Proizvod je već u favoritima.' });
    }

    favoriti.proizvodi.push(proizvodId);
    await favoriti.save();

    res.status(200).json({ message: 'Proizvod dodan u favorite.', favoriti });
  } catch (error) {
    console.error('Greška kod dodavanja u favorite:', error);
    res.status(500).json({ error: error.message });
  }
};


export const ukloniFavorit = async (req, res) => {
  try {
    const korisnikId = req.user.id;
    const { proizvodId } = req.params;

    let favoriti = await Favoriti.findOne({ korisnik: korisnikId });

    if (!favoriti) {
      return res.status(404).json({ message: 'Lista favorita nije pronađena.' });
    }

    favoriti.proizvodi = favoriti.proizvodi.filter(fav => fav.toString() !== proizvodId);
    await favoriti.save();

    res.status(200).json({ message: 'Proizvod uklonjen iz favorita.', favoriti });
  } catch (error) {
    console.error('Greška kod uklanjanja iz favorita:', error);
    res.status(500).json({ error: error.message });
  }
};


export const dohvatiFavorite = async (req, res) => {
  try {
    const korisnikId = req.user.id;
    const favoriti = await Favoriti.findOne({ korisnik: korisnikId }).populate('proizvodi');

    if (!favoriti) {
      return res.status(404).json({ message: 'Lista favorita nije pronađena.' });
    }

    res.status(200).json(favoriti.proizvodi);
  } catch (error) {
    console.error('Greška kod dohvaćanja liste favorita:', error);
    res.status(500).json({ error: error.message });
  }
};
