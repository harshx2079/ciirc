'use client';

import React, { useEffect, useRef } from 'react';

// Deterministic pseudo-random generator with seed (Section 10)
function createLCG(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface LivingParticle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  colorType: 'ink' | 'cobalt' | 'mineral' | 'coral';
  speed: number;
  phaseX: number;
  phaseY: number;
  driftAmpX: number;
  driftAmpY: number;
  signalActive: boolean;
  signalTimer: number;
  signalDuration: number;
}

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Section 22: Scroll Density response (Hero 100%, About 70%, Research 85%, Facilities 45%, Impact 30%, Collab 50%, Footer 15%)
    let currentDensity = 1.0;
    const updateScrollDensity = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (progress < 0.14) {
        currentDensity = 1.0; // Hero
      } else if (progress < 0.28) {
        currentDensity = 0.70; // About
      } else if (progress < 0.48) {
        currentDensity = 0.85; // Research
      } else if (progress < 0.65) {
        currentDensity = 0.45; // Facilities
      } else if (progress < 0.78) {
        currentDensity = 0.30; // Impact
      } else if (progress < 0.90) {
        currentDensity = 0.50; // Collaborations
      } else {
        currentDensity = 0.15; // Footer
      }
    };
    window.addEventListener('scroll', updateScrollDensity, { passive: true });

    let particles: LivingParticle[] = [];

    const initParticles = () => {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      // Section 8: 80–110 desktop, 50–70 tablet, 25–40 mobile
      const count = isMobile ? 32 : isTablet ? 60 : 96;
      const rand = createLCG(82079);

      // Section 12: Three research clusters
      // Cluster A: Upper-right (73% / 30%, radius 230px, materials/engineering, mostly cobalt)
      // Cluster B: Middle-right (82% / 56%, radius 190px, life/environment, mostly mineral)
      // Cluster C: Lower-right (67% / 78%, radius 220px, systems/computing, ink + cobalt)
      const clusters = [
        { cx: 0.73, cy: 0.30, spreadX: 0.15, spreadY: 0.16, prefColor: 'cobalt' },
        { cx: 0.82, cy: 0.56, spreadX: 0.13, spreadY: 0.14, prefColor: 'mineral' },
        { cx: 0.67, cy: 0.78, spreadX: 0.16, spreadY: 0.15, prefColor: 'ink' }
      ];

      particles = [];

      for (let i = 0; i < count; i++) {
        let bx: number;
        let by: number;
        let colorType: 'ink' | 'cobalt' | 'mineral' | 'coral';

        if (rand() < 0.70) {
          const clusterIdx = Math.floor(rand() * clusters.length);
          const c = clusters[clusterIdx];
          const angle = rand() * Math.PI * 2;
          const dist = rand();
          bx = Math.min(0.96, Math.max(0.48, c.cx + Math.cos(angle) * c.spreadX * dist));
          by = Math.min(0.92, Math.max(0.14, c.cy + Math.sin(angle) * c.spreadY * dist));

          // Section 9: 70% ink, 20% cobalt, 8% mineral, 2% coral
          const roll = rand();
          if (c.prefColor === 'cobalt') {
            colorType = roll < 0.50 ? 'cobalt' : roll < 0.90 ? 'ink' : roll < 0.97 ? 'mineral' : 'coral';
          } else if (c.prefColor === 'mineral') {
            colorType = roll < 0.45 ? 'mineral' : roll < 0.85 ? 'ink' : roll < 0.97 ? 'cobalt' : 'coral';
          } else {
            colorType = roll < 0.60 ? 'ink' : roll < 0.92 ? 'cobalt' : roll < 0.98 ? 'mineral' : 'coral';
          }
        } else {
          bx = 0.46 + rand() * 0.50;
          by = 0.12 + rand() * 0.82;
          const roll = rand();
          colorType = roll < 0.70 ? 'ink' : roll < 0.90 ? 'cobalt' : roll < 0.98 ? 'mineral' : 'coral';
        }

        // Section 9: Opacity 0.12–0.35, Radius 1.0–2.5px
        const baseOpacity = 0.12 + rand() * 0.22;

        particles.push({
          baseX: bx,
          baseY: by,
          x: bx * width,
          y: by * height,
          radius: 1.0 + rand() * 1.4, // 1px – 2.4px
          baseOpacity,
          opacity: baseOpacity,
          colorType,
          speed: 0.02 + rand() * 0.05, // Section 10: 0.02–0.08 px/frame
          phaseX: rand() * Math.PI * 2,
          phaseY: rand() * Math.PI * 2,
          driftAmpX: 10 + rand() * 16,
          driftAmpY: 8 + rand() * 14,
          signalActive: false,
          signalTimer: 0,
          signalDuration: 2.0
        });
      }
    };

    initParticles();

    // Section 14: Moving "signal" dots every 8–12 seconds
    let nextSignalTime = 8 + Math.random() * 4;
    let signalCooldown = 0;

    let lastTime = performance.now();
    let tick = 0;

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      tick += dt;
      signalCooldown += dt;

      ctx.clearRect(0, 0, width, height);

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const activeCount = Math.floor(particles.length * currentDensity);

      // Section 14: trigger signal dot
      if (!prefersReduced && signalCooldown > nextSignalTime) {
        signalCooldown = 0;
        nextSignalTime = 8 + Math.random() * 4;
        const available = particles.filter((p) => !p.signalActive);
        if (available.length > 0) {
          const target = available[Math.floor(Math.random() * available.length)];
          target.signalActive = true;
          target.signalTimer = 0;
          target.signalDuration = 1.8 + Math.random() * 0.7; // 1.8 - 2.5s
        }
      }

      // Update positions and signal states
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          p.x = p.baseX * width + Math.sin(tick * p.speed + p.phaseX) * p.driftAmpX;
          p.y = p.baseY * height + Math.cos(tick * p.speed + p.phaseY) * p.driftAmpY;
        } else {
          p.x = p.baseX * width;
          p.y = p.baseY * height;
        }

        if (p.signalActive) {
          p.signalTimer += dt;
          const progress = p.signalTimer / p.signalDuration;
          if (progress >= 1.0) {
            p.signalActive = false;
            p.opacity = p.baseOpacity;
          } else {
            // Pulse: 0.15 -> 0.45 -> 0.15 over duration (Section 14)
            const pulse = Math.sin(progress * Math.PI);
            p.opacity = p.baseOpacity + pulse * (0.45 - p.baseOpacity);
          }
        } else {
          p.opacity = p.baseOpacity;
        }
      }

      // Section 11: Connect particles when distance < 130px, max 2-3 connections per particle
      const maxDist = 130;
      const connectionCounts = new Uint8Array(activeCount);

      for (let i = 0; i < activeCount; i++) {
        if (connectionCounts[i] >= 3) continue;
        const p1 = particles[i];

        for (let j = i + 1; j < activeCount; j++) {
          if (connectionCounts[i] >= 3 || connectionCounts[j] >= 3) continue;
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            connectionCounts[i]++;
            connectionCounts[j]++;

            // Section 11: stroke-width: 0.5px, opacity: 0.04 – 0.10
            const lineOpacity = (1 - dist / maxDist) * 0.09 * currentDensity;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(23, 35, 43, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        const effOpacity = p.opacity * currentDensity;
        let fill = `rgba(23, 35, 43, ${effOpacity})`; // 70% ink

        if (p.colorType === 'cobalt') {
          fill = `rgba(49, 87, 200, ${effOpacity * 1.15})`;
        } else if (p.colorType === 'mineral') {
          fill = `rgba(76, 129, 118, ${effOpacity * 1.15})`;
        } else if (p.colorType === 'coral') {
          fill = `rgba(217, 107, 82, ${effOpacity * 1.3})`;
        }

        ctx.fillStyle = fill;
        ctx.fill();
      }

      if (isVisible) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', updateScrollDensity);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#F5F3EE', // Section 5: Base paper
        overflow: 'hidden'
      }}
    >
      {/* Section 5: Field 1 — cobalt atmospheric field (barely visible) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 72% 34%, rgba(49, 87, 200, 0.075) 0%, rgba(49, 87, 200, 0.035) 22%, transparent 52%)',
          pointerEvents: 'none'
        }}
      />

      {/* Section 5: Field 2 — mineral atmospheric field (barely visible) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 82% 72%, rgba(76, 129, 118, 0.055) 0%, rgba(76, 129, 118, 0.025) 20%, transparent 48%)',
          pointerEvents: 'none'
        }}
      />

      {/* Section 13 & 15: Slow Scientific Orbits & Field Contours SVG */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '10%',
          width: '720px',
          height: '720px',
          pointerEvents: 'none',
          opacity: 0.85
        }}
      >
        <svg viewBox="0 0 800 800" width="100%" height="100%">
          {/* Section 13: 3 incomplete circles (320px, 500px, 680px, stroke 1px, opacity 0.055–0.10, #17232B, rotating 95s, 125s, 155s) */}
          <circle
            cx="400"
            cy="400"
            r="160"
            fill="none"
            stroke="#17232B"
            strokeWidth="1"
            strokeOpacity="0.08"
            strokeDasharray="220 140 80 60"
            className="living-orbit-1"
          />
          <circle
            cx="400"
            cy="400"
            r="250"
            fill="none"
            stroke="#17232B"
            strokeWidth="1"
            strokeOpacity="0.065"
            strokeDasharray="340 180 120 90"
            className="living-orbit-2"
          />
          <circle
            cx="400"
            cy="400"
            r="340"
            fill="none"
            stroke="#17232B"
            strokeWidth="1"
            strokeOpacity="0.055"
            strokeDasharray="420 220 160 110"
            className="living-orbit-3"
          />

          {/* Section 15: 4-6 irregular contour paths resembling scientific topographic / field traces */}
          <path
            d="M 120 380 Q 240 330, 390 370 T 680 340"
            fill="none"
            stroke="rgba(23, 35, 43, 0.045)"
            strokeWidth="1"
            className="living-contour-1"
          />
          <path
            d="M 150 430 Q 280 400, 420 440 T 710 410"
            fill="none"
            stroke="rgba(23, 35, 43, 0.045)"
            strokeWidth="1"
            className="living-contour-2"
          />
          <path
            d="M 180 480 Q 320 460, 460 510 T 730 480"
            fill="none"
            stroke="rgba(23, 35, 43, 0.045)"
            strokeWidth="1"
          />
          <path
            d="M 220 530 Q 360 520, 500 560 T 760 540"
            fill="none"
            stroke="rgba(23, 35, 43, 0.040)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* HTML5 Canvas for delicate particles & faint connection annotations */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      <style jsx>{`
        .living-orbit-1 {
          transform-origin: 400px 400px;
          animation: orbit-rot 95s linear infinite;
        }
        .living-orbit-2 {
          transform-origin: 400px 400px;
          animation: orbit-rot-rev 125s linear infinite;
        }
        .living-orbit-3 {
          transform-origin: 400px 400px;
          animation: orbit-rot 155s linear infinite;
        }
        .living-contour-1 {
          animation: contour-drift 42s ease-in-out infinite alternate;
        }
        .living-contour-2 {
          animation: contour-drift 48s ease-in-out infinite alternate-reverse;
        }

        @keyframes orbit-rot {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-rot-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes contour-drift {
          0% { transform: translateX(0px); }
          100% { transform: translateX(28px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .living-orbit-1,
          .living-orbit-2,
          .living-orbit-3,
          .living-contour-1,
          .living-contour-2 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
