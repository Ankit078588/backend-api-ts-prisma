import { Request, Response } from 'express';
import { prisma } from '../index.js'
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
import { validateSignup } from '../schemas/users.js';


export const handleSignupUser = async (req: Request, res: Response) => {
    try{
        // zod validation
        const result = validateSignup.safeParse(req.body);
        if(!result.success) {
            res.status(404).json({ success: false, error: result.error.issues[0].message });
            return;
        }

        // Extract input data
        const { name, email, password } = result.data;

        // check if user exists
        const user = await prisma.user.findUnique({
            where: {email: email}
        })
        if(user) { 
            res.status(404).json({ message: 'Email is already registered.'}) ;
            return;
        }

        // create new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashSync(password, 10)
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                createdAt: true,
                updatedAt: true
            }
        })

        res.status(404).json({ 
            message: 'User registered successfully.',
            user: newUser
        })
    }catch(e){
        console.error(e);
        res.status(500).json({error: e});
    }
}


export const handleLoginUser = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        // check if email exists
        const user = await prisma.user.findUnique({
            where: {email: email}
        })
        if(!user) { 
            res.status(404).json({ message: 'Incorrect email.'}) ;
            return;
        }

        // check password
        const response = compareSync(password, user.password);
        if(!response) {
            res.status(404).json({ message: 'Incorrect email.'}) ;
            return;
        }

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // create token
        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET);

        res.status(200).json({ 
            message: 'User loggedin successfully.',
            user,
            token
        })
    }catch(e){ 
        console.error(e);
        res.status(500).json({error: e});
    }
}


export const handleMe = async (req: Request, res: Response) => {
    try{
        const payload = JSON.parse(req.headers.user as string);

        const user = await prisma.user.findUnique({
            where: {id: payload.id}
        })
        
        res.status(200).json(user);
    }catch(e){ 
        console.error(e);
        res.status(500).json({error: e});
    }
}













