import { Request, Response } from 'express';
import { prisma } from '../index.js';
import { addToCartSchema, deleteFromCartSchema } from '../schemas/carts.js'


export const addItemToCart = async (req: Request, res: Response) => {
    try {
        // 1. find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);

        // 2. validate user input
        const result = addToCartSchema.safeParse(req.body);
        if(!result.success) {
            res.status(404).json({success: false, error: result.error.issues[0].message});
            return;
        }
        const data = result.data;
        

        // 3. check if product exists OR not
        const product = await prisma.product.findUnique({
            where: {id: data.productId},
        })
        if(!product) {
            res.status(404).json({success: false, message: 'Product not found.'});
            return;
        }


        // 4. Check if product exist in user's cart
        const existingCartItem = await prisma.cartItems.findFirst({
            where: { 
                productId: data.productId,
                userId: userId
            }
        });


        // 5. Add to cart
        let updatedCartItem;
        if(existingCartItem){
            updatedCartItem = await prisma.cartItems.update({
                where: {
                    id: existingCartItem.id, 
                },
                data: {
                    quantity: existingCartItem.quantity + data.quantity
                }
            })
        } else {
            updatedCartItem = await prisma.cartItems.create({
                data: {
                    userId: userId,
                    productId: data.productId,
                    quantity: data.quantity
                }
            })
        }
        
        res.status(200).json({success: true, message: 'Product added to cart.', updatedCartItem});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}


export const deleteItemFromCart = async (req: Request, res: Response) => {
    try {
        // 1. find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);

        // 2. validate user input
        const productId = Number(req.params.productId)
        if(!productId) {
            res.status(404).json({success: false, message: 'productId is required.'})
            return;
        }

        // 3. check product exists is user's cart or not
        const cartItem = await prisma.cartItems.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        });
        if(!cartItem) {
            res.status(404).json({success: false, message: 'This product is not in your cart.'})
            return;
        }
        
        // 4. Delete product from user's cart
        const deletedItem = await prisma.cartItems.delete({
            where: {
                id: cartItem.id
            }
        })
        
        res.status(200).json({message: 'Product deleted from cart.', deletedItem});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}


export const changeQuantity = async (req: Request, res: Response) => {
    try {
        
        res.status(200).json({message: 'Address updated successfully.'});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}


export const getCart = async (req: Request, res: Response) => {
    try {
        // 1. find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);

        // 2. find cart items
        const cartItems = await prisma.user.findUnique({
            where: {id: userId},
            select: {cartItems: true}
        })
        
        res.status(200).json({message: 'CartItems fetched successfully.', cartItems});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}






