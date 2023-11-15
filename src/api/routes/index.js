import express from 'express';
import { validateInput } from '../controllers/index.js';

const router = express.Router();

router.get('/validateInput', validateInput);

export default router;