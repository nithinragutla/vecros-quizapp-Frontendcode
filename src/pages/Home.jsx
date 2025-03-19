import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeNavbar from "../components/homenavbar";
import "../styles/home.css"; // Import the new CSS file

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
        <HomeNavbar/>
            {/* Home Content */}
            <div className="Home-container">
                <div className="Home-content">
                    <h1>
                        Welcome to the <span>Quiz App</span> 🎉
                    </h1>
                    <p>Challenge yourself with fun and exciting quizzes!</p>

                    <div className="Button-group">
                        <Link to="/UserQuiz">
                            <button className="Start-quiz">Start Quiz</button>
                        </Link>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
