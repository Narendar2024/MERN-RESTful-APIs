import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import "../../public/css/signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        navigate("/products"); // Redirect to ProductList
      } else alert(data.message);
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSignin}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signin</button>
        <p>
          Please <a href="/signup">SignUp</a> If you don't have account
        </p>
        <a href="/">Back to Home</a>
      </form>
    </div>
  );
};

export default Signin;
