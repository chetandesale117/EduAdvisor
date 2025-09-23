import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [
      {
        questionText: String,
        options: [String],
        correctAnswer: String, // optional, since it's aptitude-based
      },
    ],
    streamSuggested: String, // e.g., "Science", "Arts"
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
