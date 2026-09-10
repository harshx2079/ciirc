'use client';

import React, { useEffect, useRef, useState } from 'react';

export const PeopleSection: React.FC = () => {
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
      id="people"
      ref={sectionRef}
      aria-label="04 / PEOPLE"
      style={{
        backgroundColor: '#EEE9DE', // Section 54 & 88: Warm stone
        padding: '170px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container">
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
            04 / PEOPLE
          </span>
          <div
            style={{
              width: '36px',
              height: '1px',
              backgroundColor: 'rgba(24, 36, 45, 0.14)'
            }}
          />
        </div>

        {/* Section 54: Typographic composition (NO cards!)
            Dominant 27: clamp(140px, 18vw, 240px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}
        >
          {/* Dominant Stat: 27 DOCTORATES */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '40px',
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(24, 36, 45, 0.12)',
              paddingBottom: '56px'
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <span
                className={`dominant-stat ${isVisible ? 'revealed' : ''}`}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(140px, 18vw, 240px)', // Section 54
                  lineHeight: 0.85,
                  fontWeight: 650,
                  letterSpacing: '-0.065em',
                  color: '#18242D'
                }}
              >
                27
              </span>
            </div>
            <div style={{ maxWidth: '440px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 650,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#3558C8',
                  marginBottom: '10px'
                }}
              >
                DOCTORATES
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#718087',
                  margin: 0
                }}
              >
                Principal researchers from premier Indian and international institutions heading dedicated cross-disciplinary investigation laboratories.
              </p>
            </div>
          </div>

          {/* Secondary Stats: 13 MASTERS & 20 PG RESEARCH FELLOWS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px'
            }}
          >
            {/* 13 MASTERS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ overflow: 'hidden' }}>
                <span
                  className={`dominant-stat ${isVisible ? 'revealed' : ''}`}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(76px, 8.5vw, 114px)',
                    lineHeight: 0.9,
                    fontWeight: 650,
                    letterSpacing: '-0.055em',
                    color: '#18242D',
                    transitionDelay: '150ms'
                  }}
                >
                  13
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 650,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#557C70'
                }}
              >
                MASTERS
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#718087',
                  margin: 0
                }}
              >
                Scientific staff specialists managing sophisticated instrumentation equipment, prototyping benches, and analytical pipelines.
              </p>
            </div>

            {/* 20 PG RESEARCH FELLOWS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ overflow: 'hidden' }}>
                <span
                  className={`dominant-stat ${isVisible ? 'revealed' : ''}`}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(76px, 8.5vw, 114px)',
                    lineHeight: 0.9,
                    fontWeight: 650,
                    letterSpacing: '-0.055em',
                    color: '#18242D',
                    transitionDelay: '300ms'
                  }}
                >
                  20
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 650,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#C95D48'
                }}
              >
                PG RESEARCH FELLOWS
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#718087',
                  margin: 0
                }}
              >
                Graduate scholars active on externally funded defense, space telemetry, biotechnology, and international bilateral projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dominant-stat {
          clip-path: inset(100% 0 0 0);
          transform: translateY(20px);
          transition: clip-path 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dominant-stat.revealed {
          clip-path: inset(0);
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};
