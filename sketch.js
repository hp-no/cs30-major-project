// CS30 Major Project: (temporary title)
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Use setCamera() function for an opneing menu screen? or a finished product showcase?
//Nice to have: a room of containing all created pieces to walk and look around in

//"objec" is a temporary variable name for the art piece

let speed = 10;
let objectdx = 0;
let objectdy = 0;

function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  // rotate(temp, createVector(width/2));
  rotateX(objectdx);
  rotateY(objectdy);
  fill("orange");
  sphere(width*0.1, 16, 4);
  rotationMovement();
}

function displayObject() {}

function rotationMovement() {
  if (keyIsDown(RIGHT_ARROW)) {
    objectdy -= 2;
  }
  if (keyIsDown(LEFT_ARROW)) {
    objectdy += 2;
  }
  if (keyIsDown(UP_ARROW)) {
    objectdx += 2;
  }
  if (keyIsDown(DOWN_ARROW)) {
    objectdx -= 2;
  }
}
