// CS30 Major Project: (temporary title)
// Your Name
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// variables
let cubeGrid, gridHelper, mouse, raycaster, selectedBlock = null, controls, inputColor;
let gridSize = 10;
let spacing = 1;

let screen = "empty"; //temp.-- replace with title/menu screen later..

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

// grid guidelines/assistance
gridHelper = new THREE.GridHelper(20, 20, 0xff0000);
scene.add(gridHelper);

let edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
scene.add(line);



function loadSceneSetup() {
  // scene stuff (camera, background, lights, etc)
  camera.position.set(13, 13, 13);
  camera.lookAt(0,0,0);
  scene.background = new THREE.Color("lightgrey");
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add(directionalLight);
}

function loadCubeSetup () {
  // create a grid of cubes
  cubeGrid = new THREE.Object3D();
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {
        //create box
        let box = new THREE.Mesh(new THREE.SphereGeometry(), // new THREE.Mesh(new THREE.CubeGeometry(1,1,1)
          new THREE.MeshToonMaterial({color: 0x00ffff})); //aqua color
        box.position.set((x-gridSize/2) * spacing, (y-gridSize/2) * spacing, (z-gridSize/2) * spacing);
        // //create box outline
        // let boxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
        // let outline = new THREE.LineSegments(boxEdges, new THREE.LineBasicMaterial({color: 0xffffff}));
        // outline.position.set((x-gridSize/2) * spacing, (y-gridSize/2) * spacing, (z-gridSize/2) * spacing);

        cubeGrid.add(box);
        // cubeGrid.add(outline);
      }
    }
  }
  scene.add(cubeGrid);
  
}

function resetMaterials() {
  for (let i=0; i<grid.children.length; i++) {
    if (grid.children[i].material) {
      // grid.children[i] === selectedBlock ? grid.children[i].material.color.set(0x0080ff) : grid.children[i].material.color.set(0x00ffff);
      
      if (grid.children[i].material.color !== inputColor) {
        grid.children[i].material.color.set(0x00ffff);
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
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubeGrid.children);
  for (let i=0; i<intersects.length; i++) {
    intersects[i].object.material.transparent = true;
    intersects[i].object.material.opacity = 0;
    wait(250); // pauses for a quarter of a second before deleting another block/area
  }
}

function paintBlock() { // when the 'c' key is down
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubeGrid.children);
  for (let i=0; i<intersects.length; i++) {
    if (intersects[i].object.material.opacity !== 0) {
      intersects[i].object.material.color.set(inputColor.color);
    }
  }
}

function animate() {
  resetMaterials(); //uncomment later for selection function
  hoverBlock();
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates, (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) { //possible selection function
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(cubeGrid.children);
  if (intersects.length > 0) {
    // selectedBlock = intersects[0].object;
    // intersects[0].object.material.opacity = 0;

  }
}

// Wait function Ver. 1 --> stops code execution
// a potential method to slow down/delay the sculpt-deletion process, multiple layers are not deleted all at once
function wait(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  while (currentDate - date < milliseconds) {
    currentDate = Date.now;
  }
}

// Wait function Ver. 2 --> Makes async events sync using the Promise class; doesn't stop rest of code from executing
function waitAlt(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

animate();
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onClick);


//temp space for global varibles for p5.js:
let cubeButton, sphereButton, flatButton, sceneryButton;

function setup() {
  cubeButton = {
    x: width/3,
    y: height/2,
  };

  // user can pick any color value for their "paintbrush" color
  inputColor = createColorPicker("#ed225d");
  inputColor.position(width*0.95, height/2);
}

function draw() {
//   if (screen === "selectionMenu") {
//     //
//   }

//   if () { //when cubeButton pressed
//     loadSceneSetup();
//     loadCubeSetup();
//   }
//   if () { //when sphereButton pressed
//     loadSceneSetup();
//     loadSphereSetup();
//   }
//   if () { //when flatButton pressed
//     loadSceneSetup();
//     loadFlatSetup();
//   }

// //when returned to the selection/title menu
//   if () { //if previous menu was the cubeGrid
//     scene.remove(cubeGrid);
//   }

  //enabling sculpt function
  if (keyIsDown(90)) {  // 'z' key
    sculptBlock();
  }
  if (keyIsDown(67)) { // 'c' key
    paintBlock();
  }
}