import * as THREE from "three";

const sizes = {
  width: 600,
  height: 400,
};

//CANVAS
const canvas = document.querySelector(".webgl");

//SCENE
const scene = new THREE.Scene();

//OBJECT
const geom = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});
const mesh = new THREE.Mesh(geom, material);

scene.add(mesh);

//CAMERA

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;

scene.add(camera);

// RENDERER

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
