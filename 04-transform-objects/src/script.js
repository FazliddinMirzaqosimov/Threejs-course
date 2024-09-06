import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// /**
//  * Objects
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// //POSITION
// mesh.position.x = 0.7;
// mesh.position.y = 1;
// mesh.position.z = 0;

// // mesh.position.set(0.7,1,0)

// // // make mesh position 1
// // mesh.position.normalize()

// //SCALE
// mesh.scale.x = 1.4;
// mesh.scale.y = 1.1;
// mesh.scale.z = 1;

// // mesh.scale.set( 1.4,1.1,1)

// //ROTATION

// mesh.rotation.reorder("XYZ")
// mesh.rotation.y = 1.3;
// mesh.rotation.x = 1.3;
// mesh.rotation.z = 1.3;

//Group

const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
cube1.position.x = -2;


const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1.1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "aqua" })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1.1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
cube3.position.x = 2;


group.add(cube1,cube2,cube3)


group.position.y = 2

group.rotation.y = 0.4

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 0.5;
camera.position.y = 0.1;
camera.position.z = 5;

// //Looking at the  object
// camera.lookAt(mesh.position)

scene.add(camera);

// //get distance between camera and mesh
// console.log(mesh.position.distanceTo(camera.position));

//Axes helper

const axisHelper = new THREE.AxesHelper();

scene.add(axisHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
