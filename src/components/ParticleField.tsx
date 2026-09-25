'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  color: string;
  ampX: number;
  ampY: number;
  speedX: number;
  speedY: number;
  phaseX: number;
  phaseY: number;
}

export const ParticleField: React.FC<{ opacityModifier?: number }> = ({ opacityModifier = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 30 : 65;

    const colors = [
      'rgba(22, 119, 255,',  // Blue
      'rgba(37, 191, 239,',  // Cyan
      'rgba(99, 91, 255,'    // Indigo
    ];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        const opacity = (0.10 + Math.random() * 0.18) * opacityModifier;

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 0.8 + Math.random() * 0.9, // 1 - 2px diameter
          opacity,
          color: colorPrefix,
          ampX: 8 + Math.random() * 16,     // 8-24px drift
          ampY: 6 + Math.random() * 12,     // 6-18px drift
          speedX: 0.0003 + Math.random() * 0.0004,
          speedY: 0.00025 + Math.random() * 0.00035,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2
        });
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastTime = performance.now();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Smooth sinusoidal drift
        p.x = p.baseX + Math.sin(now * p.speedX + p.phaseX) * p.ampX;
        p.y = p.baseY + Math.cos(now * p.speedY + p.phaseY) * p.ampY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.fill();

        // Connect only a small subset of nearby particles with very subtle lines
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 95;
          if (dist < maxDist) {
            const lineOpacity = (1 - dist / maxDist) * 0.05 * opacityModifier;
            if (lineOpacity > 0.015) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(22, 119, 255, ${lineOpacity})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [opacityModifier]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        width: '100vw',
        height: '100vh'
      }}
      aria-hidden="true"
    />
  );
};
