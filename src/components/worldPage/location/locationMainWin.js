import React, { useContext } from "react";
import { UserContext } from "../../../App";
import AddLocation from "./addLocation";
import EditLocation from "./editLocation";
import EditNPC from "./editNpc";
import EditGroup from "./editGroup";
import AddNpc from "./addNpc";
import Group from "./group";
// import axios from "axios";
function MainWindow(props) {
  const { editHold } = props.editHold;
  const { userInfo } = useContext(UserContext);
  const { addingGroup } = props.addingGroup;
  return (
    <div>
      <div>
        {addingGroup === "group" ? (
          <Group theWorld={userInfo} />
        ) : (
          <span></span>
        )}
      </div>
      <div>{addingGroup === "location" ? <AddLocation /> : <span></span>}</div>
      <div>{addingGroup === "npc" ? <AddNpc /> : <span></span>}</div>

      <div>
        {addingGroup === "editLocation" ? (
          <EditLocation editHold={editHold} />
        ) : (
          <span></span>
        )}
      </div>
      <div>
        {addingGroup === "editNPC" ? (
          <EditNPC editHold={editHold} />
        ) : (
          <span></span>
        )}
      </div>
      <div>
        {addingGroup === "editGroup" ? (
          <EditGroup editHold={editHold} />
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default MainWindow;
