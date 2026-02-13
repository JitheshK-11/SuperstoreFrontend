import { eq, desc } from "drizzle-orm";

import db from "../config/db.js";
import { users } from "../db/schema/users.js";
import { sessions } from "../db/schema/session.js";
import { otpCodes } from "../db/schema/otpCodes.js";

export const authRepository = {
	findUserByPhone: async (phoneNumber) => {
		const rows = await db
			.select()
			.from(users)
			.where(eq(users.phoneNumber, phoneNumber))
			.limit(1);

		return rows[0] ?? null;
	},

	createUser: async (payload) => {
		return db.insert(users).values(payload).returning();
	},

	findUserById: async (userId) => {
		const rows = await db
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.limit(1);

		return rows[0] ?? null;
	},

	getAllUsers: async () => {
		return db.select().from(users).orderBy(desc(users.createdAt));
	},

	

	saveOTP: async (phoneNumber, otpHash, { expireAt }) => {
		const rows = await db
			.insert(otpCodes)
			.values({ phoneNumber, otpHash, expiresAt: expireAt })
			.returning();

        return rows[0] ?? null;
            },

            getOTP: async (phoneNumber) => {
                const rows = await db
                    .select()
                    .from(otpCodes)
                    .where(eq(otpCodes.phoneNumber, phoneNumber))
                    .orderBy(desc(otpCodes.createdAt))
                    .limit(1);

                return rows[0] ?? null;
            },

            createSession: async (payload) => {
		const rows = await db.insert(sessions).values(payload).returning();

		return rows[0] ?? null;
			},

			findSessionByRefreshToken: async (refreshToken) => {
				const rows = await db
					.select()
					.from(sessions)
					.where(eq(sessions.refreshToken, refreshToken))
					.limit(1);

				return rows[0] ?? null;
			},

			updateSessionToken: async (sessionId, { refreshToken, expiresAt }) => {
				const rows = await db
					.update(sessions)
					.set({ refreshToken, expiresAt })
					.where(eq(sessions.id, sessionId))
					.returning();

				return rows[0] ?? null;
			},

			deleteSessionByRefreshToken: async (refreshToken) => {
				const rows = await db
					.delete(sessions)
					.where(eq(sessions.refreshToken, refreshToken))
					.returning();

				return rows[0] ?? null;
			}
};
