'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Mail, Phone, ShieldCheck } from 'lucide-react';
import { CIIRC_IDENTITY } from '../data/ciircData';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Facilities', href: '#instrumentation' },
    { label: 'Scale', href: '#impact' },
    { label: 'Expeditions', href: '#milestones' },
    { label: 'Leadership', href: '#director' },
    { label: 'Collaborations', href: '#collaborations' },
    { label: 'Opportunities', href: '#opportunities' }
  ];

  return (
    <>
      {/* 2px Scientific Reading / Scroll Progress Bar */}
      <div
        className="scroll-progress-line"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Top Institutional Credential Strip */}
      <div
        style={{
          backgroundColor: 'var(--bg-deep)',
          color: 'var(--text-muted)',
          fontSize: 'var(--text-xs)',
          borderBottom: '1px solid var(--border)',
          padding: '6px 0',
          position: 'relative',
          zIndex: 60
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.04em' }}>
              DSIR-SIRO RECOGNIZED
            </span>
            <span style={{ color: 'var(--border)' }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Sri Sringeri Sharada Peetham &amp; Jyothy Institute of Technology
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href={`mailto:${CIIRC_IDENTITY.email}`}
              style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: 'inherit', transition: 'color var(--motion-fast) var(--ease-standard)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Mail size={12} color="var(--primary)" /> {CIIRC_IDENTITY.email}
            </a>
            <span style={{ color: 'var(--border)' }}>•</span>
            <a
              href={`tel:${CIIRC_IDENTITY.phone.replace(/[^0-9]/g, '')}`}
              style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: 'inherit', transition: 'color var(--motion-fast) var(--ease-standard)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Phone size={12} color="var(--primary)" /> {CIIRC_IDENTITY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: isScrolled ? 'rgba(5, 13, 24, 0.95)' : 'rgba(3, 10, 19, 0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: isScrolled ? '1px solid rgba(59, 140, 255, 0.2)' : '1px solid var(--border)',
          transition: 'background-color var(--motion-normal) var(--ease-standard), border-color var(--motion-normal) var(--ease-standard), height var(--motion-normal) var(--ease-standard)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '64px' : '72px',
            transition: 'height var(--motion-normal) var(--ease-standard)'
          }}
        >
          {/* Institutional Identity Brand */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <img
                src="https://ciirc.res.in/wp-content/uploads/2022/02/designAsset-3.png"
                alt="CIIRC® Logo"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                CIIRC<sup style={{ fontSize: '0.65em', color: 'var(--primary-bright)', fontWeight: 700 }}>®</sup>
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  lineHeight: 1.2
                }}
              >
                Centre for Incubation, Innovation, Research &amp; Consultancy
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Subdued Indicator Underlines */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '22px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-anchor"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color var(--motion-fast) var(--ease-standard)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions Desk */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#research"
              className="btn btn-primary btn-tactile group-arrow"
              style={{ padding: '9px 18px', fontSize: 'var(--text-xs)', display: 'none' }}
              id="header-cta-desktop"
            >
              Explore Research <ChevronRight size={14} className="arrow-icon" />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="#research"
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%' }}
              >
                Explore Research Vistas →
              </a>
              <a
                href="#opportunities"
                className="btn btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%' }}
              >
                Research Fellowship Openings
              </a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          #header-cta-desktop {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
