// CS30 Major Project: (temporary title)
// Hannah Dechavez
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// variables
let cubeGrid, paintCanvas, gridHelper, mouse, raycaster, selectedBlock = null, controls, inputColor, theColor;
let cubeImg;
let gridSize = 15;
let spacing = 1;

let cDown = false;
let cubeLoaded = false;

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

// // grid guidelines/assistance
// gridHelper = new THREE.GridHelper(20, 20, 0xff0000);
// scene.add(gridHelper);

let edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
scene.add(line);

// scene setup


// function loadSceneSetup() {
  // scene stuff (camera, background, lights, etc)
  camera.position.set(0, 10, 10);
  camera.lookAt(0,0,0)
  scene.background = new THREE.Color("lightgrey");
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
// }


function loadCubeSetup () {
  screen = "creationMenu";
  camera.position.set(17, 17, 17);

  // create a grid of cubes
  cubeGrid = new THREE.Object3D();
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {

        let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
          new THREE.MeshToonMaterial({color: 0x00ffff})); //aqua color
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
  camera.position.set(0, 5, 40);
  camera.lookAt(20, 20, 0);

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

function resetCube() {
  for (let i=0; i<cubeGrid.children.length; i++) {
    if (cubeGrid.children[i].material) {
      cubeGrid.children[i].material.opacity = 1;
      cubeGrid.children[i].material.color.set(0x00ffff);
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
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubeGrid.children);
  for (let i=0; i<intersects.length; i++) {
    intersects[i].object.material.transparent = true;
    intersects[i].object.material.opacity = 0;
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
  else {
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


//temp space for global varibles for p5.js:
let cubeButton, sphereButton, flatButton, sceneryButton, theCanvas;


function preload() {
  cubeImg = loadImage("assets/cube-image.png");
}

function setup() {
  let height = 100;
  createCanvas(windowWidth/13, windowHeight);
  cubeButton = new Button(width*0.125, windowHeight/2, width*0.75, windowHeight*0.1);

  loadPaintCanvas();

  // // use for base canvas color instead?
  // inputColor = createColorPicker("#ed225d");
  // inputColor.position(width*0.95, height/2);

// //when returned to the selection/title menu
//   if () { //if previous menu was the cubeGrid
//     scene.remove(cubeGrid);
//   }

}

function draw() {
  background("grey");
  currentScreen();
  enableTools();
  
}

function mouseClicked() {
    if (cubeButton.isPressed()) {
      cubeButton.remove();
      loadCubeSetup();

    }
}

function currentScreen() {
  if (screen === "selectionMenu") {
    cubeButton.display();
  }
}

function enableTools() {
   //enabling sculpt function
   if (keyIsDown(90)) {  // 'z' key
    sculptBlock();
  }

  //enabling paint function
  if (keyIsDown(67)) { // 'c' key
    cDown = true;
    paintBlock();
  }
  else {
    cDown = false;
  }
}

function keyPressed() {
  if (keyCode === 77 && cubeLoaded === false) { // M
    loadCubeSetup();
  }
  if (keyCode === 81) { // Q
    if (cubeLoaded) {
      resetCube();
    }
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y + h/2;
    this.width = w;
    this.height = h;
  }

  display() {
    if (screen = "selectionMenu") {
      noStroke();
      fill("white");
      rect(this.x, this.y, this.width, this.height);
      image(cubeImg, this.x, this.y, this.width, this.width);
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