import { db } from "../config/db.js";
import { products } from "../db/index.js";
import { eq } from "drizzle-orm";

const createProduct = async (data) => {
  return await db.insert(products).values(data).returning();
};

const getAllProducts = async () => {
  return await db.select().from(products);
};

const getProductById = async (id) => {
  return await db.select().from(products).where(eq(products.id, id));
};

const updateProduct = async (id, data) => {
  return await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
};

const deleteProduct = async (id) => {
  return await db.delete(products).where(eq(products.id, id));
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
