import { z } from 'zod'


// Signup validation schema
export const validateSignup = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required").min(2, "Password must be at least 2 characters"),
});



// Add address schema
export const validateAddAddressSchema = z.object({
    address_line1: z.string().nonempty("address_line1 is required"),
    address_line2: z.string().nonempty("address_line2 is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    pincode: z.number({
      required_error: "Pincode is required",
      invalid_type_error: "Pincode must be a number",
    })
})



//   address_line1 String
//   address_line2 String
//   city          String
//   state         String
//   pincode       Int
//   ---userId        Int