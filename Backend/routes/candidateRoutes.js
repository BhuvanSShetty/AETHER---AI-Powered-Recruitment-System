import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import {
    uploadResume,
    predictCandidate,
    getAllCandidates,
    getCandidateById,
    deleteCandidate,
    rateCandidate
} from '../controllers/candidateController.js';

const router = express.Router();

// Configure Multer to store file in memory for immediate parsing
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Apply 'auth' middleware to ALL routes here
router.post('/upload', auth, upload.single('resume'), uploadResume);
router.post('/:id/predict', auth, predictCandidate);

// Rate Candidate Route (Triggers Tuning when buffer is full)
router.post('/:id/rate', auth, rateCandidate);

router.get('/', auth, getAllCandidates);
router.get('/:id', auth, getCandidateById);
router.delete('/:id', auth, deleteCandidate);

export default router;