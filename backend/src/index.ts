import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import noteRoutes from './routes/notes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hd-notes')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});