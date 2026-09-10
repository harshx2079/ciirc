'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AUTHENTIC_PARTNERS } from '../data/ciircData';

export const Collaborations: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const centerX = 400;
  const centerY = 240;

  const secondaryNodes = AUTHENTIC_PARTNERS.map((partner, index) => {
    const total = AUTHENTIC_PARTNERS.length;
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = index % 2 === 0 ? 170 : 210;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    let color = '#3558C8';
    if (index % 3 === 1) color = '#557C70';
    if (index === 7) color = '#C95D48'; // Section 61: One signal #C95D48

    return {
      ...partner,
      x,
      y,
      color,
      id: index
    };
  });

  return (
    <section
      id="collaborations"
      ref={sectionRef}
      aria-label="06 / COLLABORATION"
      style={{
        backgroundColor: '#E8EDF1', // Section 60 & 88: Cool blue-gray
        padding: '170px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container">
        {/* Section Heading */}
        <div style={{ marginBottom: '60px', maxWidth: '860px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 650,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#3558C8',
              display: 'inline-block',
              marginBottom: '16px'
            }}
          >
            06 / COLLABORATION
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(44px, 4.8vw, 72px)',
              lineHeight: 0.94,
              letterSpacing: '-0.055em',
              fontWeight: 600,
              color: '#18242D',
              margin: 0
            }}
          >
            RESEARCH DOES NOT HAPPEN IN ISOLATION.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '17px',
              lineHeight: 1.65,
              color: '#718087',
              marginTop: '20px',
              margin: 0
            }}
          >
            An institutional multi-nodal matrix connecting government funding agencies, aerospace telemetry facilities, international universities, and translational industrial partners.
          </p>
        </div>

        {/* Section 60 & 61: Visual Network Graph */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            backgroundColor: 'rgba(255, 255, 255, 0.45)',
            border: '1px solid rgba(24, 36, 45, 0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <svg
            viewBox="0 0 800 480"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0
            }}
          >
            {/* Connection Lines (Section 61 & 62: 1px rgba(24,36,45,.14), slowly draw 1200ms) */}
            {secondaryNodes.map((node) => {
              const isAssociated = hoveredNode === node.id;
              const isAnyHovered = hoveredNode !== null;
              const strokeColor = isAssociated ? '#3558C8' : 'rgba(24, 36, 45, 0.14)';
              const strokeOpacity = isAssociated ? 1 : isAnyHovered ? 0.04 : 0.7;

              return (
                <line
                  key={`network-line-${node.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke={strokeColor}
                  strokeOpacity={strokeOpacity}
                  strokeWidth={isAssociated ? 1.5 : 1}
                  className={`collab-line ${isVisible ? 'drawn' : ''}`}
                />
              );
            })}

            {/* Central Node: CIIRC */}
            <circle cx={centerX} cy={centerY} r={12} fill="#3558C8" />
            <circle cx={centerX} cy={centerY} r={18} fill="none" stroke="rgba(53, 88, 200, 0.3)" strokeWidth="1" />
            <text
              x={centerX}
              y={centerY + 34}
              textAnchor="middle"
              fill="#18242D"
              fontFamily="var(--font-mono)"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.1em"
            >
              CIIRC®
            </text>

            {/* Secondary Nodes (Section 61 & 62: 6-10px, scale(.5)->scale(1), opacity 0->1, 500ms, stagger 80ms) */}
            {secondaryNodes.map((node, i) => {
              const isHovered = hoveredNode === node.id;
              const radius = isHovered ? 5 : 4;

              return (
                <g
                  key={`node-g-${node.id}`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`collab-node ${isVisible ? 'revealed' : ''}`}
                  style={{ cursor: 'pointer', transitionDelay: `${i * 80}ms` }}
                >
                  <circle cx={node.x} cy={node.y} r={radius} fill={node.color} />
                  {isHovered && (
                    <circle cx={node.x} cy={node.y} r={10} fill="none" stroke={node.color} strokeWidth="1" />
                  )}
                  <text
                    x={node.x}
                    y={node.y > centerY ? node.y + 16 : node.y - 10}
                    textAnchor="middle"
                    fill={isHovered ? '#18242D' : '#718087'}
                    fontFamily="var(--font-mono)"
                    fontSize={isHovered ? '11px' : '9.5px'}
                    fontWeight={isHovered ? '600' : '500'}
                    opacity={isHovered ? 1 : hoveredNode !== null ? 0.25 : 0.85}
                  >
                    {node.name.split(' - ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Institutional Domain Tags */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              display: 'flex',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#718087',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}
          >
            <span>ACADEMIC</span> · <span>INDUSTRIAL</span> · <span>INTERNATIONAL</span> · <span>R&amp;D</span> · <span>CONSULTANCY</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Section 62: Collab line drawing 1200ms */
        .collab-line {
          stroke-dasharray: 250;
          stroke-dashoffset: 250;
          transition: stroke-dashoffset 1200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .collab-line.drawn {
          stroke-dashoffset: 0;
        }

        /* Section 62: Collab node scale(.5)->scale(1), opacity 0->1, 500ms */
        .collab-node {
          opacity: 0;
          transform: scale(0.5);
          transform-origin: center;
          transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .collab-node.revealed {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
};
