import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import proizvodRoutes from './routes/proizvodRoutes.js';
import proizvodacRoutes from './routes/proizvodacRoutes.js';
import korisnikRoutes from './routes/korisnikRoutes.js';
import favoritiRoutes from './routes/favoritiRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/proizvodi', proizvodRoutes);
app.use('/api/proizvodaci', proizvodacRoutes);
app.use('/api/korisnici', korisnikRoutes);
app.use('/api/favoriti', favoritiRoutes)

const PORT = process.env.PORT || 5000;



const MONGODB_URI = 'mongodb+srv://angelaplazibat:uDBDn9qwNvWD6CAG@cluster0.wc4kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Povezano na MongoDB Atlas');
  

  app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
  });
})
.catch((error) => {
  console.error('Greška prilikom povezivanja na MongoDB Atlas:', error.message);
});