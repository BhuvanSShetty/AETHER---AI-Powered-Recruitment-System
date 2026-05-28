import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import {
    createJobConfig,
    getActiveConfig,
    updateJobConfig
} from '../controllers/jobConfigController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Apply 'auth' middleware to all routes
router.post('/', auth, upload.array('benchmark_resumes', 12), createJobConfig);
router.get('/active', auth, getActiveConfig);

// Feature 3: Route to update weights/filters of the active config
router.put('/active', auth, updateJobConfig);

export default router;