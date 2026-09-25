'use client';

import React from 'react';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const EngageSection: React.FC = () => {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        backgroundColor: 'var(--surface)',
        padding: 'clamp(64px, 8vw, 130px) 0',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: 'clamp(28px, 4vw, 56px)',
            alignItems: 'center'
          }}
          className="engage-grid"
        >
          {/* Left Column: Heading, Direct Action, Vision */}
          <div>
            <div className="eyebrow-capsule" style={{ marginBottom: '20px' }}>
              <span className="eyebrow-pulse-dot" />
              <span>11 // COLLABORATIVE ENGAGEMENT</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(36px, 4.2vw, 64px)',
                lineHeight: 1.04,
                letterSpacing: '-0.045em',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 20px 0'
              }}
            >
              Partner with CIIRC in pioneering research &amp; incubation.
            </h2>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '540px',
                margin: '0 0 36px 0'
              }}
            >
              Whether you are an industry looking for advanced materials testing, a government body
              commissioning national mission projects, or an entrepreneur seeking incubation under AIC-JIT,
              our multidisciplinary ecosystem welcomes your inquiry.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${CIIRC_IDENTITY.email}?subject=Research%20Collaboration%20Inquiry`}
                className="btn-primary-ciirc"
              >
                <span>Initiate Collaboration</span>
                <span className="cta-arrow">→</span>
              </a>

              <a
                href="https://ciirc-admin-panel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-ciirc"
              >
                <span>Access Admin Portal</span>
                <span className="cta-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Institutional Coordinates Card */}
          <div
            style={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: '0 12px 32px rgba(20, 33, 61, 0.05)'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                CAMPUS &amp; LABORATORIES
              </div>
              <div
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  fontWeight: 500
                }}
              >
                {CIIRC_IDENTITY.location}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border)'
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}
                >
                  OFFICIAL INQUIRY
                </div>
                <a
                  href={`mailto:${CIIRC_IDENTITY.email}`}
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--blue)',
                    textDecoration: 'none'
                  }}
                >
                  {CIIRC_IDENTITY.email}
                </a>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}
                >
                  DIRECT DESK
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {CIIRC_IDENTITY.phone}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '14px 18px',
                backgroundColor: 'rgba(22, 119, 255, 0.04)',
                borderRadius: '8px',
                border: '1px solid rgba(22, 119, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Government DSIR–SIRO Recognized Autonomous Scientific Institution
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .engage-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};
