import express, {Request, Response} from 'express';
import dotenv from 'dotenv'
dotenv.config();
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient({log: ['query']});


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))



import rootRoutes from './routes/index.js';
app.use('/api', rootRoutes);



app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}.`);
});