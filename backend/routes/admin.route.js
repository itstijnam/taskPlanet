import express from 'express'
import { adminCreate, adminLogin, logout } from '../controllers/authController.js';
import { getAllUserPost } from '../controllers/userSubmissionController.js';

const router = express.Router();

router.route('/register').post(adminCreate);
router.route('/login').post(adminLogin)
router.route('/logout').get(logout)
router.route('/all-users').get(getAllUserPost)

export default router;