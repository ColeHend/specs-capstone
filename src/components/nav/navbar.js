import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./nav.css";
export default function Navbar(props) {
  const logout = () => {
    axios.post("/api/logout");
    localStorage.clear();
  };
  return (
    <div className="navBar">
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/world">
        <button>World</button>
      </Link>
      <Link to="/map">
        <button>Map</button>
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
