'use client';

import React, { useEffect, useRef, useState } from 'react';

export const PeopleNumbers: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: '27', label: 'DOCTORATES', meta: 'PH.D. RESEARCH SCHOLARS & PRINCIPAL INVESTIGATORS' },
    { num: '13', label: 'MASTERS', meta: 'SPECIALIZED SCIENTIFIC POST-GRADUATES' },
    { num: '20', label: 'PG RESEARCH FELLOWS', meta: 'ACTIVE SPONSORED PROJECT APPOINTEES' }
  ];

  return (
    <section
      ref={sectionRef}
      id="people"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper)',
        padding: '140px 0',
        borderBottom: '1px solid var(--line)'
      }}
    >
      <div className="atlas-container">
        {/* Section Header */}
        <div style={{ marginBottom: '64px' }}>
          <span className="mono-meta" style={{ color: 'var(--teal)' }}>
            SECTION 05 // HUMAN CAPITAL
          </span>
          <h2
            style={{
              fontSize: 'clamp(36px, 5.2vw, 68px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.045em',
              color: 'var(--forest)',
              marginTop: '12px',
              textTransform: 'uppercase'
            }}
          >
            THE PEOPLE
            <br />
            BEHIND THE RESEARCH.
          </h2>
        </div>

        {/* Enormous Horizontal Numerical Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}
          className="people-stats-grid"
        >
          {stats.map((item, idx) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid var(--line)',
                paddingLeft: '28px'
              }}
            >
              {/* Vertical Masked Numeric Digits */}
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: 'clamp(80px, 12vw, 160px)',
                    fontWeight: 800,
                    lineHeight: 0.85,
                    letterSpacing: '-0.07em',
                    color: 'var(--forest)',
                    transform: inView ? 'translateY(0)' : 'translateY(105%)',
                    transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 150}ms`
                  }}
                >
                  {item.num}
                </div>
              </div>

              {/* Title & Metadata */}
              <div
                style={{
                  fontSize: 'clamp(18px, 2.2vw, 28px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--forest)',
                  marginTop: '16px',
                  textTransform: 'uppercase'
                }}
              >
                {item.label}
              </div>

              <span
                className="mono-meta"
                style={{
                  fontSize: '10.5px',
                  color: 'var(--muted)',
                  marginTop: '8px',
                  lineHeight: 1.4
                }}
              >
                {item.meta}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .people-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};
