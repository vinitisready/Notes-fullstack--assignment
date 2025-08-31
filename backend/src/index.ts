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

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'HD Notes API Server',
    status: 'Running',
    endpoints: {
      auth: '/api/auth',
      notes: '/api/notes',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Connect to MongoDB (will work with local MongoDB if running, otherwise will show error but server will still start)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hd-notes')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.log('⚠️  MongoDB not connected (this is OK for demo):', error.message));

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend should run on http://localhost:3000`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});