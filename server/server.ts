import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import patternRoutes from './routes/patterns.ts';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/patterns', patternRoutes);

app.listen(4000, () => console.log("Server running on 4000"));