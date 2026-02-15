import express from "express";
import controller from "../controllers/category.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, requireAdmin, controller.addCategory);
router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.put("/:id", requireAuth, requireAdmin, controller.updateCategory);
router.delete("/:id", requireAuth, requireAdmin, controller.deleteCategory);

export default router;
