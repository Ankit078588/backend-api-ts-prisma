import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string;



interface payloadInterface {
    id: unknown;
    email: string;
    role: string;
}


// generateToken
export function generateToken(payload: payloadInterface): string{
    const token = jwt.sign(payload, JWT_SECRET,  { expiresIn: '24h' });
    return token;
}



// Verify Token Middleware
export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            res.status(401).json({error: 'Session expired. Please Login again.'}); 
            return;
        }

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, JWT_SECRET);
        
        req.headers['user'] = JSON.stringify(payload);
        next();
    } catch(e){
        console.error(e);
        res.status(401).json({message: 'Hioooo Session Expired. Please Login again.'});
    }
}



// verify Admin middleware
export const verifyAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = JSON.parse(req.headers.user as string);
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })

        if(user?.role === 'ADMIN') {
            next();
        } else{
            res.status(401).json({message: 'Unauthorized to access this resource.'});
        }
    } catch(e){
        console.error(e);
        res.status(401).json({message: 'Unauthorized to access this resource.'});
    }
}
