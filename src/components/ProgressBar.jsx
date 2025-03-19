import React from "react";
import "../styles/progressbar.css"; // Import styles (optional)

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress.toFixed(0)}% Completed
      </div>
    </div>
  );
};

export default ProgressBar;
