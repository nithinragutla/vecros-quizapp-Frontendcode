import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
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


function App() {
    const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.add("light-mode");
}
    return (

        // <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/HomeNavbar" element={<HomeNavbar />} />
                    <Route path="/UserQuiz" element={<UserQuiz/>} />
                    <Route path="/AdminEdit" element={<AdminEdit/>} />
                    <Route path="/AdminaddQuiz" element={<AdminaddQuiz/>} />
                    <Route path="/Leaderboard" element={<Leaderboard />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/AdminRegister" element={<AdminRegister />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </BrowserRouter>
        // </ThemeProvider>
    );
}


export default App;
