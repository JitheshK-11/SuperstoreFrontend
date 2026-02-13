import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/refresh", requireAuth, authController.refresh);
router.post("/logout", requireAuth, authController.logout);
router.get("/users", requireAuth, requireAdmin, authController.getAllUsers);

export default router;
