import React, { useRef, useEffect } from "react";
import { UserContext } from "../../App";
import CanvasTools from "../utils/canvasTool";
const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);
  const { userInfo } = React.useContext(UserContext);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const canvasTools = new CanvasTools(context, canvas);
    canvasTools.draw();

    const image1 = new Image();
    image1.src = userInfo.map_img_link;
    draw(image1, context);

    canvasTools.addEventListen();
    return () => {
      canvasTools.removeEventListen();
    };
  }, [draw, userInfo]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
