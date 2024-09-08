import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//axis helper
const axEsHelper = new THREE.AxesHelper();
scene.add(axEsHelper);

const grid = new THREE.GridHelper(100, 25, "red", "blue");
grid.color = "red";
scene.add(grid);

//Textures
const textureLoader = new THREE.TextureLoader();

//floor
const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_diff_2k.jpg"
);
const floorARMTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_arm_2k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_nor_gl_2k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_disp_2k.jpg"
);

floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

//Wall

const wallColorTexture = textureLoader.load(
  "/wall/textures/brick_pavement_02_diff_1k.jpg"
);
const wallARMTexture = textureLoader.load(
  "/wall/textures/brick_pavement_02_arm_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "/wall/textures/brick_pavement_02_nor_gl_1k.jpg"
);

wallColorTexture.repeat.set(2, 2);
wallColorTexture.wrapS = THREE.RepeatWrapping;
wallColorTexture.wrapT = THREE.RepeatWrapping;
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

wallARMTexture.repeat.set(2, 2);
wallARMTexture.wrapS = THREE.RepeatWrapping;
wallARMTexture.wrapT = THREE.RepeatWrapping;

wallNormalTexture.repeat.set(2, 2);
wallNormalTexture.wrapS = THREE.RepeatWrapping;
wallNormalTexture.wrapT = THREE.RepeatWrapping;

//Roof

const roofColorTexture = textureLoader.load(
  "/roof/textures/roof_07_diff_1k.jpg"
);
const roofARMTexture = textureLoader.load("/roof/textures/roof_07_arm_1k.jpg");
const roofNormalTexture = textureLoader.load(
  "/roof/textures/roof_07_nor_gl_1k.jpg"
);

roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofARMTexture.repeat.set(3, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;

roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;

//Bush

const bushColorTexture = textureLoader.load(
  "/bush/textures/forest_leaves_03_diff_1k.jpg"
);
const bushARMTexture = textureLoader.load(
  "/bush/textures/forest_leaves_03_arm_1k.jpg"
);
const bushNormalTexture = textureLoader.load(
  "/bush/textures/forest_leaves_03_nor_gl_1k.jpg"
);

bushColorTexture.repeat.set(2, 1);
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushARMTexture.repeat.set(2, 1);
bushARMTexture.wrapS = THREE.RepeatWrapping;

bushNormalTexture.repeat.set(2, 1);
bushNormalTexture.wrapS = THREE.RepeatWrapping;

//Grave

const graveColorTexture = textureLoader.load(
  "/grave/textures/gravel_concrete_03_diff_1k.jpg"
);
const graveARMTexture = textureLoader.load(
  "/grave/textures/gravel_concrete_03_arm_1k.jpg"
);
const graveNormalTexture = textureLoader.load(
  "/grave/textures/gravel_concrete_03_nor_gl_1k.jpg"
);

graveColorTexture.repeat.set(2, 1);
graveColorTexture.wrapS = THREE.RepeatWrapping;
graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveARMTexture.repeat.set(2, 1);
graveARMTexture.wrapS = THREE.RepeatWrapping;

graveNormalTexture.repeat.set(2, 1);
graveNormalTexture.wrapS = THREE.RepeatWrapping;

//Door

const doorcolorTexture = textureLoader.load("/door/color.jpg");
const dooralphaTexture = textureLoader.load("/door/alpha.jpg");
const doorambientOcclusionTexture = textureLoader.load(
  "/door/ambientOcclusion.jpg"
);
const doorheightTexture = textureLoader.load("/door/height.jpg");
const doornormalTexture = textureLoader.load("/door/normal.jpg");
const doormetalnessTexture = textureLoader.load("/door/metalness.jpg");
const doorroughnessTexture = textureLoader.load("/door/roughness.jpg");

doorcolorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */

//Floor
const floorGeometry = new THREE.PlaneGeometry(34, 34, 100, 100);
const floor = new THREE.Mesh(
  floorGeometry,
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    roughnessMap: floorARMTexture,
    aoMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.5,
  })
);
floor.rotation.x = -Math.PI / 2;

scene.add(floor);

//House container
const house = new THREE.Group();
scene.add(house);

//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    roughnessMap: wallARMTexture,
    aoMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y = 1.75;
house.add(walls);

//roof

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4, 2, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    roughnessMap: roofARMTexture,
    aoMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = 4.5;
roof.rotation.y = Math.PI / 4;

house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: dooralphaTexture,
    map: doorcolorTexture,
    aoMap: doorambientOcclusionTexture,
    displacementMap: doorheightTexture,
    normalMap: doornormalTexture,
    metalnessMap: doormetalnessTexture,
    roughnessMap: doorroughnessTexture,
    displacementScale: .1,
  })
);
door.position.z = 2.001;
door.position.y = 1.1;
scene.add(door);

//Bushes
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushColorTexture,
  roughnessMap: bushARMTexture,
  aoMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 23, 23),
  bushMaterial
);

bush1.position.x = 2.2;
bush1.rotation.z = 0.7;
bush1.position.y = 0.2;

const bush2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 23, 23),
  bushMaterial
);

bush2.position.x = 2.2;
bush2.position.z = 0.8;
bush2.position.y = 0.2;
bush2.rotation.z = 0.7;

house.add(bush1, bush2);

const graveGeometry = new THREE.BoxGeometry(0.7, 2, 0.3);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  roughnessMap: graveARMTexture,
  aoMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
const graves = new THREE.Group();

scene.add(graves);

for (let i = 0; i < 10; i++) {
  const angle = Math.PI * 2 * Math.random();
  const radius = 4 + Math.random() * 7;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.z = z;

  grave.rotation.y = (Math.random() - 0.5) * Math.PI;
  grave.rotation.x = Math.random() * 0.2;
  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.2);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff",  1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
