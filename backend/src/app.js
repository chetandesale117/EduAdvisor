import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/api/timeline", timelineRoutes);
app.use("/api/enrollments", enrollmentRoutes);


export default app;
