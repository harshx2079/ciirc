'use client';

import React from 'react';

export const ImpactStats: React.FC = () => {
  return (
    <section
      id="impact"
      aria-label="Impact Metrics"
      style={{
        backgroundColor: '#18242D', // Section 55 & 88: Deep ink (only dark section)
        color: '#F5F1E8',
        minHeight: '760px',
        position: 'relative',
        zIndex: 2,
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      <div
        className="ciirc-container"
        style={{
          position: 'relative',
          minHeight: '600px'
        }}
      >
        {/* Section Label */}
        <div style={{ position: 'absolute', left: '7vw', top: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 650,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9AAFFF'
            }}
          >
            RESEARCH IMPACT &amp; SCALE
          </span>
        </div>

        {/* Section 56: Asymmetric Coordinates
            Primary: 50,000+ at x: 7vw, y: 140px
            Secondary:
            300+ -> x: 57vw / y: 180px (color #9AAFFF)
            35+  -> x: 77vw / y: 390px (color #E07A64 - one coral)
            50   -> x: 53vw / y: 560px (color #80A99E) */}

        {/* Metric 1: 50,000+ SQ. FT. (x: 7vw, y: 140px, color #F5F1E8) */}
        <div
          className="impact-metric metric-primary"
          style={{
            position: 'absolute',
            left: '7vw',
            top: '110px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(80px, 11vw, 170px)',
              lineHeight: 0.85,
              fontWeight: 650,
              letterSpacing: '-0.065em',
              color: '#F5F1E8'
            }}
          >
            50,000+
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9AAFFF',
              marginTop: '14px'
            }}
          >
            SQ. FT. RESEARCH INFRASTRUCTURE
          </div>
        </div>

        {/* Metric 2: 300+ PUBLICATIONS (x: 57vw, y: 180px, color #9AAFFF) */}
        <div
          className="impact-metric metric-publications"
          style={{
            position: 'absolute',
            left: '57vw',
            top: '160px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(54px, 6.5vw, 96px)',
              lineHeight: 0.9,
              fontWeight: 650,
              letterSpacing: '-0.05em',
              color: '#9AAFFF' // Section 57: #9AAFFF
            }}
          >
            300+
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F5F1E8',
              marginTop: '8px'
            }}
          >
            INDEXED PUBLICATIONS
          </div>
        </div>

        {/* Metric 3: 35+ PRODUCTS (x: 77vw, y: 390px, color #E07A64 - Section 57 One coral!) */}
        <div
          className="impact-metric metric-products"
          style={{
            position: 'absolute',
            left: '75vw',
            top: '370px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(54px, 6.5vw, 96px)',
              lineHeight: 0.9,
              fontWeight: 650,
              letterSpacing: '-0.05em',
              color: '#E07A64' // Section 57: #E07A64
            }}
          >
            35+
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F5F1E8',
              marginTop: '8px'
            }}
          >
            SOCIETAL PRODUCTS
          </div>
        </div>

        {/* Metric 4: 50 FUNDED PROJECTS (x: 53vw, y: 560px, color #80A99E) */}
        <div
          className="impact-metric metric-projects"
          style={{
            position: 'absolute',
            left: '53vw',
            top: '520px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(54px, 6.5vw, 96px)',
              lineHeight: 0.9,
              fontWeight: 650,
              letterSpacing: '-0.05em',
              color: '#80A99E' // Section 57: #80A99E
            }}
          >
            50
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F5F1E8',
              marginTop: '8px'
            }}
          >
            FUNDED PROJECTS
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .ciirc-container {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 48px !important;
            padding-inline: 24px !important;
          }
          .impact-metric {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
