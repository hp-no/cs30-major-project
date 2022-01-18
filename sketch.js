// CS30 Major Project: (temporary title)
// Your Name
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// variables
let grid, gridHelper, mouse, raycaster, selectedBlock = null, controls;
let gridSize = 10;
let spacing = 1;

let state = "empty"; //temp.-- replace with title/menu screen later..

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




// function keyTyped() { //temporary function, replace with a button + mousePressed combo later...
//   if (key === "c") { // the ' c ' key
//     loadCubeSetup();
//     state = "cube";
//   } 
// }

// function loadCubeSetup () {

  // scene stuff (camera, background, lights, etc)
  camera.position.set(13, 13, 13);
  camera.lookAt(0,0,0);
  scene.background = new THREE.Color("lightgrey");
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add(directionalLight);

  // create a grid of cubes
  grid = new THREE.Object3D();
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

        grid.add(box);
        // grid.add(outline);
      }
    }
  }
  scene.add(grid);
  
// }

// grid guidelines/assistance
gridHelper = new THREE.GridHelper(20, 20, 0xff0000);
scene.add(gridHelper);

let edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
scene.add(line);


function resetMaterials() {
  for (let i=0; i<grid.children.length; i++) {
    if (grid.children[i].material) {
      // grid.children[i].material.color = grid.children[i] === selectedBlock ? grid.children[i].material.color.set(0x0080ff) : grid.children[i].material.color.set(0x00ffff);
      grid.children[i].material.color.set(0x00ffff);
    }
  }
}

function hoverBlock() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(grid.children);
  for (let i=0; i<intersects.length; i++) {
    intersects[0].object.material.transparent = true;
    intersects[0].object.material.color.set(0x0080ff);
  }
}

function sculptBlock() { // when 'z' key is down
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(grid.children);
  for (let i=0; i<intersects.length; i++) {
    intersects[i].object.material.transparent = true;
    intersects[i].object.material.opacity = 0;
  }
}

function animate() {
  resetMaterials(); //uncomment later for selection function
  hoverBlock();
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// mouse position detection
function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

//selection function
function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(grid.children);
  if (intersects.length > 0) {
    // selectedBlock = intersects[0].object;
    // intersects[0].object.material.opacity = 0;
  }
}

window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onClick);


// function setup() {
//   createCanvas(windowWidth*0.85, windowHeight*0.95);

function draw() {
  if (keyIsDown(90)) {  // 'z' key
    sculptBlock();
  }
}
