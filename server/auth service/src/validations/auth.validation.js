import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

export const sendOtpSchema = z.object({
	body: z.object({
		phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format")
	})
});

export const verifyOtpSchema = z.object({
	body: z.object({
		phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
		otp: z.string().regex(/^\d{4,8}$/, "Invalid OTP format"),
		fullName: z.string().min(2).max(100)
	})
});

export const refreshSchema = z.object({
	body: z.object({
		refreshToken: z.string().min(10)
	})
});

export const logoutSchema = z.object({
	body: z.object({
		refreshToken: z.string().min(10)
	})
});
