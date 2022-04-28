import React, { useContext } from "react";
import { UserContext } from "../../../App";
import AddLocation from "./addLocation";
import Group from "./group";
// import axios from "axios";
function MainWindow(props) {
  const { userInfo } = useContext(UserContext);
  const { addingGroup } = props.addingGroup;
  return (
    <div>
      <div>{addingGroup ? <Group theWorld={userInfo} /> : <span></span>}</div>
      <div>{!addingGroup ? <AddLocation /> : <span></span>}</div>
    </div>
  );
}

export default MainWindow;
