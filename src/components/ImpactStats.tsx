'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CIIRC_STATS } from '../data/ciircData';

interface ImpactStatsProps {
  onImpactVisibilityChange?: (visible: boolean) => void;
}

// Scientific mechanical counter steps: 5 -> 50 -> 500 -> 5,000 -> 50,000+
const ANIMATED_TARGETS = [
  {
    target: '50,000+',
    steps: ['5', '50', '500', '5,000', '50,000+'],
    label: 'SQUARE FEET LABS',
    sublabel: 'Dedicated research infrastructure housing 19 vistas'
  },
  {
    target: '27',
    steps: ['2', '12', '19', '24', '27'],
    label: 'DOCTORAL INVESTIGATORS',
    sublabel: 'Alumni of IISc, IITs, NITs, Central & Foreign Universities'
  },
  {
    target: '50+',
    steps: ['5', '18', '29', '42', '50+'],
    label: 'FUNDED PROJECTS',
    sublabel: 'DST, DRDO, DOS/ISRO, DBT, EU & Indo-French CEFIPRA',
    isHighlight: true
  },
  {
    target: '300+',
    steps: ['30', '95', '180', '260', '300+'],
    label: 'PEER-REVIEWED PAPERS',
    sublabel: 'Scopus, Web of Science, Elsevier, Springer & Wiley'
  },
  {
    target: '35+',
    steps: ['3', '11', '22', '31', '35+'],
    label: 'SOCIETAL PRODUCTS & PATENTS',
    sublabel: 'Developed with clinical, societal & environmental impact',
    isHighlight: true
  }
];

export const ImpactStats: React.FC<ImpactStatsProps> = ({ onImpactVisibilityChange }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [stepIndex, setStepIndex] = useState(0); // 0 to 4

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setInView(isVisible);
        if (onImpactVisibilityChange) {
          onImpactVisibilityChange(isVisible);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onImpactVisibilityChange]);

  // Section 29: Mechanical scientific measurement counter
  // 5 -> 50 -> 500 -> 5,000 -> 50,000+ over 900ms then lock
  useEffect(() => {
    if (!inView) {
      setStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < 4) return prev + 1;
        clearInterval(interval);
        return 4;
      });
    }, 180); // 5 steps * 180ms = 900ms

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="impact"
      ref={sectionRef}
      aria-label="CIIRC Impact & Empirical Scale"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--ultramarine)', // Full-screen cobalt shock (Section 27)
        color: 'var(--white)',
        padding: '120px 42px 140px 42px',
        boxSizing: 'border-box',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          paddingBottom: '24px',
          marginBottom: '64px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--acid)',
              letterSpacing: '0.08em'
            }}
          >
            [05 / EMPIRICAL IMPACT]
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            VERIFIED INSTITUTIONAL AUDIT
          </span>
        </div>

        {/* Tiny Coral Event Marker (Section 27) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--signal)',
              display: 'inline-block'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            DSIR-SIRO BENCHMARK
          </span>
        </div>
      </div>

      {/* Main Section Headline */}
      <div style={{ marginBottom: '80px', maxWidth: '1000px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 96px)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.05em',
            color: 'var(--white)'
          }}
        >
          MEASURED IN DISCOVERIES,<br />
          <span style={{ color: 'var(--acid)' }}>DELIVERED FOR SOCIETY.</span>
        </h2>
      </div>

      {/* Large Numbers Grid: Section 27, 28, 29 */}
      {/* NO CARDS. NO SHADOWS. NO GRADIENTS. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '48px'
        }}
        className="impact-stats-grid"
      >
        {ANIMATED_TARGETS.map((stat, idx) => {
          const displayedValue = inView ? stat.steps[stepIndex] : stat.steps[0];

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: idx > 0 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                paddingLeft: idx > 0 ? '24px' : '0'
              }}
              className="impact-stat-item"
            >
              {/* Mechanical Scientific Measurement Counter */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(42px, 5.5vw, 82px)',
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: '-0.05em',
                  color: stat.isHighlight ? 'var(--acid)' : 'var(--white)',
                  marginBottom: '16px'
                }}
              >
                {displayedValue}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--white)',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                {stat.label}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.4,
                  color: 'rgba(255, 255, 255, 0.7)',
                  maxWidth: '280px'
                }}
              >
                {stat.sublabel}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Citation */}
      <div
        style={{
          marginTop: '64px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.06em',
            color: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          SOURCES: MINISTRY OF SCIENCE & TECHNOLOGY (DST) · DRDO · DOS/ISRO · DBT GOVT. OF INDIA
        </span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--acid)',
            letterSpacing: '0.06em'
          }}
        >
          SIRO CERTIFICATION NO. 11/592/2013-TU-V
        </span>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .impact-stat-item {
            border-left: none !important;
            padding-left: 0 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            padding-bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
};
