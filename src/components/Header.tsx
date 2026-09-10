'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onNavClick?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'People', href: '#people' },
    { label: 'Funding', href: '#funding' },
    { label: 'Impact', href: '#impact' },
    { label: 'Achievements', href: '#achievements' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        zIndex: 1000,
        backgroundColor: 'rgba(247, 248, 243, 0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(16, 37, 31, 0.10)',
        transition: 'border-color 0.3s ease, background-color 0.3s ease'
      }}
    >
      <div
        className="atlas-container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left: Authentic CIIRC Navbar Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '142px',
              height: '46px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image
              src="/images/ciirc-logo.png"
              alt="CIIRC® - Centre for Incubation, Innovation, Research and Consultancy"
              width={142}
              height={46}
              style={{
                objectFit: 'contain',
                height: 'auto',
                maxHeight: '46px',
                width: 'auto'
              }}
              priority
            />
          </div>
        </a>

        {/* Center / Right Nav Items (Desktop) */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="nav-link-cobalt"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#research"
            onClick={(e) => handleLinkClick(e, '#research')}
            className="btn-forest-outline desktop-cta"
          >
            <span>Explore CIIRC</span>
            <span className="btn-arrow">→</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--forest)',
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
              }}
            />
            <span
              style={{
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--forest)',
                transition: 'opacity 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1
              }}
            />
            <span
              style={{
                width: '22px',
                height: '1.5px',
                backgroundColor: 'var(--forest)',
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
              }}
            />
          </button>
        </div>
      </div>

      {/* Full-Viewport Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'calc(100vh - 72px)',
          backgroundColor: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 24px',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 999,
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span className="mono-meta" style={{ color: 'var(--teal)' }}>
            NAVIGATION DIRECTORY
          </span>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontSize: '36px',
                fontWeight: 650,
                letterSpacing: '-0.04em',
                color: 'var(--forest)',
                textDecoration: 'none'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span className="mono-meta">
            CIIRC® BENGALURU — DSIR–SIRO
          </span>
          <a
            href="#research"
            onClick={(e) => handleLinkClick(e, '#research')}
            className="btn-forest-solid"
            style={{ textAlign: 'center', justifyContent: 'center' }}
          >
            Explore Research Matrix →
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav,
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
