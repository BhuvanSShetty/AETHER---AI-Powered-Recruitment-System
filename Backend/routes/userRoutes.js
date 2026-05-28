import express from 'express';
import { saveApiKey, resetJob, getTopCandidates } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Setup Key
router.post('/setup-key', auth, saveApiKey);

// Reset Job
router.delete('/reset-job', auth, resetJob);

// Leaderboard
router.get('/top-candidates', auth, getTopCandidates);

export default router;