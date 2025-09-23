import express from "express";
import {
  getQuizzes,
  getQuizById,
  addQuiz,
  submitQuiz,
} from "../controllers/quizController.js";
import { protect,studentOnly,adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.post("/submit", protect,studentOnly, submitQuiz);

// Protected (admin)
router.post("/", protect,adminOnly, addQuiz);

export default router;
