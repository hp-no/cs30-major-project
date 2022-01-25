// CS30 Major Project: (Draw/Art 3D)
// Hannah Dechavez
// January 25, 2022
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Variables
let cubeGrid, paintCanvas, mouse, raycaster, controls, inputColor;
let cubeImg, canvasImg, brushIcon, chiselIcon, bgm;
let cubeButton, canvasButton, instructions, text1, text2, text3, text4, text5, text6, text7;
let paintColorText, bgColorText;

let gridSize = 15;
let spacing = 1;
let theColor = 0xed225d;
let someColor = 0xd3d3d3;

let cDown = false;
let cubeLoaded = false;
let canvasLoaded = false;
let showControls = false;


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

// base scene setup
camera.position.set(7, 6.5, 8);
camera.lookAt(0,0,0);
scene.background = new THREE.Color(someColor);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(directionalLight);

// display small center cube
let edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
let centerCube = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
scene.add(centerCube);


function loadCubeSetup () {
  // scene setup for the cube
  camera.position.set(17, 17, 17);
  directionalLight.position.set(5, 5, 0);

  // create a 3D grid of cubes
  cubeGrid = new THREE.Object3D();
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {
        let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshToonMaterial({color: 0xffffff})); // white base colour
        box.position.set((x-gridSize/2) * spacing, (y-gridSize/2) * spacing, (z-gridSize/2) * spacing);

        cubeGrid.add(box);
      }
    }
  }
  scene.add(cubeGrid);
  scene.add(centerCube);
  cubeLoaded = true;
}

function loadPaintCanvas() {
  // scene setup for the paint canvas
  camera.position.set(0, 4, 40);
  camera.lookAt(20, 20, 0);
  directionalLight.position.set(0, 0, 5);

  // create a 2D grid of cubes
  paintCanvas = new THREE.Object3D();
  for (let y=-21; y<34; y++) { //-1 to 14
    for (let x= -25; x<37; x++) { //-5 to 17
      let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshToonMaterial({color: 0xffffff})); //blank sheet
      box.position.set((x-gridSize/2) * spacing, (y-gridSize/2) * spacing, 0 * spacing);

      paintCanvas.add(box);
    }
  }
  scene.add(paintCanvas);
  scene.remove(centerCube);
  canvasLoaded = true;
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

  if (canvasLoaded) { // reset/clear paint canvas
    for (let i=0; i<paintCanvas.children.length; i++) {
      if (paintCanvas.children[i].material) {
        paintCanvas.children[i].material.opacity = 1;
        paintCanvas.children[i].material.color.set(0xffffff);
      }
    }
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

  if (cubeLoaded) { //painting on the cube
    const intersectsCube = raycaster.intersectObjects(cubeGrid.children);
    for (let i=0; i<intersectsCube.length; i++) { 
      if (intersectsCube[i].object.material.opacity !== 0) {
        intersectsCube[i].object.material.color.set(theColor); // 0xdfff00
      }
    }
  }
  else if (canvasLoaded) { //painting on the easel/canvas
    const intersectsCanvas = raycaster.intersectObjects(paintCanvas.children);
    for (let i=0; i<intersectsCanvas.length; i++) { 
      if (intersectsCanvas[i].object.material.opacity !== 0) {
        intersectsCanvas[i].object.material.color.set(theColor);
      }
    }
  }
}

function animate() {
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
  bgm = loadSound("assets/late-night-radio.mp3");

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

  // add colour selection wheels for paintbrush and background
  inputColor = createColorPicker("#ed225d");
  inputColor.position(width*0.175, height*0.23);
  inputColor.size(75, 75);

  bgColor = createColorPicker("#d3d3d3");
  bgColor.position(width*0.175, height*0.17);
  bgColor.size(75, 30);
}

function draw() {
  background("indigo");
  displaySidebar();
  displayText();
  enableTools();
}

function mouseClicked() {
  // play background music
  if (!bgm.isPlaying()) {
    bgm.loop();
  }

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

function displayText() {
  paintColorText = createP("Brush colour");
  paintColorText.style("color", "lightgrey");
  paintColorText.style("font-size", "10pt");
  paintColorText.position(width*0.2, height*0.315);

  bgColorText = createP("BG colour");
  bgColorText.style("color", "lightgrey");
  bgColorText.style("font-size", "10pt");
  bgColorText.position(width*0.25, height*0.13);


}

function displayControls() {
  showControls = !showControls;
  if (showControls) { // display text for controls guide
    text1 = createP("Hold ' Z ' to sculpt    **Cannot use on the flat canvas");
    text2 = createP("Hold ' C ' to paint");
    text3 = createP("Press ' SPACEBAR ' to completely clear/reset any changes made");
    text4 = createP("---Click 'Controls' again to hide this menu");
    
    text5 = createP("Mouse LEFT-CLICK and DRAG to rotate camera");
    text6 = createP("Mouse RIGHT-CLICk and DRAG to move camera position");
    text7 = createP("Use mouse scroll-wheel to zoom-in/out");
   
    text1.style("font-size", "10pt");
    text2.style("font-size", "10pt");
    text3.style("font-size", "10pt");
    text4.style("font-size", "11pt");
    text5.style("font-size", "10pt");
    text6.style("font-size", "10pt");
    text7.style("font-size", "10pt");
  
    text1.position(140, height-110);
    text2.position(140, height-90);
    text3.position(140, height-70);
    text4.position(140, height-40);
    text5.position(550, height-110);
    text6.position(550, height-90);
    text7.position(550, height-70);
  }
  else { // hide text
    text1.remove();
    text2.remove();
    text3.remove();
    text4.remove();
    text5.remove();
    text6.remove();
    text7.remove();
  }

}

function displaySidebar() {
  cubeButton.display();
  canvasButton.display();

  rect(0, height*0.855, 120, 60);
  image(chiselIcon, width*0.09, height*0.86, 50, 50);
  image(brushIcon, width*0.5, height*0.863, 50, 50);
  fill("lightgrey");
  circle(width*0.25, height*0.965, 25); // indicator if sculpting is being done
  circle(width*0.75, height*0.965, 25); // indicator if paint function is being used
}

function enableTools() {
  // sculpt function
  if (keyIsDown(90)) {  // 'z' key
    sculptBlock();

    if (cubeLoaded) { //indicate that sculpting function is ON
      fill("lime");
      circle(width*0.25, height*0.965, 25);
    }
  }


  // paint function
  if (keyIsDown(67)) { // 'c' key
    cDown = true;
    paintBlock();

    if (cubeLoaded || canvasLoaded) { //indicate that paint function is ON
      fill("lime");
      circle(width*0.75, height*0.965, 25); 
    }
  }
  else {
    cDown = false;
  }

  // update current colors to the most recent user-inputted colors
  if (inputColor.value() !== theColor) {
    theColor = new THREE.Color(inputColor.value());
  }
  if (bgColor.value() !== someColor) {
    someColor = new THREE.Color(bgColor.value());
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
    stroke(100);
    strokeWeight(2);
    fill("white");
    rect(this.x, this.y, this.width, this.height);
    image(this.image, this.x, this.y-3, this.width, this.width);
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