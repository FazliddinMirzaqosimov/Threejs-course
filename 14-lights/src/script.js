import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Lights
 */
//Comes from everywhere
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// //Points light from position to objects
// const pointLight = new THREE.PointLight(0xffffff, 50);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// //Points light form one direction parallel sunlight effect

// const directionalLight = new THREE.DirectionalLight("white",.9)
// directionalLight.position.x = 2;
// directionalLight.position.y = 3;
// directionalLight.position.z = 4;

// scene.add(directionalLight)

// // green will be light color red will be dark color
// const hemisphereLight = new THREE.HemisphereLight('green','red', 0.9);
// scene.add(hemisphereLight)

// // light will comes from one point to all direction and light  starts fading from center to distance
// const pointLight = new THREE.PointLight("aqua", 20);
// pointLight.position.x = 2;
// pointLight.position.y = 2;
// pointLight.position.z = 2;

// scene.add(pointLight);

// light will comes from one point to all direction and light  starts fading from center to distance

// // light comes from rectangle light source and it works only in standart and physical materials

// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 12, 2, 12);
// rectAreaLight.position.set(2, 2, 2);
//  scene.add(rectAreaLight);


const spotLight = new THREE.SpotLight("rwhiteed", 50, 16, Math.PI * .1, 0.35, 1);
spotLight.position.set(2, 2, 2);
scene.add(spotLight);

spotLight.target.position.x = -1 
scene.add(spotLight.target)

//Helpers will help to see position of the light source

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);
// rectAreaLight.lookAt(sphere.position);

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
camera.position.x = -4;
camera.position.y = 1;
camera.position.z = 2;
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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
