import { db } from "../config/db.js";
import { categories } from "../db/index.js";
import { eq } from "drizzle-orm";

const createCategory = async (data) => {
  return await db.insert(categories).values(data).returning();
};

const getAllCategories = async () => {
  return await db.select().from(categories);
};

const getCategoryById = async (id) => {
  return await db.select().from(categories).where(eq(categories.id, id));
};

const updateCategory = async (id, data) => {
  return await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
};

const deleteCategory = async (id) => {
  return await db.delete(categories).where(eq(categories.id, id));
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
