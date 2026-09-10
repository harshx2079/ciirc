'use client';

import React, { useEffect, useRef, useState } from 'react';

export const AboutConvergence: React.FC = () => {
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
      id="about"
      ref={sectionRef}
      aria-label="01 / ABOUT CIIRC"
      style={{
        backgroundColor: '#EEE9DE', // Section 39 & 88: Warm stone
        padding: '170px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container">
        {/* Section 39: Grid 3 columns label / 9 columns content */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: '24px',
            rowGap: '60px',
            alignItems: 'start'
          }}
        >
          {/* Label: 3 columns (Section 40) */}
          <div style={{ gridColumn: '1 / span 3' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#557C70', // Section 40: Mineral #557C70
                display: 'inline-block'
              }}
            >
              01 / ABOUT CIIRC
            </span>
            <div
              style={{
                width: '28px',
                height: '1px',
                backgroundColor: '#557C70',
                marginTop: '12px'
              }}
            />
          </div>

          {/* Content: 9 columns (Section 41 & 42) */}
          <div
            style={{
              gridColumn: '4 / span 9',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px'
            }}
          >
            {/* Section 41: Headline */}
            <h2
              className={`about-headline ${isVisible ? 'revealed' : ''}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(44px, 4.8vw, 76px)',
                lineHeight: 0.94,
                letterSpacing: '-0.055em',
                fontWeight: 600,
                color: '#18242D',
                maxWidth: '920px',
                margin: 0
              }}
            >
              WHERE DIFFERENT DISCIPLINES CONVERGE.
            </h2>

            {/* Section 42: Body */}
            <p
              className={`about-body ${isVisible ? 'revealed' : ''}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                lineHeight: 1.65,
                color: '#718087',
                maxWidth: '720px',
                margin: 0
              }}
            >
              Founded as a joint autonomous initiative of Sri Sringeri Sharada Peetham, Sringeri and Jyothy Institute of Technology (JIT), CIIRC® is recognized as a Scientific and Industrial Research Organization (SIRO) by DSIR, Ministry of Science &amp; Technology, Government of India. The Centre drives multidisciplinary engineering, patent incubation, and industrial translation onto a unified operational platform.
            </p>

            {/* Section 43 & 44: Typographic Nodes Layout (NO cards!)
                SCIENCE (top-left)                 BUSINESS (top-right)
                               CIIRC (center)
                ENGINEERING (bottom-left)          INCUBATION (bottom-right) */}
            <div
              className={`convergence-stage ${isVisible ? 'revealed' : ''}`}
              style={{
                position: 'relative',
                marginTop: '32px',
                minHeight: '340px',
                width: '100%',
                maxWidth: '760px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Connecting Lines (Section 43 & 44: rgba(24,36,45,.18), scaleX(0) -> scaleX(1) 700ms) */}
              <svg
                viewBox="0 0 760 340"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}
              >
                <line x1="120" y1="60" x2="380" y2="170" stroke="rgba(24, 36, 45, 0.18)" strokeWidth="1" className="about-line" />
                <line x1="640" y1="60" x2="380" y2="170" stroke="rgba(24, 36, 45, 0.18)" strokeWidth="1" className="about-line" />
                <line x1="140" y1="280" x2="380" y2="170" stroke="rgba(24, 36, 45, 0.18)" strokeWidth="1" className="about-line" />
                <line x1="620" y1="280" x2="380" y2="170" stroke="rgba(24, 36, 45, 0.18)" strokeWidth="1" className="about-line" />
                <line x1="120" y1="60" x2="640" y2="60" stroke="rgba(24, 36, 45, 0.10)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="140" y1="280" x2="620" y2="280" stroke="rgba(24, 36, 45, 0.10)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Node 1: CIIRC Center (appears first) */}
              <div
                className="about-node node-ciirc"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#3558C8',
                  backgroundColor: '#EEE9DE',
                  padding: '6px 14px',
                  border: '1px solid rgba(53, 88, 200, 0.25)',
                  zIndex: 3
                }}
              >
                CIIRC®
              </div>

              {/* Node 2: SCIENCE (top-left) */}
              <div
                className="about-node node-science"
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '40px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#3558C8'
                }}
              >
                SCIENCE
              </div>

              {/* Node 3: BUSINESS (top-right) */}
              <div
                className="about-node node-business"
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '40px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#557C70'
                }}
              >
                BUSINESS
              </div>

              {/* Node 4: ENGINEERING (bottom-left) */}
              <div
                className="about-node node-engineering"
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '40px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#18242D'
                }}
              >
                ENGINEERING
              </div>

              {/* Node 5: INCUBATION (bottom-right) */}
              <div
                className="about-node node-incubation"
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#C95D48'
                }}
              >
                INCUBATION
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Section 44 Interaction Sequence:
           1. CIIRC appears
           2. Science appears
           3. Engineering appears
           4. Business appears
           5. Incubation appears
           6. Lines draw between them */
        .about-headline,
        .about-body {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-headline.revealed,
        .about-body.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .about-node {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .convergence-stage.revealed .node-ciirc {
          opacity: 1;
          transform: translate(-50%, -50%);
          transition-delay: 100ms;
        }
        .convergence-stage.revealed .node-science {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 200ms;
        }
        .convergence-stage.revealed .node-engineering {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 300ms;
        }
        .convergence-stage.revealed .node-business {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 400ms;
        }
        .convergence-stage.revealed .node-incubation {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 500ms;
        }

        .about-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .convergence-stage.revealed .about-line {
          stroke-dashoffset: 0;
          transition-delay: 600ms;
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
};
