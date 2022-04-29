import React, { useContext } from "react";
import { UserContext } from "../../../App";
import AddLocation from "./addLocation";
import AddNpc from "./addNpc";
import Group from "./group";
// import axios from "axios";
function MainWindow(props) {
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
    </div>
  );
}

export default MainWindow;
