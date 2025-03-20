import { useEffect, useState } from "react";
import HomeNavbar from "./homenavbar";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import "../styles/userquiz.css";

const UserQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("https://vecros-quiztask-backendcode.vercel.app/api/quiz/get");
      if (Array.isArray(response.data)) {
        setQuizzes(response.data);
      } else {
        console.error("❌ Invalid API response format: Expected an array");
      }
    } catch (error) {
      console.error("❌ Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    if (selectedTitle) {
      const quiz = quizzes.find((q) => q.title === selectedTitle);
      if (quiz) {
        setTotalQuestions(quiz.questions.length);
      }
    }
  }, [selectedTitle, quizzes]);

  const handleAnswerSelect = (questionId, option, isMultipleChoice) => {
    if (!submitted) {
      setAnswers((prevAnswers) => {
        let updatedAnswers = { ...prevAnswers };

        if (isMultipleChoice) {
          let currentAnswers = new Set(updatedAnswers[questionId] || []);
          currentAnswers.has(option) ? currentAnswers.delete(option) : currentAnswers.add(option);
          updatedAnswers[questionId] = Array.from(currentAnswers);
        } else {
          updatedAnswers[questionId] = option;
        }

        setAnsweredCount(Object.keys(updatedAnswers).length);
        return updatedAnswers;
      });
    }
  };

  const submitQuiz = async () => {
    if (!selectedTitle || loading) return;
  
    setLoading(true);
  
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("User not found. Please log in.");
        setLoading(false);
        return;
      }
  
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer: Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer],
      }));
  
      const response = await axios.post("http://localhost:5000/api/score/submit", {
        userId: user._id,
        quizTitle: selectedTitle,
        selectedAnswers: formattedAnswers,
      });
  
      console.log("✅ API Response:", response.data); // Debugging Line
  
      setScore(response.data.score);
      setFeedback(response.data.feedback);
  
   
      if (response.data.correctAnswers && Array.isArray(response.data.correctAnswers)) {
        let correctAnswersMap = {};
        response.data.correctAnswers.forEach(({ questionId, correctAnswer }) => {
          correctAnswersMap[questionId] = Array.isArray(correctAnswer) ? correctAnswer.join(", ") : correctAnswer;
        });
        setCorrectAnswers(correctAnswersMap);
      }
       else {
        console.warn("⚠️ Warning: correctAnswers is missing, skipping...");
      }
  
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Error submitting quiz:", error.response?.data || error.message);
      alert("Error submitting quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="quiz-container">
      <HomeNavbar />
      <div className="quiz-content">
        {!selectedTitle ? (
          <ul className="quiz-title-list">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-title-item" onClick={() => setSelectedTitle(quiz.title)}>
                {quiz.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="quiz-section">
            <h2 className="quiz-title">{selectedTitle}</h2>

            {/* Progress Bar */}
            <ProgressBar progress={totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0} />

            {quizzes
              .filter((quiz) => quiz.title === selectedTitle)
              .map((quiz) =>
                quiz.questions.map((question) => (
                  <div key={question._id} className="quiz-question">
                    <h3>{question.question}</h3>
                    
                    {question.options.map((option, optionIndex) => (
                      <label key={`${question._id}-${optionIndex}`}>
                        <input
                          type={question.questionType === "multiple-choice" ? "checkbox" : "radio"}
                          name={`question-${question._id}`}
                          value={option}
                          checked={
                            question.questionType === "multiple-choice"
                              ? answers[question._id]?.includes(option)
                              : answers[question._id] === option
                          }
                          onChange={() => handleAnswerSelect(question._id, option, question.questionType === "multiple-choice")}
                          disabled={submitted}
                        />
                        {option}
                      </label>
                    ))}

{submitted && (
  <div className="answer-feedback">
    {feedback[question._id] ? (
      <p className={feedback[question._id] === "Correct!" ? "correct" : "incorrect"}>
        {feedback[question._id]}
      </p>
    ) : null}

    {/* Show correct answer if the user's answer is incorrect */}
    {submitted && correctAnswers[question._id] && feedback[question._id] !== "Correct!" && (
      <p className="correct-answer">
        Correct Answer: <strong>{correctAnswers[question._id]}</strong>
      </p>
    )}
  </div>
)}

                  </div>
                ))
              )}

            <button onClick={submitQuiz} disabled={submitted || loading} className="submit-button">
              {loading ? "Submitting..." : "Submit Quiz"}
            </button>
            <button onClick={() => window.location.reload()} className="back-button">Back</button>
            {submitted && <h3 className="score-display">Your Score: {score}</h3>}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuiz;


