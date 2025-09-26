import express from "express";
import { addEvent, getEvents } from "../controllers/timelineController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin can add event
router.post("/", protect, adminOnly, addEvent);

// Students + Admins can fetch events
router.get("/", protect, getEvents);

export default router;
