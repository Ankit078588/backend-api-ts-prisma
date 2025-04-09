import express from 'express';
const router = express.Router();
import { verifyTokenMiddleware } from '../middlewares/jwt.js';


import { handleAddAddress, handleUpdateAddress, handleDeleteAddress, handleListAddress} from '../controllers/users.controller.js'
import { handleUpdateUser } from '../controllers/users.controller.js';
router.post('/address', verifyTokenMiddleware, handleAddAddress);
router.patch('/address/:id', verifyTokenMiddleware, handleUpdateAddress);
router.delete('/address/:addressId', verifyTokenMiddleware, handleDeleteAddress);
router.get('/address', verifyTokenMiddleware, handleListAddress);

router.patch('/', verifyTokenMiddleware, handleUpdateUser);



export default router;