import * as THREE from 'three';

export function mountNetwork(host, onLost) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 11);
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.AmbientLight(0x8ccaff, 2));
  const light = new THREE.PointLight(0x36c5ff, 35);
  light.position.set(2, 3, 4);
  scene.add(light);
  const geometry = new THREE.IcosahedronGeometry(1.35, 1);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x0c3c70, metalness: .6, roughness: .25, transparent: true, opacity: .65, wireframe: false });
  const core = new THREE.Mesh(geometry, material);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0x36c5ff, transparent: true, opacity: .55 }));
  core.add(edges);
  group.add(core);
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1 + i * .32, .008, 6, 100), new THREE.MeshBasicMaterial({ color: 0x168bff, transparent: true, opacity: .2 + i * .1 }));
    ring.rotation.set(.6 + i * .5, i * .7, .3);
    group.add(ring);
  }
  const particles = [];
  for (let i = 0; i < 7; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(.035, 8, 8), new THREE.MeshBasicMaterial({ color: 0x78dfff }));
    group.add(dot);
    particles.push(dot);
  }
  let pointerX = 0, pointerY = 0, frame = 0, visible = true, lost = false;
  function move(e) {
    if (e.pointerType !== 'mouse') return;
    const rect = host.getBoundingClientRect();
    pointerX = ((e.clientX - rect.left) / rect.width - .5) * .15;
    pointerY = ((e.clientY - rect.top) / rect.height - .5) * .12;
  }
  function reset() { pointerX = 0; pointerY = 0; }
  const surface = host.parentElement;
  surface.addEventListener('pointermove', move);
  surface.addEventListener('pointerleave', reset);
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  resize.observe(host);
  function draw(time) {
    frame = 0;
    if (!visible || document.hidden || lost) return;
    const t = time * .00012;
    core.rotation.y = t;
    core.rotation.z = Math.sin(t) * .12;
    group.rotation.y += (pointerX - group.rotation.y) * .035;
    group.rotation.x += (pointerY - group.rotation.x) * .035;
    particles.forEach((dot, i) => { const angle = t * 1.5 + i * Math.PI * 2 / 7; dot.position.set(Math.cos(angle) * 2.45, Math.sin(angle) * 1.7, Math.sin(angle) * .8); });
    renderer.render(scene, camera);
    frame = requestAnimationFrame(draw);
  }
  function resume() { if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(draw); }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
  observer.observe(host);
  document.addEventListener('visibilitychange', resume);
  function contextLost(e) { e.preventDefault(); lost = true; cancelAnimationFrame(frame); onLost(); }
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  resume();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect(); resize.disconnect();
    document.removeEventListener('visibilitychange', resume);
    surface.removeEventListener('pointermove', move); surface.removeEventListener('pointerleave', reset);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    scene.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
    renderer.dispose(); renderer.domElement.remove();
  };
}
