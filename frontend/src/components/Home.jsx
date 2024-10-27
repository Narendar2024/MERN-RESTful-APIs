import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Product Management</h1>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/signin">
        <button>Signin</button>
      </Link>
    </div>
  );
};

export default Home;
