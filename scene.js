/* ===================================================================
   Hero Three.js Scene
   A drifting, rotating denim "garment" sculpture with depth-of-field
   particle field. Reacts to pointer movement and scroll.
   =================================================================== */

import * as THREE from 'three';

const canvas = document.getElementById('heroCanvas');
if (canvas) initScene();

function initScene () {

  /* ---------- core ---------- */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0d14, 0.045);

  const camera = new THREE.PerspectiveCamera(
    42, window.innerWidth / window.innerHeight, 0.1, 100
  );
  camera.position.set(0, 0, 9);

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

  /* ---------- the denim "garment" form ----------
     We build a stylized jean shape from a Shape with two legs,
     extrude it, and apply a subtle warped denim-blue material.
     A second flowing TorusKnot floats around it as accent.
  ---------------------------------------------------------- */

  const garmentGroup = new THREE.Group();
  scene.add(garmentGroup);

  // Build the silhouette of a pair of jeans (front view)
  const jeansShape = new THREE.Shape();
  jeansShape.moveTo(-1.2, 1.5);            // top-left waist
  jeansShape.bezierCurveTo(-1.3, 1.3, -1.3, 1.15, -1.25, 1);   // hip
  jeansShape.lineTo(-1.05, -2.2);          // outer left leg
  jeansShape.bezierCurveTo(-1.1, -2.6, -0.9, -2.65, -0.8, -2.6); // ankle
  jeansShape.lineTo(-0.4, -2.55);          // bottom seam left
  jeansShape.lineTo(-0.25, -0.1);          // inseam
  jeansShape.lineTo(0, 0.4);
  jeansShape.lineTo(0.25, -0.1);
  jeansShape.lineTo(0.4, -2.55);           // bottom seam right
  jeansShape.lineTo(0.8, -2.6);
  jeansShape.bezierCurveTo(0.9, -2.65, 1.1, -2.6, 1.05, -2.2);
  jeansShape.lineTo(1.25, 1);
  jeansShape.bezierCurveTo(1.3, 1.15, 1.3, 1.3, 1.2, 1.5);
  jeansShape.lineTo(-1.2, 1.5);

  const jeansGeometry = new THREE.ExtrudeGeometry(jeansShape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4,
    curveSegments: 32,
  });
  jeansGeometry.center();

  // Procedural denim-ish material via canvas texture
  const denimTex = makeDenimTexture();
  denimTex.wrapS = denimTex.wrapT = THREE.RepeatWrapping;
  denimTex.repeat.set(2, 3);

  const jeansMat = new THREE.MeshStandardMaterial({
    color: 0x2d3f6e,
    roughness: 0.78,
    metalness: 0.06,
    map: denimTex,
    bumpMap: denimTex,
    bumpScale: 0.04,
  });

  const jeans = new THREE.Mesh(jeansGeometry, jeansMat);
  jeans.scale.setScalar(1.2);
  garmentGroup.add(jeans);

  // Wireframe ghost, gives a "tech-pack" feel
  const wireGeo = new THREE.EdgesGeometry(jeansGeometry, 25);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x7a98d8, transparent: true, opacity: 0.35
  });
  const wire = new THREE.LineSegments(wireGeo, wireMat);
  wire.scale.copy(jeans.scale).multiplyScalar(1.005);
  garmentGroup.add(wire);

  // Floating accent ring – represents the supply-chain loop
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.012, 16, 200),
    new THREE.MeshBasicMaterial({ color: 0xede4d3, transparent: true, opacity: 0.22 })
  );
  ring.rotation.x = Math.PI / 2.4;
  garmentGroup.add(ring);

  const ring2 = ring.clone();
  ring2.scale.setScalar(1.18);
  ring2.rotation.x = Math.PI / 1.7;
  ring2.material = ring.material.clone();
  ring2.material.opacity = 0.12;
  garmentGroup.add(ring2);

  /* ---------- particle field ---------- */
  const particleCount = 1400;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 26;
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

  function tick () {
    const t = clock.getElapsedTime();

    // ease pointer
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    // garment slow rotation + pointer parallax
    garmentGroup.rotation.y = Math.sin(t * 0.25) * 0.5 + pointer.x * 0.4;
    garmentGroup.rotation.x = Math.sin(t * 0.18) * 0.18 + pointer.y * 0.18;
    garmentGroup.rotation.z = Math.sin(t * 0.12) * 0.06;
    garmentGroup.position.y = Math.sin(t * 0.6) * 0.12 - scrollY * 0.001;

    // rings counter-rotate
    ring.rotation.z   = t * 0.18;
    ring2.rotation.z  = -t * 0.13;

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

/* ---------- procedural denim canvas texture ---------- */
function makeDenimTexture () {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');

  // base indigo
  ctx.fillStyle = '#2d3f6e';
  ctx.fillRect(0, 0, size, size);

  // warp + weft fibres
  for (let i = 0; i < 4500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const isWarp = Math.random() > 0.5;
    const len = 1 + Math.random() * 3;
    const shade = Math.random();
    ctx.fillStyle = shade < 0.5
      ? `rgba(20,30,55,${0.25 + Math.random()*0.4})`
      : `rgba(150,170,210,${0.05 + Math.random()*0.18})`;
    if (isWarp) ctx.fillRect(x, y, 1, len);
    else        ctx.fillRect(x, y, len, 1);
  }

  // fade highlights to suggest a wash
  const grad = ctx.createRadialGradient(size*0.35, size*0.4, 10, size*0.5, size*0.5, size*0.7);
  grad.addColorStop(0, 'rgba(180,200,235,0.18)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  return tex;
}
