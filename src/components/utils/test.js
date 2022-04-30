function addEventListen() {
  this.canvas.addEventListener("mousedown", this.onPointerDown);
  this.canvas.addEventListener("mouseup", this.onPointerUp);
  this.canvas.addEventListener("mousemove", this.onPointerMove);

  this.canvas.addEventListener("touchstart", this.touchStart);
  this.canvas.addEventListener("touchend", this.touchEnd);
  this.canvas.addEventListener("touchmove", this.touchMove);
  this.canvas.addEventListener("wheel", this.theWheel);
}
function removeEventListen() {
  this.canvas.removeEventListener("mousedown", this.onPointerDown);
  this.canvas.removeEventListener("mouseup", this.onPointerUp);
  this.canvas.removeEventListener("mousemove", this.onPointerMove);
  this.canvas.removeEventListener("touchstart", this.touchStart);
  this.canvas.removeEventListener("touchend", this.touchEnd);
  this.canvas.removeEventListener("touchmove", this.touchMove);
  this.canvas.removeEventListener("wheel", this.theWheel);
}
