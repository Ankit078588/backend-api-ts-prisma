import { z } from 'zod'


// Signup validation schema
export const validateSignup = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required").min(2, "Password must be at least 2 characters"),
});