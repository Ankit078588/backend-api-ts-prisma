import { z } from 'zod'


// Add product validation schema
export const validateAddProduct = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    tags: z.array(z.string()),
    price: z.number()
});


