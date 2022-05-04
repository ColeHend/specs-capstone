// @ts-nocheck
import "./App.css";
import React, { useState, createContext } from "react";
import TheHeader from "./components/header/theHeader";
import Navbar from "./components/nav/navbar";
import LoginBar from "./components/nav/loginbar";
import localInfo from "./components/utils/localinfo";
import { Routes, Route } from "react-router-dom";
import Home from "./components/homePage/home";
import World from "./components/worldPage/world";
import Map from "./components/mapPage/map";
import Profile from "./components/profilePage/profile";

const UserContext = createContext();

function App() {
  const theInfo = localInfo();
  const [isLoggedIn, setIsLoggedIn] = useState(theInfo.username ? true : false);
  const [userInfo, setUserInfo] = useState({});
  const [editInfo, setEditInfo] = useState({});
  return (
    <div className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
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
              isLoggedIn ? <World step="new" editInfo={editInfo} /> : <Home />
            }
          />
          <Route
            path="/worldedit"
            element={
              isLoggedIn ? (
                <World step={"edit"} editInfo={editInfo} />
              ) : (
                <Home />
              )
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
          <Route path="/logout" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
