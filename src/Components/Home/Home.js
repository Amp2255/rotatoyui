import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import "../../App.css";
import "../../index";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container } from "react-bootstrap";

import CreateToy from "./create-toys.component";
import EditToy from "./edit-toy.component";
import ToysList from "./toys-list.component";
import RotateActions from "./rotate-actions.component";
import AppMenu from "./app-menu.component";

const Home = () => {
  return (
    <>
      {/* HEADER */}
      <header className="App-header">
        <Navbar >
          <Container>

            <Navbar.Brand>
              <Link to={"/home/toy-list"} className="nav-link">
                RotaToy
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">

              <Nav>
                <Link to={"/home/create-toy"} className="nav-link">
                  Add Toy
                </Link>
              </Nav>

              <Nav>
                <Link to={"/home/toy-list"} className="nav-link">
                  Toys List
                </Link>
              </Nav>
              <Nav>
                <Link to={"/"} className="nav-link">
                 Logout
                </Link>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>

      {/* PAGE CONTENT */}
      <Container className="mt-4">
        <Routes>
          <Route path="create-toy" element={<CreateToy />} />
          <Route path="edit-toy/:id" element={<EditToy />} />
          <Route path="toy-list" element={<ToysList />} />
          <Route path="rotate-actions" element={<RotateActions />} />
          <Route path="appmenu" element={<AppMenu />} />
        </Routes>
      </Container>

      {/* FOOTER */}
      <footer className="nav-link-footer">
        <p>&copy; 2025 RotaToy App</p>
      </footer>
    </>
  );
};

export default Home;