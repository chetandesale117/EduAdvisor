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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
