import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/LandingPage.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Product Management</h1>
      <div>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/signin">
          <button>Signin</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
