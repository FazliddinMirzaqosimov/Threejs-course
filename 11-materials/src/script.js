import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

//GIU
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// // LIGHTS
// const ambientLight = new THREE.AmbientLight("white", 0.1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight("white", 23);
// pointLight.position.x = 3;
// pointLight.position.y = 3;
// pointLight.position.z = 3;

// scene.add(pointLight);

//Environment

const rgbeloader = new RGBELoader();

rgbeloader.load("./textures/environmentMap/2k.hdr", (env) => {
  env.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = env;
  scene.environment = env;
});

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

//TEXTURES

const loader = new THREE.TextureLoader();

const doorColorTexture = loader.load("./textures/door/color.jpg");
const doorALphaTexture = loader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = loader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = loader.load("./textures/door/height.jpg");
const doorMetalnessTexture = loader.load("./textures/door/metalness.jpg");
const doorNormalTexture = loader.load("./textures/door/normal.jpg");
const doorRoughnessTexture = loader.load("./textures/door/roughness.jpg");
const matcapTexture = loader.load("./textures/matcaps/3.png");
const gradientTexture = loader.load("./textures/gradients/5.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// //MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color("red");
// material.wireframe = true;

// //OPACITY
// material.transparent = true;
// material.opacity = .5;
// material.alphaMap = doorALphaTexture;
// material.side = THREE.DoubleSide;

// //MeshNormalMaterial MATERIAL
// const material = new THREE.MeshNormalMaterial();

//  material.flatShading = true

// //MeshMatcapMaterial MATERIAL
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture

// //MeshDepthMaterial MATERIAL
// const material = new THREE.MeshDepthMaterial();

// //MeshLambertMaterial MATERIAL
// const material = new THREE.MeshLambertMaterial();

// //MeshPhongMaterial MATERIAL
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 23;
// material.specular = new THREE.Color("red");

// //MeshToonMaterial MATERIAL
// gradientTexture.magFilter = THREE.NearestFilter;
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// //MeshStandardMaterial MATERIAL
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1
// material.roughness =1
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// // material.aoMapIntensity = 2;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture
// material.normalScale.set(1,1)
// material.alphaMap = doorALphaTexture
// material.transparent = true

//MeshStandardMaterial MATERIAL
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0.1;
material.roughness = 0.2;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// // material.aoMapIntensity = 2;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(1, 1);
// material.alphaMap = doorALphaTexture;
// material.transparent = true;

gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);
// gui.add(material, "displacementScale").min(0).max(1).step(0.001);

// //Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, "clearcoat").min(0).max(1).step(0.001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.001);

// //Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.3;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, "sheen").min(0).max(1).step(0.001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.001);
// gui.addColor(material, "sheenColor")

//iridescence
material.iridescence = 1;
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];

gui.add(material, "iridescence").min(0).max(1).step(0.0001);
gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.001);
gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

//Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(0).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

material.side = THREE.DoubleSide;
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
);

const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.6, 0.3, 45, 45),
  material
);
torusMesh.position.x = 112.5;

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material
);
planeMesh.position.x = -12121.5;

scene.add(sphereMesh, planeMesh, torusMesh);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  66,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
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

  sphereMesh.rotation.y = 0.03 * elapsedTime;
  torusMesh.rotation.y = 0.03 * elapsedTime;
  planeMesh.rotation.y = 0.03 * elapsedTime;

  sphereMesh.rotation.z = -0.03 * elapsedTime;
  torusMesh.rotation.z = -0.03 * elapsedTime;
  planeMesh.rotation.z = -0.03 * elapsedTime;

  sphereMesh.rotation.x = -0.03 * elapsedTime;
  torusMesh.rotation.x = -0.03 * elapsedTime;
  planeMesh.rotation.x = -0.03 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
