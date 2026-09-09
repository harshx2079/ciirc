'use client';

import React from 'react';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { CIIRC_IDENTITY } from '../data/ciircData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Footer: React.FC = () => {
  const footerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.10 });
  const currentYear = new Date().getFullYear();

  const navColumns = [
    {
      title: 'Institutional',
      links: [
        { label: 'About CIIRC®', href: '#about' },
        { label: "Director's Profile", href: 'https://ciirc.res.in/directors-profile/' },
        { label: 'Faculty & Researchers', href: 'https://ciirc.res.in/faculty/' },
        { label: 'Visiting Faculty', href: 'https://ciirc.res.in/visiting-faculty/' },
        { label: 'Policy & Governance', href: 'https://ciirc.res.in/policy/' }
      ]
    },
    {
      title: 'Research & Facilities',
      links: [
        { label: 'Research Vistas (18 Labs)', href: '#research' },
        { label: 'Instrumentation Facility (SIF)', href: '#instrumentation' },
        { label: 'External Project Funding', href: 'https://ciirc.res.in/external-funding/' },
        { label: 'AIC-JIT Incubation Foundation', href: 'https://ciirc.res.in/incubation/' },
        { label: 'Technical Consultancy Services', href: 'https://ciirc.res.in/services-2/' }
      ]
    },
    {
      title: 'Output & Innovation',
      links: [
        { label: 'Journal Publications (300+)', href: 'https://ciirc.res.in/journal-publications-2023/' },
        { label: 'Books & Monographs', href: 'https://ciirc.res.in/books/' },
        { label: 'Patents & IP Rights', href: 'https://ciirc.res.in/patents/' },
        { label: 'Societal & Commercial Products', href: 'https://ciirc.res.in/products/' },
        { label: 'Polar Expeditions (Arctic & Antarctic)', href: '#milestones' }
      ]
    }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-deep)',
        color: 'var(--text-primary)',
        paddingTop: '64px',
        paddingBottom: '32px',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div
        ref={footerReveal.ref}
        className={`container motion-reveal ${footerReveal.isRevealed ? 'is-revealed' : ''}`}
      >
        {/* Main Columns Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Column 1: CIIRC Identity & Accreditation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  padding: '3px 6px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <img
                  src="https://ciirc.res.in/wp-content/uploads/2022/02/designAsset-3.png"
                  alt="CIIRC Logo"
                  style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                CIIRC<sup style={{ color: 'var(--primary-bright)', fontWeight: 700 }}>®</sup>
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {CIIRC_IDENTITY.recognition}.
            </p>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Joint Initiative by <strong style={{ color: 'var(--text-secondary)' }}>Sri Sringeri Sharada Peetham</strong>, Sringeri, and <strong style={{ color: 'var(--text-secondary)' }}>Jyothy Institute of Technology</strong>.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{CIIRC_IDENTITY.campusAddress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                <Mail size={14} color="var(--primary)" />
                <a href={`mailto:${CIIRC_IDENTITY.email}`} style={{ color: 'inherit' }}>
                  {CIIRC_IDENTITY.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                <Phone size={14} color="var(--primary)" />
                <a href={`tel:${CIIRC_IDENTITY.phone.replace(/[^0-9]/g, '')}`} style={{ color: 'inherit' }}>
                  {CIIRC_IDENTITY.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <ChevronRight size={11} color="var(--primary)" /> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator and Bottom Legal Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {currentYear} CIIRC® — Centre for Incubation, Innovation, Research and Consultancy. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)' }}>DSIR Certified SIRO Centre</span>
            <span style={{ color: 'var(--border)' }}>•</span>
            <a href="https://www.jyothyit.ac.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              Jyothy Institute of Technology
            </a>
            <span style={{ color: 'var(--border)' }}>•</span>
            <a href="https://ciirc.res.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              Legacy Institutional Archive
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
