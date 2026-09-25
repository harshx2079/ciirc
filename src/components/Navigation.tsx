'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 70);

      // Section 20: Direction-aware navigation retreat/return
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY.current + 8) {
          // Scrolling down
          setNavVisible(false);
        } else if (currentScrollY < lastScrollY.current - 12) {
          // Scrolling up
          setNavVisible(true);
        }
      } else {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Active section detection
      const sections = ['about', 'idea', 'research', 'scale', 'facilities', 'director', 'collaborations', 'news', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Convergence', href: '#idea', id: 'idea' },
    { label: 'Research', href: '#research', id: 'research' },
    { label: 'Timeline', href: '#facilities', id: 'facilities' },
    { label: 'Director', href: '#director', id: 'director' },
    { label: 'Collaborations', href: '#collaborations', id: 'collaborations' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linkItemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0
  });

  useEffect(() => {
    const activeEl = linkItemRefs.current[activeSection];
    const container = linksContainerRef.current;
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        opacity: 1
      });
    }
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: scrolled ? '14px' : '22px',
          left: '50%',
          width: 'min(calc(100% - clamp(20px, 4vw, 64px)), 1480px)',
          height: scrolled ? '64px' : '74px',
          borderRadius: scrolled ? '20px' : '22px',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: scrolled ? '1px solid rgba(20, 40, 80, 0.11)' : '1px solid rgba(20, 40, 80, 0.09)',
          boxShadow: scrolled
            ? '0 12px 36px rgba(20, 40, 80, 0.08)'
            : '0 8px 30px rgba(20, 40, 80, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 2.5vw, 30px)',
          zIndex: 900,
          transform: navVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-110px)',
          transition:
            'transform 380ms cubic-bezier(0.22, 1, 0.36, 1), height 360ms cubic-bezier(0.22, 1, 0.36, 1), top 360ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms ease, box-shadow 300ms ease, border-color 300ms ease, border-radius 360ms ease, width 300ms ease'
        }}
        className="ciirc-floating-nav"
      >
        {/* Left: Authentic CIIRC Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="CIIRC Home"
        >
          <div
            style={{
              position: 'relative',
              width: scrolled ? '128px' : '138px',
              height: scrolled ? '36px' : '40px',
              transition: 'all 360ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <Image
              src="/images/ciirc-logo.png"
              alt="CIIRC® - Centre for Incubation, Innovation, Research and Consultancy"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </a>

        {/* Center: Navigation Links with Physical Traveling Indicator */}
        <div
          ref={linksContainerRef}
          className="desktop-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(14px, 1.8vw, 28px)',
            position: 'relative',
            paddingBottom: '2px'
          }}
        >
          {/* Physical traveling indicator bar */}
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
              backgroundColor: 'var(--blue)',
              borderRadius: '2px',
              opacity: indicatorStyle.opacity,
              transition:
                'transform 360ms cubic-bezier(0.22, 1, 0.36, 1), width 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease',
              pointerEvents: 'none'
            }}
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                ref={(el) => {
                  linkItemRefs.current[item.id] = el;
                }}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`nav-link-ciirc ${isActive ? 'active' : ''}`}
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: isActive ? 'var(--blue)' : 'var(--text-primary)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 200ms ease'
                }}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#research"
            onClick={(e) => handleNavClick(e, '#research')}
            className="btn-primary-ciirc desktop-cta"
            style={{
              height: scrolled ? '44px' : '48px',
              padding: '0 22px',
              fontSize: '13.5px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              borderRadius: '12px'
            }}
          >
            <span>Explore Research</span>
            <span
              className="cta-arrow"
              style={{ transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              →
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-toggle"
            style={{
              display: 'none',
              width: '44px',
              height: '44px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px'
            }}
          >
            <span
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 300ms ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                transformOrigin: 'center'
              }}
            />
            <span
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                transition: 'opacity 250ms ease',
                opacity: mobileMenuOpen ? 0 : 1
              }}
            />
            <span
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 300ms ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                transformOrigin: 'center'
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel (Sleek floating architectural card rather than full-screen takeover) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(20, 40, 80, 0.10)',
            borderRadius: '20px',
            boxShadow: '0 20px 48px rgba(20, 40, 80, 0.12)',
            zIndex: 899,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            padding: '24px 20px',
            animation: 'mobileMenuFadeIn 220ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: isActive ? 'var(--blue)' : 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'rgba(22, 119, 255, 0.06)' : 'transparent',
                  transition: 'background-color 180ms ease, color 180ms ease'
                }}
              >
                {item.label}
              </a>
            );
          })}
          <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(20, 40, 80, 0.06)' }}>
            <a
              href="#research"
              onClick={(e) => handleNavClick(e, '#research')}
              className="btn-primary-ciirc"
              style={{
                width: '100%',
                height: '48px',
                fontSize: '14px',
                borderRadius: '12px'
              }}
            >
              <span>Explore Research</span>
              <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes mobileMenuFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 1080px) {
          .ciirc-floating-nav {
            height: 64px !important;
            padding: 0 20px !important;
          }
          .desktop-links,
          .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }

        @media (max-width: 640px) {
          .ciirc-floating-nav {
            top: 10px !important;
            height: 58px !important;
            border-radius: 16px !important;
            padding: 0 14px !important;
          }
        }

        .nav-link-ciirc:hover .nav-link-line {
          transform: scaleX(1) !important;
        }
      `}</style>
    </>
  );
};
