import express from "express";
import upload from "../middlewares/upload.middleware.js";
import controller from "../controllers/product.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, requireAdmin, upload.single("image"), controller.addProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", requireAuth, requireAdmin, upload.single("image"), controller.updateProduct);
router.delete("/:id", requireAuth, requireAdmin, controller.deleteProduct);

export default router;