import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Adminnavbar from "./adminnav";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get("https://vecros-quiztask-backendcode.vercel.app/api/score/all");
                setScores(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching scores:", error);
            }
        };

        fetchScores();
    }, []);

    return (

        <div className="leaderboard-wrapper">
            <Adminnavbar />

            {/* Leaderboard Content */}
            <div className="leaderboard-containers">
                <h2 className="leaderboard-headings">Leaderboard</h2>
                <table className="leaderboard-tables">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Quiz</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={score._id}>
                                <td>{score.user?.username || "Unknown User"}</td>
                                <td>{score.quizId ? score.quizId.title : "No Quiz Data"}</td>
                                <td>{score.score}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>


    );
};

export default Leaderboard;
