import { pgTable, uuid, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./category.js";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
