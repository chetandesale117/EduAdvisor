import express from "express";
import {
  getUserNotifications,
  createNotification,
  markAsRead,
} from "../controllers/notificationController.js";
import { protect,studentOnly ,adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

// Student routes
router.get("/", protect, studentOnly, getUserNotifications);
router.put("/:id/read", protect,studentOnly, markAsRead);

// Admin route
router.post("/", protect,adminOnly, createNotification);

export default router;
