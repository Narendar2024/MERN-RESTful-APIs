import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const goToSignup = () => navigate("/signup");
  const goToSignin = () => navigate("/signin");

  return (
    <div className="landing-container">
      <h1>Welcome to Product Management</h1>
      <p>Manage products efficiently and effortlessly.</p>

      <div className="landing-buttons">
        <button onClick={goToSignin} className="landing-button">
          Sign In
        </button>
        <button onClick={goToSignup} className="landing-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
