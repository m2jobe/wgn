import {
  EffectComposer,
  BloomEffect,
  SMAAEffect,
  RenderPass,
  EffectPass,
} from "postprocessing";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  HemisphereLight,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import Elsyium from "./objects/Elsyium";
import Moon from "./objects/Moon";
import Portal from "./objects/Portal";
import Orb from "./objects/Orb";
import OrbitControls from "./controls/OrbitControls";
import { preloader } from "./loader";
import { TextureResolver } from "./loader/resolvers/TextureResolver";
import { ImageResolver } from "./loader/resolvers/ImageResolver";
import { GLTFResolver } from "./loader/resolvers/GLTFResolver";

/* Custom settings */
const SETTINGS = {
  useComposer: true,
};
let composer;

/* Init renderer and canvas */
const container = document.body;
const renderer = new WebGLRenderer();
container.style.overflow = "hidden";
container.style.margin = 0;

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const controls = new OrbitControls(camera);
camera.position.y = 100;
camera.position.z = 40;
camera.rotation.z = Math.PI;
controls.enableDamping = true;
controls.dampingFactor = 0.15;
controls.minPolarAngle = Math.PI / 5;
controls.maxPolarAngle = Math.PI / 2;
//controls.minDistance = 20;
//controls.maxDistance = 600;
controls.start();

/* Lights */
const light = new HemisphereLight(0xc8c8c8, 0xffffff, 3);
//scene.add(light);
//light.position.set(0, 0, 0);

var elsyium = null;

/* Various event listeners */
window.addEventListener("resize", onResize);

/* Preloader */
preloader.init(new ImageResolver(), new GLTFResolver(), new TextureResolver());
preloader
  .load([
    { id: "searchImage", type: "image", url: SMAAEffect.searchImageDataURL },
    { id: "areaImage", type: "image", url: SMAAEffect.areaImageDataURL },
    { id: "elsyium", type: "gltf", url: "assets/models/elsyium.gltf" },
  ])
  .then(() => {
    initPostProcessing();
    onResize();
    animate();
    /* Actual content of thex scene */
    elsyium = new Elsyium();

    scene.add(elsyium);

    container.appendChild(renderer.domElement);
    renderer.setClearColor(0xffb6c1);

    // Hide Loader
    var loader = document.getElementById("loader");
    loader.style.display = "none";

    //Show To Elsyium Button

    var earthButton = document.getElementById("earthButton");
    earthButton.style.display = "block";
  });

/* -------------------------------------------------------------------------------- */
function initPostProcessing() {
  composer = new EffectComposer(renderer);
  const bloomEffect = new BloomEffect();
  const smaaEffect = new SMAAEffect(
    preloader.get("searchImage"),
    preloader.get("areaImage")
  );
  const effectPass = new EffectPass(camera, smaaEffect, bloomEffect);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  composer.addPass(effectPass);
  effectPass.renderToScreen = true;
}

/**
  Resize canvas
*/
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

/**
  RAF
*/
function animate() {
  window.requestAnimationFrame(animate);
  render();
}

/**
  Render loop
*/
function render() {
  controls.update();
  if (SETTINGS.useComposer) {
    composer.render();
  } else {
    renderer.clear();
    renderer.render(scene, camera);
  }

  // Post DEV tools
}
