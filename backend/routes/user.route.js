import express from 'express';
import upload from '../middlewares/multer.js';
import { createNewUserPost } from '../controllers/userSubmissionController.js';

const router = express.Router();

router.route('/create').post(upload.array('images', 10), createNewUserPost);

export default router;
