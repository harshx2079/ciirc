'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react';
import { CIIRC_IDENTITY } from '../data/ciircData';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface NavSubItem {
  title: string;
  desc: string;
  href: string;
}

interface NavSection {
  id: string;
  label: string;
  primaryHref: string;
  items: NavSubItem[];
}

const PRIMARY_NAVIGATION: NavSection[] = [
  {
    id: 'about',
    label: 'About',
    primaryHref: '#about',
    items: [
      {
        title: 'Institutional Overview',
        desc: 'Charter, DSIR-SIRO recognition, vision & institutional framework',
        href: '#about'
      },
      {
        title: 'Leadership & Governance',
        desc: "Director's message, advisory council & scientific administration",
        href: '#director'
      },
      {
        title: 'Milestones & Heritage',
        desc: 'Key institutional foundation milestones & polar expeditions',
        href: '#milestones'
      }
    ]
  },
  {
    id: 'research',
    label: 'Research',
    primaryHref: '#research',
    items: [
      {
        title: 'Research Vistas',
        desc: '14 multidisciplinary domains across materials, bio, and sensors',
        href: '#research'
      },
      {
        title: 'Sponsored Projects',
        desc: '50+ funded projects by DST, DRDO, ISRO, DBT & CEFIPRA',
        href: '#impact'
      },
      {
        title: 'Fellowships & Openings',
        desc: 'Active research fellow positions, PhD grants & recruitment',
        href: '#opportunities'
      }
    ]
  },
  {
    id: 'facilities',
    label: 'Facilities',
    primaryHref: '#instrumentation',
    items: [
      {
        title: 'Instrumentation Facility (SIF)',
        desc: 'SEM, XRD, GC-MS, FTIR & thermal characterization suite',
        href: '#instrumentation'
      },
      {
        title: 'Specialized Laboratories',
        desc: 'Advanced nanomaterials, water, drone testing & life sciences',
        href: '#instrumentation'
      },
      {
        title: 'Industry Testing Access',
        desc: 'Analytical characterization services & external consultancy',
        href: '#instrumentation'
      }
    ]
  },
  {
    id: 'impact',
    label: 'Impact',
    primaryHref: '#impact',
    items: [
      {
        title: 'Institutional Metrics',
        desc: '50+ projects, 300+ indexed papers & 35+ societal products',
        href: '#impact'
      },
      {
        title: 'Polar & Space Expeditions',
        desc: 'Antarctic scientific expeditions & satellite payload flights',
        href: '#milestones'
      },
      {
        title: 'Societal Deployments',
        desc: 'Water purification, biomedical diagnostics & green technologies',
        href: '#impact'
      }
    ]
  },
  {
    id: 'collaborations',
    label: 'Collaborations',
    primaryHref: '#collaborations',
    items: [
      {
        title: 'Strategic Alliances',
        desc: 'DST, DRDO, ISRO, DBT & Indo-French CEFIPRA council',
        href: '#collaborations'
      },
      {
        title: 'International Academia',
        desc: 'Lebedev Russia, Tunghai Taiwan & TÜV Rheinland Germany',
        href: '#collaborations'
      },
      {
        title: 'Conferred Fellowships',
        desc: 'Commonwealth, BRICS, Raman Charpak & CSIR awards',
        href: '#collaborations'
      }
    ]
  }
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const scrollProgress = useScrollProgress();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Escape key closes open dropdown or mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const toggleMobileSection = (id: string) => {
    setMobileExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* 2px Scientific Reading / Scroll Progress Bar */}
      <div
        className="scroll-progress-line"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Institutional Utility Strip (Subordinate, Quiet, Informative) */}
      <div
        style={{
          backgroundColor: 'var(--bg-deep)',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          borderBottom: '1px solid rgba(20, 40, 61, 0.55)',
          padding: '5px 0',
          position: 'relative',
          zIndex: 60
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                fontSize: '0.67rem'
              }}
            >
              DSIR-SIRO RECOGNIZED
            </span>
            <span style={{ color: 'rgba(111, 135, 157, 0.35)' }}>•</span>
            <span style={{ color: 'var(--text-muted)', letterSpacing: '0.01em' }}>
              Sri Sringeri Sharada Peetham &amp; Jyothy Institute of Technology
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href={`mailto:${CIIRC_IDENTITY.email}`}
              style={{
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'inherit',
                textDecoration: 'none',
                transition: 'color var(--motion-fast) var(--ease-standard)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Mail size={11} color="var(--primary)" /> {CIIRC_IDENTITY.email}
            </a>
            <span style={{ color: 'rgba(111, 135, 157, 0.35)' }}>•</span>
            <a
              href={`tel:${CIIRC_IDENTITY.phone.replace(/[^0-9]/g, '')}`}
              style={{
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'inherit',
                textDecoration: 'none',
                transition: 'color var(--motion-fast) var(--ease-standard)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Phone size={11} color="var(--primary)" /> {CIIRC_IDENTITY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        ref={navContainerRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: isScrolled ? 'rgba(5, 13, 24, 0.94)' : 'rgba(3, 10, 19, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid rgba(20, 40, 61, 0.35)',
          transition:
            'background-color var(--motion-normal) var(--ease-standard), border-color var(--motion-normal) var(--ease-standard), height var(--motion-normal) var(--ease-standard)'
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
          {/* Institutional Identity Brand Area */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
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
                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                CIIRC
                <sup
                  style={{
                    fontSize: '0.62em',
                    color: 'var(--primary-bright)',
                    fontWeight: 700,
                    marginLeft: '1px'
                  }}
                >
                  ®
                </sup>
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  lineHeight: 1.2
                }}
              >
                Centre for Incubation, Innovation, Research &amp; Consultancy
              </span>
            </div>
          </a>

          {/* Desktop Navigation: 5 High-Hierarchy Categories with Architectural Dropdowns */}
          <nav
            style={{ display: 'none', alignItems: 'center', gap: '26px' }}
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            {PRIMARY_NAVIGATION.map((section) => {
              const isOpen = activeDropdown === section.id;

              return (
                <div
                  key={section.id}
                  className="nav-item-wrapper"
                  onMouseEnter={() => handleMouseEnter(section.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className="nav-trigger-btn"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`dropdown-${section.id}`}
                    onClick={() => handleDropdownToggle(section.id)}
                  >
                    <span>{section.label}</span>
                    <ChevronDown size={13} className="nav-chevron" />
                  </button>

                  {/* Dropdown Menu Panel */}
                  <div
                    id={`dropdown-${section.id}`}
                    className={`nav-dropdown-menu ${isOpen ? 'is-open' : ''}`}
                    role="menu"
                    aria-label={`${section.label} submenu`}
                  >
                    {section.items.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="nav-dropdown-item"
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="nav-dropdown-item-title">
                          {item.title}
                          <ChevronRight size={13} style={{ opacity: 0.6 }} />
                        </span>
                        <span className="nav-dropdown-item-desc">{item.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Action Zone: Canonical Antique-Gold Primary CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <a
              href="#research"
              className="header-cta-primary group-arrow"
              id="header-cta-desktop"
              style={{ display: 'none' }}
            >
              <span>Explore Research</span>
              <ChevronRight size={14} className="arrow-icon" />
            </a>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Grouped Hierarchical Structure */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PRIMARY_NAVIGATION.map((section) => {
                const isExpanded = mobileExpandedSection === section.id;

                return (
                  <div
                    key={section.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '8px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(section.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 4px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span>{section.label}</span>
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform var(--motion-fast) var(--ease-standard)',
                          color: 'var(--text-muted)'
                        }}
                      />
                    </button>

                    {isExpanded && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          padding: '6px 0 10px 12px',
                          borderLeft: '2px solid var(--primary-subtle)'
                        }}
                      >
                        {section.items.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                              textDecoration: 'none',
                              padding: '6px 0'
                            }}
                          >
                            <div
                              style={{
                                color: 'var(--primary-bright)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 600
                              }}
                            >
                              {item.title}
                            </div>
                            <div
                              style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.75rem',
                                marginTop: '2px'
                              }}
                            >
                              {item.desc}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions: Primary CTA in Restrained Antique Gold */}
            <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="#research"
                className="header-cta-primary group-arrow"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '12px 18px',
                  fontSize: 'var(--text-sm)'
                }}
              >
                <span>Explore Research Vistas</span>
                <ChevronRight size={15} className="arrow-icon" />
              </a>
              <a
                href="#opportunities"
                className="btn btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%', justifyContent: 'center', fontSize: 'var(--text-sm)' }}
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
