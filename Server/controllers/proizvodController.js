import Proizvod from "../models/Proizvod.js";

export const createProizvod = async (req, res) => {
    try {
        const noviProizvod = new Proizvod(req.body);
        await noviProizvod.save();
        res.status(201).json(noviProizvod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProizvodi = async (req, res) => {
    try {
        const proizvodi = await Proizvod.find().populate('proizvodac');
        res.status(200).json(proizvodi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };


  export const getProizvodById = async (req, res) => {
    try {
        const proizvod = await Proizvod.findById(req.params.id).populate('proizvodac');
        if (!proizvod) return res.status(404).json({ message: 'Proizvod nije pronađen' });
        res.status(200).json(proizvod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };



  export const updateProizvod = async (req, res) => {
    try {
        const updatedProizvod = await Proizvod.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProizvod) return res.status(404).json({ message: 'Proizvod nije pronađen' });
        res.status(200).json(updatedProizvod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  export const deleteProizvod = async (req, res) => {
    try {
        const deletedProizvod = await Proizvod.findByIdAndDelete(req.params.id);
        if (!deletedProizvod) return res.status(404).json({ message: 'Proizvod nije pronađen' });
        res.status(200).json({ message: 'Proizvod je uspješno obrisan' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };