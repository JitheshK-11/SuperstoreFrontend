import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export const categoryUpdateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
});

export const categoryIdParamSchema = z.object({
  id: z.string().uuid("Invalid category id"),
});
