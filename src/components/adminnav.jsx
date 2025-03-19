import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"
import "../styles/adminnav.css"

const Adminnavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="Homenavbar">
            <h1 className="Navtitle" onClick={() => navigate("/AdminDashboard")}>AdminDashboard</h1>
            <div className="Navlinks">
                <ThemeToggle/>
                <button className="Navbutton logout" onClick={() => navigate("/")}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Adminnavbar;
