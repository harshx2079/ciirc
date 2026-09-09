'use client';

import React, { useState } from 'react';
import { LIVE_OPPORTUNITIES, RESEARCH_FELLOWSHIPS_WON } from '../data/ciircData';
import { ArrowUpRight, Award, Calendar, FileText } from 'lucide-react';

export const Opportunities: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Section 34: Featured story (~65%) + Secondary list (~35%)
  const featured = LIVE_OPPORTUNITIES[0];
  const secondaryList = LIVE_OPPORTUNITIES.slice(1);

  return (
    <section
      id="opportunities"
      aria-label="CIIRC Research Opportunities & News"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '120px clamp(16px, 3vw, 42px)',
        boxSizing: 'border-box',
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--line)',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '16px'
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
              [09 / NEWS & CALLS]
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--ink)'
              }}
            >
              RESEARCH APPOINTMENTS & GAZETTE
            </h2>
          </div>

          <span className="micro-label" style={{ display: 'none' }} id="opp-meta">
            APPLICATION DESK OPEN · DSIR-SIRO
          </span>
        </div>

        {/* Section 34: 65% Featured + 35% Secondary List with ZERO horizontal overflow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)',
            gap: 'clamp(24px, 3vw, 48px)',
            alignItems: 'start',
            width: '100%',
            boxSizing: 'border-box'
          }}
          className="news-layout"
        >
          {/* FEATURED STORY */}
          <div
            style={{
              borderRight: '1px solid var(--line)',
              paddingRight: 'clamp(20px, 3vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxSizing: 'border-box',
              width: '100%'
            }}
            className="featured-col"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <span className="scientific-badge active">
                FEATURED INSTITUTIONAL CALL
              </span>
              <span className="micro-label">{featured.date}</span>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                overflow: 'hidden',
                border: '1px solid var(--ink)',
                backgroundColor: 'var(--paper-2)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85"
                alt="CIIRC Translational Research Fellow Call"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            <div className="micro-label" style={{ color: 'var(--ultramarine)' }}>
              DEPARTMENT: {featured.department.toUpperCase()}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.8vw, 36px)',
                fontWeight: 700,
                lineHeight: 1.18,
                letterSpacing: '-0.03em',
                color: 'var(--ink)'
              }}
            >
              {featured.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--ink-soft)'
              }}
            >
              Applications are invited from meritorious candidates with a Master's or Doctoral degree in relevant scientific branches to join active sponsored projects funded by DST, DRDO, DOS/ISRO, and bilateral consortia.
            </p>

            <div>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rect-dark"
              >
                <span>Submit Formal Dossier</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* VERTICAL LIST OF SMALLER STORIES */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
            <div className="micro-label" style={{ marginBottom: '20px' }}>
              ADDITIONAL RESEARCH APPOINTMENTS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {secondaryList.map((item, idx) => {
                const isHovered = hoveredIdx === idx;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      padding: '20px 0',
                      borderTop: '1px solid var(--line)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', gap: '8px' }}>
                      <span className="micro-label">{item.date}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.625rem',
                          color: item.status === 'Open Application' ? 'var(--ultramarine)' : 'var(--ink-muted)',
                          fontWeight: 600,
                          flexShrink: 0
                        }}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        letterSpacing: '-0.02em',
                        color: isHovered ? 'var(--ultramarine)' : 'var(--ink)',
                        marginBottom: '8px',
                        transition: 'color 180ms ease'
                      }}
                    >
                      {item.title}
                    </h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {item.department}
                      </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--ink)' }}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fellowships Won Ticker */}
            <div
              style={{
                marginTop: '32px',
                padding: '20px',
                backgroundColor: 'var(--paper-2)',
                border: '1px solid var(--line)'
              }}
            >
              <div className="micro-label" style={{ marginBottom: '12px', color: 'var(--ultramarine)' }}>
                COMPETITIVE FELLOWSHIPS SECURED
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {RESEARCH_FELLOWSHIPS_WON.slice(0, 6).map((fellowship) => (
                  <span key={fellowship} className="scientific-badge">
                    {fellowship}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          #opp-meta {
            display: inline-block !important;
          }
        }
        @media (max-width: 1023px) {
          .news-layout {
            grid-template-columns: 1fr !important;
          }
          .featured-col {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid var(--line);
            padding-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
};
