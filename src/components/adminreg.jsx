import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminreg.css";

const AdminRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleAdminRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://vecros-quiztask-backendcode.vercel.app/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, isAdmin: true }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            setSuccess("Admin registered successfully! Redirecting...");
            setTimeout(() => navigate("/Login"), 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-register-container">
            <div className="admin-register-box">
                <h2>Admin Registration</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleAdminRegister}>
                    <div className="input-group">
                        <label>Username</label>
                        <input id="user" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="admin-register-button">Register as Admin</button>
                </form>

                <p>Already an admin? <a href="/AdminLogin">Log in</a></p>
            </div>
        </div>
    );
};

export default AdminRegister;
