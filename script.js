import * as THREE from "three";
import * as WEBGL from "WebGL";

if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var xSize = 30;
var zSize = 40;
var height = 10;
var objectCount = xSize * zSize;
var diameter = 2;
var xOffset = diameter;
var zOffset = diameter;
var spacing = 0.1 * diameter;
var objTypes = {
  SPHERE: { diameter: diameter },
  CUBE: { length: diameter }
};
var currentType = objTypes.CUBE;
var sceneObjects = [];

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", onWindowResize, false);

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  xSize / 2,
  zSize * 3
);
camera.position.y = 2 * height;
scene.add(camera);

var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
var pointLight = new THREE.PointLight(0xffffff, 0.8);
scene.add(ambientLight);
camera.add(pointLight);

for (var i = 0; i < objectCount; i++) {
  var name = "object" + i;
  var obj, geometry, material;
  if (currentType === objTypes.SPHERE) {
    geometry = THREE.SphereGeometry(diameter - spacing, 12, 12);
  } else if (currentType === objTypes.CUBE) {
    geometry = THREE.BoxGeometry(
      diameter - spacing,
      diameter - spacing,
      diameter - spacing
    );
  }

  material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  obj = new THREE.Mesh(geometry, material);
  sceneObjects.push(obj);
  scene.add(obj);
}

animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  /**
  var timer = Date.now() * 0.0001;
  camera.position.x = Math.cos( timer ) * 800;
  camera.position.z = Math.sin( timer ) * 800;
  camera.lookAt( scene.position );
  scene.traverse( function ( object ) {
    if ( object.isMesh === true ) {
      object.rotation.x = timer * 5;
      object.rotation.y = timer * 2.5;
    }
  } );
  **/
  renderer.render(scene, camera);
}
