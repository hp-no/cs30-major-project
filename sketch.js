// CS30 Major Project: (temporary title)
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Use setCamera() function for an opening menu screen? or a finished product showcase?
//Nice to have: a room of containing all created pieces to walk and look around in

//"object" is a temporary variable name for the art piece


//global variables
let speed = 10;
let objectdx = 0;
let objectdy = 0;

//camera parameters
let cameraZ = 0; //-100
let centerX = 0; //50
let centerY = -100;
let centerZ = 100; //75

function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  displayObject();
  rotationMovement();
  displayCamera();
  perspectiveMovement();
  displayBoxes();
}

function displayCamera() {
  translate(0, 0, 0);
  camera(-150 , -300, cameraZ, //-150, -300, camZ
    centerX, centerY, centerZ,
    0, 1, 0);
  // camera(0, 0, cameraZ, centerX, centerY, centerZ, 0, 1, 0); // explore the functions of the last 3 parameters
}

function displayBoxes() {
  for (let x=0; x<width; x+=20) {
    for (let z=0; z<height; z+=20) {
      push();
      translate(x-10, 0, z-10); //sets the xyz location for each box
      box(20);
      pop();
    }
  }
}

function displayObject() {
  rotateX(objectdx); // rotate(temp, createVector(width/2));
  rotateY(objectdy);
  push();
  stroke("brown");
  fill("orange");
  translate(100, -100, 100);
  sphere(width*0.1, 16, 4);
  pop();
}

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

function perspectiveMovement() {
  if (keyIsDown(87)) { // 'w' or move forward
    if (cameraZ > 80) {
      cameraZ -= 7;
    }
  }

  if (keyIsDown(83)) { // 's' or move backward 
    if (cameraZ < 400) {
      cameraZ += 10;
    }
  } 

  if (keyIsDown(65)) { // 'a' or turn left
    if (centerX > -400) {
      centerX -= 7;
    }
  } 

  if (keyIsDown(68)) { // 'd' or turn right
    if (centerX < 400) {
      centerX += 7;
    }
  }  

  if (keyIsDown(87)) { //  'w' or look up
    if (centerY < 400) {
      centerY -= 5;
    }
  }

  if (keyIsDown(83)) { // 's' or look down
    if (centerY > -400) {
      centerY += 5;
    }
  }
}

//Note: perspective movement for looking left-right/up-down based off of mouse movement?
// --> would make it so that wasd keys would be used for moving forward-backward/left-right