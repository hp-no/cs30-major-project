// Base Sample

//global variables
let grid;
let gridSize = 20;
let cellSize = 15;

// alt. variables:
let d = 1; // represents distance/spacing between blocks
let blockArray = [];
let selectQuadrant; //xy, xz, yz
// let select;

//alt. 2 variables:



function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95, WEBGL);
  angleMode(DEGREES);
  grid = create3DArray(gridSize, gridSize, gridSize);

  //alt.
  select = new Selection(gridSize, 10, 10);


}

function draw() {
  background(220);
  displayCamera();
  altDisplay3DGrid();
}

function displayCamera() {
  translate(width/2, height/2, 0);
  camera(-200, -200, -150, //dist.
    0, 0, 50,
    0, 1, 0);
}

function display3DGrid() {
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {
        if (grid[z][y][x] !== 0) { // if NOT an empty space (0 = empty)
          if (grid[z][y][x] === 1) {
            fill("white");
          }
          else if (grid[z][y][x] === 2) {
            fill("black"); 
          }
          else if (grid[z][y][x] === 9) {
            fill("blue");
          }
          push();
          translate(x, y, z); //sets the xyz location for each box
          stroke(200);
          box(cellSize);
          pop();
        }
      }
    }
  }
}

function create3DArray(rows, cols, layers) {
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



// Alternative Grid Method: //

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
    translate(this.x*d, this.y*d, this.z*d); //sets the xyz location for each box
    stroke(200);
    fill(this.theColor);
    box(this.size);
    pop();
  }
}

function altDisplay3DGrid() { // ALTERNATIVE way to display the grid
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {
        if (grid[z][y][x] === 0) {
          //empty space, doesn't use the block display function
          let theBlock = new Block(x,y,z,cellSize,"white");
          blockArray.push(theBlock);
        }
        else if (grid[z][y][x] === 1) {
          // fill("white");
          let theBlock = new Block(x,y,z,cellSize,"white");
          theBlock.display();
          blockArray.push(theBlock);
        }
        else if (grid[z][y][x] === 2) {
          // fill("black"); 
          let theBlock = new Block(x,y,z,cellSize,"black");
          theBlock.display();
          blockArray.push(theBlock);
        }
        else if (grid[z][y][x] === 9) { // fix
          // the "selection" block (not apart of the block array)
          push();
          translate(this.x*d, this.y*d, this.z*d); //sets the xyz location for each box
          stroke(200);
          fill(this.theColor);
          box(this.size + 0.5);
          pop();
        }
      }
    }
  }
}

function keyPressed() {
  //selection movement --> changes depending on the current quadrant
  if (key === "w") { // up
    if (selectQuadrant === "xy" || selectQuadrant === "yz") {
      select.moveto(select.x, select.y+1, select.z);
    }
    // else if (selectQuadrant === "xz") {
    //   select.moveto(select.x, select.y+1, select.z);
    // }
  }

  if (key === "a") { // left
    if (selectQuadrant === "xy") {
      select.moveto(select.x-1, select.y, select.z);
    }
    if (selectQuadrant === "yz") {
      select.moveto(select.x, select.y, select.z-1);
    }
  }
  
  if (key === "s") { // down
    if (selectQuadrant === "xy" || selectQuadrant === "yz") {
      select.moveto(select.x, select.y-1, select.z);
    }
    // else if (selectQuadrant === "xz") {
    //   select.moveto(select.x, select.y, select.z);
    // }
  }

}

function movementSorter(newGridPos) {
  if (newGridPos > gridSize-1) {
    return 1;
  }
  if (newGridPos < 0) {
    return gridSize-2;
  }
}

class Selection {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  display() {
    grid[this.z][this.y][this.x] = 9;
  }

  moveTo(newX, newY, newZ) { // use sliders for perspective, and picking for selection
    //check for the border/edge
    if (newX > gridSize-1 || newX < 0) {
      selectQuadrant = "yz";
      newZ = movementSorter(newX);
      newX = this.x;
    }
    if (newY > gridSize-1 || newY < 0) { // !
      if (this.z === gridSize-1) {
        newZ = movementSorter(-newY);
      }
      else {
        newZ = movementSorter(newY);
      }
      
      newY = this.y;
    }
    if (newZ > gridSize-1 || newZ < 0) {
      selectQuadrant = "xy";
      newX = movementSorter(newZ);
      newZ = this.z;
    }

    //make sure there is not an empty space before moving
    if (grid[newY][newX][newZ] !== 2) {
      this.x = newX;
      this.y = newY;
      this.z = newZ;
      grid[this.y][this.x][this.z] = 9;
    }
  }
}