import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Real-time WebGL scene: a glowing "AI core" (wireframe icosahedron + inner energy sphere),
 * orbit rings with satellites, a neural-network point cloud and a starfield.
 * Follows the pointer, reacts to scroll, pauses off-screen and cleans up after itself.
 */
export default function Core3D({
  align = 'right',
  className = '',
  scrollTarget,
}: {
  align?: 'right' | 'center';
  className?: string;
  /** Element whose scroll progress spins & fades the core. */
  scrollTarget?: React.RefObject<HTMLElement | null>;
}) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    // WebGL availability check — fall back silently to the CSS atmosphere.
    const probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const VIOLET = new THREE.Color('#7c5cff');
    const CYAN = new THREE.Color('#22d3ee');
    const PINK = new THREE.Color('#c084fc');

    const root = new THREE.Group();
    scene.add(root);
    const core = new THREE.Group();
    root.add(core);

    // --- AI core ---------------------------------------------------------
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const ico = new THREE.LineSegments(
      new THREE.EdgesGeometry(icoGeo),
      new THREE.LineBasicMaterial({ color: VIOLET, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }),
    );
    core.add(ico);

    const outerGeo = new THREE.IcosahedronGeometry(2.25, 0);
    const outer = new THREE.LineSegments(
      new THREE.EdgesGeometry(outerGeo),
      new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }),
    );
    core.add(outer);

    // vertex nodes on the inner shape
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', icoGeo.getAttribute('position').clone());
    const glowTex = makeGlowTexture();
    const nodes = new THREE.Points(
      nodeGeo,
      new THREE.PointsMaterial({ size: 0.22, map: glowTex, color: PINK, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    core.add(nodes);

    // energy sphere (fresnel-ish shader)
    const energyMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uA: { value: VIOLET }, uB: { value: CYAN } },
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying vec3 vN; varying vec3 vV; varying float vWob;
        void main(){
          vec3 p = position;
          float w = sin(p.x*3.0 + uTime*1.6) * sin(p.y*3.0 + uTime*1.3) * sin(p.z*3.0 + uTime);
          p += normal * w * 0.08; vWob = w;
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uA; uniform vec3 uB; uniform float uTime;
        varying vec3 vN; varying vec3 vV; varying float vWob;
        void main(){
          float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2);
          vec3 c = mix(uA, uB, 0.5 + 0.5*sin(uTime*0.6 + vWob*3.0));
          gl_FragColor = vec4(c * (0.25 + f*1.4), 0.22 + f*0.7);
        }`,
    });
    const energy = new THREE.Mesh(new THREE.SphereGeometry(1.05, 48, 48), energyMat);
    core.add(energy);

    // halo sprite
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: VIOLET, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(7, 7, 1);
    core.add(halo);

    // --- orbit rings & satellites ---------------------------------------
    const rings: { pivot: THREE.Group; sat: THREE.Mesh; speed: number; r: number; phase: number }[] = [];
    [
      { r: 2.9, tilt: [1.15, 0.2, 0], color: VIOLET, speed: 0.55 },
      { r: 3.4, tilt: [0.35, 0.9, 0.3], color: CYAN, speed: -0.38 },
      { r: 3.9, tilt: [1.9, -0.5, 0.2], color: PINK, speed: 0.26 },
    ].forEach((o, i) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(o.tilt[0], o.tilt[1], o.tilt[2]);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(o.r, 0.008, 6, 160),
        new THREE.MeshBasicMaterial({ color: o.color, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false }),
      );
      pivot.add(ring);
      const sat = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), new THREE.MeshBasicMaterial({ color: o.color }));
      const satGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: o.color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      satGlow.scale.set(0.7, 0.7, 1);
      sat.add(satGlow);
      pivot.add(sat);
      core.add(pivot);
      rings.push({ pivot, sat, speed: o.speed, r: o.r, phase: i * 2.1 });
    });

    // --- neural network cloud -------------------------------------------
    const N = coarse ? 70 : 120;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(4.6 + Math.random() * 2.4);
      pts.push(v);
    }
    const cloudGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const cloud = new THREE.Points(
      cloudGeo,
      new THREE.PointsMaterial({ size: 0.12, map: glowTex, color: CYAN, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    const linePos: number[] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) if (pts[i].distanceTo(pts[j]) < 1.9) linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    const lines = new THREE.LineSegments(
      linesGeo,
      new THREE.LineBasicMaterial({ color: VIOLET, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    const network = new THREE.Group();
    network.add(cloud, lines);
    root.add(network);

    // --- starfield --------------------------------------------------------
    const S = coarse ? 350 : 700;
    const starPos = new Float32Array(S * 3);
    for (let i = 0; i < S; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 36;
      starPos[i * 3 + 2] = -10 - Math.random() * 30;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.06, color: 0xb9b5ff, transparent: true, opacity: 0.7, depthWrite: false }));
    scene.add(stars);

    // --- layout -----------------------------------------------------------
    const layout = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visW = visH * camera.aspect;
      const desktop = w >= 1024;
      if (align === 'right' && desktop) {
        root.position.set(visW * 0.2, visH * 0.06, 0);
        root.scale.setScalar(1);
      } else if (align === 'right') {
        root.position.set(0, visH * 0.18, 0);
        root.scale.setScalar(Math.min(1, visW / 9));
      } else {
        root.position.set(0, 0, 0);
        root.scale.setScalar(Math.min(1, visW / 10));
      }
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);

    // --- interaction ------------------------------------------------------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let scrollP = 0;
    const onScroll = () => {
      const t = scrollTarget?.current;
      if (!t) return;
      const r = t.getBoundingClientRect();
      scrollP = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- loop ---------------------------------------------------------------
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;
    const render = () => {
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      energyMat.uniforms.uTime.value = t;
      ico.rotation.set(t * 0.18, t * 0.24, 0);
      outer.rotation.set(-t * 0.1, -t * 0.14, t * 0.05);
      nodes.rotation.copy(ico.rotation);
      const pulse = 1 + Math.sin(t * 2) * 0.04;
      energy.scale.setScalar(pulse);
      halo.material.opacity = 0.45 + Math.sin(t * 2) * 0.1;

      for (const r of rings) {
        const a = t * r.speed + r.phase;
        r.sat.position.set(Math.cos(a) * r.r, Math.sin(a) * r.r, 0);
        r.pivot.rotation.z += 0.0015;
      }
      network.rotation.y = t * 0.04;
      network.rotation.x = Math.sin(t * 0.1) * 0.15;

      core.rotation.y = pointer.x * 0.5 + scrollP * Math.PI * 1.2;
      core.rotation.x = pointer.y * 0.35;
      root.position.z = -scrollP * 4;
      camera.position.x = pointer.x * 0.6;
      camera.position.y = -pointer.y * 0.4;
      camera.lookAt(root.position.x * 0.3, root.position.y * 0.3, 0);
      stars.rotation.z = t * 0.004;

      renderer.domElement.style.opacity = String(1 - scrollP * 0.9);
      renderer.render(scene, camera);
    };
    const tick = () => {
      render();
      raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      render();
    } else {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(el);
      (el as HTMLDivElement & { __io?: IntersectionObserver }).__io = io;
    }

    return () => {
      cancelAnimationFrame(raf);
      (el as HTMLDivElement & { __io?: IntersectionObserver }).__io?.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      glowTex.dispose();
      icoGeo.dispose();
      outerGeo.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [align, scrollTarget]);

  return <div ref={mount} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  grd.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
