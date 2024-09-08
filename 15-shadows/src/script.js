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

//Textures
const textureLoader = new THREE.TextureLoader();

const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
bakedShadow.colorSpace = THREE.SRGBColorSpace;
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");
simpleShadow.colorSpace = THREE.SRGBColorSpace;
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;
gui.add(directionalLight, "intensity").min(0).max(3).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

directionalLight.shadow.mapSize.width = 1024 * 2;
directionalLight.shadow.mapSize.height = 1024 * 2;
directionalLight.shadow.camera.near = 2;
directionalLight.shadow.camera.far = 8;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
// //makes shadow blurry
// directionalLight.shadow.radius = 10;

directionalLight.shadow.type = THREE.PCFShadowMap;

const directionalLightCamera = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCamera.visible = false;
scene.add(directionalLightCamera);

//Spotlight shadow
const spotLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI * 0.3);
spotLight.shadow.mapSize.width = 1024 * 2;
spotLight.shadow.mapSize.height = 1024 * 2;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 3;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);

spotLight.castShadow = true;

const spotlightCamera = new THREE.CameraHelper(spotLight.shadow.camera);
spotlightCamera.visible = false;
scene.add(spotlightCamera);

//Pointlight shadow
const pointLight = new THREE.PointLight(0xffffff, 12);
pointLight.castShadow = true;
pointLight.position.set(-2, 2, -2);

scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);

pointLightCameraHelper.visible = false;

scene.add(pointLightCameraHelper);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

const planeMaterial = new THREE.MeshBasicMaterial({ map: bakedShadow });
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    alphaMap: simpleShadow,
    color: "black",
    transparent: true,
  })
);

sphereShadow.rotation.x = -Math.PI / 2;
sphereShadow.position.y = plane.position.y + 0.001;

scene.add(sphere, plane, sphereShadow);

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
camera.position.x = 1;
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
renderer.shadowMap.enabled = false;
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.1;
  sphere.position.z = Math.sin(elapsedTime) * 1.1;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 5));

  //update the shadow
  sphereShadow.position.x = Math.cos(elapsedTime) * 1.1;
  sphereShadow.position.z = Math.sin(elapsedTime) * 1.1;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.7;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
