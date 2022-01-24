// CS30 Major Project: (temporary title)
// Hannah Dechavez
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// variables
let cubeGrid, paintCanvas, mouse, raycaster, controls, inputColor, theColor;
let cubeImg, canvasImg, brushIcon, chiselIcon, bgm;
let cubeButton, canvasButton, instructions, text1, text2, text3, text4;

let gridSize = 15;
let spacing = 1;

let cDown = false;
let cubeLoaded = false;
let canvasLoaded = false;
let showControls = false;

let screen = "selectionMenu";

// three.js setup initialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement) ;
scene.background = new THREE.Color("lightgrey");

//variables for mouse interaction
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
controls = new THREE.OrbitControls(camera, renderer.domElement); // mouse-drag camera movement

// scene setup
camera.position.set(7, 6.5, 8);
camera.lookAt(0,0,0)
scene.background = new THREE.Color("lightgrey");

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(directionalLight);

  // display small center cube
  if (!canvasLoaded) {
    let edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
    let centerCube = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
    scene.add(centerCube);
  }

function loadCubeSetup () {
  camera.position.set(17, 17, 17);
  directionalLight.position.set(5, 5, 0);

  // create a grid of cubes
  cubeGrid = new THREE.Object3D();
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {

        let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
          new THREE.MeshToonMaterial({color: 0xffffff})); // white
        box.position.set((x-gridSize/2) * spacing, (y-gridSize/2) * spacing, (z-gridSize/2) * spacing);

        cubeGrid.add(box);
        // cubeGrid.add(outline);
      }
    }
  }
  scene.add(cubeGrid);
  cubeLoaded = true;
}

function loadPaintCanvas() {
  camera.position.set(0, 4, 40);
  camera.lookAt(20, 20, 0);
  directionalLight.position.set(0, 0, 5);

  // camera.position.set(0, 1, 15);
  // camera.lookAt(10, 10, 0);

  // create a grid of cubes
  paintCanvas = new THREE.Object3D();
  for (let y=-21; y<34; y++) { //-1 to 14
    for (let x= -25; x<37; x++) { //-5 to 17

        let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
          new THREE.MeshToonMaterial({color: 0xffffff})); //blank sheet
        box.position.set((x-gridSize/2) * spacing, (y-gridSize/2) * spacing, 0 * spacing);

        paintCanvas.add(box);
        // cubeGrid.add(outline);
      }
    }
  scene.add(paintCanvas);
  canvasLoaded = true;
}

function resetMaterials() {
  if (cubeGrid) {
    for (let i=0; i<cubeGrid.children.length; i++) {
      if (cubeGrid.children[i].material) {
        // cubeGrid.children[i] === selectedBlock ? cubeGrid.children[i].material.color.set(0xffffff) : cubeGrid.children[i].material.color.set(0x00ffff);

        // if (cDown) {
        // //
        // }
        // else if (cubeGrid.children[i].material.color.equals(0x0080ff)) {
        //   cubeGrid.children[i].material.color.set(0x00ffff);
        // }
      }
    }
  }
}

function resetShape() {
  if (cubeLoaded) { // reset cube
    for (let i=0; i<cubeGrid.children.length; i++) {
      if (cubeGrid.children[i].material) {
        cubeGrid.children[i].material.opacity = 1;
        cubeGrid.children[i].material.color.set(0xffffff);
      }
    }
  }

  if (canvasLoaded) { // reset or clear paint canvas
    for (let i=0; i<paintCanvas.children.length; i++) {
      if (paintCanvas.children[i].material) {
        paintCanvas.children[i].material.opacity = 1;
        paintCanvas.children[i].material.color.set(0xffffff);
      }
    }
  }
}

function hoverBlock() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubeGrid.children);
  for (let i=0; i<intersects.length; i++) {
    intersects[0].object.material.transparent = true;
    intersects[0].object.material.color.set(0x0080ff);
  }
  
}

function sculptBlock() { // when 'z' key is down
  if (cubeLoaded) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubeGrid.children);
    for (let i=0; i<intersects.length; i++) {
      intersects[i].object.material.transparent = true;
      intersects[i].object.material.opacity = 0;
    }
  }
}

