import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"
import "../styles/adminnav.css"

const Adminnavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); // ✅ Delete the token
        navigate("/"); // ✅ Redirect to landing page or login page
    };

    return (
        <nav className="Homenavbar">
            <h1 className="Navtitle" onClick={() => navigate("/AdminDashboard")}>AdminDashboard</h1>
            <div className="Navlinks">
                <ThemeToggle/>
                <button className="Navbutton logout" onClick={handleLogout}>
            Logout
        </button>
            </div>
        </nav>
    );
};

export default Adminnavbar;
