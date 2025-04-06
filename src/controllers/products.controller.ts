import { Request, Response } from "express";
import { prisma } from '../index.js'
import { validateAddProduct } from '../schemas/products.js'


export const handleCreateProduct = async (req: Request, res: Response) => {
    try {
        // validate product data
        const result = validateAddProduct.safeParse(req.body);
        if(!result.success) {
            res.status(404).json({ success: false, error: result.error.issues[0].message });
            return;
        }

        // create product
        const { name, description, price, tags } = result.data;

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                tags: req.body.tags.join(',')
            }
        })

        res.status(200).json({message: 'Product added.', newProduct})
    } catch(e) {
        console.error(e);
        res.status(500).json({error: e});
    }
}