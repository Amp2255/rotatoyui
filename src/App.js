// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
    from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import {
    BrowserRouter as Router, Routes,
    Route, Link
} from "react-router-dom";

// Import other React Components
import CreateToy from
    "./Components/create-toys.component";
import EditToy from
    "./Components/edit-toy.component";
import ToysList from
    "./Components/toys-list.component";
import RotateActions from "./Components/rotate-actions.component";

import AppMenu from "./Components/app-menu.component";
// App Component
const App = () => {
    return (
        <div id="root">

        
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

                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="wrapper">
                                <Routes>
                                    <Route path="/" element={<ToysList />} />
                                    <Route path="/create-toy" element={<CreateToy />} />
                                    <Route path="/edit-toy/:id" element={<EditToy />} />
                                    <Route path="/toy-list" element={<ToysList />} />
                                    <Route path="/rotate-actions" element={<RotateActions/>}/>
                                    <Route path="/appmenu" element={<AppMenu/>}/>
                                </Routes>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </div>
      </Router>
                <footer  className="nav-link-footer">     
                      <p>&copy; 2025 RotaToy App</p>
                </footer>
        
       </div> 
    );
};

export default App;