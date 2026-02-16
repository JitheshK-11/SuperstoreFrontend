import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { generalLimiter, otpLimiter } from "../middlewares/rate-limit.middleware.js";
import {
	sendOtpSchema,
	verifyOtpSchema,
	refreshSchema,
	logoutSchema
} from "../validations/auth.validation.js";

const router = Router();

router.post("/send-otp", otpLimiter, validateRequest(sendOtpSchema), authController.sendOtp);
router.post("/verify-otp", generalLimiter, validateRequest(verifyOtpSchema), authController.verifyOtp);
router.post("/refresh", generalLimiter, requireAuth, validateRequest(refreshSchema), authController.refresh);
router.post("/logout", generalLimiter, requireAuth, validateRequest(logoutSchema), authController.logout);
router.get("/users", requireAuth, requireAdmin, authController.getAllUsers);

export default router;
