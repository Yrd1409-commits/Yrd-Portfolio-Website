import { useEffect, useRef } from 'react';
import type { BufferAttribute } from 'three';

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const THREE = await import('three');

      if (cancelled || !container.isConnected) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 8);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      container.appendChild(renderer.domElement);

      const surfaceGeometry = new THREE.PlaneGeometry(18, 10, 120, 70);
      const surfaceMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uWarm: { value: new THREE.Color('#DEDBC8') },
          uSage: { value: new THREE.Color('#A8B89C') },
          uSlate: { value: new THREE.Color('#9CA8B8') },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vWave;
          uniform float uTime;

          void main() {
            vec3 pos = position;
            float waveOne = sin(pos.x * 0.58 + uTime * 0.42) * 0.26;
            float waveTwo = cos(pos.y * 0.86 - uTime * 0.34) * 0.18;
            float waveThree = sin((pos.x + pos.y) * 0.36 + uTime * 0.22) * 0.22;
            float wave = waveOne + waveTwo + waveThree;

            pos.z += wave;
            pos.y += wave * 0.10;

            vUv = uv;
            vWave = wave;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying float vWave;
          uniform vec3 uWarm;
          uniform vec3 uSage;
          uniform vec3 uSlate;

          void main() {
            float diagonal = smoothstep(0.04, 0.96, (vUv.x * 0.72) + (vUv.y * 0.28));
            float depth = smoothstep(-0.36, 0.48, vWave);
            float edgeFade = smoothstep(0.0, 0.16, vUv.x) *
              smoothstep(1.0, 0.84, vUv.x) *
              smoothstep(0.0, 0.16, vUv.y) *
              smoothstep(1.0, 0.72, vUv.y);

            vec3 base = mix(uSage, uSlate, diagonal);
            vec3 color = mix(base, uWarm, depth * 0.62);
            float alpha = (0.12 + depth * 0.28) * edgeFade;

            gl_FragColor = vec4(color, alpha);
          }
        `,
      });

      const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
      surface.position.set(1.7, 0.38, -0.25);
      surface.rotation.set(-0.18, -0.24, -0.05);
      scene.add(surface);

      const particleCount = 420;
      const positions = new Float32Array(particleCount * 3);
      const speeds = new Float32Array(particleCount);

      for (let index = 0; index < particleCount; index += 1) {
        const stride = index * 3;
        positions[stride] = (Math.random() - 0.5) * 14;
        positions[stride + 1] = (Math.random() - 0.5) * 6.4;
        positions[stride + 2] = (Math.random() - 0.5) * 4;
        speeds[index] = 0.15 + Math.random() * 0.45;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: '#DEDBC8',
        size: 0.018,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.position.set(0.6, 0.1, 0.2);
      scene.add(particles);

      const resize = () => {
        const width = container.clientWidth || 1;
        const height = container.clientHeight || 1;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const clock = new THREE.Clock();
      let animationFrame = 0;

      const animate = () => {
        const elapsed = clock.getElapsedTime();
        surfaceMaterial.uniforms.uTime.value = elapsed;

        surface.rotation.z = -0.05 + Math.sin(elapsed * 0.12) * 0.018;
        surface.rotation.y = -0.24 + Math.sin(elapsed * 0.09) * 0.06;
        particles.rotation.y = elapsed * 0.018;
        particles.rotation.x = Math.sin(elapsed * 0.08) * 0.035;

        const positionAttribute = particleGeometry.getAttribute('position') as BufferAttribute;

        for (let index = 0; index < particleCount; index += 1) {
          const stride = index * 3;
          const nextX = positionAttribute.getX(index) + speeds[index] * 0.0025;
          const driftY = positions[stride + 1] + Math.sin(elapsed * speeds[index] + index) * 0.035;

          positionAttribute.setX(index, nextX > 7 ? -7 : nextX);
          positionAttribute.setY(index, driftY);
        }

        positionAttribute.needsUpdate = true;

        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(animate);
      };

      animate();

      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
        surfaceGeometry.dispose();
        surfaceMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="hero-scene pointer-events-none absolute inset-0" aria-hidden="true" />;
}
