// CS30 Major Project: (temporary title)
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Use setCamera() function for an opneing menu screen? or a finished product showcase?
//Nice to have: a room of containing all created pieces to walk and look around in
let speed = 10;

function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95, WEBGL);
}

function draw() {
  background(220);
  if (keyIsDown(65)) {
    rotateY(speed * 0.01);
  }
  // rotateY(frameCount * 0.01);
  fill("orange");
  sphere(width*0.1, 16, 4);
  // rotationMovement();
}

function rotationMovement() {
  if (keyIsDown(65)) {
    speed += 5;
  }
  if (keyIsPressed(LEFT_ARROW)) {
    rotateY(1000 * 0.01);
  }
  if (keyIsDown(68)) {
    rotateY(-3 * 0.01);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rotateY(-3 * 0.01);
  }
}
