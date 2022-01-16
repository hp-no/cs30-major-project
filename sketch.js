// CS30 Major Project: (temporary title)
// Your Name
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//global variables
let rectColor = "white";

let colorArray = [0xff0000, 0xffbf00, 0x00ff00, 0x0080ff, 0xbf00ff, 0xff66ff, 0xff0080];
let cubeArray;
let currentCube = 0; // represents position within the cube array


// three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;



function setup() {
  createCanvas(windowWidth*0.85, windowHeight*0.95);

  button = createButton("Color change");
  button.position(width*0.20, height*0.9);
  button.mousePressed(changeCubeColor);

  cubeArray = createCubeArray();
  scene.add(cubeArray[0]);
}
function draw() {
  //p5js
  fill(rectColor)
  rect(width*0.15, height*0.86, 145, 75);

  //three.js
  renderer.render( scene, camera );
}

function animate() {
  requestAnimationFrame( animate );

  cubeArray[currentCube].rotation.x += 0.01;
  cubeArray[currentCube].rotation.y += 0.01;
}

animate();

function createCubeArray() {
  let theArray = [];
  for (let i=0; i<colorArray.length; i++) {
    //create different coloured cubes
    const geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial( { color: colorArray[i] } );
    const cube = new THREE.Mesh( geometry, material );

    theArray.push(cube);
  }
  return theArray;
}

function changeCubeColor() {
  scene.remove ( cubeArray[currentCube] ); // remove the current cube color
  if (currentCube === cubeArray.length-1) {
    currentCube = 0;
  }
  else {
    currentCube++;
  }
  scene.add ( cubeArray[currentCube] ) ; // add the next cube color
}