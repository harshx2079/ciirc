'use client';

import React from 'react';

export const FinalCTA: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper)',
        padding: '160px 0',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: '48px',
            alignItems: 'center'
          }}
          className="final-cta-grid"
        >
          {/* Left: Distilled Big Typography & Direct Action */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="mono-meta" style={{ color: 'var(--teal)', marginBottom: '20px' }}>
              CONCLUSION // INITIATIVE
            </span>

            <h2
              style={{
                fontSize: 'clamp(44px, 7vw, 92px)',
                fontWeight: 800,
                lineHeight: 0.88,
                letterSpacing: '-0.06em',
                color: 'var(--forest)',
                textTransform: 'uppercase',
                margin: '0 0 24px 0'
              }}
            >
              BUILD
              <br />
              WHAT COMES
              <br />
              <span style={{ color: 'var(--teal)' }}>NEXT.</span>
            </h2>

            <p
              style={{
                maxWidth: '480px',
                fontSize: '17px',
                lineHeight: 1.55,
                color: 'var(--forest-soft)',
                marginBottom: '40px'
              }}
            >
              Explore CIIRC&apos;s research, infrastructure, innovation and collaboration opportunities. Connect with our principal investigators and translation laboratories.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="#research" className="btn-forest-solid">
                <span>Explore Research</span>
                <span className="btn-arrow">→</span>
              </a>

              <a href="mailto:info@ciirc.jyothyit.ac.in" className="btn-forest-outline">
                <span>Collaborate with CIIRC</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Right: The Transformed Sparse Distilled Research Field */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              aspectRatio: '1 / 1',
              margin: '0 auto',
              backgroundColor: 'rgba(233, 240, 243, 0.45)',
              border: '1px solid var(--line-strong)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="mono-meta">DISTILLED ATLAS // STATE 02</span>
              <span className="mono-meta" style={{ color: 'var(--teal)' }}>● KNOWLEDGE CONVERGENCE</span>
            </div>

            {/* Sparse SVG Sculpture */}
            <div style={{ width: '100%', height: '260px' }}>
              <svg viewBox="0 0 400 400" width="100%" height="100%">
                {/* 3 Distilled Contour Lines */}
                <path
                  d="M 100 200 C 100 130, 160 90, 200 90 C 260 90, 300 140, 300 200 C 300 270, 250 310, 200 310 C 140 310, 100 260, 100 200 Z"
                  fill="none"
                  stroke="var(--forest)"
                  strokeWidth="1.2"
                  opacity="0.3"
                />
                <path
                  d="M 130 200 C 130 150, 170 120, 200 120 C 240 120, 270 160, 270 200 C 270 250, 230 280, 200 280 C 160 280, 130 240, 130 200 Z"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <path
                  d="M 160 200 C 160 170, 180 150, 200 150 C 220 150, 240 170, 240 200 C 240 230, 220 250, 200 250 C 180 250, 160 230, 160 200 Z"
                  fill="none"
                  stroke="var(--forest)"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* 1 Scanning Frame */}
                <rect
                  x="140"
                  y="150"
                  width="120"
                  height="100"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />

                {/* 3 Distilled Markers */}
                <circle cx="200" cy="150" r="5" fill="var(--teal)" />
                <circle cx="240" cy="220" r="5" fill="var(--cobalt)" />
                <circle cx="160" cy="230" r="5" fill="var(--coral)" />

                {/* Tangent Measurement Lines */}
                <line x1="200" y1="150" x2="240" y2="220" stroke="var(--teal)" strokeWidth="0.8" opacity="0.4" />
                <line x1="240" y1="220" x2="160" y2="230" stroke="var(--cobalt)" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>

            <div className="mono-meta" style={{ fontSize: '10px', textAlign: 'center' }}>
              AXIS: 12.8615° N, 77.5061° E // BENGALURU
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .final-cta-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
