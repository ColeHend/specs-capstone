import React, { useRef, useEffect } from "react";
import { UserContext } from "../../App";
import { getEventLocation } from "./canvasTools";
const Canvas = (props) => {
  const { userInfo } = React.useContext(UserContext);
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [mapMove, setMapMove] = React.useState({ x: 0, y: 0 });
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [mapScale, setMapScale] = React.useState(3);
  const [cameraOffset, setCameraOffset] = React.useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    setCameraOffset({ x: canvas.width / 2, y: canvas.height / 2 });
    const image1 = new Image();
    image1.src = userInfo.map_img_link;
    //-canvas.width / 2 + cameraOffset.x
    function drawImage(img, ctx) {
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
        0 + (-canvas.width / 2 + pan.x),
        0 + (-canvas.height / 2 + pan.y),
        img.width * ratio * mapScale,
        img.height * ratio * mapScale
      );
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(image1, context);
  }, [userInfo, pan, mapScale]);

  const onClickMove = (e) => {
    //onClick to drag
    const mouse = { x: e.clientX, y: e.clientY };
    setIsDragging(true);

    setDragStart({
      x: mouse.x / mapScale - cameraOffset.x,
      y: mouse.y / mapScale - cameraOffset.y,
    });
  };

  const onDragMove = (e) => {
    // currently dragging

    if (isDragging) {
      const mouse = { x: e.clientX, y: e.clientY };
      const toMove = {
        x: mouse.x / mapScale - dragStart.x,
        y: mouse.y / mapScale - dragStart.y,
      };

      setPan(toMove);
    }
  };

  const offClickMove = (e) => {
    // stop dragging
    const mouse = { x: e.clientX, y: e.clientY };
    setIsDragging(false);
    setCameraOffset({
      x: mouse.x / mapScale - dragStart.x,
      y: mouse.y / mapScale - dragStart.y,
    });
    console.log(
      "mapInfo",
      JSON.stringify({ dragStart, mapScale, mapMove, pan }),
      e
    );
    // setPan({ ...moveAmnt });
  };

  const onWheelHandle = (e) => {
    if (e.deltaY > 0) {
      setMapScale(mapScale + 0.25);
    } else {
      if (mapScale >= 1) {
        setMapScale(mapScale - 0.25);
      }
    }
  };
  return (
    <canvas
      onMouseMove={onDragMove}
      onMouseUp={offClickMove}
      onMouseDown={onClickMove}
      onWheel={onWheelHandle}
      ref={canvasRef}
      {...rest}
    />
  );
};
export default Canvas;
