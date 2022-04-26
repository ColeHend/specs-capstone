import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./locationSideBar";
import MainWindow from "./locationMainWin";
function Location(props) {
  const [currGroup, setCurrGroup] = useState("");
  const { theWorld } = props;
  function getID() {
    if (theWorld.world_id) {
      const { user_id, world_id } = theWorld;
      return { user_id, world_id };
    } else {
      const world_id = window.location.pathname.replace("/world/", "");
      const user_id = localStorage.getItem("user_id");
      console.log(user_id, world_id);
      return { user_id, world_id };
    }
  }
  const { user_id, world_id } = getID();
  useEffect(() => {
    axios
      .get(`/api/world/${user_id}/${world_id}`)
      .then((dbRes) => {})
      .catch((err) => console.log(err));
  }, [user_id, world_id]);
  return (
    <div>
      <div className="worldNameText">{theWorld.world_name}</div>
      <div className="locationWindow">
        <div className="sideBar">
          <SideBar
            currGroup={currGroup}
            setCurrGroup={setCurrGroup}
            theWorld={theWorld}
          />
        </div>
        <div className="mainWindow">
          {currGroup !== "" ? (
            <MainWindow currGroup={currGroup} />
          ) : (
            "Please Select a group"
          )}
        </div>
      </div>
    </div>
  );
}

export default Location;
