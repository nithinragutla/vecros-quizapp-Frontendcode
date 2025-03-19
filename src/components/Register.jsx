import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://vecros-quiztask-backendcode.vercel.app/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, isAdmin: false }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            setSuccess("User registered successfully! Redirecting...");
            setTimeout(() => navigate("/Login"), 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="register-container">
            <div id="register-box">
                <h2 id="register-title">Create Account</h2>
                {error && <p id="register-error-message" className="register-error-message">{error}</p>}
                {success && <p id="register-success-message" className="register-success-message">{success}</p>}
                
                <form onSubmit={handleRegister}>
                    <div id="register-username-group" className="register-input-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div id="register-password-group" className="register-input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button id="register-button" type="submit" className="register-button">Sign Up</button>
                </form>

                <p>Already have an account? <a id="register-login-link" href="/Login">Log in</a></p>
            </div>
        </div>
    );
};

export default Register;