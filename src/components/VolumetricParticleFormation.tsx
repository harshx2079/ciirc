'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VolumetricParticleFormationProps {
  interactiveCamera?: boolean; // if true, allows full orbit drag for testing
  cameraAnglePreset?: 'front' | 'left45' | 'right45' | 'elevated';
  onCameraChange?: (angle: string) => void;
}

export const VolumetricParticleFormation: React.FC<VolumetricParticleFormationProps> = ({
  interactiveCamera = false,
  cameraAnglePreset = 'front'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebGLFailed(true);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xF7F9FC, 0); // 100% transparent clear on #F7F9FC
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Section 5: Real Perspective Camera (32 deg FOV, genuine 3D perspective)
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.6);
    cameraRef.current = camera;

    // Apply preset camera angle if specified
    if (cameraAnglePreset === 'left45') {
      camera.position.set(-4.5, 1.2, 7.2);
      camera.lookAt(0, 0, 0);
    } else if (cameraAnglePreset === 'right45') {
      camera.position.set(4.5, 1.2, 7.2);
      camera.lookAt(0, 0, 0);
    } else if (cameraAnglePreset === 'elevated') {
      camera.position.set(0, 4.0, 7.6);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, 0, 8.6);
      camera.lookAt(0, 0, 0);
    }

    // Section 8: Particle Count (9,800 desktop, 5,500 mobile) - Intelligently placed!
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 5500 : 9800;

    // -------------------------------------------------------------
    // 1. DEFORMABLE 3D IMPLICIT SURFACE & DENSITY SAMPLING
    // -------------------------------------------------------------
    // Base radius: compact entity occupying ~48% width with clear breathing room
    const baseRadius = 1.62;

    // Low-frequency harmonic deformation function representing the implicit body
    const implicitRadius = (theta: number, phi: number) => {
      // Asymmetric organic body with bulges and subtle cavities
      const b1 = 0.18 * Math.sin(2.0 * theta + 0.4) * Math.cos(phi);
      const b2 = 0.14 * Math.cos(3.0 * phi - 0.5) * Math.sin(theta);
      const b3 = 0.08 * Math.sin(4.0 * theta) * Math.cos(2.0 * phi);
      // Slight vertical elongation (egg/colony asymmetry)
      const elongation = 1.0 + 0.12 * Math.cos(phi);
      return baseRadius * (1.0 + b1 + b2 + b3) * elongation;
    };

    // Non-uniform surface density function (Section 7)
    // Creates dense swirling ridges and sparse cavities
    const surfaceDensity = (theta: number, phi: number) => {
      const d1 = Math.sin(2.2 * theta + 1.0) * Math.cos(1.8 * phi);
      const d2 = Math.cos(3.5 * theta - 0.8) * Math.sin(2.4 * phi);
      return 0.5 + 0.5 * (d1 * 0.6 + d2 * 0.4); // 0.0 to 1.0
    };

    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const tangents = new Float32Array(particleCount * 3);
    const layerTypes = new Float32Array(particleCount); // 0 = core, 1 = surface, 2 = wisp
    const phases = new Float32Array(particleCount * 3);
    const activations = new Float32Array(particleCount);

    let pIdx = 0;
    let attempts = 0;
    const maxAttempts = particleCount * 25;

    while (pIdx < particleCount && attempts < maxAttempts) {
      attempts++;

      // Uniform spherical direction
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      // Evaluate density probability at this surface angle
      const density = surfaceDensity(theta, phi);
      // Rejection sampling for non-uniform density variation
      if (Math.random() > 0.35 + 0.65 * density) {
        continue;
      }

      const R_surf = implicitRadius(theta, phi);

      // Section 2: DENSITY FALLOFF FROM IMPLICIT SURFACE
      // surface particles: 65% density
      // near-surface interior: 24%
      // deep interior: 8%
      // outside drift wisps: 3%
      const layerRoll = Math.random();
      let r = R_surf;
      let layer = 1.0; // surface

      if (layerRoll < 0.65) {
        // Surface layer: tight clustering right on the contour (|dr| < 0.06)
        r = R_surf * (1.0 + (Math.random() - 0.5) * 0.08);
        layer = 1.0;
      } else if (layerRoll < 0.89) {
        // Near-surface interior: falloff inward (0.75 to 0.96 of R_surf)
        r = R_surf * (0.75 + Math.random() * 0.21);
        layer = 1.0;
      } else if (layerRoll < 0.97) {
        // Deep interior: sparse core (0.20 to 0.75 of R_surf)
        r = R_surf * (0.20 + Math.pow(Math.random(), 1.5) * 0.55);
        layer = 0.0;
      } else {
        // Outside wisps: 2-3% peeling off the edge (1.04 to 1.25 of R_surf)
        r = R_surf * (1.04 + Math.pow(Math.random(), 1.6) * 0.22);
        layer = 2.0;
      }

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const i3 = pIdx * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      layerTypes[pIdx] = layer;
      activations[pIdx] = 0.0;

      // Section 10: TANGENTIAL SURFACE FLOW FIELD
      // Flow along local surface tangent vectors (vortex around tilted axis)
      // Normal vector
      const normLen = Math.sqrt(x * x + y * y + z * z) || 1.0;
      const nx = x / normLen;
      const ny = y / normLen;
      const nz = z / normLen;

      // Inclined rotational axis (0.28, 0.94, 0.18)
      const ax = 0.28;
      const ay = 0.94;
      const az = 0.18;

      // Cross product axis x normal = tangential flow along the contour
      const tx = ay * nz - az * ny;
      const ty = az * nx - ax * nz;
      const tz = ax * ny - ay * nx;
      const tLen = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1.0;

      tangents[i3] = tx / tLen;
      tangents[i3 + 1] = ty / tLen;
      tangents[i3 + 2] = tz / tLen;

      phases[i3] = Math.random() * Math.PI * 2;
      phases[i3 + 1] = Math.random() * Math.PI * 2;
      phases[i3 + 2] = Math.random() * Math.PI * 2;

      pIdx++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aBasePos', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('aTangent', new THREE.BufferAttribute(tangents, 3));
    geometry.setAttribute('aLayer', new THREE.BufferAttribute(layerTypes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 3));
    geometry.setAttribute('aActivation', new THREE.BufferAttribute(activations, 1));

    // -------------------------------------------------------------
    // 2. SHADER MATERIAL (NO GREY SQUARES, TRUE 3D DEPTH)
    // -------------------------------------------------------------
    const vertexShader = `
      attribute vec3 aBasePos;
      attribute vec3 aTangent;
      attribute float aLayer;
      attribute vec3 aPhase;
      attribute float aActivation;

      uniform float uTime;
      uniform float uBreathing;
      uniform vec3 uCursor3D;
      uniform float uCursorActive;
      uniform float uCursorRadius;
      uniform float uPixelRatio;

      varying float vActivation;
      varying float vViewZ;
      varying float vLayer;

      void main() {
        vActivation = aActivation;
        vLayer = aLayer;

        // Section 9: Small controlled movement (2-4% macro, 0.5-1.5% medium)
        // Tangential stream flow around the surface
        float flowDist = sin(uTime * 0.45 + aPhase.x) * 0.045;
        vec3 flow = aTangent * flowDist;

        // Low-frequency harmonic surface breathing and deformation
        float localDeform = sin(aBasePos.y * 2.2 + uTime * 0.55 + aPhase.y) *
                            cos(aBasePos.x * 2.0 + aPhase.z) * 0.038;

        vec3 pos = (aBasePos + flow) * (uBreathing + localDeform);

        // Section 17 & 18: Local 3D Cursor Disturbance
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        float distToCursor = length(worldPos.xyz - uCursor3D);

        if (uCursorActive > 0.5 && distToCursor < uCursorRadius) {
          float pushFactor = 1.0 - (distToCursor / uCursorRadius);
          vec3 pushDir = normalize(worldPos.xyz - uCursor3D);
          // Local physical repulsion (max 8-16px ≈ 0.22 world units)
          pos += (inverse(mat3(modelMatrix)) * pushDir) * (pushFactor * 0.22 * (1.0 + aActivation * 0.4));
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewZ = -mvPosition.z; // camera-space depth (e.g. 7.0 front to 10.2 back)

        // Section 13: STRICT DEPTH-BASED POINT SIZING (Foreground larger, Background smaller)
        // Perspective camera scaling + genuine Z attenuation
        // Front (vViewZ ~7.0): 2.0px - 2.8px
        // Mid (vViewZ ~8.6): 1.2px - 1.6px
        // Back (vViewZ ~10.2): 0.6px - 0.9px
        float depthScale = (24.0 / vViewZ) * uPixelRatio;
        
        // Surface particles slightly crisper than interior
        float layerScale = aLayer > 0.5 ? 1.0 : 0.85;
        gl_PointSize = depthScale * layerScale * (1.0 + aActivation * 0.4);

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying float vActivation;
      varying float vViewZ;
      varying float vLayer;

      void main() {
        // Section 15: REMOVE ALL GREY SQUARES!
        // Pure smooth circular sprite with strict discard outside radius 0.5
        vec2 coord = gl_PointCoord - vec2(0.5);
        float d = length(coord);
        if (d > 0.5) discard;

        // Smooth antialiased edge (no pixelated square fringes)
        float circleAlpha = smoothstep(0.5, 0.2, d);

        // Section 6 & 11: VISIBLE FRONT/BACK DEPTH SEPARATION
        // Front pole is around vViewZ = 7.0, Back pole is around vViewZ = 10.2
        float depthNorm = clamp((10.2 - vViewZ) / 3.2, 0.0, 1.0);
        
        // Depth-based opacity: Foreground 0.90-1.0, Midground 0.60-0.75, Background 0.25-0.45
        float baseOpacity = mix(0.28, 0.96, depthNorm);

        // Section 14: DEFAULT COLOR IS NEAR-BLACK #10131A (Exact CIIRC dark navy/black)
        vec3 blackColor = vec3(0.063, 0.075, 0.102); // #10131A

        // Disturbance Colors (Section 17):
        // Deep CIIRC Blue: #1464D2
        // Bright CIIRC Blue: #1677FF
        // Cyan Highlight: #53B8FF
        vec3 deepBlue = vec3(0.078, 0.392, 0.824);
        vec3 brightBlue = vec3(0.086, 0.467, 1.0);
        vec3 cyanGlow = vec3(0.325, 0.722, 1.0);

        vec3 finalColor = blackColor;
        float finalAlpha = baseOpacity;

        if (vActivation > 0.01) {
          float act = clamp(vActivation, 0.0, 1.0);
          vec3 activeColor;
          if (act < 0.5) {
            activeColor = mix(blackColor, deepBlue, act * 2.0);
          } else {
            activeColor = mix(deepBlue, brightBlue, (act - 0.5) * 2.0);
            if (act > 0.85) {
              activeColor = mix(brightBlue, cyanGlow, (act - 0.85) / 0.15);
            }
          }
          finalColor = activeColor;
          // Subtle localized energy glow
          finalAlpha = mix(baseOpacity, 1.0, act);
          finalColor += cyanGlow * (0.35 * act * (1.0 - d * 2.0));
        }

        gl_FragColor = vec4(finalColor, finalAlpha * circleAlpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uBreathing: { value: 1.0 },
        uCursor3D: { value: new THREE.Vector3(-999, -999, 0) },
        uCursorActive: { value: 0.0 },
        uCursorRadius: { value: 1.45 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      transparent: true,
      depthTest: true,
      depthWrite: false, // Critical: prevents transparent square depth artifacts
      blending: THREE.NormalBlending
    });

    const pointsMesh = new THREE.Points(geometry, material);
    // Asymmetric natural inclination angle
    pointsMesh.rotation.z = 0.18;
    pointsMesh.rotation.x = 0.12;
    scene.add(pointsMesh);

    // -------------------------------------------------------------
    // 3. INTERACTIVE ORBIT CAMERA CONTROLS (IF TESTING OR PARALLAX)
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetCursor3D = new THREE.Vector3(-999, -999, 0);
    const currentCursor3D = new THREE.Vector3(-999, -999, 0);
    let isMouseOver = false;

    // Camera orbit dragging for interactiveCamera testing
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let orbitAzimuth = 0;
    let orbitPolar = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactiveCamera) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inBounds) {
        isMouseOver = false;
        targetCursor3D.set(-999, -999, 0);
        return;
      }

      isMouseOver = true;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Camera orbit drag
      if (isDragging && interactiveCamera) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        orbitAzimuth -= dx * 0.006;
        orbitPolar = Math.max(-0.6, Math.min(0.6, orbitPolar - dy * 0.006));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }

      // Raycast cursor into 3D world
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      raycaster.ray.intersectPlane(plane, targetCursor3D);
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      isDragging = false;
      targetCursor3D.set(-999, -999, 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // 4. ANIMATION LOOP (REAL 3D ROTATION & LOCAL RECOVERY)
    // -------------------------------------------------------------
    let animId: number;
    let lastTime = performance.now();
    const clock = new THREE.Clock();

    const animate = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;

      // Section 12: Organic Breathing (amplitude 2-4%, period 9s)
      const breathing = 1.0 + 0.028 * Math.sin((elapsed * Math.PI * 2) / 9.0);
      material.uniforms.uBreathing.value = breathing;

      // Section 11: Real 3D Global Rotation (slow 55s revolution)
      pointsMesh.rotation.y = elapsed * 0.024;
      pointsMesh.rotation.x = 0.12 + Math.sin(elapsed * 0.016) * 0.04;

      // Camera Orbit or Parallax
      if (interactiveCamera) {
        const camDist = 8.6;
        camera.position.x = Math.sin(orbitAzimuth) * Math.cos(orbitPolar) * camDist;
        camera.position.y = Math.sin(orbitPolar) * camDist;
        camera.position.z = Math.cos(orbitAzimuth) * Math.cos(orbitPolar) * camDist;
        camera.lookAt(0, 0, 0);
      } else {
        // Subtle camera mouse parallax
        if (targetCursor3D.x !== -999) {
          camera.position.x += (targetCursor3D.x * 0.12 - camera.position.x) * 0.04;
          camera.position.y += (targetCursor3D.y * 0.10 - camera.position.y) * 0.04;
          camera.lookAt(0, 0, 0);
        }
      }

      currentCursor3D.lerp(targetCursor3D, 0.08);
      material.uniforms.uCursor3D.value.copy(currentCursor3D);
      material.uniforms.uCursorActive.value = isMouseOver ? 1.0 : 0.0;

      // Section 17 & 18: Local Interactive Disturbance & Decay (800-1200ms)
      const actArr = geometry.attributes.aActivation.array as Float32Array;
      const posArr = geometry.attributes.position.array as Float32Array;
      const infRadius = 1.45;
      let needsUpdate = false;

      // World matrix inverse to check cursor distance in object space
      const invMat = pointsMesh.matrixWorld.clone().invert();
      const localCursor = currentCursor3D.clone().applyMatrix4(invMat);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const px = posArr[i3];
        const py = posArr[i3 + 1];
        const pz = posArr[i3 + 2];

        let targetAct = 0.0;

        if (isMouseOver && currentCursor3D.x !== -999) {
          const dx = px - localCursor.x;
          const dy = py - localCursor.y;
          const dz = pz - localCursor.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < infRadius) {
            // Stronger response in foreground
            const depthWeight = 1.0 + (pz / baseRadius) * 0.25;
            targetAct = Math.min((1.0 - dist3D / infRadius) * depthWeight, 1.0);
          }
        }

        const prevAct = actArr[i];
        if (targetAct > prevAct) {
          actArr[i] += (targetAct - prevAct) * Math.min(dt * 7.5, 1.0);
          needsUpdate = true;
        } else if (prevAct > 0.001) {
          // Decay over ~900ms back to 0.0 (#10131A black)
          actArr[i] += (0.0 - prevAct) * Math.min(dt * 1.8, 1.0);
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        geometry.attributes.aActivation.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraAnglePreset, interactiveCamera]);

  if (webGLFailed) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #10131A 0%, #000000 70%, transparent 100%)',
            opacity: 0.9
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: interactiveCamera ? 'grab' : 'crosshair',
        userSelect: 'none'
      }}
      aria-label="CIIRC 3D Deformable Implicit Volumetric Particle Formation"
    />
  );
};
