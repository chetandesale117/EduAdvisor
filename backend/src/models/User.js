import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ["student", "admin"], default: "student" },
    age: Number,
    gender: String,
    interests: [String], // e.g., ["science", "math"]
    enrollments: [
  {
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    course: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }
],
  },
  
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