function paintBlock() { // when the 'c' key is down
  raycaster.setFromCamera(mouse, camera);
  if (cubeLoaded) {
    const intersectsCube = raycaster.intersectObjects(cubeGrid.children);
    for (let i=0; i<intersectsCube.length; i++) { 
      if (intersectsCube[i].object.material.opacity !== 0) {
      intersectsCube[i].object.material.color.set(0xdfff00);
      }
    }
  }
  else if (canvasLoaded) {
    const intersectsCanvas = raycaster.intersectObjects(paintCanvas.children);
    for (let i=0; i<intersectsCanvas.length; i++) { 
      if (intersectsCanvas[i].object.material.opacity !== 0) {
      intersectsCanvas[i].object.material.color.set(0xdfff00);
      }
    }
  }
  
}

function animate() {
  resetMaterials(); //uncomment later for selection function
  // hoverBlock();
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates, (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// function onClick(event) { 
//   raycaster.setFromCamera(mouse, camera);
//   let intersects = raycaster.intersectObjects(sphereGrid.children);
//   if (intersects.length > 0) {
//     scene.remove(sphereGrid.children[0]);
//   }
// }

animate();
window.addEventListener("mousemove", onMouseMove, false);
// window.addEventListener("click", onClick);


function preload() {
  soundFormats("mp3");
  bgm = createAudio("assets/late-night-radio.mp3");

  cubeImg = loadImage("assets/cube-image.png");
  canvasImg = loadImage("assets/easel-icon.png");
  brushIcon = loadImage("assets/paintbrush.png");
  chiselIcon = loadImage("assets/chisel.png");
}


function setup() {
  createCanvas(windowWidth/13, windowHeight);

  cubeButton = new Button(width*0.125, height*0.40, width*0.75, height*0.12, cubeImg);
  canvasButton = new Button(width*0.125, height*0.55, width*0.75, height*0.12, canvasImg);

  // create a button to toggle captions for control keys
  instructions = createButton("Controls");
  instructions.position(width*0.2, windowHeight*0.7);
  instructions.mousePressed(displayControls);

}

function draw() {
  background("indigo");
  bgm.loop(); // loop background music

  displaySidebar();
  enableTools();
}

function mouseClicked() {
  // if side buttons are pressed:
  if (cubeButton.isPressed() && !cubeLoaded) {
    if (canvasLoaded) {
      scene.remove(paintCanvas);
      canvasLoaded = false;
    }
    loadCubeSetup();
  }
  if (canvasButton.isPressed() && !canvasLoaded) {
    if (cubeLoaded) {
      scene.remove(cubeGrid);
      cubeLoaded = false;
    }
    loadPaintCanvas();
  }
}

function displayControls() {
  showControls = !showControls;
  if (showControls) {
    text1 = createP("Hold ' Z ' to sculpt    **Cannot use on the flat canvas");
    text2 = createP("Hold ' C ' to paint");
    text3 = createP("Press ' SPACEBAR ' to completely clear/reset any changes made");
    text4 = createP("---Click the 'Controls' again to hide menu");
   
    text1.style("font-size", "10pt");
    text2.style("font-size", "10pt");
    text3.style("font-size", "10pt");
    text4.style("font-size", "10pt");
  
    text1.position(140, height-100);
    text2.position(140, height-80);
    text3.position(140, height-60);
    text4.position(140, height-40);
  }
  else {
    text1.remove();
    text2.remove();
    text3.remove();
    text4.remove();
  }

}

function displaySidebar() {
  cubeButton.display();
  canvasButton.display();

  rect(0, height*0.865, 120, 60);
  image(chiselIcon, width*0.09, height*0.87, 50, 50);
  image(brushIcon, width*0.5, height*0.873, 50, 50);
}

function enableTools() {
   // sculpt function
   if (keyIsDown(90)) {  // 'z' key
    sculptBlock();
  }

  // paint function
  if (keyIsDown(67)) { // 'c' key
    cDown = true;
    paintBlock();
  }
  else {
    cDown = false;
  }
}

function keyPressed() {
  if (keyCode === 32) { // SPACEBAR key
    resetShape();
  }
}


class Button {
  constructor(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = image;
  }

  display() {
    if (screen = "selectionMenu") {
      stroke(100);
      strokeWeight(2);
      fill("white");
      rect(this.x, this.y, this.width, this.height);
      image(this.image, this.x, this.y-3, this.width, this.width);
    }
  }

  remove() {
    erase();
    rect(this.x-1, this.y-1, this.width+2, this.height+2);
    noErase();
  }

  isPressed() {
    return (mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.y && mouseY < this.y + this.height);
  }
}

//put this in a credits section later...

//BGM Music Used:

/* "Late Night Radio" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/ */