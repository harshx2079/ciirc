'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AUTHENTIC_ACHIEVEMENTS } from '../data/ciircData';

export const AchievementsMap: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth progress lerp references
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Milestone definitions with milestone threshold ranges
  const milestones = [
    {
      ...AUTHENTIC_ACHIEVEMENTS[0], // North Pole Arctic
      threshold: 0.18,
      x: 100,
      y: 110,
      pointName: 'P–01 // NORTH POLE'
    },
    {
      ...AUTHENTIC_ACHIEVEMENTS[1], // Arctic Drone
      threshold: 0.34,
      x: 280,
      y: 60,
      pointName: 'P–02 // ARCTIC UAV'
    },
    {
      ...AUTHENTIC_ACHIEVEMENTS[2], // ISRO Telemetry
      threshold: 0.50,
      x: 480,
      y: 130,
      pointName: 'P–03 // ISRO IRNSS'
    },
    {
      ...AUTHENTIC_ACHIEVEMENTS[3], // Himalayan Mapping
      threshold: 0.66,
      x: 680,
      y: 70,
      pointName: 'P–04 // HIMALAYAS'
    },
    {
      ...AUTHENTIC_ACHIEVEMENTS[5], // Nano Sparx 2020
      threshold: 0.82,
      x: 880,
      y: 135,
      pointName: 'P–05 // NANO SPARX'
    },
    {
      ...AUTHENTIC_ACHIEVEMENTS[8], // South Pole Antarctica
      threshold: 0.94,
      x: 1080,
      y: 85,
      pointName: 'P–06 // SOUTH POLE'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateScrollTarget = () => {
      if (!wrapperRef.current || window.innerWidth <= 768) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;

      if (maxScroll > 0) {
        // Scrolled distance within the scroll container
        const current = -rect.top;
        const p = Math.max(0, Math.min(1, current / maxScroll));
        targetProgressRef.current = p;
      }
    };

    // Calculate initial target and align current immediately to avoid jump on mount
    updateScrollTarget();
    currentProgressRef.current = targetProgressRef.current;
    setScrollProgress(targetProgressRef.current);

    window.addEventListener('scroll', updateScrollTarget, { passive: true });

    // Ultra-smooth 60fps/120fps requestAnimationFrame lerp loop
    let isRunning = true;
    const lerpLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        // 0.085 lerp factor creates an organic, physics-damped easing curve
        currentProgressRef.current += diff * 0.085;
        setScrollProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setScrollProgress(targetProgressRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(lerpLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(lerpLoop);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', updateScrollTarget);
    };
  }, []);

  // Determine current active milestone index based on smooth scroll progress
  let activeIndex = 0;
  for (let i = 0; i < milestones.length; i++) {
    if (scrollProgress >= milestones[i].threshold) {
      activeIndex = i;
    }
  }

  // Calculate route drawing progress (mapped from 0.10 to 0.94)
  const routeDrawPct = Math.max(0, Math.min(1, (scrollProgress - 0.10) / 0.84));
  const pathTotalLength = 1200;
  const strokeOffset = pathTotalLength * (1 - routeDrawPct);

  // Section exit transform (after progress > 0.96)
  const isExiting = scrollProgress > 0.96;
  const exitOffsetY = isExiting ? (scrollProgress - 0.96) * -600 : 0;
  const exitOpacity = isExiting ? 1 - (scrollProgress - 0.96) * 12 : 1;

  const currentMilestone = milestones[activeIndex];

  // Mobile Render (Standard non-pinned vertical list)
  if (isMobile) {
    return (
      <section
        id="achievements"
        style={{
          backgroundColor: 'var(--paper)',
          padding: '100px 0',
          borderBottom: '1px solid var(--line)'
        }}
      >
        <div className="atlas-container">
          <div style={{ marginBottom: '40px' }}>
            <span className="mono-meta" style={{ color: 'var(--teal)' }}>
              SECTION 08 // EXPEDITIONS & MILESTONES
            </span>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.045em',
                color: 'var(--forest)',
                marginTop: '12px',
                textTransform: 'uppercase'
              }}
            >
              SCIENTIFIC EXPEDITION
              <br />
              TRAJECTORIES.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {milestones.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  padding: '24px',
                  border: '1px solid var(--line)',
                  backgroundColor: 'var(--paper-warm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="mono-meta" style={{ color: 'var(--teal)' }}>
                    {item.pointName}
                  </span>
                  <span className="mono-meta">0{idx + 1}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--forest)', margin: '8px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--forest-soft)', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Render: 320vh Scroll Container with Pinned 100svh Viewport
  return (
    <section
      ref={wrapperRef}
      id="achievements"
      style={{
        position: 'relative',
        height: '320vh',
        backgroundColor: 'var(--paper)',
        borderBottom: '1px solid var(--line)'
      }}
    >
      {/* Pinned Viewport Container (100svh Sticky Chapter) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          transform: `translate3d(0, ${exitOffsetY}px, 0)`,
          opacity: Math.max(0.45, exitOpacity),
          willChange: 'transform, opacity'
        }}
      >
        <div className="atlas-container" style={{ width: '100%' }}>
          {/* Header & Monospace Progress */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '36px'
            }}
          >
            <div>
              <span className="mono-meta" style={{ color: 'var(--teal)' }}>
                SECTION 08 // EXPEDITION CHAPTER [PROGRESS: {Math.round(scrollProgress * 100)}%]
              </span>
              <h2
                style={{
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.045em',
                  color: 'var(--forest)',
                  marginTop: '10px',
                  textTransform: 'uppercase'
                }}
              >
                SCIENTIFIC EXPEDITION
                <br />
                TRAJECTORIES.
              </h2>
            </div>
            <div className="mono-meta" style={{ textAlign: 'right' }}>
              <span>ACTIVE MILESTONE: {activeIndex + 1} OF {milestones.length}</span>
              <br />
              <span style={{ color: 'var(--teal)' }}>
                {scrollProgress >= 0.94 ? '● CHAPTER COMPLETE — READY TO ADVANCE' : '● SCROLL TO PROGRESS ROUTE'}
              </span>
            </div>
          </div>

          {/* Expedition SVG Route Map Box */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--paper-warm)',
              border: '1px solid var(--line-strong)',
              padding: '28px 36px',
              marginBottom: '32px',
              overflow: 'hidden'
            }}
          >
            {/* Top Smooth Progress Rail */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2.5px',
                backgroundColor: 'var(--line)',
                zIndex: 2
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
                  backgroundColor: 'var(--teal)',
                  willChange: 'width'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <span className="mono-meta" style={{ fontSize: '10px' }}>
                EXPEDITION GEO-PATH // ARCTIC · ISRO IRNSS · HIMALAYAS · ANTARCTICA
              </span>
              <span className="mono-meta" style={{ fontSize: '10px', color: 'var(--teal)' }}>
                WAYPOINT SYSTEM 2018–PRESENT
              </span>
            </div>

            {/* SVG Path Route with Sequential Milestones */}
            <div style={{ width: '100%', height: '160px', position: 'relative', zIndex: 1 }}>
              <svg viewBox="0 0 1180 180" width="100%" height="100%">
                {/* Static Background Guideline */}
                <path
                  d="M 60 110 C 220 30, 380 160, 560 90 S 840 160, 1120 85"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="2"
                />

                {/* Progressively Drawn Route Path (Driven smoothly at 60fps/120fps by rAF lerp loop) */}
                <path
                  d="M 60 110 C 220 30, 380 160, 560 90 S 840 160, 1120 85"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="2.5"
                  strokeDasharray={pathTotalLength}
                  strokeDashoffset={strokeOffset}
                />

                {/* Milestones along the route */}
                {milestones.map((m, idx) => {
                  const isReached = scrollProgress >= m.threshold;
                  const isCurrent = activeIndex === idx;

                  return (
                    <g key={m.id}>
                      {/* Vertical Indicator Line */}
                      {isReached && (
                        <line
                          x1={m.x}
                          y1={m.y}
                          x2={m.x}
                          y2={m.y > 90 ? m.y - 30 : m.y + 30}
                          stroke="var(--teal)"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          opacity={0.6}
                        />
                      )}

                      {/* Active Milestone Pulse Ping */}
                      {isCurrent && (
                        <circle
                          cx={m.x}
                          cy={m.y}
                          r={14}
                          fill="none"
                          stroke="var(--teal)"
                          strokeWidth="1.5"
                          opacity={0.7}
                          className="waypoint-pulse"
                        />
                      )}

                      {/* Milestone Point */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r={isCurrent ? 7.5 : isReached ? 5.5 : 4}
                        fill={isCurrent ? 'var(--forest)' : isReached ? 'var(--teal)' : 'var(--paper)'}
                        stroke={isReached ? 'var(--teal)' : 'var(--line-strong)'}
                        strokeWidth="2"
                        style={{
                          transformOrigin: `${m.x}px ${m.y}px`,
                          transform: isReached ? 'scale(1)' : 'scale(0.6)',
                          opacity: isReached ? 1 : 0.4,
                          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease'
                        }}
                      />

                      {/* Monospace Waypoint Tag */}
                      <text
                        x={m.x}
                        y={m.y > 90 ? m.y - 38 : m.y + 44}
                        textAnchor="middle"
                        fontFamily="var(--font-mono)"
                        fontSize="9.5"
                        letterSpacing="0.1em"
                        fill={isCurrent ? 'var(--forest)' : isReached ? 'var(--teal)' : 'var(--muted)'}
                        fontWeight={isCurrent ? '700' : '500'}
                        style={{
                          opacity: isReached ? 1 : 0,
                          transform: isReached ? 'translateY(0)' : 'translateY(6px)',
                          transition: 'opacity 350ms ease, transform 350ms ease'
                        }}
                      >
                        {m.pointName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Milestone Information Panel (Smooth Cross-fade on Milestone Transition) */}
          <div
            key={currentMilestone.id}
            className="milestone-content-animated"
            style={{
              backgroundColor: 'var(--paper-warm)',
              border: '1px solid var(--forest)',
              padding: '32px 40px',
              minHeight: '160px',
              display: 'grid',
              gridTemplateColumns: '180px 1fr 200px',
              gap: '32px',
              alignItems: 'center',
              boxShadow: '0 4px 16px rgba(16, 37, 31, 0.04)'
            }}
          >
            <div>
              <span className="mono-meta" style={{ color: 'var(--teal)' }}>
                ACTIVE MILESTONE 0{activeIndex + 1}
              </span>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: 'var(--forest)',
                  marginTop: '6px'
                }}
              >
                P–0{activeIndex + 1}
              </div>
              <span className="mono-meta" style={{ fontSize: '10px' }}>
                {currentMilestone.category}
              </span>
            </div>

            <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '28px' }}>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--forest)',
                  margin: '0 0 8px 0'
                }}
              >
                {currentMilestone.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--forest-soft)',
                  lineHeight: 1.55,
                  margin: 0
                }}
              >
                {currentMilestone.description}
              </p>
            </div>

            <div
              style={{
                borderLeft: '1px solid var(--line)',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <span className="mono-meta" style={{ fontSize: '9px' }}>
                COORDINATES / STATUS
              </span>
              <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--forest)' }}>
                VERIFIED ARCHIVE
              </div>
              <span className="mono-meta" style={{ color: 'var(--teal)', fontSize: '10px' }}>
                ● COMPLETED EXPEDITION
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes waypointPulse {
          0% {
            r: 10px;
            opacity: 0.8;
          }
          50% {
            r: 18px;
            opacity: 0.2;
          }
          100% {
            r: 10px;
            opacity: 0.8;
          }
        }
        .waypoint-pulse {
          animation: waypointPulse 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          transform-origin: center;
        }
        @keyframes milestoneContentFade {
          from {
            opacity: 0.3;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .milestone-content-animated {
          animation: milestoneContentFade 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};
