'use client';

import React from 'react';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      aria-label="CIIRC Institutional Directory"
      style={{
        backgroundColor: '#18242D', // Section 68: Deep ink
        color: '#F5F1E8',
        padding: '90px 48px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="ciirc-container">
        {/* Four Columns Layout (Section 68: RESEARCH / INSTITUTION / CONNECT / LEGAL) */}
        <div
          className="footer-columns-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '48px',
            marginBottom: '64px'
          }}
        >
          {/* Column 1: RESEARCH */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9AAFFF',
                marginBottom: '20px'
              }}
            >
              RESEARCH
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Sophisticated Instrumentation (SIF)', href: '#instrumentation' },
                { label: 'Nanoscience & Engineering', href: '#research' },
                { label: 'Autonomous Systems & Drones', href: '#research' },
                { label: 'Affordable Medical Devices', href: '#research' },
                { label: 'Remote Sensing & GIS Telemetry', href: '#research' },
                { label: 'Energy & Clean Storage', href: '#research' },
                { label: 'Biopolymers & Biocomposites', href: '#research' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'rgba(245, 241, 232, 0.75)',
                      transition: 'color 180ms ease'
                    }}
                    className="footer-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: INSTITUTION */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9AAFFF',
                marginBottom: '20px'
              }}
            >
              INSTITUTION
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'About CIIRC® Convergence', href: '#about' },
                { label: '50,000+ Sq. Ft. Facility', href: '#facilities' },
                { label: 'Founder-Director Directive', href: '#director' },
                { label: 'Doctoral Faculty & Fellows', href: '#people' },
                { label: 'Arctic & Space Milestones', href: '#achievements' },
                { label: 'Atal Incubation Centre (AIC-JIT)', href: 'https://ciirc.res.in' },
                { label: 'DSIR–SIRO Recognition', href: '#hero' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'rgba(245, 241, 232, 0.75)',
                      transition: 'color 180ms ease'
                    }}
                    className="footer-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9AAFFF',
                marginBottom: '20px'
              }}
            >
              CONNECT
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(245, 241, 232, 0.75)',
                marginBottom: '16px'
              }}
            >
              {CIIRC_IDENTITY.location}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={`mailto:${CIIRC_IDENTITY.email}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: '#9AAFFF',
                  textDecoration: 'none'
                }}
              >
                {CIIRC_IDENTITY.email}
              </a>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'rgba(245, 241, 232, 0.6)'
                }}
              >
                Tel: {CIIRC_IDENTITY.phone}
              </span>
            </div>
          </div>

          {/* Column 4: LEGAL */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9AAFFF',
                marginBottom: '20px'
              }}
            >
              LEGAL
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'rgba(245, 241, 232, 0.65)',
                marginBottom: '16px'
              }}
            >
              Scientific and Industrial Research Organization (SIRO) recognized by DSIR, Ministry of Science &amp; Technology, Government of India (Reg. No. 11/592/2013-TU-V).
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'rgba(245, 241, 232, 0.65)'
              }}
            >
              {CIIRC_IDENTITY.founders}.
            </p>
          </div>
        </div>

        {/* Baseline Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(245, 241, 232, 0.5)'
            }}
          >
            © {new Date().getFullYear()} CIIRC®. All rights reserved. Scientific Editorial &amp; Kinetic Research Edition.
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#9AAFFF',
              letterSpacing: '0.08em'
            }}
          >
            DSIR–SIRO // BENGALURU, INDIA
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-nav-link:hover {
          color: #9AAFFF !important;
        }
        @media (max-width: 900px) {
          .footer-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
