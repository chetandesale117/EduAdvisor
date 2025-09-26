import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["admission", "scholarship", "exam", "event"], default: "event" },
  },
  { timestamps: true }
);

export default mongoose.model("Timeline", timelineSchema);
