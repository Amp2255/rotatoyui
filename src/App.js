import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import AuthForm from "./Components/AuthForm";
import Home from "./Components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>


        {/* LOGIN PAGE */}
        <Route path="/" element={<AuthForm />} />

        {/* APP AFTER LOGIN */}
        <Route path="/home/*" element={<Home />} />


      </Routes>
    </Router>
  );
};

export default App;