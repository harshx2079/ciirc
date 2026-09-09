'use client';

import React, { useEffect, useRef } from 'react';

export type ResearchTopology = 
  | 'default'
  | 'materials'      // crystalline
  | 'life'           // branching biological
  | 'engineering'    // geometric trajectories
  | 'earth'          // fluid / topographic
  | 'computing'      // discrete grids
  | 'innovation';    // highly interconnected

interface ResearchFieldProps {
  topology?: ResearchTopology;
  isConverging?: boolean;
  isImpactVisible?: boolean;
  scrollProgress?: number; // 0 to 1
}

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  mass: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  colorType: 0 | 1 | 2 | 3; // 0: ink #101820, 1: ultramarine #3155FF, 2: acid #C7F36B, 3: coral #FF5B3D
  size: number;
  noiseOffset: number;
  cluster: number;
}

export const ResearchField: React.FC<ResearchFieldProps> = ({
  topology = 'default',
  isConverging = false,
  isImpactVisible = false,
  scrollProgress = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const topologyRef = useRef<ResearchTopology>(topology);
  const isConvergingRef = useRef<boolean>(isConverging);
  const isImpactVisibleRef = useRef<boolean>(isImpactVisible);
  const scrollProgressRef = useRef<number>(scrollProgress);
  
  // Mouse interaction state
  const mouseRef = useRef<{ x: number; y: number; active: boolean; targetActive: boolean; lastActiveTime: number }>({
    x: -1000,
    y: -1000,
    active: false,
    targetActive: false,
    lastActiveTime: 0
  });

  useEffect(() => {
    topologyRef.current = topology;
  }, [topology]);

  useEffect(() => {
    isConvergingRef.current = isConverging;
  }, [isConverging]);

  useEffect(() => {
    isImpactVisibleRef.current = isImpactVisible;
  }, [isImpactVisible]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // DPR Cap: Math.min(window.devicePixelRatio, 1.75) as per spec
    const getDPR = () => Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = getDPR();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse listener with smooth return
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      mouseRef.current.targetActive = true;
      mouseRef.current.lastActiveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle count: 900-1800 desktop, 400-800 tablet, 200-400 mobile
    const getParticleCount = () => {
      if (width < 768) return 280;
      if (width < 1200) return 650;
      return 1250;
    };

    const particleCount = getParticleCount();
    const particles: Particle[] = [];

    // Colors according to Section 11 & Section 02
    // Most: #101820 (Ink)
    // Some: #3155FF (Ultramarine)
    // Smaller: #C7F36B (Acid)
    // Rare: #FF5B3D (Coral Signal)
    const colorTable = [
      'rgba(16, 24, 32, 0.72)',    // 0: Ink (majority ~70%)
      'rgba(49, 85, 255, 0.85)',   // 1: Ultramarine (~18%)
      'rgba(199, 243, 107, 0.95)', // 2: Acid (~8%)
      'rgba(255, 91, 61, 0.95)'    // 3: Coral Signal (~4%)
    ];

    const trailColorTable = [
      'rgba(16, 24, 32, 0.08)',
      'rgba(49, 85, 255, 0.12)',
      'rgba(199, 243, 107, 0.14)',
      'rgba(255, 91, 61, 0.16)'
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let colorType: 0 | 1 | 2 | 3 = 0;
      if (rand > 0.96) colorType = 3;       // rare coral
      else if (rand > 0.88) colorType = 2;  // acid
      else if (rand > 0.70) colorType = 1;  // ultramarine
      else colorType = 0;                  // ink

      // Hero central attractor around 72vw, 50vh
      const attractorCenterX = width * 0.72;
      const attractorCenterY = height * 0.50;
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.pow(Math.random(), 1.8) * Math.min(width, height) * 0.38;

      const px = attractorCenterX + Math.cos(angle) * dist + (Math.random() - 0.5) * 60;
      const py = attractorCenterY + Math.sin(angle) * dist * 0.75 + (Math.random() - 0.5) * 60;

      particles.push({
        x: px,
        y: py,
        prevX: px,
        prevY: py,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        targetX: px,
        targetY: py,
        mass: 0.8 + Math.random() * 0.8,
        orbitRadius: dist,
        orbitAngle: angle,
        orbitSpeed: (0.003 + Math.random() * 0.007) * (Math.random() > 0.5 ? 1 : -1),
        colorType,
        size: colorType === 0 ? (Math.random() > 0.9 ? 2.2 : 1.4) : (colorType === 3 ? 3.0 : 2.0),
        noiseOffset: Math.random() * 1000,
        cluster: Math.floor(Math.random() * 6)
      });
    }

    let lastTime = performance.now();
    let currentConvergenceFactor = 0; // 0: normal, 1: fully converged to center
    let currentTopology = topology;
    let topologyTransition = 1.0; // 0: dispersing old, 1: locked new

    const checkReducedMotion = () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // Render loop
    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      if (document.hidden) return; // Pause when hidden

      const dt = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;

      const reducedMotion = checkReducedMotion();

      // Soft clear with slight persistence for organic physical trails
      ctx.clearRect(0, 0, width, height);

      // In impact section: particles flood and fade away cleanly
      if (isImpactVisibleRef.current) {
        return; // Suppress rendering or remain quiescent during impact blue shock
      }

      // Handle convergence transition (Section 35 & 36)
      const targetConvergence = isConvergingRef.current ? 1.0 : 0.0;
      currentConvergenceFactor += (targetConvergence - currentConvergenceFactor) * (dt * 1.5);

      // Handle topology transition
      if (topologyRef.current !== currentTopology) {
        currentTopology = topologyRef.current;
        topologyTransition = 0.0;
      }
      if (topologyTransition < 1.0) {
        topologyTransition = Math.min(1.0, topologyTransition + dt * 1.1); // ~900ms transition
      }

      const scroll = scrollProgressRef.current;
      const mouse = mouseRef.current;
      const now = performance.now();

      // Fade mouse influence back to 0 if cursor stopped or left
      if (!mouse.targetActive && now - mouse.lastActiveTime > 800) {
        mouse.active = false;
      }

      // Dynamic Attractor position:
      // In Hero: 72vw, 50vh.
      // As scroll proceeds (0 -> 1), the field expands and distributes across the screen
      let attractorX = width * (0.72 - scroll * 0.22);
      let attractorY = height * (0.50 + scroll * 0.15);

      if (currentConvergenceFactor > 0.1) {
        // Converge to center of screen for final CIIRC mark
        attractorX = width * 0.5;
        attractorY = height * 0.5;
      }

      const pointCount = particles.length;

      // Draw subtle spatial connections between nearby nodes (Section 11, 12, 19)
      // Only connect a subset to guarantee 60fps
      if (!reducedMotion && currentConvergenceFactor < 0.6) {
        ctx.lineWidth = 0.6;
        const step = width < 768 ? 8 : 4;
        for (let i = 0; i < pointCount; i += step) {
          const p1 = particles[i];
          // Connect to neighbor in cluster
          const neighborIdx = (i + 13) % pointCount;
          const p2 = particles[neighborIdx];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 3600) { // < 60px
            const alpha = (1 - Math.sqrt(distSq) / 60) * 0.14 * (1 - currentConvergenceFactor);
            ctx.strokeStyle = `rgba(16, 24, 32, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < pointCount; i++) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;

        if (reducedMotion) {
          // Static, no physics
          ctx.fillStyle = colorTable[p.colorType];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // ==========================================
        // 5 SIMULTANEOUS FORCES (Section 09)
        // ==========================================

        // Force 1: Perlin / Simplex organic flow field
        const noiseScale = 0.002;
        const timeScale = currentTime * 0.0004;
        const flowAngle = Math.sin(p.x * noiseScale + timeScale + p.noiseOffset) * 
                          Math.cos(p.y * noiseScale - timeScale + p.noiseOffset) * Math.PI * 2;
        const flowForceX = Math.cos(flowAngle) * 0.18;
        const flowForceY = Math.sin(flowAngle) * 0.18;

        // Force 2: Central attractor
        const dxToCenter = attractorX - p.x;
        const dyToCenter = attractorY - p.y;
        const distToCenter = Math.sqrt(dxToCenter * dxToCenter + dyToCenter * dyToCenter) + 0.1;
        const pullStrength = currentConvergenceFactor > 0.05 
          ? (0.04 + currentConvergenceFactor * 0.08) 
          : 0.0008 * (1 + scroll * 0.8);
        const attractorForceX = (dxToCenter / distToCenter) * Math.min(distToCenter * pullStrength, 3.0);
        const attractorForceY = (dyToCenter / distToCenter) * Math.min(distToCenter * pullStrength, 3.0);

        // Force 3: Orbital force (curved trajectories around center)
        p.orbitAngle += p.orbitSpeed * (1 - currentConvergenceFactor * 0.9);
        const orbitalForceX = -Math.sin(p.orbitAngle) * (p.orbitSpeed * 35);
        const orbitalForceY = Math.cos(p.orbitAngle) * (p.orbitSpeed * 25);

        // Force 4: Cluster Repulsion & Expansion
        // Scroll influence (Section 14):
        // 0-25%: dense, coherent
        // 25-50%: begins separating
        // 50-75%: clusters visible
        // 75-100%: distinct research systems
        let clusterOffsetX = 0;
        let clusterOffsetY = 0;
        if (scroll > 0.25) {
          const clusterAngle = (p.cluster / 6) * Math.PI * 2;
          const clusterRadius = scroll * 220;
          clusterOffsetX = Math.cos(clusterAngle) * clusterRadius * (1 - currentConvergenceFactor);
          clusterOffsetY = Math.sin(clusterAngle) * clusterRadius * (1 - currentConvergenceFactor);
        }

        // Apply Topologies (Section 19: Materials, Life, Engineering, Earth, Computing, Innovation)
        let topologyForceX = 0;
        let topologyForceY = 0;

        if (currentTopology === 'materials') {
          // Crystalline hexagonal / orthogonal lattice snap
          const gridSpacing = 42;
          const snapX = Math.round(p.x / gridSpacing) * gridSpacing;
          const snapY = Math.round(p.y / gridSpacing) * gridSpacing;
          topologyForceX = (snapX - p.x) * 0.035 * topologyTransition;
          topologyForceY = (snapY - p.y) * 0.035 * topologyTransition;
        } else if (currentTopology === 'life') {
          // Branching biological trajectories
          const branchAngle = (Math.floor(p.orbitAngle / (Math.PI / 4)) * (Math.PI / 4));
          topologyForceX = Math.cos(branchAngle) * 0.8 * topologyTransition;
          topologyForceY = Math.sin(branchAngle) * 0.8 * topologyTransition;
        } else if (currentTopology === 'engineering') {
          // Geometric trajectories, high velocity directional vectors
          const rayAngle = (p.cluster % 4) * (Math.PI / 2);
          topologyForceX = Math.cos(rayAngle) * 1.2 * topologyTransition;
          topologyForceY = Math.sin(rayAngle) * 1.2 * topologyTransition;
        } else if (currentTopology === 'earth') {
          // Fluid / topographic undulating waves
          topologyForceX = Math.sin(p.y * 0.02 + currentTime * 0.001) * 1.4 * topologyTransition;
          topologyForceY = Math.cos(p.x * 0.02) * 0.6 * topologyTransition;
        } else if (currentTopology === 'computing') {
          // Discrete orthogonal grid matrix
          const stepX = (Math.floor(p.x / 30) * 30) - p.x;
          const stepY = (Math.floor(p.y / 30) * 30) - p.y;
          topologyForceX = stepX * 0.04 * topologyTransition;
          topologyForceY = stepY * 0.04 * topologyTransition;
        } else if (currentTopology === 'innovation') {
          // Interconnected rapid circular orbits
          topologyForceX = -Math.sin(currentTime * 0.002 + p.cluster) * 1.0 * topologyTransition;
          topologyForceY = Math.cos(currentTime * 0.002 + p.cluster) * 1.0 * topologyTransition;
        }

        // Combine base forces
        p.vx += (flowForceX + attractorForceX + orbitalForceX * 0.4 + topologyForceX) / p.mass;
        p.vy += (flowForceY + attractorForceY + orbitalForceY * 0.4 + topologyForceY) / p.mass;

        // Force 5: Cursor local field distortion (Section 13)
        // Within 240px, max displacement 12-18px, bends around pointer, smooth natural return
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxInfluence = 240;

          if (mDist < maxInfluence && mDist > 0.1) {
            const factor = (1 - mDist / maxInfluence);
            const displacement = factor * 16; // 12-18px displacement
            const angle = Math.atan2(mdy, mdx);
            p.vx += Math.cos(angle) * displacement * 0.15;
            p.vy += Math.sin(angle) * displacement * 0.15;
          }
        }

        // Dampening / friction (Section 36: slows down into quietness when converging)
        const damping = currentConvergenceFactor > 0.5 ? 0.82 : 0.94;
        p.vx *= damping;
        p.vy *= damping;

        // Update position
        p.x += p.vx + clusterOffsetX * 0.01;
        p.y += p.vy + clusterOffsetY * 0.01;

        // Boundary wrap (when not converging)
        if (currentConvergenceFactor < 0.2) {
          if (p.x < -40) p.x = width + 30;
          if (p.x > width + 40) p.x = -30;
          if (p.y < -40) p.y = height + 30;
          if (p.y > height + 40) p.y = -30;
        }

        // Velocity-responsive trails (Section 12)
        // Trail length 12-50px, opacity 0.04-0.18, responds to velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.4 && currentConvergenceFactor < 0.8) {
          ctx.strokeStyle = trailColorTable[p.colorType];
          ctx.lineWidth = Math.min(p.size * 0.8, 1.5);
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Draw particle node (Section 11: sharp points, NO glow)
        ctx.fillStyle = colorTable[p.colorType];
        ctx.beginPath();
        const currentSize = currentConvergenceFactor > 0.8 
          ? Math.max(0.8, p.size * (1 - (currentConvergenceFactor - 0.8) * 4)) 
          : p.size;
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // If converging, draw the central CIIRC mark when points reach center (Section 35 & 36)
      if (currentConvergenceFactor > 0.85) {
        const markAlpha = (currentConvergenceFactor - 0.85) * 6.6; // 0 to 1
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '600 15px var(--font-mono)';
        ctx.fillStyle = `rgba(16, 24, 32, ${Math.min(1, markAlpha)})`;
        ctx.letterSpacing = '0.24em';
        ctx.fillText('CIIRC · RESEARCH IS A LIVING SYSTEM', width / 2, height / 2);
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="research-field-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: 'transparent'
      }}
    />
  );
};
