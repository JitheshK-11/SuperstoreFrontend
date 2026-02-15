import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  price: z.coerce
    .number()
    .int()
    .positive("Price must be a positive integer"),
  categoryId: z.string().uuid("CategoryId must be a valid UUID"),
});

export const productUpdateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  price: z.coerce
    .number()
    .int()
    .positive("Price must be a positive integer")
    .optional(),
  categoryId: z.string().uuid("CategoryId must be a valid UUID").optional(),
});

export const productIdParamSchema = z.object({
  id: z.string().uuid("Invalid product id"),
});
