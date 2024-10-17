import mongoose from 'mongoose';

const proizvodacSchema = new mongoose.Schema({
    naziv: {type:String, required: true },
    godinaOsnivanja: {type: Number, required: true },
    drzava: {type: String, required: true } ,
    opis: {type: String, required: true },
    url: {type: String, required: true },

});

const Proizvodac = mongoose.model('Proizvodac', proizvodacSchema);
export default Proizvodac;