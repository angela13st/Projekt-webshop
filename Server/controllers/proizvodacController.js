import Proizvodac from "../models/Proizvodac.js";
import Proizvod from "../models/Proizvod.js";

export const createProizvodac = async (req, res) => {
    try{
        const noviProizvodac = new Proizvodac(req.body);
        await noviProizvodac.save();
        res.status(201).json(noviProizvodac);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

export const getProizvodaci = async (req, res) => {
    try {
        const proizvodaci = await Proizvodac.find();
        res.status(200).json(proizvodaci);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

export const getProizvodacById = async (req, res) => {
    try {
        const proizvodac = await Proizvodac.findById(req.params.id);
        if (!proizvodac) return res.status(404).json({ message: 'Proizvodac nije pronaden' });
        res.status(200).json(proizvodac);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProizvodac = async (req, res) => {
    try {
        const updatedProizvodac = await Proizvodac.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!updatedProizvodac) return res.status(404).json({ message: 'Proizvodac nije pronaden'});
        res.status(200).json(updatedProizvodac);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProizvodac = async (req, res) => {
    try {
        const proizvodacId = req.params.id;
        const povezaniProizvodi = await Proizvod.find({ proizvodac: proizvodacId });

        if (povezaniProizvodi.length > 0) {
            return res.status(400).json({
                message: 'Ne možete obrisati proizvođača dok postoje proizvodi povezani s njim.'
            });
        }

        const deletedProizvodac = await Proizvodac.findByIdAndDelete(proizvodacId);

        if (!deletedProizvodac) {
            return res.status(404).json({ message: 'Proizvođač nije pronađen' });
        }

        res.status(200).json({ message: 'Proizvođač uspješno obrisan' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};