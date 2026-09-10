'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface KineticTopologyProps {
  isFinalCallback?: boolean;
  scrollProgress?: number;
}

export const KineticTopology: React.FC<KineticTopologyProps> = ({
  isFinalCallback = false,
  scrollProgress = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  // 60fps Animation Loop
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const update = () => {
      const now = performance.now();
      setTime((now - startTime) / 1000);
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Section 33: Object Mouse Parallax (rotateX: ±2.5deg, rotateY: ±4deg, translateX: ±8px, translateY: ±6px)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || isFinalCallback) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = ((e.clientX - centerX) / centerX) * 4; // ±4deg
      targetY = ((e.clientY - centerY) / centerY) * 2.5; // ±2.5deg
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isFinalCallback]);

  // Section 34: Hero Object Scroll Motion (scale 1 -> .82, translateY 0 -> -45px, translateX 0 -> 70px, opacity 1 -> .55)
  const exitFactor = isFinalCallback ? 0 : Math.min(1, Math.max(0, scrollProgress * 2.5));
  const exitScale = 1 - exitFactor * 0.18;
  const exitTranslateY = -exitFactor * 45;
  const exitTranslateX = exitFactor * 70;
  const exitOpacity = 1 - exitFactor * 0.45;

  const rotX = -mouseOffset.y;
  const rotY = mouseOffset.x;
  const transX = (mouseOffset.x / 4) * 8 + exitTranslateX;
  const transY = (mouseOffset.y / 2.5) * 6 + exitTranslateY;

  // Speed multiplier (Section 32: slows 20% on hover)
  const speedMult = isHovered ? 0.8 : 1.0;

  // Differential rotations (Section 27 & 28)
  const rotMain = (time * (360 / 55) * speedMult) % 360;
  const rotC1 = (time * (360 / 70) * speedMult) % 360;
  const rotC2 = (-time * (360 / 90) * speedMult) % 360;
  const rotC3 = (time * (360 / 110) * speedMult) % 360;
  const rotC4 = (-time * (360 / 80) * speedMult) % 360;
  const rotC5 = (time * (360 / 130) * speedMult) % 360;

  // Section 31: Signal Vermilion node pulse (opacity 0.45 -> 0.85 -> 0.45 every 8-14s)
  const signalCycle = time % 10;
  let signalOpacity = 0.45;
  if (signalCycle < 1.2) {
    signalOpacity = 0.45 + Math.sin((signalCycle / 1.2) * Math.PI) * 0.40;
  }

  // Section 20 & 30: Procedural 3D Faceted Polyhedral Core with genuine 3D perspective rotation
  // 360deg / 75s with secondary ±4deg tilt
  const coreAngleY = (time * ((Math.PI * 2) / 75) * speedMult);
  const coreAngleX = Math.sin(time * 0.4) * (4 * (Math.PI / 180));

  // 3D vertices of an irregular faceted octahedron / icosahedron centered at (305, 305)
  const rawVertices = useMemo(() => [
    { x: 0, y: -48, z: 0 },    // Top vertex
    { x: 42, y: -10, z: 28 },  // Mid ring 1
    { x: 0, y: 15, z: 46 },    // Mid ring 2
    { x: -44, y: -12, z: 24 }, // Mid ring 3
    { x: -35, y: -8, z: -35 }, // Mid ring 4
    { x: 32, y: 12, z: -38 },  // Mid ring 5
    { x: 0, y: 48, z: 0 }      // Bottom vertex
  ], []);

  // Project 3D vertices to 2D screen with rotation
  const projectedVertices = rawVertices.map(v => {
    // Rotate Y
    const x1 = v.x * Math.cos(coreAngleY) + v.z * Math.sin(coreAngleY);
    const z1 = -v.x * Math.sin(coreAngleY) + v.z * Math.cos(coreAngleY);
    // Rotate X
    const y2 = v.y * Math.cos(coreAngleX) - z1 * Math.sin(coreAngleX);
    const z2 = v.y * Math.sin(coreAngleX) + z1 * Math.cos(coreAngleX);
    // Perspective factor
    const fov = 350;
    const scale = fov / (fov + z2);
    return {
      x: 305 + x1 * scale,
      y: 305 + y2 * scale + (isHovered ? -4 : 0), // Section 32: translateY(-4px) on hover
      z: z2
    };
  });

  // Triangular faces connecting the vertices
  const coreFaces = [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 1],
    [6, 2, 1], [6, 3, 2], [6, 4, 3], [6, 5, 4], [6, 1, 5]
  ];

  // Section 29: Nodes travelling along parent paths (18–45s periods)
  // We compute parametric coordinates for traveling nodes along curves
  const travelingNodes = useMemo(() => [
    // Primary Node: Ultramarine (#3558C8, size 11px, travels on Curve 1)
    { curveId: 1, baseAngle: 0.2, period: 26, r: 5.5, color: '#3558C8', hasRing: true },
    // Secondary Node: Mineral (#557C70, size 8px, travels on Curve 2)
    { curveId: 2, baseAngle: 2.1, period: 34, r: 4.0, color: '#557C70', hasRing: false },
    // Signal Node: Vermilion (#C95D48, size 8px, travels on Curve 3)
    { curveId: 3, baseAngle: 4.3, period: 38, r: 4.0, color: '#C95D48', isSignal: true },
    // Micro Node: Ochre (#C9A34E, size 4px, travels on Curve 4)
    { curveId: 4, baseAngle: 1.4, period: 22, r: 2.5, color: '#C9A34E', hasRing: false },
    // Other System Nodes (#18242D, sizes 4-6px, periods 18-45s)
    { curveId: 1, baseAngle: 3.1, period: 30, r: 3.0, color: '#18242D' },
    { curveId: 1, baseAngle: 5.2, period: 42, r: 2.5, color: '#18242D' },
    { curveId: 2, baseAngle: 0.8, period: 28, r: 3.0, color: '#18242D' },
    { curveId: 2, baseAngle: 4.7, period: 36, r: 2.5, color: '#18242D' },
    { curveId: 3, baseAngle: 1.9, period: 40, r: 3.0, color: '#18242D' },
    { curveId: 3, baseAngle: 5.8, period: 24, r: 2.5, color: '#18242D' },
    { curveId: 4, baseAngle: 3.7, period: 32, r: 3.0, color: '#18242D' },
    { curveId: 5, baseAngle: 0.5, period: 45, r: 3.0, color: '#18242D' },
    { curveId: 5, baseAngle: 2.7, period: 35, r: 2.5, color: '#18242D' },
    { curveId: 5, baseAngle: 4.9, period: 29, r: 3.0, color: '#18242D' }
  ], []);

  // Compute live node positions
  const liveNodes = travelingNodes.map(node => {
    const progress = (time / node.period) * Math.PI * 2;
    const currentAngle = node.baseAngle + progress;
    let rx = 190, ry = 190;
    let rot = 0;

    if (node.curveId === 1) { rx = 190; ry = 140; rot = rotC1; }
    else if (node.curveId === 2) { rx = 170; ry = 150; rot = rotC2; }
    else if (node.curveId === 3) { rx = 150; ry = 135; rot = rotC3; }
    else if (node.curveId === 4) { rx = 125; ry = 115; rot = rotC4; }
    else { rx = 210; ry = 175; rot = rotC5; }

    const localX = Math.cos(currentAngle) * rx;
    const localY = Math.sin(currentAngle) * ry;
    const rotRad = rot * (Math.PI / 180);
    const globalX = 305 + localX * Math.cos(rotRad) - localY * Math.sin(rotRad);
    const globalY = 305 + localX * Math.sin(rotRad) + localY * Math.cos(rotRad);

    return { ...node, x: globalX, y: globalY };
  });

  return (
    <div
      ref={containerRef}
      id={isFinalCallback ? 'final-kinetic-topology' : 'hero-kinetic-topology'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        ...(isFinalCallback
          ? { right: '8vw', bottom: '60px', width: '320px', height: '320px', opacity: 0.45 }
          : { right: '2vw', top: '15vh', width: '610px', height: '610px', opacity: exitOpacity }),
        zIndex: 5,
        pointerEvents: isFinalCallback ? 'none' : 'auto',
        transform: isFinalCallback
          ? 'none'
          : `translate3d(${transX}px, ${transY}px, 0) scale(${exitScale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease-out',
        cursor: 'default'
      }}
    >
      <svg
        viewBox="0 0 610 610"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
      >
        {/* Section 25: Micro Measurement System (Outer decorative technical elements) */}
        <g opacity="0.22" style={{ transformOrigin: '305px 305px', transform: `rotate(${rotMain * 0.15}deg)` }}>
          {/* Partial Circular Rulers */}
          <circle cx="305" cy="305" r="285" fill="none" stroke="#18242D" strokeWidth="0.75" strokeDasharray="2 12" />
          <circle cx="305" cy="305" r="295" fill="none" stroke="#18242D" strokeWidth="0.5" strokeDasharray="1 8" />

          {/* 16 Measurement Ticks */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x1 = 305 + Math.cos(angle) * 278;
            const y1 = 305 + Math.sin(angle) * 278;
            const x2 = 305 + Math.cos(angle) * (i % 4 === 0 ? 292 : 284);
            const y2 = 305 + Math.sin(angle) * (i % 4 === 0 ? 292 : 284);
            return (
              <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#18242D" strokeWidth={i % 4 === 0 ? '1' : '0.5'} />
            );
          })}

          {/* Coordinate Labels */}
          <text x="305" y="16" textAnchor="middle" fill="#18242D" fontFamily="var(--font-mono)" fontSize="9px" letterSpacing="0.14em">
            R–01 // TOPOLOGY MATRIX
          </text>
          <text x="590" y="308" textAnchor="start" fill="#18242D" fontFamily="var(--font-mono)" fontSize="9px" letterSpacing="0.14em">
            FIELD.VEC
          </text>
          <text x="305" y="602" textAnchor="middle" fill="#18242D" fontFamily="var(--font-mono)" fontSize="9px" letterSpacing="0.14em">
            DATA.NODE.COORD
          </text>
          <text x="20" y="308" textAnchor="end" fill="#18242D" fontFamily="var(--font-mono)" fontSize="9px" letterSpacing="0.14em">
            AXIS.L–4
          </text>

          {/* 4 Tiny Directional Markers */}
          <path d="M 305 28 L 308 33 L 302 33 Z" fill="#18242D" />
          <path d="M 582 305 L 577 302 L 577 308 Z" fill="#18242D" />
          <path d="M 305 582 L 302 577 L 308 577 Z" fill="#18242D" />
          <path d="M 28 305 L 33 308 L 33 302 Z" fill="#18242D" />
        </g>

        {/* Section 24: Secondary Translucent Geometric Planes */}
        <g style={{ transformOrigin: '305px 305px', transform: `rotate(${rotMain * 0.35}deg)` }}>
          <polygon points="230,170 380,190 350,330 210,310" fill="#3558C8" fillOpacity="0.06" stroke="#3558C8" strokeWidth="0.5" strokeOpacity="0.15" />
          <polygon points="270,220 410,240 370,410 240,380" fill="#557C70" fillOpacity="0.05" stroke="#557C70" strokeWidth="0.5" strokeOpacity="0.12" />
          <polygon points="180,240 310,200 340,360 210,390" fill="#C95D48" fillOpacity="0.04" stroke="#C95D48" strokeWidth="0.5" strokeOpacity="0.10" />
        </g>

        {/* Section 21: Primary Research Curves (5 irregular mathematical curves) */}
        {/* Curve 1: #3558C8 (+360/70s) */}
        <g style={{ transformOrigin: '305px 305px', transform: `rotate(${rotC1}deg)` }}>
          <path
            d="M 115,305 C 115,180 195,110 325,110 C 455,110 495,190 495,305 C 495,420 430,495 305,495 C 180,495 115,430 115,305 Z"
            fill="none"
            stroke="#3558C8"
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />
        </g>

        {/* Curve 2: #557C70 (-360/90s) */}
        <g style={{ transformOrigin: '305px 305px', transform: `rotate(${rotC2}deg)` }}>
          <path
            d="M 135,305 C 135,210 215,135 340,145 C 465,155 480,230 470,325 C 460,420 395,480 280,470 C 165,460 135,400 135,305 Z"
            fill="none"
            stroke="#557C70"
            strokeWidth="1.25"
            strokeOpacity="0.45"
          />
        </g>

        {/* Curve 3: #3558C8 (+360/110s) */}
        <g style={{ transformOrigin: '305px 305px', transform: `rotate(${rotC3}deg)` }}>
          <path
            d="M 155,305 C 145,165 235,120 330,125 C 425,130 460,205 450,305 C 440,405 385,460 270,455 C 155,450 165,445 155,305 Z"
            fill="none"
            stroke="#3558C8"
            strokeWidth="1"
            strokeOpacity="0.40"
          />
        </g>

        {/* Curve 4: #18242D (-360/80s) */}
        <g style={{ transformOrigin: '305px 305px', transform: `rotate(${rotC4}deg)` }}>
          <path
            d="M 180,305 C 180,225 230,175 320,170 C 410,165 440,215 435,305 C 430,395 375,440 290,440 C 205,440 180,385 180,305 Z"
            fill="none"
            stroke="#18242D"
            strokeWidth="1"
            strokeOpacity="0.30"
          />
        </g>

        {/* Curve 5: #3558C8 (+360/130s) */}
        <g style={{ transformOrigin: '305px 305px', transform: `rotate(${rotC5}deg)` }}>
          <path
            d="M 95,305 C 95,150 185,95 305,95 C 425,95 515,160 515,305 C 515,450 410,515 305,515 C 200,515 95,460 95,305 Z"
            fill="none"
            stroke="#3558C8"
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="6 6"
          />
        </g>

        {/* Section 23: Thin Dynamic Connections between nearby nodes */}
        <g opacity={isHovered ? 0.25 : 0.14}>
          {liveNodes.slice(0, 8).map((node, i) => {
            const nextNode = liveNodes[(i + 2) % liveNodes.length];
            return (
              <line
                key={`conn-${i}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="#18242D"
                strokeWidth="0.75"
              />
            );
          })}
          {/* Central convergence rays to core */}
          {liveNodes.slice(0, 4).map((node, i) => (
            <line
              key={`core-ray-${i}`}
              x1={node.x}
              y1={node.y}
              x2={305}
              y2={305 + (isHovered ? -4 : 0)}
              stroke="#3558C8"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          ))}
        </g>

        {/* Section 22 & 29: Parametrically Traveling Nodes along Parent Paths */}
        {liveNodes.map((node, i) => {
          const isNodeHovered = isHovered;
          const nodeOpacity = node.isSignal ? signalOpacity : isNodeHovered ? 0.85 : 0.65;

          return (
            <g key={`live-node-${i}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.color}
                opacity={nodeOpacity}
              />
              {node.hasRing && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + 4}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="0.75"
                  opacity={nodeOpacity * 0.6}
                />
              )}
            </g>
          );
        })}

        {/* Section 20 & 30: Central Faceted Open Polyhedron with 3D perspective shading */}
        <g>
          {coreFaces.map((face, fIdx) => {
            const v0 = projectedVertices[face[0]];
            const v1 = projectedVertices[face[1]];
            const v2 = projectedVertices[face[2]];
            // Normal Z to determine face visibility and depth shading
            const nz = (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x);
            const isFront = nz > 0;
            const faceOpacity = isFront ? 0.22 : 0.08;

            return (
              <polygon
                key={`face-${fIdx}`}
                points={`${v0.x},${v0.y} ${v1.x},${v1.y} ${v2.x},${v2.y}`}
                fill="#18242D"
                fillOpacity={faceOpacity}
                stroke="#3558C8"
                strokeWidth="0.75"
                strokeOpacity={isFront ? 0.45 : 0.15}
              />
            );
          })}

          {/* Partially hollow central aperture ring */}
          <circle
            cx="305"
            cy={305 + (isHovered ? -4 : 0)}
            r="14"
            fill="none"
            stroke="#18242D"
            strokeWidth="0.75"
            strokeOpacity="0.4"
          />
        </g>
      </svg>

      <style jsx>{`
        @media (max-width: 1440px) {
          #hero-kinetic-topology {
            width: 530px !important;
            height: 530px !important;
          }
        }
        @media (max-width: 1280px) {
          #hero-kinetic-topology {
            width: 480px !important;
            height: 480px !important;
            right: 1vw !important;
          }
        }
        @media (max-width: 1024px) {
          #hero-kinetic-topology {
            width: 420px !important;
            height: 420px !important;
            right: -20px !important;
            top: 24vh !important;
          }
        }
        @media (max-width: 768px) {
          #hero-kinetic-topology {
            width: 390px !important;
            height: 390px !important;
            right: -115px !important;
            top: 500px !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};
