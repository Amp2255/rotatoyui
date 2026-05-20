import React from "react";
import { Link } from "react-router-dom";

const AppMenu = () => {
    return (
        <div>
            <h2>Menu</h2>
            <ul>
                <li><Link to="/toy-list">Toys List</Link></li>
                <li><Link to="/create-toy">Add Toy</Link></li>
                <li><Link to="/rotate-actions">Rotate Actions</Link></li>
            </ul>
        </div>
    );
};

export default AppMenu;
