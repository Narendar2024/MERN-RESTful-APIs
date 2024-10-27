import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import "../../public/css/signin.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) alert(data.message);
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up Form</h2>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <p>
          Plese <a href="/signin">SignIn</a> If you have account already.
        </p>
        <a href="/">Back to Home</a>
      </form>
    </div>
  );
};

export default Signup;
