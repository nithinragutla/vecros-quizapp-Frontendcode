// import { useEffect, useState } from "react";
// import HomeNavbar from "./homenavbar";
// import axios from "axios";
// import "../styles/userquiz.css";

// const QuizCards = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedTitle, setSelectedTitle] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(null);
//   const [feedback, setFeedback] = useState({});
//   const [loading, setLoading] = useState(false); // New loading state for submit button
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const [answeredCount, setAnsweredCount] = useState(0);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quiz/get");
//       if (Array.isArray(response.data)) {
//         setQuizzes(response.data);
//       } else {
//         console.error("❌ Invalid API response format: Expected an array");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching quizzes:", error);
//     }
//   };

//   const handleAnswerSelect = (questionId, option) => {
//     if (!submitted) {
//       setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: option }));
//     }
//   };

//   const submitQuiz = async () => {
//     console.log("Submit button clicked!"); // Debugging statement
    
//     if (!selectedTitle || loading) {
//       console.log("Form not submitted: Either no quiz selected or already submitting.");
//       return; // Prevent submitting if already submitting
//     }
  
//     setLoading(true); // Set loading state to true when the submit is in progress
//     console.log("Loading state is now true");
  
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user || !user._id) {
//         console.log("User is not found or no user ID present.");
//         return;
//       }
  
//       // Prepare the answers
//       const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
//         questionId,
//         selectedAnswer,
//       }));
//       console.log("Formatted Answers:", formattedAnswers); // Log the answers
  
//       // Post the answers to the server
//       const response = await axios.post("http://localhost:5000/api/score/submit", {
//         userId: user._id,
//         quizTitle: selectedTitle,
//         selectedAnswers: formattedAnswers,
//       });
      
//       console.log("API response:", response.data); // Log the response from the API
  
//       const { score, feedback } = response.data;
//       setScore(score); // Set score after submission
//       setFeedback(feedback); // Set feedback after submission
//       setSubmitted(true); // Mark quiz as submitted
//     } catch (error) {
//       console.error("❌ Error submitting quiz:", error.response?.data || error.message);
//       alert("There was an error submitting the quiz. Please try again.");
//     } finally {
//       setLoading(false); // Reset loading state after the process is done
//       console.log("Loading state is now false");
//     }
//   };
  

//   return (
//     <div className="quiz-container">
//       <HomeNavbar />
//       <div className="quiz-content">
//         {!selectedTitle ? (
//           <ul className="quiz-title-list">
//             {quizzes.map((quiz) => (
//               <li
//                 key={quiz._id}
//                 className="quiz-title-item"
//                 onClick={() => setSelectedTitle(quiz.title)}
//               >
//                 {quiz.title}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="quiz-section">
//             <h2 className="quiz-title">{selectedTitle}</h2>
//   {/* Progress Bar */}
//   <div className="progress-container">
//               <div className="progress-bar" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}>
//                 {answeredCount}/{totalQuestions} Answered
//               </div>
//             </div>
//             {quizzes
//               .filter((quiz) => quiz.title === selectedTitle)
//               .map((quiz) =>
//                 quiz.questions.map((question) => (
//                   <div key={question._id} className="quiz-question">
//                     <h3>{question.question}</h3>
//                     {question.options.map((option, optionIndex) => (
//                       <label key={`${question._id}-${optionIndex}`}>
//                         <input
//                           type="radio"
//                           name={`question-${question._id}`}
//                           value={option}
//                           onChange={() => handleAnswerSelect(question._id, option)}
//                           disabled={submitted}  // Disable after submission
//                         />
//                         {option}
//                       </label>
//                     ))}

//                     {/* Show feedback only after submission */}
//                     {submitted && feedback[question._id] && (
//                       <p className="answer-feedback">{feedback[question._id]}</p>
//                     )}
//                   </div>
//                 ))
//               )}

//            <button
//            onClick={submitQuiz}
//            disabled={submitted || loading} // Disable the button when already submitted or loading
//            className="submit-button"
//          >
//            {loading ? "Submitting..." : "Submit Quiz"} {/* Show loading text while submitting */}
//          </button>
         
//             <button onClick={() => window.location.reload()} className="back-button">
//               Back
//             </button>
//             {submitted && <h3 className="score-display">Your Score: {score}</h3>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizCards;


// import { useEffect, useState } from "react";
// import HomeNavbar from "./homenavbar";
// import axios from "axios";
// import ProgressBar from "./ProgressBar"; // Import the ProgressBar component
// import "../styles/userquiz.css";

// const QuizCards = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedTitle, setSelectedTitle] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(null);
//   const [feedback, setFeedback] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const [answeredCount, setAnsweredCount] = useState(0);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/quiz/get");
//       if (Array.isArray(response.data)) {
//         setQuizzes(response.data);
//       } else {
//         console.error("❌ Invalid API response format: Expected an array");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching quizzes:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedTitle) {
//       const quiz = quizzes.find((q) => q.title === selectedTitle);
//       if (quiz) {
//         setTotalQuestions(quiz.questions.length);
//       }
//     }
//   }, [selectedTitle, quizzes]);

//   const handleAnswerSelect = (questionId, option) => {
//     if (!submitted) {
//       setAnswers((prevAnswers) => {
//         const updatedAnswers = { ...prevAnswers, [questionId]: option };
//         setAnsweredCount(Object.keys(updatedAnswers).length);
//         return updatedAnswers;
//       });
//     }
//   };

//   const submitQuiz = async () => {
//     if (!selectedTitle || loading) return;

//     setLoading(true);

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user || !user._id) {
//         alert("User not found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
//         questionId,
//         selectedAnswer,
//       }));

//       const response = await axios.post("http://localhost:5000/api/score/submit", {
//         userId: user._id,
//         quizTitle: selectedTitle,
//         selectedAnswers: formattedAnswers,
//       });

//       setScore(response.data.score);
//       setFeedback(response.data.feedback);
//       setSubmitted(true);
//     } catch (error) {
//       console.error("❌ Error submitting quiz:", error.response?.data || error.message);
//       alert("Error submitting quiz. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="quiz-container">
//       <HomeNavbar />
//       <div className="quiz-content">
//         {!selectedTitle ? (
//           <ul className="quiz-title-list">
//             {quizzes.map((quiz) => (
//               <li key={quiz._id} className="quiz-title-item" onClick={() => setSelectedTitle(quiz.title)}>
//                 {quiz.title}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className="quiz-section">
//             <h2 className="quiz-title">{selectedTitle}</h2>

//             {/* Progress Bar */}
//             <ProgressBar progress={totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0} />

//             {quizzes
//               .filter((quiz) => quiz.title === selectedTitle)
//               .map((quiz) =>
//                 quiz.questions.map((question) => (
//                   <div key={question._id} className="quiz-question">
//                     <h3>{question.question}</h3>
//                     {question.options.map((option, optionIndex) => (
//                       <label key={`${question._id}-${optionIndex}`}>
//                         <input
//                           type="radio"
//                           name={`question-${question._id}`}
//                           value={option}
//                           onChange={() => handleAnswerSelect(question._id, option)}
//                           disabled={submitted}
//                         />
//                         {option}
//                       </label>
//                     ))}

//                     {submitted && feedback[question._id] && <p className="answer-feedback">{feedback[question._id]}</p>}
//                   </div>
//                 ))
//               )}

//             <button onClick={submitQuiz} disabled={submitted || loading} className="submit-button">
//               {loading ? "Submitting..." : "Submit Quiz"}
//             </button>
//             <button onClick={() => window.location.reload()} className="back-button">Back</button>
//             {submitted && <h3 className="score-display">Your Score: {score}</h3>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizCards;


import { useEffect, useState } from "react";
import HomeNavbar from "./homenavbar";
import axios from "axios";
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component
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
          const currentAnswers = updatedAnswers[questionId] || [];
          if (currentAnswers.includes(option)) {
            updatedAnswers[questionId] = currentAnswers.filter((ans) => ans !== option);
          } else {
            updatedAnswers[questionId] = [...currentAnswers, option];
          }
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
        selectedAnswer: Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer], // Ensure array format
      }));

      const response = await axios.post("https://vecros-quiztask-backendcode.vercel.app/api/score/submit", {
        userId: user._id,
        quizTitle: selectedTitle,
        selectedAnswers: formattedAnswers,
      });

      setScore(response.data.score);
      setFeedback(response.data.feedback);
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

                    {submitted && feedback[question._id] && <p className="answer-feedback">{feedback[question._id]}</p>}
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

