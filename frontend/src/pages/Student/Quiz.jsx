import { useEffect, useState, useContext } from "react";
import { getQuizzes, submitQuiz } from "../../services/quizService";
import { AuthContext } from "../../context/AuthContext";

import toast from "react-hot-toast";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch {
        toast.error("Failed to load quizzes");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (quizId) => {
    if (Object.keys(answers).length === 0) {
      return toast.error("Please answer at least one question!");
    }
    try {
      const res = await submitQuiz(
        { quizId, answers: Object.values(answers) },
        user.token
      );
      toast.success(`✅ Suggested stream: ${res.suggestedStream}`);
    } catch {
      toast.error("❌ Error submitting quiz");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">📝 Take Quiz</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="bg-white p-6 mb-6 shadow rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">{quiz.title}</h3>
          {quiz.questions.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium">{q.questionText}</p>
              {q.options.map((opt, idx) => (
                <label key={idx} className="block">
                  <input
                    type="radio"
                    name={`${quiz._id}-${i}`}
                    value={opt}
                    className="mr-2"
                    onChange={() => setAnswers({ ...answers, [i]: opt })}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button
            onClick={() => handleSubmit(quiz._id)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Submit Quiz
          </button>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
