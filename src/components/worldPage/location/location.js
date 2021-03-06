import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import SideBar from "./locationSideBar";
import LocationList from "./locationList";
import MainWindow from "./locationMainWin";
function Location(props) {
  const { userInfo } = useContext(UserContext);
  const [currGroup, setCurrGroup] = useState("");
  const [editHold, setEditHold] = useState({});
  const [theLocations, setTheLocations] = React.useState([]);
  const [addingGroup, setAddingGroup] = React.useState("group");
  const { theWorld } = props;
  const [theGroups, setTheGroups] = useState([]);
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
            theGroups={{ theGroups, setTheGroups }}
            editHold={{ editHold, setEditHold }}
            currGroup={currGroup}
            setCurrGroup={setCurrGroup}
            theWorld={theWorld}
            addingGroup={addingGroup}
            setAddingGroup={setAddingGroup}
          />
        </div>
        <div className="mainWindow">
          <MainWindow
            theGroups={{ theGroups, setTheGroups }}
            editHold={{ editHold, setEditHold }}
            currGroup={currGroup}
            setCurrGroup={setCurrGroup}
            addingGroup={{ addingGroup, setAddingGroup }}
          />
        </div>
        <div className="locationListWindow">
          <LocationList
            editHold={{ editHold, setEditHold }}
            theLocations={{ theLocations, setTheLocations, setAddingGroup }}
          />
        </div>
      </div>
    </div>
  );
}

export default Location;
