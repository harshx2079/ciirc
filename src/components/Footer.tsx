'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Section 25: Quiet, Expansive Editorial Transition (#F7F9FC -> #14213D) */}
      <div
        style={{
          background: 'linear-gradient(180deg, var(--background) 0%, #1A2A4A 60%, #14213D 100%)',
          position: 'relative',
          paddingTop: 'clamp(80px, 9vw, 150px)',
          paddingBottom: 'clamp(60px, 7vw, 110px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '820px',
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center'
          }}
        >
          <div
            className="eyebrow-capsule"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#90C8FF',
              borderColor: 'rgba(255, 255, 255, 0.16)'
            }}
          >
            <span className="eyebrow-pulse-dot" style={{ backgroundColor: '#25BFEF' }} />
            <span>INSTITUTIONAL RESOLUTION</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(36px, 4.8vw, 72px)',
              lineHeight: 1.04,
              letterSpacing: '-0.045em',
              fontWeight: 650,
              color: '#FFFFFF',
              margin: 0
            }}
          >
            Where research becomes possibility.
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: '#A8BCDA',
              lineHeight: 1.68,
              fontWeight: 400,
              maxWidth: '580px',
              margin: 0
            }}
          >
            Multidisciplinary fundamental science, precision engineering, and translational incubation
            advancing national self-reliance and human well-being.
          </p>
        </div>
      </div>

      {/* Section 54: Deep Navy Minimal Institutional Footer (#14213D) */}
      <div
        style={{
          backgroundColor: '#14213D',
          color: '#CDD7E5',
          paddingTop: '80px',
          paddingBottom: '48px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="atlas-container">
          {/* Main Footer Directory Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
              gap: '48px',
              paddingBottom: '64px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            className="footer-grid"
          >
            {/* Col 1: Identity & Credentials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    src="/images/ciirc-logo.png"
                    alt="CIIRC"
                    width={110}
                    height={34}
                    style={{ objectFit: 'contain', height: 'auto', width: 'auto' }}
                  />
                </div>
              </div>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: '#8EA0BA',
                  maxWidth: '380px',
                  margin: 0
                }}
              >
                Autonomous research institution recognized by DSIR–SIRO, Ministry of Science &amp; Technology,
                Government of India. Joint initiative of Sri Sringeri Sharada Peetham, Sringeri and Jyothy Institute of Technology.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="mono-meta" style={{ color: '#25BFEF', fontSize: '10px' }}>
                  FACILITY SCALE
                </span>
                <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>
                  50,000+ Sq. Ft. Research &amp; Incubation Labs
                </span>
              </div>
            </div>

            {/* Col 2: Navigation Directory */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="mono-meta" style={{ color: '#FFFFFF', letterSpacing: '0.12em' }}>
                EXPLORE
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'About CIIRC', href: '#about' },
                  { label: 'The Idea & Convergence', href: '#idea' },
                  { label: 'Research Domains', href: '#research' },
                  { label: 'Scale & Output', href: '#scale' },
                  { label: 'From Research to Impact', href: '#innovation' },
                  { label: 'Signature Achievements', href: '#facilities' },
                  { label: 'Collaborations', href: '#collaborations' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      style={{
                        fontSize: '13.5px',
                        color: '#8EA0BA',
                        textDecoration: 'none',
                        transition: 'color 180ms ease'
                      }}
                      className="footer-link"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Research Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="mono-meta" style={{ color: '#FFFFFF', letterSpacing: '0.12em' }}>
                DOMAINS
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Cell & Molecular Biology',
                  'Autonomous Systems',
                  'Computational Engineering',
                  'Energy & Storage',
                  'Environmental Science',
                  'Nanoscience & Materials',
                  'Remote Sensing & Polar',
                  'Affordable Medical Devices'
                ].map((d) => (
                  <li key={d} style={{ fontSize: '13px', color: '#8EA0BA' }}>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Location & Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <span className="mono-meta" style={{ color: '#FFFFFF', letterSpacing: '0.12em' }}>
                LOCATION &amp; CONTACT
              </span>

              <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#8EA0BA' }}>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>
                  CIIRC Bengaluru
                </strong>
                Tataguni, Kanakapura Main Road,<br />
                Bengaluru 560082, Karnataka, India
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: '#8EA0BA' }}>Email: </span>
                  <a href="mailto:info@ciirc.jyothyit.ac.in" style={{ color: '#25BFEF', textDecoration: 'none' }}>
                    info@ciirc.jyothyit.ac.in
                  </a>
                </div>
                <div>
                  <span style={{ color: '#8EA0BA' }}>Phone: </span>
                  <a href="tel:08050985588" style={{ color: '#25BFEF', textDecoration: 'none' }}>
                    080-50985588
                  </a>
                </div>
              </div>

              {/* Portal Direct Access */}
              <div style={{ marginTop: '10px' }}>
                <a
                  href="https://ciirc-admin-panel.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: '#25BFEF',
                    border: '1px solid rgba(37, 191, 239, 0.3)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 200ms ease'
                  }}
                  className="portal-link"
                >
                  <span>CIIRC Admin Panel ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              paddingTop: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12.5px',
              color: '#8EA0BA'
            }}
          >
            <span>
              © {new Date().getFullYear()} CIIRC® (Centre for Incubation, Innovation, Research and Consultancy). All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="https://ciirc.res.in" target="_blank" rel="noopener noreferrer" style={{ color: '#8EA0BA', textDecoration: 'none' }}>
                Official Website
              </a>
              <a href="https://jyothyit.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: '#8EA0BA', textDecoration: 'none' }}>
                Jyothy Institute of Technology
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link:hover {
          color: #25BFEF !important;
        }
        .portal-link:hover {
          background-color: rgba(37, 191, 239, 0.1);
          border-color: #25BFEF;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px !important;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
};
