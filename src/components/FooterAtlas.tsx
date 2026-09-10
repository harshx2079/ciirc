'use client';

import React from 'react';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const FooterAtlas: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--forest)',
        color: 'var(--paper)',
        borderTop: '1px solid rgba(247, 248, 243, 0.12)',
        padding: '100px 0 60px 0'
      }}
    >
      <div className="atlas-container">
        {/* Top 4-Column Directory Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40% 20% 20% 20%',
            gap: '40px',
            marginBottom: '72px'
          }}
          className="footer-directory-grid"
        >
          {/* Column 1: Identity & SIRO Recognition */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 750,
                  letterSpacing: '-0.04em',
                  color: 'var(--paper)'
                }}
              >
                CIIRC
              </span>
              <span style={{ fontSize: '13px', color: 'var(--teal)', fontWeight: 700 }}>
                ®
              </span>
            </div>

            <div
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--paper)',
                lineHeight: 1.45,
                maxWidth: '340px'
              }}
            >
              {CIIRC_IDENTITY.fullName}
            </div>

            <p
              className="mono-meta"
              style={{
                color: 'var(--faint)',
                fontSize: '11px',
                lineHeight: 1.6,
                maxWidth: '360px'
              }}
            >
              {CIIRC_IDENTITY.recognition}
              <br />
              {CIIRC_IDENTITY.ministry}
              <br />
              {CIIRC_IDENTITY.founders}
            </p>
          </div>

          {/* Column 2: Research Thrusts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="mono-meta" style={{ color: 'var(--teal-soft)' }}>
              RESEARCH ATLAS
            </span>
            <a href="#research" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              17 Research Directions
            </a>
            <a href="#research" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              Materials Science
            </a>
            <a href="#research" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              Sensors & Inks
            </a>
            <a href="#research" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              Autonomous UAVs
            </a>
            <a href="#research" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              ISRO IRNSS Telemetry
            </a>
          </div>

          {/* Column 3: Analytical Facilities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="mono-meta" style={{ color: 'var(--teal-soft)' }}>
              INFRASTRUCTURE
            </span>
            <a href="#facilities" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              50,000+ Sq. Ft. Complex
            </a>
            <a href="#facilities" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              SEM & XRD Crystallography
            </a>
            <a href="#facilities" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              GC Chemical Separation
            </a>
            <a href="#facilities" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              FT-IR Molecular Spectroscopy
            </a>
            <a href="#facilities" style={{ color: 'var(--paper)', fontSize: '14.5px', opacity: 0.85 }}>
              DSC & TGA Thermal Lab
            </a>
          </div>

          {/* Column 4: Contact & Coordinates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="mono-meta" style={{ color: 'var(--teal-soft)' }}>
              CAMPUS & INQUIRIES
            </span>
            <span style={{ fontSize: '14px', color: 'var(--faint)', lineHeight: 1.5 }}>
              {CIIRC_IDENTITY.location}
            </span>
            <a
              href={`mailto:${CIIRC_IDENTITY.email}`}
              style={{ color: 'var(--teal-soft)', fontSize: '14px', marginTop: '6px' }}
            >
              {CIIRC_IDENTITY.email}
            </a>
            <span style={{ fontSize: '14px', color: 'var(--faint)' }}>
              Tel: {CIIRC_IDENTITY.phone}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & DSIR-SIRO Attribution */}
        <div
          style={{
            borderTop: '1px solid rgba(247, 248, 243, 0.12)',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <span className="mono-meta" style={{ color: 'var(--faint)', fontSize: '11px' }}>
            © {new Date().getFullYear()} CIIRC®. ALL RIGHTS RESERVED. AUTONOMOUS RESEARCH INSTITUTION.
          </span>
          <span className="mono-meta" style={{ color: 'var(--teal-soft)', fontSize: '10.5px' }}>
            A LIVING RESEARCH ATLAS // BENGALURU, INDIA
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .footer-directory-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
};
