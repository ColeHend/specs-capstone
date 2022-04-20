// @ts-nocheck
import "./App.css";
import React, { useState } from "react";
import TheHeader from "./components/theHeader";
import Navbar from "./components/navbar";
import LoginBar from "./components/loginbar";
import axios from "axios";
function App() {
  const localInfo = () => {
    let user_id = window.localStorage.getItem("user_id");
    let username = window.localStorage.getItem("username");
    return { user_id, username };
  };
  const theInfo = localInfo();
  const [isLoggedIn, setIsLoggedIn] = useState(theInfo.username ? true : false);
  return (
    <div className="App">
      <TheHeader />
      {isLoggedIn ? <Navbar /> : <LoginBar setIsLoggedIn={setIsLoggedIn} />}
      {JSON.stringify(localInfo())}
    </div>
  );
}

export default App;
