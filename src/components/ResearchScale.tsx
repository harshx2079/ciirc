'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
  subtext: string;
}

const STATS: StatItem[] = [
  {
    id: 'labs-area',
    targetValue: 50000,
    suffix: '+',
    label: 'Sq. Ft. Research & Innovation Labs',
    subtext: 'Centralized cleanrooms, characterization suites & high-precision testing facilities.'
  },
  {
    id: 'doctorates',
    targetValue: 27,
    suffix: '',
    label: 'Doctorates Conferred',
    subtext: 'Supervised by 27 doctoral faculty mentors and 13 master research leads.'
  },
  {
    id: 'publications',
    targetValue: 300,
    suffix: '+',
    label: 'Peer-Reviewed Publications',
    subtext: 'Published in high-impact Scopus & Web of Science indexed scientific journals.'
  },
  {
    id: 'products',
    targetValue: 35,
    suffix: '+',
    label: 'Translational Products Developed',
    subtext: 'Point-of-care medical chips, polar drones, water filters & bio-composite polymers.'
  }
];

export const ResearchScale: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    'labs-area': 0,
    'doctorates': 0,
    'publications': 0,
    'products': 0
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger once when ~30% of section is visible (Section 29)
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 1350; // 1200-1500ms ease-out

          const animateCounts = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              'labs-area': Math.floor(easeOut * 50000),
              'doctorates': Math.floor(easeOut * 27),
              'publications': Math.floor(easeOut * 300),
              'products': Math.floor(easeOut * 35)
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setCounts({
                'labs-area': 50000,
                'doctorates': 27,
                'publications': 300,
                'products': 35
              });
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="scale"
      ref={sectionRef}
      style={{
        position: 'relative',
        paddingTop: '180px',
        paddingBottom: '180px',
        backgroundColor: 'var(--surface-soft)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container">
        {/* Large Structural Typography Moment (Section 13 & 15) */}
        <div
          style={{
            maxWidth: '1100px',
            marginBottom: '130px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <div className="eyebrow-capsule" style={{ alignSelf: 'flex-start' }}>
            <span className="eyebrow-pulse-dot" />
            <span>04 // INSTITUTIONAL SCALE &amp; IMPACT</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(38px, 5.4vw, 84px)',
              lineHeight: 1.02,
              letterSpacing: '-0.05em',
              fontWeight: 650,
              color: 'var(--text-primary)',
              margin: 0
            }}
          >
            Translating fundamental scientific inquiry into{' '}
            <span style={{ color: 'var(--blue)' }}>tangible societal consequence.</span>
          </h2>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.68,
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: 0
            }}
          >
            Verified institutional metrics reflecting over a decade of sustained sponsored research,
            doctoral mentorship, and translational technology transfer across critical scientific domains.
          </p>
        </div>

        {/* Typographic Stats Grid (Open layout, hairline dividers) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: '80px',
            rowGap: '64px'
          }}
          className="research-scale-grid"
        >
          {STATS.map((stat, idx) => {
            const displayValue = stat.id === 'labs-area'
              ? counts[stat.id].toLocaleString()
              : counts[stat.id];

            return (
              <div
                key={stat.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '32px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: 'clamp(64px, 6.2vw, 100px)',
                      lineHeight: 0.95,
                      fontWeight: 700,
                      letterSpacing: '-0.045em',
                      color: idx === 0 ? 'var(--blue)' : 'var(--text-primary)',
                      fontFeatureSettings: '"tnum" 1'
                    }}
                  >
                    {displayValue}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(38px, 4vw, 64px)',
                      fontWeight: 600,
                      color: 'var(--blue)',
                      lineHeight: 1
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {stat.label}
                </h3>

                <p
                  style={{
                    fontSize: '14.5px',
                    lineHeight: 1.55,
                    color: 'var(--text-secondary)',
                    margin: 0,
                    maxWidth: '440px'
                  }}
                >
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 800px) {
          .research-scale-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};
