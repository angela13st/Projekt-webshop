import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const korisnikSchema= new mongoose.Schema({
    username:{type: String, required: true },
    email:{type: String, required: true, unique: true , validate: [validator.isEmail, 'neispravan format email adrese'] },
    lozinka:{type: String, required: true },
    uloga:{type: String, enum: ['korisnik', 'admin'], default: 'korisnik'}
});


korisnikSchema.pre('save', async function(next) {
    if (!this.isModified('lozinka')) return next();

    const salt = await bcrypt.genSalt(10);
    this.lozinka = await bcrypt.hash(this.lozinka, salt);
    next();
});


korisnikSchema.methods.provjeriLozinku = async function(lozinka) {
    if (!lozinka) {
        throw new Error('Lozinka nije poslana za usporedbu.');
    }

    if (!this.lozinka) {
        throw new Error('Korisnik nema spremljenu lozinku.');
    }

    return await bcrypt.compare(lozinka, this.lozinka);
};


const Korisnik = mongoose.model('Korisnik', korisnikSchema);
export default Korisnik;