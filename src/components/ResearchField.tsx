'use client';

import React, { useEffect, useRef, useState } from 'react';

export const ResearchField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [telemetry, setTelemetry] = useState({
    field: 'FIELD 07',
    x: '032.48',
    y: '118.06',
    scale: '10μm',
    status: 'SCAN ACTIVE'
  });

  // Animation values tracked in ref to avoid re-renders
  const animRef = useRef({
    time: 0,
    scanX: 180,
    scanDir: 1,
    scanWait: 0,
    currX: 0,
    currY: 0,
    currRot: 0,
    targetX: 0,
    targetY: 0,
    targetRot: 0
  });

  // Periodic telemetry fluctuation (every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const fx = (32 + Math.random() * 0.9).toFixed(2);
      const fy = (118 + Math.random() * 0.9).toFixed(2);
      setTelemetry((prev) => ({
        ...prev,
        x: `0${fx}`,
        y: `${fy}`,
        status: Math.random() > 0.4 ? 'SCAN ACTIVE' : 'RESOLVING'
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Pointer tracking with spring-like smoothing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, relX));
      const clampedY = Math.max(-1, Math.min(1, relY));

      animRef.current.targetX = clampedX * 12;
      animRef.current.targetY = clampedY * 10;
      animRef.current.targetRot = clampedX * 2;
      setMousePos({ x: clampedX, y: clampedY });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Continuous animation loop using rAF + IntersectionObserver
  useEffect(() => {
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const loop = (timestamp: number) => {
      if (isVisible) {
        animRef.current.time += 0.016;
        const t = animRef.current.time;

        // Smooth spring interpolation for mouse follow
        animRef.current.currX += (animRef.current.targetX - animRef.current.currX) * 0.05;
        animRef.current.currY += (animRef.current.targetY - animRef.current.currY) * 0.05;
        animRef.current.currRot += (animRef.current.targetRot - animRef.current.currRot) * 0.05;

        // Update container transform directly for zero-latency 60fps
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${animRef.current.currX}px, ${animRef.current.currY}px, 0px) rotate(${animRef.current.currRot}deg)`;
        }

        // Scan frame movement: 18s across (approx 250px travel)
        if (animRef.current.scanWait > 0) {
          animRef.current.scanWait -= 0.016;
        } else {
          animRef.current.scanX += animRef.current.scanDir * 0.28;
          if (animRef.current.scanX > 320) {
            animRef.current.scanDir = -1;
            animRef.current.scanWait = 2.0; // 2 seconds pause
          } else if (animRef.current.scanX < 80) {
            animRef.current.scanDir = 1;
            animRef.current.scanWait = 2.0;
          }
        }

        const scanEl = document.getElementById('research-scan-box');
        if (scanEl) {
          scanEl.setAttribute('x', animRef.current.scanX.toString());
        }
        const scanClip = document.getElementById('scan-rect-clip');
        if (scanClip) {
          scanClip.setAttribute('x', animRef.current.scanX.toString());
        }

        // Three Signal Markers trajectory updates
        const m1 = document.getElementById('signal-marker-1');
        if (m1) {
          const m1x = 220 + Math.sin(t * 0.2) * 45;
          const m1y = 200 + Math.cos(t * 0.18) * 35;
          m1.setAttribute('cx', m1x.toString());
          m1.setAttribute('cy', m1y.toString());
        }

        const m2 = document.getElementById('signal-marker-2');
        if (m2) {
          const m2x = 420 + Math.cos(t * 0.15) * 55;
          const m2y = 360 + Math.sin(t * 0.19) * 40;
          m2.setAttribute('cx', m2x.toString());
          m2.setAttribute('cy', m2y.toString());
        }

        const m3 = document.getElementById('signal-marker-3');
        if (m3) {
          const m3x = 280 + Math.sin(t * 0.24) * 60;
          const m3y = 440 + Math.cos(t * 0.22) * 50;
          m3.setAttribute('cx', m3x.toString());
          m3.setAttribute('cy', m3y.toString());
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  // 12 irregular organic contour lines (geological & microscopy inspired)
  const contours = [
    { d: "M 120 310 C 120 180, 200 110, 310 110 C 430 110, 500 190, 500 310 C 500 440, 420 510, 310 510 C 190 510, 120 430, 120 310 Z", op: 0.18 },
    { d: "M 140 310 C 135 200, 210 135, 310 135 C 415 135, 480 205, 480 310 C 480 425, 405 490, 310 490 C 205 490, 145 415, 140 310 Z", op: 0.14 },
    { d: "M 165 315 C 160 220, 230 160, 315 160 C 400 160, 460 220, 460 315 C 460 410, 395 465, 315 465 C 225 465, 170 405, 165 315 Z", op: 0.12 },
    { d: "M 190 320 C 185 240, 250 185, 320 185 C 385 185, 435 240, 435 320 C 435 390, 380 440, 320 440 C 245 440, 195 385, 190 320 Z", op: 0.15 },
    { d: "M 215 325 C 210 260, 265 210, 325 210 C 375 210, 415 255, 415 325 C 415 375, 370 420, 325 420 C 265 420, 220 375, 215 325 Z", op: 0.16 },
    { d: "M 240 330 C 235 280, 280 240, 330 240 C 365 240, 395 275, 395 330 C 395 365, 360 400, 330 400 C 285 400, 245 365, 240 330 Z", op: 0.13 },
    { d: "M 265 335 C 260 295, 295 265, 335 265 C 360 265, 375 290, 375 335 C 375 355, 355 380, 335 380 C 300 380, 270 355, 265 335 Z", op: 0.17 },
    { d: "M 100 290 C 105 150, 215 90, 330 90 C 455 90, 525 170, 525 305 C 525 450, 435 530, 320 530 C 180 530, 95 435, 100 290 Z", op: 0.10 },
    { d: "M 180 270 Q 310 230 440 290 Q 360 380 260 360 Z", op: 0.11 },
    { d: "M 150 360 Q 280 430 420 370 Q 330 290 200 320 Z", op: 0.09 },
    { d: "M 220 180 C 320 150, 420 230, 400 350 C 330 420, 200 380, 220 180 Z", op: 0.12 },
    { d: "M 270 220 C 340 200, 380 250, 360 320 C 320 360, 250 340, 270 220 Z", op: 0.15 }
  ];

  // 85 microstructural points with local clustering (some dense, linear, branching)
  const microstructures = [
    // Cluster 1 (Upper left dense)
    { x: 195, y: 190, r: 1.6, col: 'var(--forest)' },
    { x: 205, y: 185, r: 1.2, col: 'var(--teal)' },
    { x: 215, y: 195, r: 1.8, col: 'var(--forest)' },
    { x: 225, y: 180, r: 1.0, col: 'var(--cobalt)' },
    { x: 235, y: 200, r: 1.4, col: 'var(--forest)' },
    { x: 210, y: 210, r: 1.5, col: 'var(--teal)' },
    { x: 220, y: 225, r: 1.2, col: 'var(--forest)' },
    { x: 245, y: 215, r: 1.6, col: 'var(--forest)' },
    // Linear branch 1
    { x: 250, y: 230, r: 1.3, col: 'var(--forest)' },
    { x: 270, y: 245, r: 1.5, col: 'var(--teal)' },
    { x: 290, y: 260, r: 1.2, col: 'var(--forest)' },
    { x: 310, y: 270, r: 1.8, col: 'var(--cobalt)' },
    { x: 330, y: 285, r: 1.3, col: 'var(--forest)' },
    // Cluster 2 (Central core)
    { x: 300, y: 310, r: 2.0, col: 'var(--forest)' },
    { x: 315, y: 305, r: 1.4, col: 'var(--teal)' },
    { x: 325, y: 325, r: 1.8, col: 'var(--forest)' },
    { x: 305, y: 335, r: 1.2, col: 'var(--forest)' },
    { x: 295, y: 320, r: 1.6, col: 'var(--cobalt)' },
    { x: 335, y: 315, r: 1.5, col: 'var(--forest)' },
    { x: 345, y: 335, r: 1.2, col: 'var(--teal)' },
    // Branching set 2
    { x: 360, y: 345, r: 1.4, col: 'var(--forest)' },
    { x: 375, y: 360, r: 1.6, col: 'var(--forest)' },
    { x: 395, y: 370, r: 1.2, col: 'var(--cobalt)' },
    { x: 415, y: 385, r: 1.8, col: 'var(--forest)' },
    { x: 430, y: 400, r: 1.3, col: 'var(--teal)' },
    // Lower left cluster
    { x: 210, y: 380, r: 1.4, col: 'var(--forest)' },
    { x: 225, y: 395, r: 1.8, col: 'var(--forest)' },
    { x: 240, y: 410, r: 1.2, col: 'var(--teal)' },
    { x: 255, y: 425, r: 1.5, col: 'var(--forest)' },
    { x: 235, y: 435, r: 1.1, col: 'var(--cobalt)' },
    { x: 270, y: 440, r: 1.7, col: 'var(--forest)' },
    // Peripheral density variations
    { x: 160, y: 270, r: 1.3, col: 'var(--forest)' },
    { x: 175, y: 330, r: 1.5, col: 'var(--forest)' },
    { x: 430, y: 250, r: 1.6, col: 'var(--teal)' },
    { x: 450, y: 290, r: 1.2, col: 'var(--forest)' },
    { x: 460, y: 340, r: 1.4, col: 'var(--cobalt)' },
    { x: 380, y: 210, r: 1.5, col: 'var(--forest)' },
    { x: 350, y: 170, r: 1.3, col: 'var(--forest)' },
    { x: 290, y: 150, r: 1.7, col: 'var(--teal)' },
    { x: 360, y: 450, r: 1.4, col: 'var(--forest)' },
    { x: 320, y: 470, r: 1.6, col: 'var(--forest)' },
    { x: 180, y: 440, r: 1.2, col: 'var(--forest)' }
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '620px',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        userSelect: 'none'
      }}
    >
      {/* Decorative Outer Coordinate Rulers */}
      <div
        className="mono-meta"
        style={{
          position: 'absolute',
          top: '-24px',
          left: '0',
          display: 'flex',
          gap: '24px',
          fontSize: '10px',
          color: 'var(--muted)'
        }}
      >
        <span>{telemetry.field}</span>
        <span>LAT X: {telemetry.x}</span>
        <span>LON Y: {telemetry.y}</span>
      </div>

      <div
        className="mono-meta"
        style={{
          position: 'absolute',
          bottom: '-24px',
          right: '0',
          display: 'flex',
          gap: '18px',
          fontSize: '10px',
          color: 'var(--muted)'
        }}
      >
        <span>RES: {telemetry.scale}</span>
        <span style={{ color: 'var(--teal)' }}>● {telemetry.status}</span>
      </div>

      {/* Main SVG Container with pointer physics */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <svg
          viewBox="0 0 620 620"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            {/* High-res scanning clip path */}
            <clipPath id="scan-clip">
              <rect id="scan-rect-clip" x="180" y="210" width="250" height="180" rx="2" />
            </clipPath>

            {/* Micro grid pattern for scan frame */}
            <pattern id="micro-grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="var(--teal)" strokeWidth="0.5" opacity="0.35" />
            </pattern>
          </defs>

          {/* LAYER 1: BASE CONTOURS */}
          <g>
            {contours.map((c, i) => (
              <path
                key={`contour-${i}`}
                d={c.d}
                fill="none"
                stroke="var(--forest)"
                strokeWidth="1.1"
                opacity={c.op}
                style={{
                  transition: 'stroke-width 0.4s ease, opacity 0.4s ease'
                }}
              />
            ))}
          </g>

          {/* LAYER 2: MICROSTRUCTURE (NORMAL) */}
          <g opacity="0.45">
            {microstructures.map((p, i) => (
              <circle
                key={`micro-${i}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={p.col}
              />
            ))}
            {/* Very light interconnecting lines */}
            <line x1="215" y1="195" x2="235" y2="200" stroke="var(--forest)" strokeWidth="0.6" opacity="0.2" />
            <line x1="270" y1="245" x2="290" y2="260" stroke="var(--forest)" strokeWidth="0.6" opacity="0.2" />
            <line x1="300" y1="310" x2="325" y2="325" stroke="var(--forest)" strokeWidth="0.6" opacity="0.25" />
            <line x1="375" y1="360" x2="395" y2="370" stroke="var(--forest)" strokeWidth="0.6" opacity="0.2" />
          </g>

          {/* LAYER 3: RESEARCH SCAN FRAME */}
          <g>
            {/* Scan Box Frame */}
            <rect
              id="research-scan-box"
              x="180"
              y="210"
              width="250"
              height="180"
              fill="rgba(247, 248, 243, 0.4)"
              stroke="var(--teal)"
              strokeWidth="1"
              strokeDasharray="4 2"
              opacity="0.85"
            />

            {/* Internal High-Resolution Inspection Layer (Clipped inside scan box) */}
            <g clipPath="url(#scan-clip)">
              {/* Inspection Grid Texture */}
              <rect x="0" y="0" width="620" height="620" fill="url(#micro-grid)" />

              {/* High-res microstructures with highlighted telemetry */}
              {microstructures.map((p, i) => (
                <g key={`scan-hi-${i}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r * 1.5}
                    fill={p.col}
                    opacity="0.9"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r * 2.8}
                    fill="none"
                    stroke={p.col}
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                </g>
              ))}

              {/* Scan Center Crosshairs */}
              <line x1="305" y1="290" x2="305" y2="310" stroke="var(--teal)" strokeWidth="1" />
              <line x1="295" y1="300" x2="315" y2="300" stroke="var(--teal)" strokeWidth="1" />
            </g>

            {/* Scan Frame Metadata Callout */}
            <text
              x="190"
              y="226"
              fill="var(--teal-dark)"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="0.12em"
              fontWeight="600"
            >
              SCAN ZONE // 10μm
            </text>
          </g>

          {/* LAYER 4: MEASUREMENT ANNOTATIONS */}
          <g className="mono-meta" fill="var(--muted)" fontSize="9">
            <line x1="80" y1="310" x2="110" y2="310" stroke="var(--line-strong)" strokeWidth="1" />
            <text x="60" y="313" textAnchor="end">0.00</text>

            <line x1="310" y1="80" x2="310" y2="105" stroke="var(--line-strong)" strokeWidth="1" />
            <text x="310" y="72" textAnchor="middle">+Z REF</text>

            <line x1="510" y1="310" x2="540" y2="310" stroke="var(--line-strong)" strokeWidth="1" />
            <text x="548" y="313">AXIS 01</text>
          </g>

          {/* LAYER 5: THREE SIGNAL MARKERS */}
          {/* Signal 1: Teal (Affordable Medical Diagnostics) */}
          <g
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setActiveMarker(1)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <circle
              id="signal-marker-1"
              cx="220"
              cy="200"
              r={activeMarker === 1 ? 14 : 9}
              fill="var(--teal)"
              opacity="0.85"
              style={{ transition: 'r 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <circle
              cx="220"
              cy="200"
              r="18"
              fill="none"
              stroke="var(--teal)"
              strokeWidth="0.75"
              opacity={activeMarker === 1 ? 0.8 : 0.3}
            />
            {activeMarker === 1 && (
              <g>
                <line x1="220" y1="185" x2="180" y2="155" stroke="var(--teal)" strokeWidth="1" />
                <rect x="90" y="135" width="130" height="24" fill="var(--paper)" stroke="var(--teal)" strokeWidth="1" />
                <text x="96" y="151" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--forest)">
                  TRANSLATIONAL BIO
                </text>
              </g>
            )}
          </g>

          {/* Signal 2: Cobalt (Nanoscience & Quantum Materials) */}
          <g
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setActiveMarker(2)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <circle
              id="signal-marker-2"
              cx="420"
              cy="360"
              r={activeMarker === 2 ? 14 : 9}
              fill="var(--cobalt)"
              opacity="0.85"
              style={{ transition: 'r 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <circle
              cx="420"
              cy="360"
              r="18"
              fill="none"
              stroke="var(--cobalt)"
              strokeWidth="0.75"
              opacity={activeMarker === 2 ? 0.8 : 0.3}
            />
            {activeMarker === 2 && (
              <g>
                <line x1="420" y1="345" x2="460" y2="315" stroke="var(--cobalt)" strokeWidth="1" />
                <rect x="460" y="300" width="140" height="24" fill="var(--paper)" stroke="var(--cobalt)" strokeWidth="1" />
                <text x="466" y="316" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--forest)">
                  CRYSTAL LATTICE / 2D
                </text>
              </g>
            )}
          </g>

          {/* Signal 3: Coral (Autonomous Polar Telemetry) */}
          <g
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setActiveMarker(3)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <circle
              id="signal-marker-3"
              cx="280"
              cy="440"
              r={activeMarker === 3 ? 14 : 9}
              fill="var(--coral)"
              opacity="0.85"
              style={{ transition: 'r 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <circle
              cx="280"
              cy="440"
              r="18"
              fill="none"
              stroke="var(--coral)"
              strokeWidth="0.75"
              opacity={activeMarker === 3 ? 0.8 : 0.3}
            />
            {activeMarker === 3 && (
              <g>
                <line x1="280" y1="455" x2="250" y2="485" stroke="var(--coral)" strokeWidth="1" />
                <rect x="140" y="475" width="150" height="24" fill="var(--paper)" stroke="var(--coral)" strokeWidth="1" />
                <text x="146" y="491" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--forest)">
                  POLAR TELEMETRY / UAV
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};
