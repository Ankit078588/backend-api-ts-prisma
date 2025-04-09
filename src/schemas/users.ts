import { z } from 'zod'


// Signup validation schema
export const validateSignup = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required").min(2, "Password must be at least 2 characters"),
});



// Add address schema
export const ValidateAddAddressSchema = z.object({
    address_line1: z.string().nonempty("address_line1 is required"),
    address_line2: z.string().nonempty("address_line2 is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    pincode: z.number({
      required_error: "Pincode is required",
      invalid_type_error: "Pincode must be a number",
    })
})



// name                     String
// -----email                    String    @unique
// -----password                 String
// -----role                     Role      @default(USER)
// -----createdAt                DateTime  @default(now())
// -----updatedAt                DateTime  @updatedAt
// -----address                  Address[]
// defaultShippingAddressId Int?
// defaultBillingAddressId  Int?


// Update User Schema
export const ValidatUpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddressId: z.number().optional(),
    defaultBillingAddressId: z.number().optional()
});