'use client';

import React, { useState } from 'react';
import { AUTHENTIC_17_RESEARCH_AREAS, ResearchAreaItem } from '../data/ciircData';

export const ResearchEcosystem: React.FC = () => {
  const [activeArea, setActiveArea] = useState<ResearchAreaItem>(AUTHENTIC_17_RESEARCH_AREAS[0]);

  // Render the generative scientific visualization according to the active discipline
  const renderVisualField = () => {
    const cat = activeArea.name.toLowerCase();

    if (cat.includes('water')) {
      // Flowing contour wave field
      return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <path d="M 20 120 Q 120 70 200 120 T 380 120" fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.6" />
          <path d="M 20 160 Q 120 110 200 160 T 380 160" fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.8" />
          <path d="M 20 200 Q 120 150 200 200 T 380 200" fill="none" stroke="var(--forest)" strokeWidth="1.8" />
          <path d="M 20 240 Q 120 190 200 240 T 380 240" fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.8" />
          <path d="M 20 280 Q 120 230 200 280 T 380 280" fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.6" />
          <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
            HYDRO-KINETIC MEMBRANE FLOW
          </text>
        </svg>
      );
    }

    if (cat.includes('energy')) {
      // Radial concentric field
      return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          {[30, 60, 90, 120, 150].map((r, idx) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke={idx % 2 === 0 ? 'var(--teal)' : 'var(--forest)'}
              strokeWidth="1.2"
              strokeDasharray={idx % 2 === 0 ? '4 3' : 'none'}
              opacity={0.3 + idx * 0.12}
            />
          ))}
          <line x1="200" y1="30" x2="200" y2="370" stroke="var(--line-strong)" strokeWidth="0.8" />
          <line x1="30" y1="200" x2="370" y2="200" stroke="var(--line-strong)" strokeWidth="0.8" />
          <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
            ELECTROCHEMICAL STORAGE POTENTIAL
          </text>
        </svg>
      );
    }

    if (cat.includes('remote sensing')) {
      // Topographic isoline field
      return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <path d="M 50 180 C 80 120, 160 110, 220 150 S 330 210, 360 180" fill="none" stroke="var(--forest)" strokeWidth="1.2" opacity="0.5" />
          <path d="M 70 190 C 100 140, 170 130, 215 170 S 310 230, 340 190" fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.75" />
          <path d="M 90 200 C 120 160, 180 150, 210 190 S 290 250, 320 200" fill="none" stroke="var(--cobalt)" strokeWidth="1.8" />
          <circle cx="210" cy="190" r="4" fill="var(--teal)" />
          <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
            GEOSPATIAL ISOLINE · ISRO IRNSS
          </text>
        </svg>
      );
    }

    if (activeArea.category === 'Materials') {
      // Crystalline dense lattice pattern
      return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          {[80, 140, 200, 260, 320].map((x) =>
            [80, 140, 200, 260, 320].map((y) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="3" fill="var(--forest)" opacity="0.6" />
                <rect x={x - 8} y={y - 8} width="16" height="16" fill="none" stroke="var(--cobalt)" strokeWidth="0.6" opacity="0.3" />
              </g>
            ))
          )}
          <line x1="80" y1="80" x2="320" y2="320" stroke="var(--teal)" strokeWidth="1" opacity="0.5" />
          <line x1="320" y1="80" x2="80" y2="320" stroke="var(--teal)" strokeWidth="1" opacity="0.5" />
          <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
            CRYSTALLINE LATTICE · NANO-INTERFACE
          </text>
        </svg>
      );
    }

    if (activeArea.category === 'Biology') {
      // Branching dendritic forms
      return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <path d="M 200 340 L 200 220" stroke="var(--forest)" strokeWidth="2.5" />
          <path d="M 200 220 L 140 140" stroke="var(--teal)" strokeWidth="2" />
          <path d="M 200 220 L 260 140" stroke="var(--teal)" strokeWidth="2" />
          <path d="M 140 140 L 100 80" stroke="var(--forest-soft)" strokeWidth="1.2" />
          <path d="M 140 140 L 160 70" stroke="var(--forest-soft)" strokeWidth="1.2" />
          <path d="M 260 140 L 240 70" stroke="var(--forest-soft)" strokeWidth="1.2" />
          <path d="M 260 140 L 300 80" stroke="var(--forest-soft)" strokeWidth="1.2" />
          <circle cx="100" cy="80" r="4" fill="var(--teal)" />
          <circle cx="160" cy="70" r="4" fill="var(--lime)" />
          <circle cx="240" cy="70" r="4" fill="var(--lime)" />
          <circle cx="300" cy="80" r="4" fill="var(--teal)" />
          <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
            DENDRITIC BIO-CELLULAR PATHWAY
          </text>
        </svg>
      );
    }

    if (activeArea.category === 'Computing') {
      // Ordered node matrix
      return (
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          {[60, 130, 200, 270, 340].map((x, i) =>
            [60, 130, 200, 270, 340].map((y, j) => (
              <g key={`comp-${x}-${y}`}>
                <circle cx={x} cy={y} r="2.5" fill={(i + j) % 2 === 0 ? 'var(--cobalt)' : 'var(--forest)'} />
                {(i + j) % 3 === 0 && (
                  <line x1={x} y1={y} x2={x + 70} y2={y} stroke="var(--line-strong)" strokeWidth="0.8" />
                )}
              </g>
            ))
          )}
          <rect x="110" y="110" width="180" height="180" fill="none" stroke="var(--teal)" strokeWidth="1" strokeDasharray="5 3" />
          <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
            MULTI-SCALE COMPUTATIONAL MATRIX
          </text>
        </svg>
      );
    }

    // Default / Engineering: Straight structural geometry
    return (
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <line x1="50" y1="50" x2="350" y2="50" stroke="var(--forest)" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="50" y2="350" stroke="var(--forest)" strokeWidth="1.5" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="var(--teal)" strokeWidth="1.5" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="var(--teal)" strokeWidth="1.5" />
        <polygon points="50,50 350,50 200,350" fill="none" stroke="var(--cobalt)" strokeWidth="1" strokeDasharray="4 2" />
        <circle cx="200" cy="200" r="5" fill="var(--teal)" />
        <text x="30" y="360" fontFamily="var(--font-mono)" fontSize="10" fill="var(--forest-soft)">
          PRECISION STRUCTURAL GEOMETRY
        </text>
      </svg>
    );
  };

  return (
    <section
      id="research"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper-blue)',
        minHeight: '950px',
        padding: '120px 0',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)'
      }}
    >
      <div className="atlas-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            gap: '48px',
            alignItems: 'start'
          }}
          className="research-grid"
        >
          {/* LEFT 40%: Huge Editorial Headline + Active Generative Visual Field */}
          <div
            style={{
              position: 'sticky',
              top: '110px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="mono-meta" style={{ marginBottom: '16px', color: 'var(--teal)' }}>
              SECTION 02 // RESEARCH ATLAS
            </div>

            {/* Huge 180px '17' Typography */}
            <div
              style={{
                fontSize: 'clamp(110px, 14vw, 180px)',
                fontWeight: 800,
                lineHeight: 0.8,
                letterSpacing: '-0.06em',
                color: 'var(--forest)',
                marginBottom: '14px'
              }}
            >
              17
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 3.8vw, 48px)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: 'var(--forest)',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              RESEARCH
              <br />
              DIRECTIONS.
            </h2>

            <p
              className="mono-meta"
              style={{
                fontSize: '12px',
                color: 'var(--forest-soft)',
                letterSpacing: '0.12em',
                marginBottom: '36px'
              }}
            >
              ONE CONNECTED RESEARCH ECOSYSTEM.
            </p>

            {/* Dynamic Generative Visual Field (reacts in 800ms) */}
            <div
              style={{
                width: '100%',
                maxWidth: '360px',
                aspectRatio: '1 / 1',
                backgroundColor: 'rgba(247, 248, 243, 0.65)',
                border: '1px solid var(--line-strong)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono-meta" style={{ fontSize: '9.5px' }}>
                  ACTIVE: {activeArea.number} // {activeArea.category}
                </span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--teal)'
                  }}
                />
              </div>

              <div style={{ width: '100%', height: '240px' }}>
                {renderVisualField()}
              </div>

              <div
                style={{
                  fontSize: '12.5px',
                  color: 'var(--forest-soft)',
                  lineHeight: 1.45,
                  borderTop: '1px solid var(--line)',
                  paddingTop: '10px'
                }}
              >
                {activeArea.description}
              </div>
            </div>
          </div>

          {/* RIGHT 60%: Giant Interactive Research Matrix (17 Rows) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid var(--line)'
            }}
          >
            {AUTHENTIC_17_RESEARCH_AREAS.map((item) => {
              const isSelected = activeArea.id === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveArea(item)}
                  style={{
                    minHeight: '76px',
                    display: 'grid',
                    gridTemplateColumns: '70px 1fr 140px 40px',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderBottom: '1px solid var(--line)',
                    backgroundColor: isSelected ? 'var(--paper)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {/* Number */}
                  <span
                    className="mono-meta"
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isSelected ? 'var(--teal)' : 'var(--muted)',
                      transition: 'color 180ms ease'
                    }}
                  >
                    {item.number}
                  </span>

                  {/* Research Title */}
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: isSelected ? 650 : 500,
                      letterSpacing: '-0.02em',
                      color: isSelected ? 'var(--forest)' : 'var(--forest-soft)',
                      transform: isSelected ? 'translateX(10px)' : 'translateX(0)',
                      transition: 'transform 220ms ease, color 180ms ease'
                    }}
                  >
                    {item.name}
                  </span>

                  {/* Discipline / Field Type */}
                  <span
                    className="mono-meta"
                    style={{
                      fontSize: '10px',
                      color: 'var(--muted)',
                      textAlign: 'right'
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Arrow Indicator */}
                  <span
                    style={{
                      textAlign: 'right',
                      fontSize: '16px',
                      color: isSelected ? 'var(--teal)' : 'var(--muted)',
                      transform: isSelected ? 'rotate(-45deg)' : 'none',
                      transition: 'transform 220ms ease, color 180ms ease'
                    }}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .research-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
