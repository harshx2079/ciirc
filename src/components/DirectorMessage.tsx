'use client';

import React, { useRef, useState, useEffect } from 'react';
import { CIIRC_IDENTITY } from '../data/ciircData';
import { Award, BookOpen, Quote } from 'lucide-react';

export const DirectorMessage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        // Subtle vertical parallax movement
        const shift = ((vh / 2) - (rect.top + rect.height / 2)) * 0.06;
        setScrollY(shift);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="people"
      ref={containerRef}
      aria-label="CIIRC Scientific Leadership & Governance"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '120px clamp(16px, 3vw, 42px) 140px clamp(16px, 3vw, 42px)',
        boxSizing: 'border-box',
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--line)',
            marginBottom: '64px'
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
              [08 / LEADERSHIP]
            </span>
            <span className="micro-label">FOUNDER-DIRECTOR DIRECTIVE</span>
          </div>

          <span className="scientific-badge">
            IISc BENGALURU ALUMNUS · Ph.D. NANOENGINEERING
          </span>
        </div>

        {/* Section 33: Portrait with Overlapping Quote */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}
          className="director-stage"
        >
          {/* Authentic Director Image from ciirc.res.in */}
          <div
            style={{
              position: 'relative',
              width: '44vw',
              maxWidth: '560px',
              height: '68vh',
              minHeight: '480px',
              overflow: 'hidden',
              border: '1px solid var(--ink)',
              backgroundColor: 'var(--paper-2)',
              transform: `translateY(${scrollY}px)`,
              transition: 'transform 100ms ease-out',
              flexShrink: 0
            }}
            className="portrait-box"
          >
            <img
              src="/images/director-krishna-venkatesh.jpg"
              alt="Dr. Krishna Venkatesh — Founder-Director CIIRC"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '22% center'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '24px',
                background: 'linear-gradient(to top, rgba(16, 24, 32, 0.92) 0%, transparent 100%)',
                color: 'var(--white)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', color: 'var(--acid)' }}>
                FOUNDER-DIRECTOR
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
                {CIIRC_IDENTITY.director.name}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                {CIIRC_IDENTITY.director.qualifications}
              </div>
            </div>
          </div>

          {/* Text Overlaps the Portrait: Large Quote */}
          <div
            style={{
              position: 'relative',
              marginLeft: '-8vw', // Overlaps portrait
              flex: 1,
              maxWidth: '720px',
              zIndex: 10,
              backgroundColor: 'rgba(243, 240, 232, 0.96)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--ink)',
              padding: 'clamp(28px, 4vw, 48px)',
              boxSizing: 'border-box'
            }}
            className="quote-overlap-card"
          >
            <div style={{ marginBottom: '20px' }}>
              <span className="scientific-badge ultramarine">
                LEADERSHIP MANIFESTO
              </span>
            </div>

            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.4vw, 38px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.2,
                color: 'var(--ink)',
                marginBottom: '24px'
              }}
            >
              “Multidisciplinary science is not an administrative choice — it is the only viable methodology to solve the grand challenges of our era.”
            </blockquote>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--ink-soft)',
                marginBottom: '24px'
              }}
            >
              {CIIRC_IDENTITY.director.quote}
            </p>

            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)' }}>
                HONOURS & SCIENTIFIC COMMITTEES:
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                {CIIRC_IDENTITY.director.bio}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .director-stage {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .portrait-box {
            width: 100% !important;
            max-width: 100% !important;
            height: 440px !important;
            transform: none !important;
          }
          .quote-overlap-card {
            width: 100% !important;
            margin-left: 0 !important;
            margin-top: -30px !important;
          }
        }
      `}</style>
    </section>
  );
};
