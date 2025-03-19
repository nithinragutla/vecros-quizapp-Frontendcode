import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="landing-box">
                <h1>Welcome to Quiz App</h1>
                <p>Select an option to continue:</p>
                <div className="button-group">
                    <button onClick={() => navigate("/Login")} className="landing-button login-btn">Login</button>
                    <button onClick={() => navigate("/Register")} className="landing-button register-btn">Register</button>
                    <button onClick={() => navigate("/AdminRegister")} className="landing-button admin-btn">Admin Register</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
