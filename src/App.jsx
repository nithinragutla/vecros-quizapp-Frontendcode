import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/landingpage";
import AdminEdit from "./components/admineditquiz";
import Login from "./components/Login";
import UserQuiz from "./components/Userquiz";
import AdminRegister from "./components/adminreg";
import Register from "./components/Register";
import Home from "./pages/Home";
import HomeNavbar from "./components/homenavbar";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./components/Leaderboard";
import AdminaddQuiz from "./components/adminaddquiz";
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Store auth token in localStorage after login
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/HomeNavbar" element={<HomeNavbar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/AdminRegister" element={<AdminRegister />} />
                <Route path="/Leaderboard" element={<Leaderboard />} />
                <Route path="/" element={<LandingPage />} />

                {/* Protected Routes */}
                <Route path="/UserQuiz" element={<ProtectedRoute element={UserQuiz} isAuthenticated={isAuthenticated} />} />
                <Route path="/AdminEdit" element={<ProtectedRoute element={AdminEdit} isAuthenticated={isAuthenticated} />} />
                <Route path="/AdminaddQuiz" element={<ProtectedRoute element={AdminaddQuiz} isAuthenticated={isAuthenticated} />} />
                <Route path="/AdminDashboard" element={<ProtectedRoute element={AdminDashboard} isAuthenticated={isAuthenticated} />} />
            </Routes>
        </Router>
    );
}

export default App;
