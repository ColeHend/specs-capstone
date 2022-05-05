import React from "react";
import "./home.css";
function Home() {
  const homeStyle = {
    border: "1px solid #000",
    margin: "10px auto 0px auto",
    width: "min-content",
    minWidth: "30vw",
  };
  return (
    <div className="homeBody">
      <div style={homeStyle}>
        <h3>Welcome to my World Creator</h3>
        <p>Here to help you organize your world.</p>
      </div>
    </div>
  );
}

export default Home;
