import mongoose from 'mongoose';


const proizvodSchema=new mongoose.Schema({
    naziv: {type: String, required: true },
    kolicina: {type: Number, required: true },
    cijena: {type: Number, required: true },
    vrsta: {type: String, required: true },
    zemljaPorijekla: {type: String, required: true },
    priprema: {type: String, required: true },
    jacina: {type: String, required: true },
    opis: {type: String, required: true },
    slika: {type: String, required: true},
    proizvodac: {type: mongoose.Schema.Types.ObjectId, ref: 'Proizvodac', required: true }
    
});

const Proizvod = mongoose.models.Proizvod || mongoose.model('Proizvod', proizvodSchema);

export default Proizvod;