import React, { useRef, useEffect } from "react";
import { UserContext } from "../../App";
const Canvas = (props) => {
  const [cameraOffset, setCameraOffset] = React.useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [mapMove, setMapMove] = React.useState({ x: 0, y: 0 });
  const [scaleFactor, setScaleFactor] = React.useState(0.2);
  const [isDragging, setIsDragging] = React.useState(false);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const { userInfo } = React.useContext(UserContext);
  const [mapScale, setMapScale] = React.useState(3);
  const contextRef = useRef(null);
  const canvasRef = useRef(null);

  const { placeMark, setPlaceMark } = props.placeMark;
  const { markers } = props.markers;
  const { draw, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    setCameraOffset({ x: canvas.width / 2, y: canvas.height / 2 });
    const image1 = new Image();
    image1.src = userInfo.map_img_link;
    const blackDot = new Image();
    blackDot.src = "./Dot.png";

    //-canvas.width / 2 + cameraOffset.x
    function drawImage(
      img,
      ctx,
      dX = 0,
      dY = 0,
      imgSW = img.width,
      imgSH = img.height,
      imgW = img.width,
      imgH = img.height
    ) {
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.min(hRatio, vRatio);
      ctx.drawImage(
        img,
        0,
        0,
        imgW,
        imgH,
        dX + (-canvas.width / mapScale + pan.x),
        dY + (-canvas.height / mapScale + pan.y),
        imgSW * ratio * mapScale,
        imgSH * ratio * mapScale
      );
    }
    function drawMarkers(ctx, markers) {
      markers.map((marker) => {
        const dotWidth = image1.width / 70;
        const leMark = {
          x: 0,
          y: 0,
        };
        leMark.x = marker.x / mapScale - ctx.canvas.width / dotWidth;
        leMark.y = marker.y / mapScale - ctx.canvas.height / dotWidth;
        return drawImage(
          blackDot,
          ctx,
          marker.x - leMark.x,
          marker.y - leMark.y,
          dotWidth,
          dotWidth
        );
      });
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(image1, context);
    if (markers.length > 0) {
      drawMarkers(context, markers);
    }
  }, [userInfo, pan, mapScale, markers, cameraOffset, scaleFactor]);

  const onClickMove = (e) => {
    if (placeMark.isPlacing === false) {
      //onClick to drag
      const mouse = { x: e.clientX, y: e.clientY };
      setIsDragging(true);

      setDragStart({
        x: mouse.x / mapScale - cameraOffset.x,
        y: mouse.y / mapScale - cameraOffset.y,
      });
    } else {
      setPlaceMark({ ...placeMark, x: e.clientX, y: e.clientY });
    }
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
    } else if (placeMark.isPlacing === true) {
      setPlaceMark({ ...placeMark, x: e.clientX, y: e.clientY });
    }
  };

  const offClickMove = (e) => {
    if (placeMark.isPlacing === false) {
      // stop dragging
      const mouse = { x: e.clientX, y: e.clientY };
      setIsDragging(false);
      setCameraOffset({
        x: mouse.x / mapScale - dragStart.x,
        y: mouse.y / mapScale - dragStart.y,
      });
      setMapMove({ ...mouse });
    } else {
      setPlaceMark({ ...placeMark, isPlacing: false });
    }
  };

  const onWheelHandle = (e) => {
    const wheelOffset = {
      x: e.clientX / mapScale - cameraOffset.x,
      y: e.clientY / mapScale - cameraOffset.y,
    };
    // const wheelPan = {
    //   x: canvasRef.current.width / mapScale,
    //   y: canvasRef.current.height / mapScale,
    // };
    if (e.deltaY > 0) {
      setScaleFactor(Math.abs(scaleFactor));
      setMapScale(mapScale + scaleFactor);
      setCameraOffset(wheelOffset);
      // setPan(wheelPan);
    } else {
      if (mapScale >= 1) {
        setScaleFactor(-Math.abs(scaleFactor));
        setMapScale(mapScale + scaleFactor);
        setCameraOffset(wheelOffset);
        // setPan(wheelPan);
      }
    }
  };
  return (
    <div>
      <canvas
        onMouseMove={onDragMove}
        onMouseUp={offClickMove}
        onMouseDown={onClickMove}
        onWheel={onWheelHandle}
        ref={canvasRef}
        {...rest}
      />
      <div>
        {JSON.stringify({
          mapScale,
          dragStart,
          mapMove,
          pan,
          isDragging,
        })}
      </div>
      <div>
        {JSON.stringify({
          ...userInfo,
          user_password: "",
          map_img_link: "...",
          markers,
        })}
      </div>
    </div>
  );
};
export default Canvas;
