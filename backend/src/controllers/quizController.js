import Quiz from "../models/Quiz.js";

// @desc Get all quizzes
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add new quiz (Admin only)
export const addQuiz = async (req, res) => {
  const { title, questions, streamSuggested } = req.body;

  try {
    const quiz = new Quiz({
      title,
      questions,
      streamSuggested,
    });

    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Submit quiz & get suggested stream
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Very simple logic: pick stream suggested in quiz
    // Later we can improve with ML scoring
    res.json({
      message: "Quiz submitted successfully",
      suggestedStream: quiz.streamSuggested,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
