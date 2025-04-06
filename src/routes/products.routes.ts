import express from 'express';
const router = express.Router();
import { verifyTokenMiddleware, verifyAdminMiddleware } from '../middlewares/jwt.js';


import { handleCreateProduct, handleUpdateProduct, handleDeleteProduct, handleListAllProduct, handleGetProductById } from '../controllers/products.controller.js'
router.post('/', verifyTokenMiddleware, verifyAdminMiddleware, handleCreateProduct);
router.patch('/:id', verifyTokenMiddleware, verifyAdminMiddleware, handleUpdateProduct);
router.delete('/:id', verifyTokenMiddleware, verifyAdminMiddleware, handleDeleteProduct);
router.get('/', verifyTokenMiddleware, verifyAdminMiddleware, handleListAllProduct);
router.get('/:id', verifyTokenMiddleware, verifyAdminMiddleware, handleGetProductById);






export default router;

