import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./nav.css";
export default function Navbar(props) {
  const logout = () => {
    axios.post("http://localhost:4000/logout").then((dbRes) => {
      window.location.assign("/logout");
      window.location.assign("/");
    });
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
      <Link to="/logout">
        <button onClick={logout}>Logout</button>
      </Link>
    </div>
  );
}
