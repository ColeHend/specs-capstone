import React from "react";
import Canvas from "./canvas";
// import { UserContext } from "../../App";
import "./map.css";
function Map() {
  // const { userInfo } = React.useContext(UserContext);

  return (
    <div id="map">
      <Canvas />
    </div>
  );
}
export default Map;
