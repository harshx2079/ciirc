'use client';

import React, { useEffect, useRef, useState } from 'react';

const CONVERGENCE_QUADRANTS = [
  {
    number: '01',
    title: 'Fundamental Discovery',
    discipline: 'Pure Science & Investigation',
    description: 'Investigating deep physical phenomena in nanomaterials, molecular biology, and electrochemistry without immediate market compromise.'
  },
  {
    number: '02',
    title: 'Applied Engineering',
    discipline: 'Systems & Prototyping',
    description: 'Transforming bench-scale scientific synthesis into resilient physical architectures, autonomous polar robotics, and functional medical sensors.'
  },
  {
    number: '03',
    title: 'Translational Incubation',
    discipline: 'Enterprise & AIC-JIT',
    description: 'Nurturing intellectual property into industrial prototypes, clinical validation trials, and deep-tech spinoff enterprises under AIC-JIT.'
  },
  {
    number: '04',
    title: 'Societal Consequence',
    discipline: 'Human Impact',
    description: 'Delivering affordable microfluidic diagnostics, clean drinking water filtration, and satellite telemetry to underserved communities.'
  }
];

export const SectionIdea: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
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
      id="idea"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--background)',
        paddingTop: '160px',
        paddingBottom: '160px',
        boxShadow: '0 -24px 64px rgba(20, 33, 61, 0.04)',
        zIndex: 3,
        overflow: 'hidden'
      }}
    >
      {/* Narrative Drawing Divider Line (Section 23) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--border)',
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />

      <div className="atlas-container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '840px', marginBottom: '84px' }}>
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <div className="eyebrow-capsule" style={{ marginBottom: '22px' }}>
              <span className="eyebrow-pulse-dot" />
              <span>02 // THE CONVERGENCE PRINCIPLE</span>
            </div>
          </div>

          {/* Masked Headline Reveal */}
          <div style={{ overflow: 'hidden' }}>
            <h2
              style={{
                fontSize: 'clamp(40px, 4.8vw, 76px)',
                lineHeight: 1.0,
                letterSpacing: '-0.048em',
                fontWeight: 650,
                color: 'var(--text-primary)',
                margin: '0 0 24px 0',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 120ms'
              }}
            >
              Science is not compartmentalized. It is continuous.
            </h2>
          </div>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.68,
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 280ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 280ms'
            }}
          >
            Traditional academia isolates discovery into distinct silos. CIIRC operates as an unbroken
            continuum — where a nanomaterial synthesized in our chemistry suite immediately informs autonomous
            polar telemetry, clean water membranes, and clinical point-of-care diagnostics.
          </p>
        </div>

        {/* 4-Quadrant Architectural Matrix (No gimmicky canvas particles) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) 360ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 360ms'
          }}
          className="convergence-grid"
        >
          {CONVERGENCE_QUADRANTS.map((quadrant, idx) => {
            const isHovered = activeQuadrant === idx;
            return (
              <div
                key={quadrant.number}
                onMouseEnter={() => setActiveQuadrant(idx)}
                onMouseLeave={() => setActiveQuadrant(null)}
                style={{
                  backgroundColor: isHovered ? 'var(--surface)' : 'rgba(255, 255, 255, 0.65)',
                  border: isHovered ? '1px solid var(--blue)' : '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  boxShadow: isHovered ? '0 20px 44px rgba(22, 119, 255, 0.08)' : '0 4px 16px rgba(20, 33, 61, 0.02)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                  cursor: 'default'
                }}
                className="convergence-card"
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '18px',
                      marginBottom: '20px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: isHovered ? 'var(--blue)' : 'var(--text-muted)',
                        transition: 'color 200ms ease'
                      }}
                    >
                      STAGE // {quadrant.number}
                    </span>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {quadrant.discipline}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      marginBottom: '16px'
                    }}
                  >
                    {quadrant.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}
                  >
                    {quadrant.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isHovered ? 'var(--blue)' : 'transparent',
                    transition: 'color 200ms ease'
                  }}
                >
                  <span>Explore Stage</span>
                  <span style={{ transform: isHovered ? 'translateX(3px)' : 'none', transition: 'transform 200ms ease' }}>
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .convergence-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .convergence-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
