import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/quizlist.css";
import Adminnavbar from "./adminnav";

const AdminEdit = () => {
  const [quizzes, setQuizzes] = useState([]); // Ensure quizzes is an array
  const [expandedTitle, setExpandedTitle] = useState(null); // Track expanded title for displaying questions
  const [editQuizId, setEditQuizId] = useState(null); // Track which quiz is being edited
  const [editedData, setEditedData] = useState({
    question: "", // Updated field for question text
    options: [], // Array for options
    correctAnswer: "", // Correct answer
  }); // Store edited data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch quizzes from the API
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://vecros-quiztask-backendcode.vercel.app/api/quiz/get");

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }

      setQuizzes(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching quizzes:", error.message);
      setError("Failed to fetch quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Expand/collapse quiz questions
  const handleTitleClick = (title) => {
    setExpandedTitle(expandedTitle === title ? null : title);
  };

  // Enable edit mode for a question
  const handleEditClick = (question) => {
    setEditQuizId(question._id);
    setEditedData({
        question: question.question, // Fix: Use `question` instead of `questionText`
        options: question.options || [],
        correctAnswer: question.correctAnswer || "",
    });
};


  // Save updated question
  const handleUpdate = async (quizId, questionId) => {
    try {
        // Find the quiz and update only the specific question inside it
        const updatedQuizzes = quizzes.map((quiz) => {
            if (quiz._id === quizId) {
                return {
                    ...quiz,
                    questions: quiz.questions.map((question) => {
                        if (question._id === questionId) {
                            return {
                                ...question,
                                question: editedData.question, // Fix: Updating question text
                                options: editedData.options, // Ensure options are updated
                                correctAnswer: editedData.correctAnswer, // Ensure correct answer is updated
                            };
                        }
                        return question;
                    }),
                };
            }
            return quiz;
        });

        // Find the specific quiz to send in API request
        const updatedQuiz = updatedQuizzes.find((quiz) => quiz._id === quizId);

        // Send the updated quiz data to the backend
        const response = await axios.put(
            `https://vecros-quiztask-backendcode.vercel.app/api/quiz/edit/${quizId}`,
            {
                title: updatedQuiz.title,
                questions: updatedQuiz.questions, // Send the updated questions array
            }
        );

        if (response.status === 200) {
            fetchQuizzes(); // Refresh quiz list to show the updated question
            setEditQuizId(null); // Exit edit mode
        }
    } catch (error) {
        console.error("Error updating quiz:", error.response?.data || error.message);
    }
};

  
  // Handle delete request for a question
  const handleDelete = async (questionId) => {
    try {
      console.log("Attempting to delete question with ID:", questionId); // Debugging line
      const response = await axios.delete(`https://vecros-quiztask-backendcode.vercel.app/api/quiz/delete/${questionId}`);
  
      if (response.status === 200) {
        fetchQuizzes(); // Refresh quiz list after deletion
      }
    } catch (error) {
      console.error("Error deleting quiz:", error.response?.data || error.message);
    }
  };
  
  

  return (
    <>
      <Adminnavbar />
      <div id="quiz-container">
        {loading ? (
          <p className="loading">Loading quizzes...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : quizzes.length === 0 ? (
          <p className="no-quizzes">No quizzes found.</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              {/* Quiz Title */}
              <h3 className="quiz-title" onClick={() => handleTitleClick(quiz.title)}>
                {quiz.title}
              </h3>

              {/* Expand Questions */}
              {expandedTitle === quiz.title &&
                quiz.questions.map((question) => (
                  <div key={question._id} className="question-box">
                    {editQuizId === question._id ? (
                      // Edit Mode
                      console.log(editedData),
                      <div className="edit-mode">
                      <input
    type="text"
    value={editedData.question} // Fix: Now correctly updates state
    onChange={(e) => setEditedData({ ...editedData, question: e.target.value })}
    className="edit-input"
    placeholder="Question Text"
/>

                        <input
                          type="text"
                          value={editedData.options.join(", ")}
                          onChange={(e) =>
                            setEditedData({ ...editedData, options: e.target.value.split(", ") })
                          }
                          className="edit-input"
                          placeholder="Options (comma separated)"
                        />
                        <input
                          type="text"
                          value={editedData.correctAnswer}
                          onChange={(e) =>
                            setEditedData({ ...editedData, correctAnswer: e.target.value })
                          }
                          className="edit-input"
                          placeholder="Correct Answer"
                        />
                        <button
                          onClick={() => handleUpdate(quiz._id, question._id)}
                          className="save-btn"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditQuizId(null)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      // Display Question
                      <div>
                        <p><strong>Question:</strong> {question.question || "N/A"}</p>
                        <p><strong>Options:</strong> {question.options?.join(", ") || "N/A"}</p>
                        <p><strong>Correct Answer:</strong> {question.correctAnswer || "N/A"}</p>
                        <div className="button-group">
                          <button
                            onClick={() => handleEditClick(question)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          {console.log(question._id)}
                          <button
                            onClick={() => handleDelete(question._id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminEdit;
