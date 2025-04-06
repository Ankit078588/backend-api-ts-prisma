import express from "express";
const router = express.Router();


import authRoutes from './auth.routes.js';
import productRoutes from './products.routes.js'
router.use('/auth', authRoutes);
router.use('/products', productRoutes);



export default router;