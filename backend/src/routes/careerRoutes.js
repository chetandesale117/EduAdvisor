import express from "express";
import { getCareerPaths, addCareerPath } from "../controllers/careerController.js";
import { protect ,adminOnly,studentOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:courseId", protect,studentOnly, getCareerPaths);
router.post("/:courseId", protect,adminOnly, addCareerPath); // admin only

export default router;
