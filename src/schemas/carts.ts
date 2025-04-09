import { z } from 'zod'


// Add to cart validation schema
export const addToCartSchema = z.object({
    productId: z.number({
        required_error: "ProductId is required",
        invalid_type_error: "Product Id must be a number",
    }),
    quantity: z.number({
        required_error: "Pincode is required",
        invalid_type_error: "Quantity must be a number",
      })
});




export const deleteFromCartSchema = z.object({
    productId: z.number({
        required_error: "Product Id is required",
        invalid_type_error: "Product Id must be a number",
      })
})
