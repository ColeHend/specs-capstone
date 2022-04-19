import "./App.css";
import React, { useState } from "react";
import TheHeader from "./components/theHeader";
import Navbar from "./components/navbar";
import LoginBar from "./components/loginbar";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <TheHeader />
      {isLoggedIn ? <Navbar /> : <LoginBar />}
    </div>
  );
}

export default App;
