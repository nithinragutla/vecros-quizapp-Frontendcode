import React, { useState } from 'react';
import Adminnavbar from './adminnav';
import axios from 'axios';
import "../styles/AdminQuiz.css"

const AdminaddQuiz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([
        {
            question: '',
            questionType: 'single-choice',
            options: ['', '', '', ''],
            correctAnswer: '', // Single value for 'single-choice' and 'true-false'
        },
    ]);
    const [message, setMessage] = useState('');

    const handleTitleChange = (e) => setQuizTitle(e.target.value);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quizQuestions];
        updatedQuestions[index][field] = value;
        setQuizQuestions(updatedQuestions);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const updatedQuestions = [...quizQuestions];
        updatedQuestions[index].options[optionIndex] = value;
        setQuizQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (index, value) => {
        const updatedQuestions = [...quizQuestions];
        updatedQuestions[index].questionType = value;
        // Adjust options for 'true-false' and reset correct answer accordingly
        updatedQuestions[index].options = value === 'true-false' ? ['True', 'False'] : ['', '', '', ''];
        updatedQuestions[index].correctAnswer = ''; // Reset correct answer on type change
        setQuizQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuizQuestions([...quizQuestions, {
            question: '',
            questionType: 'single-choice',
            options: ['', '', '', ''],
            correctAnswer: '',
        }]);
    };

    const removeQuestion = (index) => {
        if (quizQuestions.length > 1) {
            const updatedQuestions = quizQuestions.filter((_, i) => i !== index);
            setQuizQuestions(updatedQuestions);
        }
    };

    const validateQuizData = () => {
        if (!quizTitle.trim()) {
            setMessage('Quiz title is required.');
            return false;
        }
    
        if (quizQuestions.some(q => {
            if (q.questionType !== 'multiple-choice' && (!q.question.trim() || !q.correctAnswer.trim())) {
                return true;
            }
    
            if (q.questionType === 'multiple-choice' && (!q.question.trim() || !Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0)) {
                return true;
            }
    
            return false;
        })) {
            setMessage('Please fill in all question fields and correct answers.');
            return false;
        }
    
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateQuizData()) return;

        const quizData = { title: quizTitle, questions: quizQuestions };

        try {
            const token = localStorage.getItem('token');
            await axios.post('https://vecros-quiztask-backendcode.vercel.app/api/quiz/add', quizData, {
                headers: { Authorization: token },
            });
            setMessage('Quiz added successfully!');
            setQuizTitle('');
            setQuizQuestions([{ question: '', questionType: 'single-choice', options: ['', '', '', ''], correctAnswer: '' }]);
        } catch (error) {
            setMessage('Error adding quiz: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <>
            <Adminnavbar />
            <div id="admin-quiz-container">
                <h2>Create Your Quiz</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Quiz Title */}
                    <div>
                        <label>Quiz Title:</label>
                        <input type="text" value={quizTitle} onChange={handleTitleChange} />
                    </div>
                    {/* Question Rendering Loop */}
                    {quizQuestions.map((question, index) => (
                        <div key={index} className="question-container">
                            <div>
                                <label>Question:</label>
                                <input type="text" value={question.question} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} />
                            </div>
                            <div>
                                <label>Question Type:</label>
                                <select value={question.questionType} onChange={(e) => handleQuestionTypeChange(index, e.target.value)}>
                                    <option value="single-choice">Single Choice</option>
                                    <option value="multiple-choice">Multiple Choice</option>
                                    <option value="true-false">True/False</option>
                                </select>
                            </div>
                            <div>
                                <label>Options:</label>
                                {question.options.map((option, optionIndex) => (
                                    <input key={optionIndex} type="text" value={option} onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)} placeholder={`Option ${optionIndex + 1}`} />
                                ))}
                            </div>
                            <div>
                                <label>Correct Answer:</label>
                                {question.questionType === 'multiple-choice' ? (
                                    question.options.map((option, optionIndex) => (
                                        <label key={optionIndex}>
                                            <input
                                                type="checkbox"
                                                value={option}
                                                checked={Array.isArray(question.correctAnswer) && question.correctAnswer.includes(option)}
                                                onChange={(e) => {
                                                    const updatedCorrectAnswers = [...(question.correctAnswer || [])];
                                                    if (updatedCorrectAnswers.includes(option)) {
                                                        const idx = updatedCorrectAnswers.indexOf(option);
                                                        updatedCorrectAnswers.splice(idx, 1);
                                                    } else {
                                                        updatedCorrectAnswers.push(option);
                                                    }
                                                    handleQuestionChange(index, 'correctAnswer', updatedCorrectAnswers);
                                                }}
                                            />
                                            {option}
                                        </label>
                                    ))
                                ) : (
                                    <input type="text" value={question.correctAnswer} onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)} />
                                )}
                            </div>
                            {quizQuestions.length > 1 && (
                                <button type="button" className="remove-btn" onClick={() => removeQuestion(index)}>Remove Question</button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="add-question-btn" onClick={addQuestion}>Add Question</button>
                    <button type="submit" className="submit-btn">Submit Quiz</button>
                </form>
            </div>
        </>
    );
};

export default AdminaddQuiz;
