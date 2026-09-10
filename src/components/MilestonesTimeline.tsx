'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AUTHENTIC_ACHIEVEMENTS } from '../data/ciircData';

export const MilestonesTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
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

  return (
    <section
      id="achievements"
      ref={sectionRef}
      aria-label="05 / ACHIEVEMENTS"
      style={{
        backgroundColor: '#F5F1E8', // Section 58 & 88: Warm ivory
        padding: '170px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      {/* Section 58: Thin diagonal trajectory line (bottom-left to top-right, 1px, rgba(24,36,45,.18)) */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <line
          x1="0"
          y1="900"
          x2="1440"
          y2="0"
          stroke="rgba(24, 36, 45, 0.18)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className={`trajectory-line ${isVisible ? 'drawn' : ''}`}
        />
      </svg>

      <div className="ciirc-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <div style={{ marginBottom: '80px' }}>
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
            05 / ACHIEVEMENTS
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
            SCIENTIFIC TRAJECTORY &amp; DISCOVERY
          </h2>
        </div>

        {/* Desktop Trajectory Layout (Section 58 & 59) */}
        <div className="achievements-grid-desktop">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '40px'
            }}
          >
            {AUTHENTIC_ACHIEVEMENTS.map((item, idx) => {
              const isActive = activeIdx === idx;
              const nodeColor = item.accent === 'blue' ? '#3558C8' : item.accent === 'teal' ? '#557C70' : '#C95D48';

              return (
                <div
                  key={item.id}
                  className={`milestone-item ${isVisible ? 'revealed' : ''}`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    padding: '32px',
                    borderLeft: `2px solid ${isActive ? nodeColor : 'rgba(24, 36, 45, 0.12)'}`,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.75)' : 'transparent',
                    transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '14px'
                    }}
                  >
                    {/* Node: 5px -> 8px (Section 59) */}
                    <div
                      style={{
                        width: isActive ? '8px' : '5px',
                        height: isActive ? '8px' : '5px',
                        borderRadius: '50%',
                        backgroundColor: nodeColor,
                        transition: 'all 220ms ease'
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 650,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: nodeColor
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '20px',
                      lineHeight: 1.3,
                      fontWeight: 650,
                      letterSpacing: '-0.02em',
                      color: '#18242D',
                      marginBottom: '10px'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#718087',
                      margin: 0
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline (Section 75) */}
        <div className="achievements-mobile-timeline">
          <div className="timeline-vertical-line" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginLeft: '36px' }}>
            {AUTHENTIC_ACHIEVEMENTS.map((item) => (
              <div key={item.id} style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#3558C8'
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 650,
                    color: '#3558C8',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '6px'
                  }}
                >
                  {item.category}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '17px',
                    fontWeight: 650,
                    color: '#18242D',
                    marginBottom: '6px'
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#718087',
                    margin: 0
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Section 59 Trajectory animation:
           Text: opacity 0 -> 1, translateY 24px -> 0, No bouncing */
        .milestone-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .milestone-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .trajectory-line {
          transform-origin: bottom left;
          transform: scaleX(0);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .trajectory-line.drawn {
          transform: scaleX(1);
        }

        .achievements-mobile-timeline {
          display: none;
        }

        @media (max-width: 768px) {
          .achievements-grid-desktop {
            display: none !important;
          }
          .achievements-mobile-timeline {
            display: block !important;
            position: relative;
            padding-left: 10px;
          }
          .timeline-vertical-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 10px;
            width: 1px;
            background-color: rgba(24, 36, 45, 0.18);
          }
        }
      `}</style>
    </section>
  );
};
