import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    coursesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    facilities: [String], // hostel, library, lab, wifi
    eligibilityCriteria: String,
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
