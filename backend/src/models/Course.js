import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    stream: { type: String, enum: ["Arts", "Science", "Commerce", "Vocational"] },
    duration: { type: String, default: "3 years" },
    description: String,
    careerPaths: [   {
        title: String,
        type: { type: String, enum: ["Job", "Exam", "Higher Studies"] },
        description: String
      }], // e.g., "Civil Services", "Banking", "Research"
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
