import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./nav.css";
export default function Navbar(props) {
  const logout = () => {
    axios.post("http://localhost:4000/logout");
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="navBar">
      <Link to="/profile">
        <button id="profileBtn">Profile</button>
      </Link>
      <Link to="/world">
        <button id="worldBtn">World</button>
      </Link>
      <Link id="logoutBtn" to="/">
        <button onClick={logout}>Logout</button>
      </Link>
    </div>
  );
}
