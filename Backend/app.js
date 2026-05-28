import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import candidateRoutes from './routes/candidateRoutes.js';
import jobConfigRoutes from './routes/jobConfigRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Register Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/job-config', jobConfigRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));