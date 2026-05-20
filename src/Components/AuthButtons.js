import React from "react";
import '../Login.css';

const AuthButtons = () => {
  const login = () => {
    // Redirect to Spring Boot's login endpoint
    window.location.href = "http://localhost:8080/login";
  };

  const logout = () => {
    // Redirect to Spring Boot's logout endpoint
    window.location.href = "http://localhost:8080/logout";
  };

  return (
    <div>
      <button onClick={login}>Login with Auth0</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AuthButtons;
