// @ts-nocheck
import "./App.css";
import React, { useState } from "react";
import TheHeader from "./components/header/theHeader";
import Navbar from "./components/nav/navbar";
import LoginBar from "./components/nav/loginbar";
import localInfo from "./components/utils/localinfo";
import { Routes, Route } from "react-router-dom";
import Home from "./components/homePage/home";
import World from "./components/worldPage/world";
import Map from "./components/mapPage/map";
import Profile from "./components/profilePage/profile";
function App() {
  const theInfo = localInfo();
  const [editInfo, setEditInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(theInfo.username ? true : false);
  return (
    <div className="App">
      <div>
        <TheHeader />
      </div>
      <div>
        {isLoggedIn ? <Navbar /> : <LoginBar setIsLoggedIn={setIsLoggedIn} />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/world"
          element={
            isLoggedIn ? <World step={"new"} editInfo={editInfo} /> : <Home />
          }
        />
        <Route
          path="/world/:id"
          element={
            isLoggedIn ? <World step={"edit"} editInfo={editInfo} /> : <Home />
          }
        />
        <Route path="/map" element={isLoggedIn ? <Map /> : <Home />} />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile editInfo={{ editInfo, setEditInfo }} />
            ) : (
              <Home />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
