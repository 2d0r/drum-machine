import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import patternRoutes from './routes/patterns';
import genrePatternRoutes from './routes/genre-patterns';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!, {
  autoIndex: true,
})
  .then(() => console.log("✅ Connected to local MongoDB"))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/patterns', patternRoutes);
app.use('/api/genre-patterns', genrePatternRoutes);

app.listen(4000, () => console.log("Server running on 4000"));