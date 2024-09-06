import gsap from "gsap";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//ANIMATION

gsap.to(mesh.position, {
  duration: 1,
  delay: 1,
  x: 2,
});

gsap.to(mesh.position, {
  duration: 2,
  delay: 2,
  x: -2,
});

gsap.to(mesh.position, {
  duration: 2,
  delay: 4,
  x: 0,
});

// const clock = new THREE.Clock();

const animate = () => {
  //   const elapsedTime = clock.getElapsedTime();
  //   mesh.rotation.y  = elapsedTime;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();
