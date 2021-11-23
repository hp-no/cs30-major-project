// CS30 Major Project: (temporary title)
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95, WEBGL);
}

function draw() {
  background(220);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  normalMaterial(); //placehodler material
  sphere();
}
