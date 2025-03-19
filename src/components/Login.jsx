import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://vecros-quiztask-backendcode.vercel.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Invalid username or password");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // alert("Login successful!");

            // Check if the user is an admin
            if (data.user.isAdmin) {
                navigate("/AdminDashboard");
            } else {
                navigate("/Home");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="login-container">
            <div id="login-box">
                <h2 id="login-title">Login</h2>
                {error && <p id="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="login-username">Username</label>
                        <input
                            id="login-username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" id="login-button">Login</button>
                </form>

                <p id="register-text">
                    Don't have an account? <a href="/Register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
