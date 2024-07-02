import express from 'express';
import { sendEmail, verifyAPIKey } from './emailController.js';
const router = express.Router();

router.post('/sendEmail', verifyAPIKey, sendEmail);


export default router;