// CS30 Major Project - Cube Draw
// Hannah Dechavez
// January 25, 2022


// Variables
let cubeGrid, paintCanvas, mouse, raycaster, controls, inputColor, bgColor, removedObjects;
let cubeImg, canvasImg, brushIcon, chiselIcon, bgm;
let cubeButton, canvasButton, instructions, text1, text2, text3, text4, text5, text6, text7, text8;
let paintColorText, bgColorText;

let gridSize = 15;
let theColor = 0xed225d;
let currentBgValue = 0xd3d3d3;

let cDown = false;
let cubeLoaded = false;
let canvasLoaded = false;
let showControls = false;
let togglePreview = false;


// three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement) ;
scene.background = new THREE.Color("lightgrey");

//assigning variables for mouse interaction
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
controls = new THREE.OrbitControls(camera, renderer.domElement); // mouse-drag camera movement

// variable for storing deleted blocks
removedObjects = new THREE.Object3D();

// basic scene setup
camera.position.set(7, 6.5, 8);
camera.lookAt(0,0,0);
camera.layers.enableAll();
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(directionalLight);

// display small center cube
let edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
let centerCube = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
scene.add(centerCube);



function loadCubeSetup () {
  // scene setup for the cube
  camera.position.set(17, 17, 17);
  camera.lookAt(0,0,0);
  directionalLight.position.set(5, 5, 0);

  // create a 3D grid of cubes
  cubeGrid = new THREE.Object3D();
  for (let z=0; z<gridSize; z++) {
    for (let y=0; y<gridSize; y++) {
      for (let x=0; x<gridSize; x++) {
        let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshToonMaterial({color: 0xffffff})); // white base colour
        box.position.set((x-gridSize/2), (y-gridSize/2), (z-gridSize/2));

        cubeGrid.add(box);
      }
    }
  }

  // displays the cube grid by adding it to the scene
  scene.add(cubeGrid);
  cubeLoaded = true;
  togglePreview = false;

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
      box.position.set((x-gridSize/2), (y-gridSize/2), 0);

      paintCanvas.add(box);
    }
  }

  // displays the flat canvas by adding it to the scene
  scene.add(paintCanvas);
  canvasLoaded = true;

}

function resetShape() {
  // resets user changes made to the cube/canvas
  if (cubeLoaded) { // reset cube appearance
    for (let i=0; i<cubeGrid.children.length; i++) {
      if (cubeGrid.children[i].material) {
        cubeGrid.add(removedObjects);
        cubeGrid.children[i].material.color.set(0xffffff);
      }
    }
    // empty the removedObjects variable
    removedObjects = new THREE.Object3D; 
  }

  if (canvasLoaded) { // clear paint canvas
    for (let i=0; i<paintCanvas.children.length; i++) {
      if (paintCanvas.children[i].material) {
        paintCanvas.children[i].material.opacity = 1;
        paintCanvas.children[i].material.color.set(0xffffff);
      }
    }
  }
}

function sculptBlock() {
  // shapes the cube by deleting the intersected blocks
  raycaster.setFromCamera(mouse, camera);

  if (cubeLoaded) {
    const intersects = raycaster.intersectObjects(cubeGrid.children);
    for (let i=0; i<intersects.length; i++) {
      intersects[i].object.material.transparent = true;

      //store the removed objects in a variable
      removedObjects.add(intersects[0].object);
      cubeGrid.remove(intersects[0].object);
    }
  }
}

