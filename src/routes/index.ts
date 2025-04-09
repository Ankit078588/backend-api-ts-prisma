import express from "express";
const router = express.Router();


import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js'
import userRoutes from './user.routes.js'
import cartRoutes from './cart.routes.js'
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/carts', cartRoutes);



export default router;