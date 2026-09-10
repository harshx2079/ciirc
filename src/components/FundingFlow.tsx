'use client';

import React, { useEffect, useRef, useState } from 'react';

export const FundingFlow: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.5)));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fundingBodies = [
    { code: 'DST', full: 'Dept. of Science & Technology' },
    { code: 'DBT', full: 'Dept. of Biotechnology' },
    { code: 'DRDO', full: 'Defence R&D Organisation' },
    { code: 'ISRO', full: 'Indian Space Research Organisation' },
    { code: 'VGST', full: 'Vision Group on Science & Technology' },
    { code: 'CEFIPRA', full: 'Indo-French Centre (CEFIPRA)' }
  ];

  const outcomes = [
    'Point-of-Care Medical Diagnostics',
    'Low-Cost Heavy Metal Water Adsorbents',
    'Autonomous Arctic Drone Photogrammetry',
    'WCO Waste-to-Biodiesel Catalysis',
    'Next-Gen Battery Nanomaterials'
  ];

  return (
    <section
      ref={sectionRef}
      id="funding"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper-warm)',
        padding: '140px 0',
        borderBottom: '1px solid var(--line)'
      }}
    >
      <div className="atlas-container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div>
            <span className="mono-meta" style={{ color: 'var(--teal)' }}>
              SECTION 06 // CAPITAL ALLOCATION & SPONSORSHIPS
            </span>
            <h2
              style={{
                fontSize: 'clamp(38px, 5.5vw, 76px)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.045em',
                color: 'var(--forest)',
                marginTop: '12px',
                textTransform: 'uppercase'
              }}
            >
              50 FUNDED
              <br />
              RESEARCH PROJECTS.
            </h2>
          </div>
          <span className="mono-meta" style={{ maxWidth: '320px', lineHeight: 1.5 }}>
            RECOGNIZED BY DSIR–SIRO, MINISTRY OF SCIENCE & TECHNOLOGY, GOVT. OF INDIA
          </span>
        </div>

        {/* Research Flow Diagram: CIIRC → Funding Bodies → Research Directions → Outcomes */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--paper)',
            border: '1px solid var(--line-strong)',
            padding: '40px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 1fr 1fr',
              gap: '24px',
              alignItems: 'start'
            }}
            className="funding-flow-columns"
          >
            {/* Column 1: CIIRC Origin Node */}
            <div
              style={{
                borderRight: '1px solid var(--line)',
                paddingRight: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <span className="mono-meta" style={{ color: 'var(--teal)' }}>
                ORIGIN 01
              </span>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 750,
                  letterSpacing: '-0.03em',
                  color: 'var(--forest)'
                }}
              >
                CIIRC®
              </div>
              <p style={{ fontSize: '13px', color: 'var(--forest-soft)', lineHeight: 1.5 }}>
                Central multidisciplinary platform channeling state and bilateral grants toward translational technologies.
              </p>
            </div>

            {/* Column 2: Funding Institutions */}
            <div
              style={{
                borderRight: '1px solid var(--line)',
                paddingRight: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <span className="mono-meta" style={{ color: 'var(--cobalt)' }}>
                02 // GRANT AGENCIES
              </span>
              {fundingBodies.map((body, i) => (
                <div
                  key={body.code}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid var(--line)',
                    backgroundColor: 'rgba(247, 248, 243, 0.7)',
                    opacity: scrollProgress > 0.2 + i * 0.08 ? 1 : 0.35,
                    transform: scrollProgress > 0.2 + i * 0.08 ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'all 400ms ease'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 650, color: 'var(--forest)' }}>
                    {body.code}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    {body.full}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: 17 Research Thrusts */}
            <div
              style={{
                borderRight: '1px solid var(--line)',
                paddingRight: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <span className="mono-meta" style={{ color: 'var(--forest)' }}>
                03 // 17 DIRECTIONS
              </span>
              <div style={{ fontSize: '13.5px', color: 'var(--forest-soft)', lineHeight: 1.6 }}>
                Advanced Materials, Sensors & Inks, Autonomous UAVs, Water Purification, Clean Energy, Remote Sensing & IRNSS Telemetry, Food Technology.
              </div>
              <div
                className="mono-meta"
                style={{
                  fontSize: '10px',
                  color: 'var(--teal)',
                  marginTop: '16px',
                  padding: '8px',
                  border: '1px dashed var(--teal)'
                }}
              >
                INTERDISCIPLINARY CONVERGENCE
              </div>
            </div>

            {/* Column 4: Societal Outcomes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="mono-meta" style={{ color: 'var(--coral)' }}>
                04 // SOCIETAL IMPACT
              </span>
              {outcomes.map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: '10px 12px',
                    borderLeft: '2px solid var(--coral)',
                    backgroundColor: 'rgba(223, 112, 91, 0.06)',
                    fontSize: '12.5px',
                    fontWeight: 550,
                    color: 'var(--forest)',
                    opacity: scrollProgress > 0.4 + i * 0.08 ? 1 : 0.35,
                    transition: 'opacity 400ms ease'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .funding-flow-columns {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};
