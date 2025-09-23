import express from "express";
import {
  getColleges,
  getCollegeById,
  addCollege,
  addCourseToCollege,
} from "../controllers/collegeController.js";
import { protect,adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getColleges);
router.get("/:id", getCollegeById);

// Protected (admin) routes
router.post("/", protect,adminOnly, addCollege);
router.post("/:collegeId/course", protect,adminOnly, addCourseToCollege);

export default router;
