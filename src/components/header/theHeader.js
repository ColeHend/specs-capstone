import React from "react";
import localInfo from "../utils/localinfo";
import { Link } from "react-router-dom";
import "./header.css";
export default function TheHeader(props) {
  let theInfo = localInfo();
  return (
    <div className="theHeader">
      <Link to="/">
        <h2 id="headerText">
          Hello Welcome {theInfo.username ? theInfo.username : ""}
        </h2>
      </Link>
    </div>
  );
}
