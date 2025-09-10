import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {
  // Render Area
  const w = window.innerWidth;
  const h = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  +renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.appendChild(renderer.domElement);

  // Camera Settings
  const fov = 75;
  const aspect = w / h;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  // Scene
  const sceneThree = new THREE.Scene();

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;

  // Setting up Geometry
  const geo = new THREE.IcosahedronGeometry(1.0, 2);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  sceneThree.add(mesh);
  // Add Wireframe
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const wireMesh = new THREE.Mesh(geo, wireMat);
  wireMesh.scale.setScalar(1.001);
  mesh.add(wireMesh);
  // Lighting
  const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
  sceneThree.add(hemiLight);

  function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(sceneThree, camera);
    controls.update();
  }

  animate();
}

export default App;
