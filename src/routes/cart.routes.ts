import express from 'express';
const router = express.Router();
import { verifyTokenMiddleware } from '../middlewares/jwt.js';


import { addItemToCart, deleteItemFromCart, changeQuantity, getCart } from '../controllers/cart.controller.js'
router.post('/', verifyTokenMiddleware, addItemToCart);
// router.patch('/:id', verifyTokenMiddleware, changeQuantity);
router.delete('/:productId', verifyTokenMiddleware, deleteItemFromCart);
router.get('/', verifyTokenMiddleware, getCart);






export default router;

