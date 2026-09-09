'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { CIIRC_IDENTITY } from '../data/ciircData';

interface CTASectionProps {
  onConvergenceChange?: (converging: boolean) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onConvergenceChange }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [converged, setConverged] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setConverged(isVisible);
        if (onConvergenceChange) {
          onConvergenceChange(isVisible);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onConvergenceChange]);

  return (
    <section
      id="convergence"
      ref={sectionRef}
      aria-label="CIIRC Final Convergence & Engagement"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100svh',
        padding: '120px 42px 60px 42px',
        boxSizing: 'border-box',
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 2
      }}
    >
      {/* Top Technical Metadata */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--ultramarine)',
              letterSpacing: '0.08em'
            }}
          >
            [10 / CONVERGENCE]
          </span>
          <span className="micro-label">SYNTHESIS OF MULTIDISCIPLINARY SCIENCE</span>
        </div>

        <span className="scientific-badge active">
          {converged ? 'FIELD CONVERGING INTO STILLNESS' : 'SCROLL TO COMPLETE SYNTHESIS'}
        </span>
      </div>

      {/* Section 35: Entire Viewport Headline "LET'S BUILD WHAT COMES NEXT." */}
      <div style={{ maxWidth: '1200px', margin: 'auto 0' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 9vw, 132px)',
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: '-0.065em',
            color: 'var(--ink)'
          }}
        >
          LET'S BUILD<br />
          <span style={{ color: 'var(--ultramarine)' }}>WHAT COMES NEXT.</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.35vw, 1.35rem)',
            lineHeight: 1.5,
            color: 'var(--ink-soft)',
            marginTop: '32px',
            maxWidth: '640px',
            letterSpacing: '-0.01em'
          }}
        >
          Partner with CIIRC researchers across sponsored discovery, specialized characterization access, doctoral research programs, or translational deep tech commercialization.
        </p>

        {/* Rectangular Action Triggers */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '36px',
            flexWrap: 'wrap'
          }}
        >
          <a
            href={`mailto:${CIIRC_IDENTITY.email}`}
            className="btn-rect-dark"
          >
            <span>Initiate Research Dialogue</span>
            <ArrowUpRight size={14} />
          </a>
          <a
            href="tel:080-50985588"
            className="btn-rect-outline"
          >
            <span>Direct Desk: {CIIRC_IDENTITY.phone}</span>
          </a>
        </div>
      </div>

      {/* Section 36: The Final 2 Seconds Indicator */}
      <div
        style={{
          borderTop: '1px solid var(--line)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.04em' }}>
            CIIRC®
          </div>
          <span className="micro-label">
            {CIIRC_IDENTITY.recognition}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--acid-dark)', display: 'inline-block' }} />
          <span className="micro-label">
            SYSTEM EQUILIBRIUM REACHED
          </span>
        </div>
      </div>
    </section>
  );
};
