import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import SideBar from "./locationSideBar";
import LocationList from "./locationList";
import MainWindow from "./locationMainWin";
function Location(props) {
  const { userInfo } = useContext(UserContext);
  const [currGroup, setCurrGroup] = useState("");
  const [theLocations, setTheLocations] = React.useState([]);
  const [addingGroup, setAddingGroup] = React.useState("group");
  const { theWorld } = props;
  const { user_id, world_id } = userInfo;
  useEffect(() => {
    axios
      .get(`/api/world/${user_id}/${world_id}`)
      .then((dbRes) => {})
      .catch((err) => console.log(err));
  }, [user_id, world_id]);
  return (
    <div className="mainWorldWindow">
      <div className="worldNameText">{theWorld.world_name}</div>
      <div className="locationWindow">
        <div className="sideBar">
          <SideBar
            currGroup={currGroup}
            setCurrGroup={setCurrGroup}
            theWorld={theWorld}
            setAddingGroup={setAddingGroup}
          />
        </div>
        <div className="mainWindow">
          <MainWindow
            currGroup={currGroup}
            addingGroup={{ addingGroup, setAddingGroup }}
          />
        </div>
        <div className="locationListWindow">
          <LocationList
            theLocations={{ theLocations, setTheLocations, setAddingGroup }}
          />
        </div>
      </div>
    </div>
  );
}

export default Location;
