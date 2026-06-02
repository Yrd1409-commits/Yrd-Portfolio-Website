import { RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroRobotSceneProps {
  stageRef: RefObject<HTMLElement | null>;
}

const cream = new THREE.Color('#DEDBC8');
const softSage = new THREE.Color('#A8B89C');
const warmBlack = new THREE.Color('#15150f');

const lerp = (current: number, target: number, amount: number) => current + (target - current) * amount;

function makeNode(position: THREE.Vector3, scale = 1) {
  const geometry = new THREE.SphereGeometry(0.035 * scale, 12, 10);
  const material = new THREE.MeshBasicMaterial({
    color: cream,
    transparent: true,
    opacity: 0.72,
  });
  const node = new THREE.Mesh(geometry, material);
  node.position.copy(position);
  return node;
}

export function HeroRobotScene({ stageRef }: HeroRobotSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const stage = stageRef.current;

    if (!mount || !stage) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.1, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    renderer.domElement.className = 'hero-robot-canvas';
    mount.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    const core = new THREE.Group();
    const halo = new THREE.Group();
    const neuralField = new THREE.Group();
    scene.add(rig);
    rig.add(core, halo, neuralField);

    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: warmBlack,
      metalness: 0.72,
      roughness: 0.11,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      reflectivity: 0.88,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#34372b'),
      metalness: 0.16,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.66,
      transmission: 0.08,
    });

    const creamLineMaterial = new THREE.LineBasicMaterial({
      color: cream,
      transparent: true,
      opacity: 0.34,
    });

    const sageLineMaterial = new THREE.LineBasicMaterial({
      color: softSage,
      transparent: true,
      opacity: 0.24,
    });

    const glintMaterial = new THREE.MeshBasicMaterial({
      color: cream,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });

    const auraMaterial = new THREE.MeshBasicMaterial({
      color: softSage,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const coreGeometry = new THREE.SphereGeometry(1, 56, 56);
    const coreShell = new THREE.Mesh(coreGeometry, shellMaterial);
    coreShell.scale.set(0.86, 1.12, 0.7);
    coreShell.rotation.z = -0.04;
    core.add(coreShell);

    const glassVeil = new THREE.Mesh(coreGeometry, glassMaterial);
    glassVeil.scale.set(0.92, 1.18, 0.74);
    glassVeil.rotation.z = -0.04;
    core.add(glassVeil);

    const innerLens = new THREE.Mesh(new THREE.SphereGeometry(0.58, 36, 28), auraMaterial);
    innerLens.scale.set(0.72, 1.24, 0.08);
    innerLens.position.set(-0.08, 0.03, 0.66);
    innerLens.rotation.z = -0.18;
    core.add(innerLens);

    const longGlint = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 14), glintMaterial);
    longGlint.scale.set(0.18, 1.22, 0.035);
    longGlint.position.set(-0.32, 0.1, 0.72);
    longGlint.rotation.z = -0.22;
    core.add(longGlint);

    const cheekGlint = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 12), glintMaterial.clone());
    (cheekGlint.material as THREE.MeshBasicMaterial).opacity = 0.5;
    cheekGlint.scale.set(0.24, 0.5, 0.025);
    cheekGlint.position.set(0.34, 0.58, 0.7);
    cheekGlint.rotation.z = 0.36;
    core.add(cheekGlint);

    const pulseGlint = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 10), glintMaterial.clone());
    (pulseGlint.material as THREE.MeshBasicMaterial).opacity = 0.92;
    pulseGlint.position.set(0.03, 0.0, 0.76);
    core.add(pulseGlint);

    const ringMaterialA = new THREE.MeshBasicMaterial({
      color: cream,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });

    const ringMaterialB = new THREE.MeshBasicMaterial({
      color: softSage,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.006, 10, 128), ringMaterialA);
    ringA.rotation.set(1.35, 0.38, -0.22);
    halo.add(ringA);

    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.006, 10, 128), ringMaterialB);
    ringB.rotation.set(1.12, -0.48, 0.36);
    halo.add(ringB);

    const ringC = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.004, 8, 128), ringMaterialA.clone());
    (ringC.material as THREE.MeshBasicMaterial).opacity = 0.24;
    ringC.rotation.set(1.68, 0.08, 0.72);
    halo.add(ringC);

    const spineMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#191911'),
      metalness: 0.48,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.78,
    });

    const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.18, 0.98, 36), spineMaterial);
    spine.position.set(0, -1.28, -0.04);
    spine.rotation.x = -0.03;
    rig.add(spine);

    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.018, 12, 96), ringMaterialA.clone());
    (baseRing.material as THREE.MeshBasicMaterial).opacity = 0.3;
    baseRing.position.set(0, -1.78, 0.02);
    baseRing.rotation.x = Math.PI / 2;
    rig.add(baseRing);

    const nodePositions = [
      new THREE.Vector3(-1.52, 0.72, -0.1),
      new THREE.Vector3(-1.18, -0.22, 0.18),
      new THREE.Vector3(-0.72, 1.14, 0.02),
      new THREE.Vector3(0.88, 1.0, -0.04),
      new THREE.Vector3(1.38, 0.28, 0.12),
      new THREE.Vector3(1.08, -0.76, 0.04),
      new THREE.Vector3(-0.58, -1.02, 0.1),
    ];

    const nodes = nodePositions.map((position, index) => {
      const node = makeNode(position, index % 3 === 0 ? 1.35 : 1);
      neuralField.add(node);
      return node;
    });

    const linePairs = [
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 1],
      [1, 0],
      [2, 6],
      [3, 5],
    ];

    linePairs.forEach(([from, to], index) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([nodePositions[from], nodePositions[to]]);
      const line = new THREE.Line(geometry, index % 2 === 0 ? creamLineMaterial : sageLineMaterial);
      neuralField.add(line);
    });

    neuralField.position.set(0.02, 0.04, -0.46);
    neuralField.scale.setScalar(0.88);

    const ambient = new THREE.HemisphereLight(0xdedbc8, 0x080807, 1.75);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xdedbc8, 5.4);
    keyLight.position.set(-2.2, 2.6, 3.1);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa8b89c, 3.8);
    rimLight.position.set(3.1, 1.7, 2.8);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xdedbc8, 1.9, 7);
    fillLight.position.set(0.8, -0.6, 3.4);
    scene.add(fillLight);

    const cursorLight = new THREE.PointLight(0xdedbc8, 3.2, 6.5);
    cursorLight.position.set(-0.6, 0.7, 2.8);
    scene.add(cursorLight);

    const pointer = {
      targetX: 0.5,
      targetY: 0.42,
      x: 0.5,
      y: 0.42,
      active: false,
      speed: 0,
      lastX: 0,
      lastY: 0,
      lastTime: performance.now(),
    };

    let width = 1;
    let height = 1;
    let animationFrame = 0;
    let visible = true;
    let mobile = false;
    let elapsedSeconds = 0;
    let lastRenderTime = performance.now();

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      mobile = width < 768;
      const desktop = width >= 1024;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.45));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      rig.position.set(desktop ? 1.92 : 0.46, desktop ? 0.0 : 0.38, 0);
      rig.scale.setScalar(desktop ? 1.34 : 0.92);
      neuralField.visible = !mobile;
      halo.visible = !mobile;
    };

    const setStageVars = () => {
      stage.style.setProperty('--hero-cursor-x', `${pointer.x * 100}%`);
      stage.style.setProperty('--hero-cursor-y', `${pointer.y * 100}%`);
      stage.style.setProperty('--hero-pointer-x', `${pointer.x * width}px`);
      stage.style.setProperty('--hero-pointer-y', `${pointer.y * height}px`);
      stage.style.setProperty('--hero-reactivity', `${pointer.speed.toFixed(3)}`);
      stage.style.setProperty('--hero-cursor-opacity', pointer.active && width >= 1024 ? '1' : '0');
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside || width < 1024) {
        pointer.active = false;
        return;
      }

      const now = performance.now();
      const distance = Math.hypot(event.clientX - pointer.lastX, event.clientY - pointer.lastY);
      const elapsed = Math.max(16, now - pointer.lastTime);

      pointer.targetX = (event.clientX - rect.left) / rect.width;
      pointer.targetY = (event.clientY - rect.top) / rect.height;
      pointer.speed = Math.min(1, distance / elapsed / 1.35);
      pointer.active = true;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.lastTime = now;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;

        if (visible) {
          lastRenderTime = performance.now();
          animationFrame = window.requestAnimationFrame(render);
        }
      },
      { threshold: 0.08 },
    );

    const render = () => {
      const now = performance.now();
      elapsedSeconds += Math.min(0.05, (now - lastRenderTime) / 1000);
      lastRenderTime = now;

      pointer.targetX = pointer.active ? pointer.targetX : 0.5;
      pointer.targetY = pointer.active ? pointer.targetY : 0.42;
      pointer.x = lerp(pointer.x, pointer.targetX, 0.08 + pointer.speed * 0.05);
      pointer.y = lerp(pointer.y, pointer.targetY, 0.07 + pointer.speed * 0.04);
      pointer.speed *= 0.88;

      const yaw = (pointer.x - 0.5) * 0.92;
      const pitch = (0.42 - pointer.y) * 0.34;
      const micro = pointer.active ? pointer.speed : 0;
      const breathe = Math.sin(elapsedSeconds * 0.8) * 0.018;

      core.rotation.y = lerp(core.rotation.y, yaw, 0.11 + micro * 0.05);
      core.rotation.x = lerp(core.rotation.x, pitch + breathe, 0.08);
      core.rotation.z = lerp(core.rotation.z, -yaw * 0.07, 0.08);
      spine.rotation.y = lerp(spine.rotation.y, yaw * 0.16, 0.06);
      halo.rotation.y = lerp(halo.rotation.y, yaw * 0.5 + elapsedSeconds * 0.04, 0.06);
      halo.rotation.x = lerp(halo.rotation.x, -pitch * 0.4, 0.06);
      neuralField.rotation.y = lerp(neuralField.rotation.y, yaw * 0.26, 0.04);
      neuralField.rotation.x = lerp(neuralField.rotation.x, pitch * 0.16, 0.04);

      ringA.rotation.z += 0.0016;
      ringB.rotation.z -= 0.0012;
      ringC.rotation.z += 0.0009;

      cursorLight.position.x = lerp(cursorLight.position.x, (pointer.x - 0.5) * 4.2, 0.12);
      cursorLight.position.y = lerp(cursorLight.position.y, (0.5 - pointer.y) * 2.1 + 0.68, 0.12);
      cursorLight.intensity = lerp(cursorLight.intensity, pointer.active ? 3.6 + micro * 1.8 : 2.25, 0.08);

      longGlint.position.x = -0.32 - yaw * 0.14;
      cheekGlint.position.x = 0.34 - yaw * 0.2;
      pulseGlint.scale.setScalar(1 + Math.sin(elapsedSeconds * 2.4) * 0.12 + micro * 0.14);
      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(elapsedSeconds * 1.3 + index) * 0.16 + micro * 0.08);
      });

      setStageVars();
      renderer.render(scene, camera);

      if (visible) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    updateSize();
    observer.observe(stage);
    window.addEventListener('resize', updateSize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    stage.addEventListener('pointerleave', handlePointerLeave);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);

      rig.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Line)) {
          return;
        }

        object.geometry.dispose();
        const material = object.material;
        const materials = Array.isArray(material) ? material : [material];
        materials.forEach((item) => item.dispose());
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [stageRef]);

  return <div ref={mountRef} className="hero-robot-scene pointer-events-none absolute inset-0" aria-hidden="true" />;
}
