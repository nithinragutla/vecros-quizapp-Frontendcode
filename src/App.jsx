import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/landingpage";
import AdminEdit from "./components/admineditquiz";
import Login from "./components/Login";
import UserQuiz from "./components/Userquiz";
import AdminRegister from "./components/adminreg";
import Register from "./components/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./components/Leaderboard";
import AdminaddQuiz from "./components/adminaddquiz";

// ✅ Check if user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

// ✅ Protected Route Component
function ProtectedRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/Login" />;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

    useEffect(() => {
        const handleAuthChange = () => setIsLoggedIn(isAuthenticated());
        window.addEventListener("storage", handleAuthChange);
        return () => window.removeEventListener("storage", handleAuthChange);
    }, []);

    // ✅ Apply theme
    const savedTheme = localStorage.getItem("theme");
    document.body.classList.add(savedTheme === "dark" ? "dark-mode" : "light-mode");

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/AdminRegister" element={<AdminRegister />} />
                <Route path="/" element={<LandingPage />} />

                {/* Protected Routes */}
                <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/Leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                <Route path="/UserQuiz" element={<ProtectedRoute> <UserQuiz /></ProtectedRoute> } />
                <Route path="/AdminEdit" element={<ProtectedRoute><AdminEdit /></ProtectedRoute>}/>
                <Route path="/AdminaddQuiz" element={<ProtectedRoute><AdminaddQuiz /></ProtectedRoute>}/>
                <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

// ✅ Ensure a default export is present
export default App;
