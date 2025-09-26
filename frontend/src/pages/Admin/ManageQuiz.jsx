import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import toast from "react-hot-toast";

const ManageQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: ["", ""] }]);
  const { user } = useContext(AuthContext);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", ""] }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Quiz title is required!");
    if (questions.some((q) => !q.questionText)) {
      return toast.error("All questions must have text");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/quiz",
        { title, questions, streamSuggested: "Science" },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Quiz created!");
      setTitle("");
      setQuestions([{ questionText: "", options: ["", ""] }]);
    } catch {
      toast.error("Failed to create quiz");
    }
  };



  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">📝 Create Quiz</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-xl space-y-4">
        <input
          type="text"
          placeholder="Quiz Title"
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {questions.map((q, i) => (
          <div key={i} className="border p-3 rounded bg-gray-50">
            <input
              type="text"
              placeholder="Question"
              className="border p-2 w-full mb-2 rounded"
              value={q.questionText}
              onChange={(e) => {
                const updated = [...questions];
                updated[i].questionText = e.target.value;
                setQuestions(updated);
              }}
            />
            {q.options.map((opt, j) => (
              <input
                key={j}
                type="text"
                placeholder={`Option ${j + 1}`}
                className="border p-2 w-full mb-2 rounded"
                value={opt}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[i].options[j] = e.target.value;
                  setQuestions(updated);
                }}
              />
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-600 px-3 py-1 rounded"
        >
          + Add Question
        </button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Quiz
        </button>
      </form>
    </div>
  );
};

export default ManageQuiz;
