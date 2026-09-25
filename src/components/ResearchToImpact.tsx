'use client';

import React, { useRef, useEffect, useState } from 'react';

interface StageItem {
  number: string;
  stageName: string;
  title: string;
  statement: string;
  dataPoint: string;
  dataLabel: string;
  badge: string;
  particleRole: string;
  particleDiagramType: 'dense' | 'connecting' | 'structures' | 'coherent';
}

const STAGES: StageItem[] = [
  {
    number: '01',
    stageName: 'RESEARCH',
    title: 'Fundamental Scientific Inquiry',
    statement: 'Rigorous atomic and cellular investigation across advanced materials, biological systems, and surface chemistry.',
    dataPoint: '50+',
    dataLabel: 'Sponsored Research Projects (DST, DRDO, ISRO)',
    badge: 'STAGE 01 · BASIC SCIENCE',
    particleRole: 'Dense Particle Cluster',
    particleDiagramType: 'dense'
  },
  {
    number: '02',
    stageName: 'DISCOVERY',
    title: 'Precision Characterization & Proof',
    statement: 'Comprehensive empirical validation utilizing high-resolution SEM, XRD crystallography, and spectrophotometric diagnostics.',
    dataPoint: '300+',
    dataLabel: 'Indexed Scientific Publications',
    badge: 'STAGE 02 · EMPIRICAL VALIDATION',
    particleRole: 'Connecting Pathways',
    particleDiagramType: 'connecting'
  },
  {
    number: '03',
    stageName: 'INNOVATION',
    title: 'Prototyping & Technology Development',
    statement: 'Engineering laboratory findings into autonomous drone telemetry, conductive inks, and patented formulations.',
    dataPoint: '45+',
    dataLabel: 'Patents & Formulations Filed',
    badge: 'STAGE 03 · TRANSLATIONAL ENGINEERING',
    particleRole: 'Structured Lattices',
    particleDiagramType: 'structures'
  },
  {
    number: '04',
    stageName: 'IMPACT',
    title: 'Incubation & Societal Deployment',
    statement: 'Commercial scale-up and enterprise incubation through AIC-JIT Foundation, delivering certified diagnostic and environmental solutions.',
    dataPoint: '35+',
    dataLabel: 'Translational Products in Market Deployment',
    badge: 'STAGE 04 · SOCIETAL VALUE',
    particleRole: 'Coherent Field',
    particleDiagramType: 'coherent'
  }
];

export const ResearchToImpact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateXPercent = scrollProgress * 75;

  return (
    <section
      id="innovation"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '240vh',
        backgroundColor: '#FFFFFF'
      }}
      className="research-impact-section"
    >
      {/* Sticky Viewport (Section 48) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          padding: '60px 0'
        }}
      >
        <div className="atlas-container" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span className="mono-meta" style={{ color: 'var(--blue)' }}>
                04 / VALUE GENERATION SEQUENCE
              </span>
              <h2
                style={{
                  fontSize: 'clamp(32px, 3.8vw, 52px)',
                  fontWeight: 650,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-primary)',
                  margin: 0
                }}
              >
                From research to impact.
              </h2>
            </div>

            {/* Stage Indicator Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {STAGES.map((s, idx) => (
                <div key={s.number} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: scrollProgress >= idx * 0.3 ? 'var(--blue)' : 'var(--text-muted)',
                      transition: 'color 200ms ease'
                    }}
                  >
                    {s.stageName}
                  </span>
                  {idx < STAGES.length - 1 && (
                    <span style={{ color: 'var(--border)', fontSize: '11px' }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Track (Section 48 & 49) */}
        <div
          style={{
            display: 'flex',
            gap: '36px',
            paddingLeft: '72px',
            transform: `translate3d(-${translateXPercent}%, 0, 0)`,
            transition: 'transform 80ms linear',
            willChange: 'transform'
          }}
          className="horizontal-track"
        >
          {STAGES.map((stage, idx) => (
            <div
              key={stage.number}
              style={{
                width: '68vw',
                minWidth: '560px',
                maxWidth: '820px',
                flexShrink: 0,
                backgroundColor: '#F7F9FC',
                borderRadius: '24px',
                border: '1px solid var(--border)',
                padding: '44px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '400px',
                boxShadow: '0 12px 36px rgba(20, 33, 61, 0.04)'
              }}
              className="stage-card"
            >
              {/* Card Top */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="mono-meta" style={{ color: 'var(--blue)', fontWeight: 600 }}>
                      {stage.badge}
                    </span>
                    <span style={{ color: 'var(--border)', fontSize: '12px' }}>•</span>
                    {/* Section 49: Particle Evolution Label */}
                    <span className="mono-meta" style={{ color: 'var(--text-secondary)' }}>
                      PARTICLE STATE: {stage.particleRole.toUpperCase()}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--border-strong)'
                    }}
                  >
                    {stage.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(26px, 2.4vw, 36px)',
                    fontWeight: 650,
                    letterSpacing: '-0.025em',
                    color: 'var(--text-primary)',
                    marginBottom: '14px'
                  }}
                >
                  {stage.title}
                </h3>

                <p
                  style={{
                    fontSize: '16.5px',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    maxWidth: '620px',
                    margin: 0
                  }}
                >
                  {stage.statement}
                </p>
              </div>

              {/* Card Bottom: Data Point & Arrow */}
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '24px',
                  marginTop: '28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '36px',
                      fontWeight: 700,
                      color: 'var(--blue)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1
                    }}
                  >
                    {stage.dataPoint}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      marginTop: '6px',
                      display: 'block'
                    }}
                  >
                    {stage.dataLabel}
                  </span>
                </div>

                {idx < STAGES.length - 1 && (
                  <span
                    style={{
                      fontSize: '22px',
                      color: 'var(--blue)',
                      paddingRight: '12px'
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .research-impact-section {
            height: auto !important;
          }
          .research-impact-section > div {
            position: relative !important;
            height: auto !important;
            padding: 80px 0 !important;
          }
          .horizontal-track {
            transform: none !important;
            flex-direction: column !important;
            padding: 0 20px !important;
          }
          .stage-card {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            padding: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};
