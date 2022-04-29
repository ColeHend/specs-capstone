import React from "react";
import Canvas from "./canvas";
// import { UserContext } from "../../App";
import "./map.css";
function Map() {
  // const { userInfo } = React.useContext(UserContext);

  function drawImageScaled(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      img.width * ratio,
      img.height * ratio
    );
  }
  return (
    <div id="map">
      <Canvas draw={drawImageScaled} />
    </div>
  );
}
export default Map;
