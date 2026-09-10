'use client';

import React, { useEffect, useRef, useState } from 'react';

export const ImpactNarrative: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      num: '300+',
      label: 'PUBLICATIONS',
      sub: 'Peer-reviewed research in high-impact international journals',
      color: 'var(--paper)'
    },
    {
      num: '35',
      label: 'SOCIETAL & ENVIRONMENTAL PRODUCTS',
      sub: 'Patents filed, point-of-care kits, membranes, and green fuels',
      color: 'var(--coral)'
    },
    {
      num: '50',
      label: 'FUNDED RESEARCH PROJECTS',
      sub: 'Sponsored by DST, DRDO, ISRO, DBT, and global consortia',
      color: 'var(--lime)'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="impact"
      style={{
        position: 'relative',
        backgroundColor: 'var(--forest)',
        color: 'var(--paper)',
        padding: '160px 0',
        overflow: 'hidden'
      }}
    >
      {/* Narrative Travelling Line Across Section */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: 0,
          height: '1px',
          backgroundColor: 'var(--teal)',
          width: activated ? '100%' : '0%',
          transition: 'width 1400ms cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: 0.6,
          zIndex: 1
        }}
      />

      <div className="atlas-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Eyebrow & Big Statement */}
        <div style={{ marginBottom: '84px' }}>
          <span
            className="mono-meta"
            style={{
              color: 'var(--teal-soft)',
              display: 'inline-block',
              marginBottom: '16px'
            }}
          >
            SECTION 07 // TRANSLATIONAL CONSEQUENCE
          </span>
          <h2
            style={{
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontWeight: 750,
              lineHeight: 0.9,
              letterSpacing: '-0.055em',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            RESEARCH
            <br />
            THAT LEAVES THE LAB.
          </h2>
        </div>

        {/* 3 Authentic Metrics with Sequential Activation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px'
          }}
          className="impact-metrics-grid"
        >
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                paddingTop: '32px'
              }}
            >
              {/* Activation Marker Dot on the Travelling Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '0',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--teal)',
                  opacity: activated ? 1 : 0,
                  transform: activated ? 'scale(1)' : 'scale(0)',
                  transition: `all 400ms ease ${400 + idx * 300}ms`
                }}
              />

              {/* Number with Vertical Clip Mask */}
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: 'clamp(64px, 9vw, 120px)',
                    fontWeight: 800,
                    lineHeight: 0.85,
                    letterSpacing: '-0.06em',
                    color: m.color,
                    transform: activated ? 'translateY(0)' : 'translateY(110%)',
                    transition: `transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + idx * 250}ms`
                  }}
                >
                  {m.num}
                </div>
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 22px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--paper)',
                  marginTop: '16px',
                  textTransform: 'uppercase'
                }}
              >
                {m.label}
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--faint)',
                  marginTop: '8px',
                  lineHeight: 1.5,
                  maxWidth: '320px'
                }}
              >
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .impact-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};
