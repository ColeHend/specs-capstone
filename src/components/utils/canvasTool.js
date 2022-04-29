let isDragging = false;
let dragStart = { x: 0, y: 0 };

let MAX_ZOOM = 5;
let MIN_ZOOM = 0.1;
let SCROLL_SENSITIVITY = 0.0005;

let initialPinchDistance = null;
let cameraZoom = 1;
let lastZoom = cameraZoom;
let cameraOffset = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
class CanvasTools {
  constructor(context, canvas) {
    this.ctx = context;
    this.canvas = canvas;
  }
  drawRect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);
  }

  drawText(text, x, y, size, font) {
    this.ctx.font = `${size}px ${font}`;
    this.ctx.fillText(text, x, y);
  }
  touchStart(e) {
    return handleTouch(e, onPointerDown);
  }
  touchEnd(e) {
    return handleTouch(e, onPointerUp);
  }
  touchMove(e) {
    return handleTouch(e, onPointerMove);
  }
  theWheel(e) {
    return adjustZoom(e.deltaY * SCROLL_SENSITIVITY);
  }

  addEventListen() {
    this.canvas.addEventListener("mousedown", onPointerDown);
    this.canvas.addEventListener("mouseup", onPointerUp);
    this.canvas.addEventListener("mousemove", onPointerMove);

    this.canvas.addEventListener("touchstart", this.touchStart);
    this.canvas.addEventListener("touchend", this.touchEnd);
    this.canvas.addEventListener("touchmove", this.touchMove);
    this.canvas.addEventListener("wheel", this.theWheel);
  }
  removeEventListen() {
    this.canvas.removeEventListener("mousedown", onPointerDown);
    this.canvas.removeEventListener("mouseup", onPointerUp);
    this.canvas.removeEventListener("mousemove", onPointerMove);
    this.canvas.removeEventListener("touchstart", this.touchStart);
    this.canvas.removeEventListener("touchend", this.touchEnd);
    this.canvas.removeEventListener("touchmove", this.touchMove);
    this.canvas.removeEventListener("wheel", this.theWheel);
  }
  draw() {
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;

    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(cameraZoom, cameraZoom);
    this.ctx.translate(
      -this.canvas.width / 2 + cameraOffset.x,
      -this.canvas.height / 2 + cameraOffset.y
    );
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    requestAnimationFrame(this.draw);
  }
}
function handlePinch(e) {
  e.preventDefault();

  let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };

  // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
  let currentDistance = (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

  if (initialPinchDistance == null) {
    initialPinchDistance = currentDistance;
  } else {
    adjustZoom(null, currentDistance / initialPinchDistance);
  }
}
function adjustZoom(zoomAmount, zoomFactor) {
  if (!isDragging) {
    if (zoomAmount) {
      cameraZoom += zoomAmount;
    } else if (zoomFactor) {
      console.log(zoomFactor);
      cameraZoom = zoomFactor * lastZoom;
    }

    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);

    console.log(zoomAmount, cameraZoom);
  }
}
function handleTouch(e, singleTouchHandler) {
  if (e.touches.length == 1) {
    singleTouchHandler(e);
  } else if (e.type == "touchmove" && e.touches.length == 2) {
    isDragging = false;
    handlePinch(e);
  }
}
function onPointerDown(e) {
  isDragging = true;
  dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
  dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
  isDragging = false;
  initialPinchDistance = null;
  lastZoom = cameraZoom;
}

function onPointerMove(e) {
  if (isDragging) {
    cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x;
    cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y;
  }
}
function getEventLocation(e) {
  if (e.touches && e.touches.length == 1) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  } else if (e.clientX && e.clientY) {
    return { x: e.clientX, y: e.clientY };
  }
}
module.exports = CanvasTools;
