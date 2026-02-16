import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const otpCodes = pgTable("otp_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  phoneNumber: varchar("phone_number", { length: 15 }).notNull(),
  otpHash: text("otp_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