function paintBlock() {
  // paints the cube/canvas by changing the color of the intersected blocks
  raycaster.setFromCamera(mouse, camera);

  if (cubeLoaded) { //painting on the cube
    const intersectsCube = raycaster.intersectObjects(cubeGrid.children);
    for (let i=0; i<intersectsCube.length; i++) { 
      if (intersectsCube[i].object.material.opacity !== 0) {
        intersectsCube[0].object.material.color.set(theColor); // 0xdfff00
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

animate();
window.addEventListener("mousemove", onMouseMove, false);

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

  // create buttons to load the cube and paint canvas
  cubeButton = new Button(width*0.125, height*0.40, width*0.75, height*0.12, cubeImg);
  canvasButton = new Button(width*0.125, height*0.55, width*0.75, height*0.12, canvasImg);

  // create a button to toggle guide/instructions for control keys
  instructions = createButton("Controls");
  instructions.position(width*0.2, windowHeight*0.7);
  instructions.mousePressed(displayControls);

  // add color selection wheels for the paintbrush and background
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
  previewMode();
}

function mouseClicked() {
  // play background music
  if (!bgm.isPlaying()) {
    bgm.loop();
  }

  // loads the cube when button is pressed
  if (cubeButton.isPressed() && !cubeLoaded) {
    if (canvasLoaded) {
      scene.remove(paintCanvas);
      canvasLoaded = false;
    }
    loadCubeSetup();
  }

  // loads the canvas when button is pressed
  if (canvasButton.isPressed() && !canvasLoaded) {
    if (cubeLoaded) {
      scene.remove(cubeGrid);
      cubeLoaded = false;
    }
    loadPaintCanvas();
  }
}

function displayText() {
  // displays the text for the color wheels on the side bar
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
    text8 = createP("Press 'ENTER' to toggle ON/OFF preview mode  **Only for the cube")
   
    text1.style("font-size", "10pt");
    text2.style("font-size", "10pt");
    text3.style("font-size", "10pt");
    text4.style("font-size", "11pt");
    text5.style("font-size", "10pt");
    text6.style("font-size", "10pt");
    text7.style("font-size", "10pt");
    text8.style("font-size", "10pt");
  
    text1.position(140, height-110);
    text2.position(140, height-90);
    text3.position(140, height-70);
    text4.position(140, height-40);
    text5.position(550, height-110);
    text6.position(550, height-90);
    text7.position(550, height-70);
    text8.position(550, height-50);
  }
  else { // hides text
    text1.remove();
    text2.remove();
    text3.remove();
    text4.remove();
    text5.remove();
    text6.remove();
    text7.remove();
    text8.remove();
  }

}

function displaySidebar() {
  cubeButton.display();
  canvasButton.display();

  rect(0, height*0.855, 120, 60);
  image(chiselIcon, width*0.09, height*0.86, 50, 50);
  image(brushIcon, width*0.5, height*0.863, 50, 50);
}

function enableTools() {
  // enable sculpt function when held down
  if (keyIsDown(90)) {  // 'z' key
    sculptBlock();
    if (cubeLoaded) { //indicate that sculpting function is ON
      fill("lime");
      circle(width*0.25, height*0.965, 25);
    }
  }

  // enable paint function when held down
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
  if (bgColor.value() !== currentBgValue) {
    currentBgValue = bgColor.value();
    scene.background = new THREE.Color(bgColor.value());
  }
}

function previewMode() { // for cube
  if (togglePreview && cubeLoaded) {
    cubeGrid.rotation.x += 0.01;
    cubeGrid.rotation.y += 0.01;

  }
  else if (!togglePreview && cubeLoaded) {
    cubeGrid.rotation.x = 0;
    cubeGrid.rotation.y = 0;
  }
}

function keyPressed() {
  if (keyCode === 32) { // SPACEBAR key to reset shape/changes
    resetShape();
  }

  if (keyCode === 13) { // ENTER key to toggle preview mode for cube
    togglePreview = !togglePreview;

    if (togglePreview) { //hide controls
      showControls = true;
      displayControls();
    }
    if (cubeLoaded) { //reset camera position for cube
      camera.position.set(17, 17, 17);
      camera.lookAt(0, 0, 0);
    }
    
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

  isPressed() {
    return (mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.y && mouseY < this.y + this.height);
  }
}



//BGM Music Used:

/* "Late Night Radio" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/ */ 