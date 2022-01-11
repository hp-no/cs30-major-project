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
let v = 1;
let selected; //temp.
let mouseLocation;
let blockArray = [];

let theMode = "view"; // allows for a single key to trigger multiple functions depending on the mode

//grid parameters
let gridSize = 20;
let grid;
let cellSize;

//camera parameters
let cameraZ = -50; //-100
let centerX = 0; //50
let centerY = 0;
let centerZ = 50; //75

function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95, WEBGL);
  angleMode(DEGREES);
  // cellSize = height/gridSize;
  cellSize = 15;
  grid = createEmpty3DArray(gridSize, gridSize, gridSize);
  selected = new Selection();
}

function draw() {
  background(220);
  // displayObject();
  // rotationMovement();
  displayCamera();
 
  // perspectiveMovement();
  display3DGrid();
  

}

function keyPressed() {
  // if (key === "w") { // up
  //   select.moveTo(select.x, select.y-1);
  // }
  // if (key === "a") { // left
  //   select.moveTo(select.x-1, select.y);
  // }
  // if (key === "s") { // down
  //   select.moveTo(select.x, select.y+1);
  // }
  // if (key === "d") { // right
  //   select.moveTo(select.x+1, select.y);
  // }

}


function mousePressed() { //rename later
  // mouseLocation = {mouseX, mouseY};
  
  let cellX = Math.floor(mouseX/cellSize);
  let cellY = Math.floor(mouseY/cellSize);

  let cellZ = Math.floor(mouseY/cellSize);

  if (grid[cellZ][cellY][cellX] === 0) {
    grid[cellZ][cellY][cellX] = 1;
  }
  else if (grid[cellZ][cellY][cellX] === 1) {
    grid[cellZ][cellY][cellX] = 0;
  }
}

function displayCamera() {
  translate(0, 0, 0);
  // camera(-150 , -300, cameraZ, //-150, -300, camZ
  //   centerX, centerY, centerZ,
  //   0, 1, 0);
  // camera(0, 0, cameraZ, centerX, centerY, centerZ, 0, 1, 0); // explore the functions of the last 3 parameters

  camera(-200, -200, -150, //dist.
    0, 0, 50,
    0, 1, 0);

  // camera(-100, -100, -50,
  //   0, 0, 50,
  //   0, 1, 0);

}

function display3DGrid() { //find a way to center the grid to 0, 0
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {
        if (grid[z][y][x] === 0) {
          // fill("white");
          let theBlock = new Block(x,y,z,cellSize,"white");
          theBlock.display();
          blockArray.push(theBlock);
        }
        else if (grid[z][y][x] === 1) {
          // fill("black"); 
          let theBlock = new Block(x,y,z,cellSize,"black");
          theBlock.display();
          blockArray.push(theBlock);
        }
        else if (grid[z][y][x] === 2) {
          //empty space
          let theBlock = new Block(x,y,z,cellSize,"white");
          blockArray.push(theBlock);
        }
      }
    }
  }
}

function createEmpty3DArray(rows, cols, layers) {
  //currently a "randomized" 3D array
  let grid = [];
  for (let z=0; z<layers; z++) {
    grid.push([]);
    for (let y=0; y<rows; y++) {
      grid[z].push([]);
      for (let x=0; x<cols; x++) {
        //create random 3D array
        if (random(100) < 50) {
          grid[z][y].push(2);
        }
        else if (random(100) > 50) {
          grid[z][y].push(1);
        }
        else {
          grid[z][y].push(0);
        }
        
      }
    }
  }
  return grid;
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
  if (theMode === "view") {
    // if (keyIsDown(87)) { // 'w' or move forward
    //   if (cameraZ > 80) {
    //     cameraZ -= 7;
    //   }
    // }
  
    // if (keyIsDown(83)) { // 's' or move backward 
    //   if (cameraZ < 400) {
    //     cameraZ += 10;
    //   }
    // } 
  
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
  //temp.
  // if (keyIsDown(RIGHT_ARROW)) {
  //   v -= 1;
  // }
  // if (keyIsDown(LEFT_ARROW)) {
  //   v += 1;
  // }
}

class Selection { //temp. for testing
  constructor(x, y, z, cellSize) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = cellSize;
  }

  display() {
    grid[this.z][this.y][this.x] = 3;
  }

  moveTo() {
    //... add remaining code here
    x
  }
}

class Block {
  constructor(x, y, z, cellSize, theColor) {
    this.x = x*cellSize;
    this.y = y*cellSize;
    this.z = z*cellSize;
    this.size = cellSize;
    this.theColor = theColor; //placeholder used for testing
  }

  display() {
    push();
    // v = !v;
    translate(this.x*v, this.y*v, this.z*v); //sets the xyz location for each box
    stroke(200);
    fill(this.theColor);
    box(this.size);
    pop();
  }
}

//Note: perspective movement for looking left-right/up-down based off of mouse movement?
// --> would make it so that wasd keys would be used for moving forward-backward/left-right

// --> center the grid (translucent --> transparent)
// --> **array for all the boxes (makes addition(?) and deletion of boxes more efficient) --> objects?