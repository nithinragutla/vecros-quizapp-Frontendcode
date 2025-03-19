import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminnavbar from "../components/adminnav";
import "../styles/AdminDashboard.css"; // Import CSS file

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Apply the body class when the component is mounted
    useEffect(() => {
        document.body.classList.add("admin-dashboard");

        return () => {
            document.body.classList.remove("admin-dashboard");
        };
    }, []);

    return (
        <>
            {/* Navbar */}
            <Adminnavbar/>

            {/* Main Admin Panel */}
            <div className="admin-container">
                <div className="admin-card">
                    <h2 className="admin-heading">Welcome to Admin Dashboard</h2>
                    <button className="admin-buttons" onClick={() => navigate("/AdminQuiz")}>
                        Add Quiz
                    </button>
                    <button className="admin-buttons" onClick={() => navigate("/QuizList")}>
                        view questions
                    </button>
                    <button className="admin-buttons" onClick={() => navigate("/leaderboard")}>
                        View Leaderboard
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
