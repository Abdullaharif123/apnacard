import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Lost.css"; // Import the CSS file for styling

const Lost = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="lost-container">
      <img
        src="https://via.placeholder.com/400x300.png?text=Oops!+You+Got+Lost"
        alt="Lost Illustration"
        className="lost-image"
      />
      <h1>Oops! You Got Lost</h1>
      <p>
        We couldn't find the page you were looking for. It seems you've wandered
        off the path.
      </p>
      <div className="button-group">
        <button onClick={handleGoBack} className="btn go-home">
          Go to Homepage
        </button>
        <button onClick={handleLogin} className="btn login">
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Lost;
