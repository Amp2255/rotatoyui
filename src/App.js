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

<<<<<<< HEAD
        {/* LOGIN PAGE */}
        <Route path="/" element={<AuthForm />} />

        {/* APP AFTER LOGIN */}
        <Route path="/home/*" element={<Home />} />
=======
        
        <Router>
                 <div className="page-container">
                <header className="App-header">
                    <Navbar bg="dark" variant="dark">
                        <Container>
                        <div className="d-flex align-items-center">
                            <Navbar.Brand className="p-1 me-3">
                                <Link to={"/appmenu"}
                                    className="nav-link">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_429_11066)"> <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11066"> <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)"></rect> </clipPath> </defs> </g></svg>
                                </Link>
                                
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link to={"/rotate-actions"}
                                    className="nav-link">
                                    RotaToy
                                </Link>
                            </Navbar.Brand>
                        </div>
                            <Nav className="justify-content-end">
                                <Nav>
                                    <Link to={"/create-toy"}
                                        className="nav-link">
                                        Add Toy
                                    </Link>
                                </Nav>

                                <Nav>
                                    <Link to={"/toy-list"}
                                        className="nav-link">
                                        Toys List
                                    </Link>
                                </Nav>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
>>>>>>> bd70cc1b25a21c7d10414340e046d2d12edcd8c2

      </Routes>
    </Router>
  );
};

export default App;