import React from "react";
import localInfo from "../utils/localinfo";
import "./home.css";
function Home() {
  return <div className="homeBody">{JSON.stringify(localInfo())}</div>;
}

export default Home;
