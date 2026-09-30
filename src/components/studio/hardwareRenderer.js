import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// A real, on-demand WebGL scene. No continuous spin or background animation loop.
export function mountHardware(host, onLost) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 40);
  const world = new THREE.Group();
  scene.add(world);
  const metal = new THREE.MeshStandardMaterial({
    color: 0x657082,
    metalness: 0.65,
    roughness: 0.31,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x151b24,
    metalness: 0.2,
    roughness: 0.5,
  });
  const ivory = new THREE.MeshStandardMaterial({
    color: 0xd9dce3,
    roughness: 0.38,
    metalness: 0.12,
  });
  const blue = new THREE.MeshStandardMaterial({
    color: 0x3986ff,
    emissive: 0x2463eb,
    emissiveIntensity: 1,
  });
  const paper = new THREE.MeshStandardMaterial({
    color: 0xf6f7fc,
    roughness: 0.95,
  });
  function box(parent, w, h, d, x, y, z, material = metal, r = 0.04) {
    const m = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3)),
      material,
    );
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  // A dark desk against a wall, not a display plinth: these are devices in
  // someone's home or office. The blue line behind the desk is the DR TECH mark.
  const desk = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.3, 6.4),
    new THREE.MeshStandardMaterial({
      color: 0x0f141c,
      roughness: 0.62,
      metalness: 0.18,
    }),
  );
  desk.position.set(0, -0.17, -0.4);
  desk.receiveShadow = true;
  world.add(desk);
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(22, 10),
    new THREE.MeshStandardMaterial({ color: 0x0b111b, roughness: 0.9 }),
  );
  wall.position.set(0, 4.6, -3.6);
  wall.receiveShadow = true;
  world.add(wall);
  const signal = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.022, 0.022),
    new THREE.MeshBasicMaterial({ color: 0x6fa6ff }),
  );
  signal.position.set(0, 0.02, -3.56);
  world.add(signal);
  const wash = new THREE.PointLight(0x3f7fff, 16, 6, 1.4);
  wash.position.set(0, 0.5, -3.3);
  world.add(wash);
  const laptop = new THREE.Group();
  world.add(laptop);
  laptop.position.set(0.15, 0, 0.55);
  laptop.rotation.y = -0.3;
  laptop.scale.setScalar(1.25);
  box(laptop, 2.8, 0.11, 1.85, 0, 0.015, 0);
  box(laptop, 2.56, 0.025, 0.88, 0, 0.083, -0.24, black);
  const keyGeometry = new RoundedBoxGeometry(0.142, 0.025, 0.125, 1, 0.016);
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 14; col++) {
      const key = new THREE.Mesh(keyGeometry, black);
      key.position.set(-1.13 + col * 0.173, 0.112, -0.57 + row * 0.153);
      laptop.add(key);
    }
  box(
    laptop,
    0.92,
    0.025,
    0.46,
    0,
    0.083,
    0.54,
    new THREE.MeshStandardMaterial({
      color: 0x596578,
      metalness: 0.5,
      roughness: 0.4,
    }),
    0.025,
  );
  for (const x of [-1.404, 1.404])
    for (let i = 0; i < 3; i++)
      box(laptop, 0.012, 0.039, 0.1, x, 0.015, -0.54 + i * 0.17, black, 0.006);
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.08, -0.86);
  hinge.rotation.x = -0.16;
  laptop.add(hinge);
  box(hinge, 2.8, 1.72, 0.08, 0, 0.86, 0, metal, 0.055);
  box(hinge, 2.68, 1.59, 0.014, 0, 0.87, 0.048, black, 0.028);
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1024;
  textureCanvas.height = 640;
  const ctx = textureCanvas.getContext("2d");
  // The screen repeats the desk's signal line instead of a generic wallpaper.
  const glow = ctx.createLinearGradient(0, 0, 0, 640);
  glow.addColorStop(0, "#050b16");
  glow.addColorStop(0.62, "#0a1a36");
  glow.addColorStop(1, "#050b16");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1024, 640);
  ctx.shadowColor = "#4d8dff";
  ctx.shadowBlur = 28;
  ctx.fillStyle = "#8bb6ff";
  ctx.fillRect(0, 396, 1024, 4);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff38";
  ctx.font = "700 44px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("DR TECH", 72, 330);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(2.55, 1.43),
    new THREE.MeshBasicMaterial({ map: texture }),
  );
  display.position.set(0, 0.88, 0.058);
  hinge.add(display);
  box(hinge, 0.035, 0.035, 0.012, 0, 1.656, 0.06, black, 0.01);
  const router = new THREE.Group();
  world.add(router);
  router.position.set(-2.75, 0, -1.5);
  router.rotation.y = 0.4;
  router.scale.setScalar(1.2);
  box(router, 1.03, 0.24, 0.75, 0, 0.1, 0, black, 0.07);
  for (const x of [-0.37, 0.37])
    box(router, 0.042, 0.85, 0.042, x, 0.62, -0.26, black, 0.018);
  for (let i = 0; i < 4; i++)
    box(router, 0.021, 0.02, 0.012, -0.12 + i * 0.07, 0.11, 0.38, blue, 0.005);
  for (let i = 0; i < 12; i++)
    box(
      router,
      0.014,
      0.11,
      0.014,
      -0.44 + i * 0.08,
      0.09,
      0.379,
      metal,
      0.003,
    );
  const printer = new THREE.Group();
  world.add(printer);
  printer.position.set(2.45, 0.02, -2.45);
  printer.rotation.y = -0.4;
  printer.scale.setScalar(1);
  box(printer, 1.62, 0.72, 1.17, 0, 0.31, 0, ivory, 0.1);
  box(printer, 1.53, 0.04, 1.08, 0, 0.695, 0, ivory, 0.025);
  box(printer, 1.15, 0.22, 0.032, 0, 0.18, 0.59, black, 0.02);
  box(printer, 1.15, 0.025, 0.44, 0, 0.045, 0.7, ivory, 0.015);
  const sheet = box(printer, 0.97, 0.012, 0.67, 0, 0.035, 0.68, paper, 0.002);
  box(printer, 1.14, 0.035, 0.24, 0, 0.729, -0.32, black, 0.01);
  const feeder = box(printer, 0.91, 0.65, 0.012, 0, 0.94, -0.36, paper, 0.004);
  feeder.rotation.x = -0.16;
  box(printer, 0.18, 0.055, 0.11, 0.54, 0.74, 0.22, black, 0.018);
  box(printer, 0.031, 0.01, 0.03, 0.55, 0.771, 0.22, blue, 0.004);
  const ambient = new THREE.HemisphereLight(0xc5d7ff, 0x0a0f18, 1.25);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xf5f5ff, 4);
  key.position.set(-3, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.bias = -0.001;
  key.shadow.normalBias = 0.05;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x4c84ff, 2.6);
  rim.position.set(4, 2, -3);
  scene.add(rim);
  let disposed = false,
    visible = true,
    frame = 0,
    steps = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Laptop holds most of the frame; the other views lean toward one device.
  const views = {
    computer: [
      [1.5, 2.6, 9.4],
      [-0.1, 0.62, -0.8],
    ],
    wifi: [
      [-3.9, 1.7, 1.2],
      [-2.75, 0.55, -1.5],
    ],
    printer: [
      [4.9, 1.8, 0.2],
      [2.45, 0.55, -2.45],
    ],
  };
  const target = new THREE.Vector3(...views.computer[1]);
  const targetCamera = new THREE.Vector3(...views.computer[0]);
  const currentLook = target.clone();
  camera.position.copy(targetCamera);
  camera.lookAt(target);
  function draw() {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    camera.position.lerp(targetCamera, 0.16);
    currentLook.lerp(target, 0.16);
    camera.lookAt(currentLook);
    renderer.render(scene, camera);
    if (steps-- > 0) frame = requestAnimationFrame(draw);
  }
  function request() {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(draw);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    request();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) request();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  intersection.observe(host);
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else request();
  }
  document.addEventListener("visibilitychange", visibility);
  function lost(e) {
    e.preventDefault();
    onLost();
  }
  renderer.domElement.addEventListener("webglcontextlost", lost);
  resize();
  return {
    select(device) {
      const [position, look] = views[device] || views.computer;
      targetCamera.set(...position);
      target.set(...look);
      steps = reduced.matches ? 0 : 35;
      if (reduced.matches) {
        camera.position.copy(targetCamera);
        currentLook.copy(target);
      }
      request();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set(),
        materials = new Set();
      scene.traverse((o) => {
        if (o.geometry) geometries.add(o.geometry);
        if (o.material) materials.add(o.material);
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
