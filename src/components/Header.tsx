'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'ecosystem', label: 'Ecosystem', href: '#ecosystem' },
  { id: 'atlas', label: 'Research Atlas', href: '#atlas' },
  { id: 'facilities', label: 'Facilities', href: '#facilities' },
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'timeline', label: 'Timeline', href: '#timeline' },
  { id: 'network', label: 'Collaborations', href: '#network' },
  { id: 'people', label: 'Leadership', href: '#people' }
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '78px',
        backgroundColor: 'rgba(243, 240, 232, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1520px',
          margin: '0 auto',
          padding: '0 clamp(16px, 3vw, 42px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        {/* Left: Authentic CIIRC Logo from ciirc.res.in + Typography */}
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
          {/* Official CIIRC Logo Image */}
          {!logoError && (
            <img
              src="https://ciirc.res.in/wp-content/uploads/2022/02/designAsset-3.png"
              alt="CIIRC Logo"
              onError={() => setLogoError(true)}
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.15
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'var(--ink)'
                }}
              >
                CIIRC<sup style={{ fontSize: '0.6em', color: 'var(--ultramarine)' }}>®</sup>
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.1em',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase'
                }}
              >
                DSIR-SIRO
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                color: 'var(--ink-soft)',
                letterSpacing: '-0.01em',
                maxWidth: '220px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              className="header-sublabel"
            >
              Centre for Incubation, Innovation, Research & Consultancy
            </span>
          </div>
        </a>

        {/* Right-Side Cluster: Navigation + CTA (Do NOT center nav) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 1.8vw, 24px)',
            flexShrink: 0
          }}
        >
          {/* Desktop Navigation Cluster */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'clamp(10px, 1.4vw, 20px)'
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.71875rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-soft)',
                  whiteSpace: 'nowrap',
                  transition: 'color 180ms ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ultramarine)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-soft)')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA: Small rectangular button */}
          <a
            href="#opportunities"
            className="btn-rect-dark"
            style={{
              padding: '7px 14px',
              fontSize: '0.6875rem',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Engage Lab</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '6px',
              color: 'var(--ink)'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1080px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 1079px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .header-sublabel {
            display: none !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '78px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--paper)',
            borderBottom: '1px solid var(--line)',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 99
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                padding: '8px 0',
                borderBottom: '1px solid var(--line)'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
