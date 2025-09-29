import express from "express";
import { enrollCourse, getEnrollments } from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, enrollCourse);   // student enroll
router.get("/", protect, getEnrollments);  // fetch my enrollments

export default router;
