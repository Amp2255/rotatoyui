import React, { useState } from "react";
import "../Login.css";
import logo from "../logo.png";

const AUTH0_DOMAIN = "dev-0bfqhw8lbr8ladtl.us.auth0.com";
const CLIENT_ID = "XOL8Tt21teDGXqz0xkzMNpuT8CFn3oV5";
const CONNECTION = "Username-Password-Authentication";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = async () => {
    if (mode === "register") {
      const response = await fetch(
        `https://${AUTH0_DOMAIN}/dbconnections/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            email,
            password,
            connection: CONNECTION,
            user_metadata: { username, name },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        alert("Registration failed: " + data.error);
      } else {
        alert("Registration successful! Please login.");
        setMode("login");
      }
    } else {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "/home/toy-list";
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">
             
        <div className="homeMain">
          <div className="homeSmall">
            <img src={logo} className="Login-logo" alt="logo" />
          </div>
          <div className="homeSmall">
            <div className="homeSmallLogin">
        {/* need after implementing register      <h2>{mode === "login" ? "Login" : "Register"}</h2> */}

              {mode === "register" && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <br />

                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br />
                  <br />
                </>
              )}

              <input
                type="email"
                placeholder="user@rt.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />

              <button onClick={handleSubmit}>
                {mode === "login" ? "Login" : "Register"}
              </button>
{/* Need to implement */}
              {/* <p
                onClick={() =>
                  setMode(mode === "login" ? "register" : "login")
                }
                style={{ cursor: "pointer", color: "blue" }}
              >
                {mode === "login"
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </p> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AuthForm;