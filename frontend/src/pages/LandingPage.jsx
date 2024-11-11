import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load external stylesheet
    const inspectorStylesheet = document.createElement("link");
    inspectorStylesheet.rel = "stylesheet";
    inspectorStylesheet.href =
      "https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css";
    document.head.appendChild(inspectorStylesheet);

    // Load Observable runtime and chart code dynamically
    const loadObservableScript = async () => {
      const { Runtime, Inspector } = await import(
        "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
      );
      const define = await import(
        "https://api.observablehq.com/@d3/disjoint-force-directed-graph/2.js?v=4"
      );

      new Runtime().module(define.default, (name) => {
        if (name === "chart") {
          return new Inspector(
            document.querySelector("#observablehq-chart-aec61c29")
          );
        }
      });
    };

    loadObservableScript();
  }, []);

  // Navigation handlers
  const goToSignup = () => navigate("/signup");
  const goToSignin = () => navigate("/signin");

  return (
    <section>
      <div className="landing-container left-container">
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
      <div className="right-container">
        <div id="observablehq-chart-aec61c29"></div>
      </div>
    </section>
  );
};

export default LandingPage;
