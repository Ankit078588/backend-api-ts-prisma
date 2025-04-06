import express from 'express';
const router = express.Router();
import { verifyTokenMiddleware, verifyAdminMiddleware } from '../middlewares/jwt.js';


import { handleCreateProduct } from '../controllers/products.controller.js'
router.post('/addProduct', verifyTokenMiddleware, verifyAdminMiddleware, handleCreateProduct);







export default router;

