/* ===================================================================
   Hero Three.js Scene
   A drifting, rotating mannequin model with depth-of-field
   particle field. Reacts to pointer movement and scroll.
   =================================================================== */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('heroCanvas');
if (canvas) initScene();

function initScene() {

  /* ---------- core ---------- */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0d14, 0.045);

  const camera = new THREE.PerspectiveCamera(
    42, window.innerWidth / window.innerHeight, 0.1, 100
  );
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0b0d14, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x1a1f30, 0.55));

  const keyLight = new THREE.DirectionalLight(0xede4d3, 1.6);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x4d6db4, 1.7);
  rimLight.position.set(-6, 2, -3);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x7a98d8, 0.8, 18);
  fillLight.position.set(0, -3, 4);
  scene.add(fillLight);

  /* ---------- New Mannequin Model ---------- */
  const modelGroup = new THREE.Group();
  scene.add(modelGroup);

  modelGroup.position.y = -0.5;
  modelGroup.scale.set(2.5, 2.5, 2.5);

  const loader = new GLTFLoader();
  loader.load('/models/model.glb',
    (gltf) => {
      const mannequin = gltf.scene;
      mannequin.position.set(0, 0, 0);
      mannequin.rotation.y = 0;
      mannequin.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.color.setHex(0x87ceeb));
          } else {
            child.material.color.setHex(0x87ceeb);
          }
        }
      });
      modelGroup.add(mannequin);
      console.log('✅ Mannequin loaded');
    },
    (xhr) => console.log(`Loading model: ${(xhr.loaded / xhr.total * 100)}%`),
    (error) => console.error('❌ Error loading model:', error)
  );

  /* ---------- particle field ---------- */
  const particleCount = 1400;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    sizes[i] = Math.random() * 1.6 + 0.4;
  }

  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  partGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const partMat = new THREE.PointsMaterial({
    color: 0xc8bfae,
    size: 0.025,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  /* ---------- pointer + scroll reactivity ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollY = 0;

  window.addEventListener('pointermove', (e) => {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();

  function tick() {
    const t = clock.getElapsedTime();

    // ease pointer
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    // model slow rotation + pointer parallax
    modelGroup.rotation.y = Math.sin(t * 0.25) * 0.5 + pointer.x * 0.4;
    modelGroup.rotation.x = Math.sin(t * 0.18) * 0.18 + pointer.y * 0.18;
    modelGroup.rotation.z = Math.sin(t * 0.12) * 0.06;
    modelGroup.position.y = Math.sin(t * 0.6) * 0.12 - scrollY * 0.001;

    // particles drift
    particles.rotation.y = t * 0.012;
    particles.rotation.x = t * 0.005;

    // camera drifts on scroll
    camera.position.y = -scrollY * 0.0025;
    camera.lookAt(0, camera.position.y * 0.4, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}
