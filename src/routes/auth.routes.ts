import express from "express";
const router = express.Router();
import { verifyTokenMiddleware } from '../middlewares/jwt.js'



import { handleSignupUser, handleLoginUser, handleMe } from '../controllers/auth.controller.js'
router.post('/signup', handleSignupUser);
router.post('/login', handleLoginUser);
router.get('/me', verifyTokenMiddleware, handleMe);








export default router;