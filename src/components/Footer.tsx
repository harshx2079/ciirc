'use client';

import React from 'react';
import { CIIRC_IDENTITY } from '../data/ciircData';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'RESEARCH AXES',
      links: [
        { label: 'Living Ecosystem', href: '#ecosystem' },
        { label: 'Research Atlas (19 Vistas)', href: '#atlas' },
        { label: 'Instrumentation Core (SIF)', href: '#facilities' },
        { label: 'Empirical Impact Audit', href: '#impact' }
      ]
    },
    {
      title: 'INSTITUTION',
      links: [
        { label: 'DSIR-SIRO Recognition Charter', href: '#hero' },
        { label: 'Historic Timeline (2017–2026)', href: '#timeline' },
        { label: "Founder-Director Directive", href: '#people' },
        { label: 'Kinetic Institutional Network', href: '#network' }
      ]
    },
    {
      title: 'ENGAGE & CALLS',
      links: [
        { label: 'Research Appointments & Gazette', href: '#opportunities' },
        { label: 'Bilateral Consortia (CEFIPRA/LPI)', href: '#network' },
        { label: 'AIC-JIT Incubation Hub', href: 'https://ciirc.res.in/incubation/' },
        { label: `Direct Desk: ${CIIRC_IDENTITY.phone}`, href: `tel:${CIIRC_IDENTITY.phone}` }
      ]
    },
    {
      title: 'FOUNDING AUSPICES',
      links: [
        { label: 'Sri Sringeri Sharada Peetham', href: 'https://www.sringeri.net/' },
        { label: 'Jyothy Institute of Technology', href: 'https://www.jyothyit.ac.in/' },
        { label: 'Ministry of Science & Technology', href: 'https://dst.gov.in/' },
        { label: 'Official Institutional Dossier', href: 'https://ciirc.res.in/' }
      ]
    }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        padding: '100px 42px 48px 42px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid var(--ink)'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Top Identification Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
            marginBottom: '64px'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                CIIRC<sup style={{ fontSize: '0.6em', color: 'var(--ultramarine)' }}>®</sup>
              </span>
              <span className="scientific-badge signal">
                DSIR-SIRO RECOGNIZED
              </span>
            </div>

            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5, marginBottom: '12px' }}>
              {CIIRC_IDENTITY.fullName}
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6 }}>
              {CIIRC_IDENTITY.campusAddress}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <span className="micro-label" style={{ color: 'var(--acid)' }}>
              PRIMARY ELECTRONIC INTAKE
            </span>
            <a
              href={`mailto:${CIIRC_IDENTITY.email}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.125rem',
                color: 'var(--white)',
                borderBottom: '1px solid var(--ultramarine)',
                paddingBottom: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{CIIRC_IDENTITY.email}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* 4-Column Navigation Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '80px'
          }}
        >
          {columns.map((col, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '8px'
                }}
              >
                {col.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      transition: 'color 180ms ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--acid)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Legal Baseline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <div>
            © {currentYear} CIIRC®. All scientific protocols, patents, and publications reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span>AUTONOMOUS SIRO</span>
            <span>·</span>
            <span>RESEARCH IS A LIVING SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
