import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
 import { Sky } from "three/addons/objects/Sky.js";
/**
 * Base
 */
// Debug
 
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//axis helper
const axEsHelper = new THREE.AxesHelper();
scene.add(axEsHelper);

const grid = new THREE.GridHelper(100, 25, "red", "blue");
grid.color = "red";
// scene.add(grid);

//Textures
const textureLoader = new THREE.TextureLoader();

//floor
const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_diff_2k.webp"
);
const floorARMTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_arm_2k.webp"
);
const floorNormalTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_nor_gl_2k.webp"
);
const floorDisplacementTexture = textureLoader.load(
  "/floor/textures/coast_land_rocks_01_disp_2k.webp"
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
  "/wall/textures/brick_pavement_02_diff_1k.webp"
);
const wallARMTexture = textureLoader.load(
  "/wall/textures/brick_pavement_02_arm_1k.webp"
);
const wallNormalTexture = textureLoader.load(
  "/wall/textures/brick_pavement_02_nor_gl_1k.webp"
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
  "/roof/textures/roof_07_diff_1k.webp"
);
const roofARMTexture = textureLoader.load("/roof/textures/roof_07_arm_1k.webp");
const roofNormalTexture = textureLoader.load(
  "/roof/textures/roof_07_nor_gl_1k.webp"
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
  "/bush/textures/forest_leaves_03_diff_1k.webp"
);
const bushARMTexture = textureLoader.load(
  "/bush/textures/forest_leaves_03_arm_1k.webp"
);
const bushNormalTexture = textureLoader.load(
  "/bush/textures/forest_leaves_03_nor_gl_1k.webp"
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
  "/grave/textures/gravel_concrete_03_diff_1k.webp"
);
const graveARMTexture = textureLoader.load(
  "/grave/textures/gravel_concrete_03_arm_1k.webp"
);
const graveNormalTexture = textureLoader.load(
  "/grave/textures/gravel_concrete_03_nor_gl_1k.webp"
);

graveColorTexture.repeat.set(2, 1);
graveColorTexture.wrapS = THREE.RepeatWrapping;
graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveARMTexture.repeat.set(2, 1);
graveARMTexture.wrapS = THREE.RepeatWrapping;

graveNormalTexture.repeat.set(2, 1);
graveNormalTexture.wrapS = THREE.RepeatWrapping;

//Door

const doorcolorTexture = textureLoader.load("/door/color.webp");
const dooralphaTexture = textureLoader.load("/door/alpha.webp");
const doorambientOcclusionTexture = textureLoader.load(
  "/door/ambientOcclusion.webp"
);
const doorheightTexture = textureLoader.load("/door/height.webp");
const doornormalTexture = textureLoader.load("/door/normal.webp");
const doormetalnessTexture = textureLoader.load("/door/metalness.webp");
const doorroughnessTexture = textureLoader.load("/door/roughness.webp");

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
    displacementScale: 0.1,
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

for (let i = 0; i < 33; i++) {
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
const ambientLight = new THREE.AmbientLight("#86cdff", 0.4);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 0.5);
directionalLight.position.set(3, 2, -12);
scene.add(directionalLight);

const doorLight = new THREE.PointLight("#ff8f0f", 5);

doorLight.position.z = 2.4;
doorLight.position.y = 3.49;
house.add(doorLight);

//Ghosts

const ghost1 = new THREE.PointLight("#addfba", 3);
const ghost2 = new THREE.PointLight("#54d8a7", 5);
const ghost3 = new THREE.PointLight("#e6a200", 1);
scene.add(ghost1, ghost2, ghost3);
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

//shadows

//renderer
renderer.shadowMap.enabled = true;

//cast and recieve

directionalLight.castShadow = true;
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
roof.receiveShadow = true;
floor.receiveShadow = true;

ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

//Mapping

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 12;
directionalLight.shadow.camera.right = 12;
directionalLight.shadow.camera.bottom = -12;
directionalLight.shadow.camera.left = -12;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 24;

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(directionalLightHelper, directionalLightCameraHelper);

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

//Fog

// scene.fog = new THREE.Fog("#0f0f0f", 10, 13);
scene.fog = new THREE.FogExp2("#08343f", 0.05);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();
  //ghosts

  const ghost1Angle = elapsedTime / 2;
  ghost1.position.x = Math.cos(ghost1Angle) * 5;
  ghost1.position.z = Math.sin(ghost1Angle) * 5;
  ghost1.position.y =
    Math.abs(
      Math.sin(ghost1Angle) *
        Math.sin(ghost1Angle * 5) *
        Math.sin(ghost1Angle * 2.3)
    ) + 0.3;

  const ghost2Angle = -elapsedTime / 2 + 2;
  ghost2.position.x = Math.cos(ghost2Angle) * 8;
  ghost2.position.z = Math.sin(ghost2Angle) * 8;
  ghost2.position.y =
    Math.abs(
      Math.sin(ghost2Angle) *
        Math.sin(ghost2Angle * 1.3) *
        Math.sin(ghost2Angle * 2.3)
    ) + 0.3;

  const ghost3Angle = elapsedTime / 4 - 2;
  ghost3.position.x = Math.cos(ghost3Angle) * 11;
  ghost3.position.z = Math.sin(ghost3Angle) * 11;
  ghost3.position.y =
    Math.abs(
      Math.sin(ghost3Angle) *
        Math.sin(ghost3Angle * 2.3) *
        Math.sin(ghost3Angle * 2.3)
    ) + 0.3;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
