import { z } from 'zod'


// Add product validation schema
export const validateAddProduct = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    tags: z.array(z.string()),
    price: z.number()
});


// Update product validation schema
export const validateUpdateProduct = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    price: z.number().optional()
});

