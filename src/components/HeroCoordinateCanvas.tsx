'use client';

import React, { useEffect, useRef } from 'react';

export const HeroCoordinateCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Section 35 System C: Micro nodes (35-45, size 1-2px, opacity .08-.18, translate 5-15px, duration 25-45s)
    const nodeCount = 40;
    const nodes = Array.from({ length: nodeCount }, () => ({
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      r: Math.random() * 0.8 + 0.8, // 1-2px diameter
      opacity: Math.random() * 0.10 + 0.08,
      driftDist: Math.random() * 10 + 5, // 5-15px
      driftSpeed: (Math.PI * 2) / (Math.random() * 20 + 25), // 25-45s
      phase: Math.random() * Math.PI * 2
    }));

    // Section 35 System B: Large arcs (3-5 huge partial arcs, opacity .045, rotation 0->3deg, duration 70s)
    const arcs = [
      { cx: width * 0.75, cy: height * 0.5, r: 420, start: 0.2, end: 1.8, dur: 70 },
      { cx: width * 0.85, cy: height * 0.7, r: 580, start: 2.2, end: 3.6, dur: 85 },
      { cx: width * 0.65, cy: height * 0.3, r: 340, start: 4.0, end: 5.4, dur: 65 },
      { cx: width * 0.50, cy: height * 0.8, r: 510, start: 1.1, end: 2.4, dur: 78 }
    ];

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // System A: Coordinate Grid (80px spacing, opacity .035, translateX 0 -> 40px over 45s)
      const gridOffset = ((time / 1000) * (40 / 45)) % 80;
      ctx.strokeStyle = 'rgba(24, 36, 45, 0.035)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      // Vertical grid lines
      for (let x = gridOffset; x < width; x += 80) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal grid lines
      for (let y = 0; y < height; y += 80) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // System B: Large partial arcs (opacity .045, rotation 0 -> 3deg over 70s)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(24, 36, 45, 0.045)';
      for (let i = 0; i < arcs.length; i++) {
        const a = arcs[i];
        const rot = Math.sin((time / 1000) * ((Math.PI * 2) / a.dur)) * (3 * (Math.PI / 180));
        ctx.beginPath();
        ctx.arc(a.cx, a.cy, a.r, a.start + rot, a.end + rot);
        ctx.stroke();
      }

      // System C: Micro nodes (opacity .08-.18, drifting 5-15px over 25-45s)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.driftSpeed * dt;
        const curX = n.baseX + Math.cos(n.phase) * n.driftDist;
        const curY = n.baseY + Math.sin(n.phase) * (n.driftDist * 0.7);

        ctx.fillStyle = `rgba(24, 36, 45, ${n.opacity})`;
        ctx.beginPath();
        ctx.arc(curX, curY, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};
