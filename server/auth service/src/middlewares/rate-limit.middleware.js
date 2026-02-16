import rateLimit from "express-rate-limit";

const createRateLimiter = ({ windowMs, max, message }) =>
	rateLimit({
		windowMs,
		max,
		standardHeaders: true,
		legacyHeaders: false,
		message
	});

export const generalLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: { error: "Too many requests, please try again later" }
});

export const otpLimiter = createRateLimiter({
	windowMs: 10 * 60 * 1000,
	max: 5,
	message: { error: "Too many OTP requests, please try again later" }
});


