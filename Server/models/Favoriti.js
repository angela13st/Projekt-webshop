import mongoose from 'mongoose';

const favoritiSchema = new mongoose.Schema({
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Korisnik',
    required: true
  },
  proizvodi: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proizvod'
    }
  ]
});

const Favoriti = mongoose.model('Favoriti', favoritiSchema);
export default Favoriti;
