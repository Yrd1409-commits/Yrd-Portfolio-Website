import { RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroRobotSceneProps {
  stageRef: RefObject<HTMLElement | null>;
}

const cream = new THREE.Color('#DEDBC8');
const sage = new THREE.Color('#A8B89C');
const graphite = new THREE.Color('#050505');

const lerp = (current: number, target: number, amount: number) => current + (target - current) * amount;

export function HeroRobotScene({ stageRef }: HeroRobotSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const stage = stageRef.current;

    if (!mount || !stage) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.2, 6.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.domElement.className = 'hero-robot-canvas';
    mount.appendChild(renderer.domElement);

    const robot = new THREE.Group();
    const headPivot = new THREE.Group();
    const neckPivot = new THREE.Group();
    const shoulders = new THREE.Group();
    scene.add(robot);

    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: graphite,
      metalness: 0.68,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });

    const softBlackMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#11110f'),
      metalness: 0.36,
      roughness: 0.34,
      clearcoat: 0.75,
      clearcoatRoughness: 0.16,
    });

    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: cream,
      transparent: true,
      opacity: 0.72,
    });

    const sageGlowMaterial = new THREE.MeshBasicMaterial({
      color: sage,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const headGeometry = new THREE.SphereGeometry(1, 48, 48);
    const torsoGeometry = new THREE.SphereGeometry(1, 48, 32);
    const neckGeometry = new THREE.CylinderGeometry(0.28, 0.38, 0.9, 40);
    const ringGeometry = new THREE.TorusGeometry(0.33, 0.018, 12, 48);
    const highlightGeometry = new THREE.SphereGeometry(1, 24, 16);
    const visorGeometry = new THREE.SphereGeometry(1, 32, 16);
    const earGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.08, 32);

    const torso = new THREE.Mesh(torsoGeometry, shellMaterial);
    torso.scale.set(1.65, 1.05, 0.56);
    torso.position.set(0, -1.5, 0);
    torso.rotation.x = -0.05;
    robot.add(torso);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.045, 16, 64), softBlackMaterial);
    collar.position.set(0, -0.54, 0.02);
    collar.rotation.x = Math.PI / 2;
    robot.add(collar);

    neckPivot.position.set(0, -0.1, 0);
    robot.add(neckPivot);

    const neck = new THREE.Mesh(neckGeometry, softBlackMaterial);
    neck.position.set(0, -0.48, 0);
    neckPivot.add(neck);

    for (let index = 0; index < 3; index += 1) {
      const ringMaterial = highlightMaterial.clone();
      ringMaterial.opacity = 0.16 - index * 0.025;
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(0, -0.72 + index * 0.18, 0.01);
      ring.rotation.x = Math.PI / 2;
      ring.scale.setScalar(0.86 + index * 0.05);
      neckPivot.add(ring);
    }

    headPivot.position.set(0, 0.35, 0);
    robot.add(headPivot);

    const head = new THREE.Mesh(headGeometry, shellMaterial);
    head.scale.set(0.78, 1.05, 0.64);
    head.position.set(0, 0.3, 0);
    headPivot.add(head);

    const visor = new THREE.Mesh(visorGeometry, sageGlowMaterial);
    visor.scale.set(0.38, 0.68, 0.035);
    visor.position.set(-0.18, 0.38, 0.62);
    visor.rotation.z = -0.12;
    headPivot.add(visor);

    const highGlint = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highGlint.scale.set(0.12, 0.26, 0.018);
    highGlint.position.set(0.23, 0.82, 0.62);
    highGlint.rotation.z = -0.35;
    headPivot.add(highGlint);

    const faceGlint = new THREE.Mesh(highlightGeometry, highlightMaterial.clone());
    faceGlint.scale.set(0.06, 0.42, 0.014);
    faceGlint.position.set(-0.26, 0.26, 0.64);
    faceGlint.rotation.z = -0.18;
    (faceGlint.material as THREE.MeshBasicMaterial).opacity = 0.46;
    headPivot.add(faceGlint);

    const leftEar = new THREE.Mesh(earGeometry, softBlackMaterial);
    leftEar.position.set(-0.78, 0.24, 0.04);
    leftEar.rotation.z = Math.PI / 2;
    headPivot.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.x = 0.78;
    headPivot.add(rightEar);

    shoulders.position.set(0, -1.08, 0.02);
    robot.add(shoulders);

    const leftShoulderGlint = new THREE.Mesh(highlightGeometry, highlightMaterial.clone());
    leftShoulderGlint.scale.set(0.14, 0.055, 0.018);
    leftShoulderGlint.position.set(-0.84, -0.02, 0.5);
    (leftShoulderGlint.material as THREE.MeshBasicMaterial).opacity = 0.34;
    shoulders.add(leftShoulderGlint);

    const rightShoulderGlint = leftShoulderGlint.clone();
    rightShoulderGlint.position.set(0.68, -0.14, 0.5);
    shoulders.add(rightShoulderGlint);

    const ambient = new THREE.HemisphereLight(0xdedbc8, 0x050505, 1.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xdedbc8, 3.4);
    keyLight.position.set(-2.4, 2.5, 3.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa8b89c, 1.9);
    rimLight.position.set(2.8, 1.2, 2.7);
    scene.add(rimLight);

    const cursorLight = new THREE.PointLight(0xdedbc8, 2.3, 6.2);
    cursorLight.position.set(-0.5, 0.6, 2.8);
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

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      mobile = width < 768;
      const desktop = width >= 1024;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      robot.position.set(desktop ? 1.72 : 0.36, desktop ? -0.16 : 0.18, 0);
      robot.scale.setScalar(desktop ? 1.18 : 0.82);
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
          animationFrame = window.requestAnimationFrame(render);
        }
      },
      { threshold: 0.08 },
    );

    const render = () => {
      pointer.targetX = pointer.active ? pointer.targetX : 0.5;
      pointer.targetY = pointer.active ? pointer.targetY : 0.42;
      pointer.x = lerp(pointer.x, pointer.targetX, 0.075 + pointer.speed * 0.045);
      pointer.y = lerp(pointer.y, pointer.targetY, 0.075 + pointer.speed * 0.035);
      pointer.speed *= 0.88;

      const yaw = (pointer.x - 0.5) * 1.04;
      const pitch = (0.42 - pointer.y) * 0.36;
      const micro = pointer.active ? pointer.speed : 0;

      headPivot.rotation.y = lerp(headPivot.rotation.y, yaw, 0.1 + micro * 0.05);
      headPivot.rotation.x = lerp(headPivot.rotation.x, pitch, 0.08);
      headPivot.rotation.z = lerp(headPivot.rotation.z, -yaw * 0.08, 0.08);
      neckPivot.rotation.y = lerp(neckPivot.rotation.y, yaw * 0.34, 0.08);
      neckPivot.rotation.x = lerp(neckPivot.rotation.x, pitch * 0.28, 0.08);
      shoulders.rotation.y = lerp(shoulders.rotation.y, yaw * 0.018, 0.035);

      cursorLight.position.x = lerp(cursorLight.position.x, (pointer.x - 0.5) * 4.2, 0.12);
      cursorLight.position.y = lerp(cursorLight.position.y, (0.5 - pointer.y) * 2.1 + 0.65, 0.12);
      cursorLight.intensity = lerp(cursorLight.intensity, pointer.active ? 2.6 + micro * 1.2 : 1.5, 0.08);
      visor.rotation.z = -0.12 + yaw * 0.12;
      highGlint.position.x = 0.23 - yaw * 0.18;
      faceGlint.position.x = -0.26 - yaw * 0.1;

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

      robot.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) {
          return;
        }

        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [stageRef]);

  return <div ref={mountRef} className="hero-robot-scene pointer-events-none absolute inset-0" aria-hidden="true" />;
}
