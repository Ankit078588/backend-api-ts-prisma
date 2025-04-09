import { Request, Response } from 'express'
import { prisma } from '../index.js';
import { ValidateAddAddressSchema, ValidatUpdateUserSchema } from '../schemas/users.js'
import { Address } from '@prisma/client';



export const handleAddAddress = async (req: Request, res: Response) => {
    try {
        // 1. validate user inputs
        const result = ValidateAddAddressSchema.safeParse(req.body);
        if(!result.success) {
            res.status(200).json({ success: false, error: result.error.issues[0].message });
            return;
        }

        // 2. find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);

        // 3. save address
        const data = result.data;
        const newAddress = await prisma.address.create({
            data: {
                ...data,
                userId: userId
            }
        })

        res.status(200).json({message: 'Address added.', newAddress});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}

export const handleUpdateAddress = async (req: Request, res: Response) => {
    try {
        
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}

export const handleDeleteAddress = async (req: Request, res: Response) => {
    try {
        // find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);
        const addressId = Number(req.params.addressId);
        if(!addressId) {
            res.status(404).json({message: 'AddressId is missing.'});
            return;
        }

        // check if address exists OR not
        const addr = await prisma.address.findUnique({
            where: {id: addressId}
        })
        if(!addr) {
            res.status(404).json({success: false, message: 'Address not found.'})
            return;
        }

        // Delete address
        const deletedAddress = await prisma.address.delete({
            where: {id: addressId}
        })

        res.status(200).json({message: 'Address deleted.', deletedAddress});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}

export const handleListAddress = async (req: Request, res: Response) => {
    try {
        // find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);

        // find all addresses
        const address = await prisma.user.findUnique({
            where: {id: userId},
            select: {address: true}
        })

        res.status(200).json({message: 'Address fetched.', address});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
    try {
        // find userId - jwt payload
        const payload = JSON.parse(req.headers.user as string);
        const userId = Number(payload.id);

        // validate user i/p
        const result = ValidatUpdateUserSchema.safeParse(req.body);
        if(!result.success) {
            res.status(200).json({ success: false, error: result.error.issues[0].message });
            return;
        }

        // preparing data
        const data = result.data;

        // check defaultBillingAddress exists OR not
        if(data.defaultBillingAddressId) {
            const addressFound = await prisma.address.findUnique({
                where: {id: data.defaultBillingAddressId}
            });
            if(!addressFound || addressFound.userId !== userId) {
                res.status(404).json({success: false, message: 'Incorrect Billing Address Id.'});
                return;
            }
        }

        // find defaultShippingAddress exists OR not
        if(data.defaultShippingAddressId) {
            const addressFound = await prisma.address.findUnique({
                where: {id: data.defaultShippingAddressId}
            });
            if(!addressFound || addressFound.userId !== userId) {
                res.status(404).json({success: false, message: 'Incorrect Shipping Address Id.'});
                return;
            }
        }

        // update user
        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: data
        })

        res.status(200).json({message: 'Address updated successfully.', updatedUser});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
}



let data = {
    name: "ankit",
    defaultShippingAddressId: 3,
    defaultBillingAddressId: 4,
}


