import { Request, Response } from "express";
import { prisma } from '../index.js'
import { validateAddProduct, validateUpdateProduct } from '../schemas/products.js'


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

export const handleUpdateProduct = async (req: Request, res: Response) => {
    try {
        // extract product id
        const productId = Number(req.params.id);

        // check if prod exists or not
        const productExists = await prisma.product.findUnique({
            where: {id: productId}
        })
        if(!productExists) {
            res.status(404).json({success: false, message: 'Product not found'});
            return;
        }

        // validate product data
        const result = validateUpdateProduct.safeParse(req.body);
        if(!result.success) {
            res.status(404).json({ success: false, error: result.error.issues[0].message  })
            return;
        }

        // update product
        const productData: any = result.data;
        if(productData.tags) {
            productData.tags = productData.tags.join(',');
        }

        const updatedProduct = await prisma.product.update({
            where: {id: productId},
            data: productData
        })

        res.status(200).json({message: 'Product updated.', updatedProduct});
    } catch(e) {
        console.error(e);
        res.status(500).json({error: e});
    }
}

export const handleDeleteProduct = async (req: Request, res: Response) => {
    try {
        // extract product id
        const productId = Number(req.params.id);

        // check if prod exists or not
        const productExists = await prisma.product.findUnique({
            where: {id: productId}
        })
        if(!productExists) {
            res.status(404).json({success: false, message: 'Product not found'});
            return;
        }

        // delete product
        const deletedProduct = await prisma.product.delete({
            where: {id: productId},
        })

        res.status(200).json({message: 'Product deleted.', deletedProduct});
    } catch(e) {
        console.error(e);
        res.status(500).json({error: e});
    }
}

export const handleListAllProduct = async (req: Request, res: Response) => {
    try {
        // find all product
        const fetchedProducts = await prisma.product.findMany({
            skip: Number(req.query.skip) || 0,
            take: 5
        })

        res.status(200).json({message: 'Product fetched successfully.', fetchedProducts});
    } catch(e) {
        console.error(e);
        res.status(500).json({error: e});
    }
}

export const handleGetProductById = async (req: Request, res: Response) => {
    try {
        // extract product id
        const productId = Number(req.params.id);

        // find product
        const fetchedProducts = await prisma.product.findUnique({
            where: {id: productId}
        })

        if(!fetchedProducts) {
            res.status(404).json({success: false, message: 'Product not found'});
            return;
        }

        res.status(200).json({message: 'Product fetched successfully.', fetchedProducts});
    } catch(e) {
        console.error(e);
        res.status(500).json({error: e});
    }
}

