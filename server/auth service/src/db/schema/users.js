import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }).notNull().unique(),
  role: varchar("role", { length: 20 }).default("user"),
  createdAt: timestamp("created_at").defaultNow()
});
