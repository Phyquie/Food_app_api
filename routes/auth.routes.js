
import express from 'express';
import { getMe, signup,login , logout ,ressignup , reslogin , resgetMe,verifyOtp} from '../controller/auth.controller.js';
import {protectRoute} from '../middleware/protectRoute.js';
import {protectRoute2} from '../middleware/protectRoute2.js';

const router = express.Router();

router.get('/me',protectRoute, getMe);
router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/logout', logout);
 router.get('/res/me',protectRoute2, resgetMe);
 router.post('/res/signup', ressignup);
router.post('/res/login', reslogin);
router.post('/res/logout', logout);



export default router;