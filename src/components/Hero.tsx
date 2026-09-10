'use client';

import React, { useEffect, useState } from 'react';
import { ResearchField } from './ResearchField';
import { HeroAmbientDrift } from './HeroAmbientDrift';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll exit transformations
  const progress = Math.min(1, Math.max(0, scrollY / 700));
  const headlineY = progress * -80;
  const headlineOpacity = 1 - progress * 0.85;
  const fieldScale = 1 - progress * 0.15;
  const fieldX = progress * 80;
  const fieldOpacity = 1 - progress * 0.75;

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--paper)',
        overflow: 'hidden',
        paddingTop: '96px',
        paddingBottom: '48px'
      }}
    >
      {/* Dynamic Drifting Background Ambient Gradient */}
      <HeroAmbientDrift />

      {/* Subtle Coordinate Grid Lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.28,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 12-Column Grid Container */}
      <div
        className="atlas-container hero-grid-container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: '20px',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {/* Columns 1–7: Hero Copy (explicit width min(100%, 700px)) */}
        <div
          className="hero-copy"
          style={{
            gridColumn: '1 / 8',
            width: 'min(100%, 700px)',
            transform: `translate3d(0, ${headlineY}px, 0)`,
            opacity: headlineOpacity,
            transition: 'opacity 0.1s ease-out',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'visible'
          }}
        >
          {/* Eyebrow Label (top approx 255px at 1440x900) */}
          <div
            className="mono-meta hero-eyebrow"
            style={{
              marginBottom: '28px',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--teal)',
                display: 'inline-block'
              }}
            />
            <span>CIIRC / RESEARCH IN MOTION / 01</span>
          </div>

          {/* Headline (overflow: visible, each line has dedicated inner mask) */}
          <h1
            className="hero-headline"
            style={{
              overflow: 'visible',
              margin: '0 0 32px 0',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              fontWeight: 700,
              letterSpacing: '-0.065em',
              textTransform: 'uppercase'
            }}
          >
            {/* Line 1: WHERE */}
            <div
              className="hero-line-mask"
              style={{
                overflow: 'hidden',
                lineHeight: 1.0,
                marginBottom: '8px'
              }}
            >
              <div
                className="hero-line hero-line-small"
                style={{
                  color: 'var(--forest-soft)',
                  transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
                }}
              >
                WHERE
              </div>
            </div>

            {/* Line 2: RESEARCH */}
            <div
              className="hero-line-mask"
              style={{
                overflow: 'hidden',
                lineHeight: 0.82,
                marginBottom: '2px'
              }}
            >
              <div
                className="hero-line hero-line-primary"
                style={{
                  color: 'var(--forest)',
                  transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 200ms'
                }}
              >
                RESEARCH
              </div>
            </div>

            {/* Line 3: BECOMES */}
            <div
              className="hero-line-mask"
              style={{
                overflow: 'hidden',
                lineHeight: 0.88,
                marginBottom: '2px'
              }}
            >
              <div
                className="hero-line hero-line-secondary"
                style={{
                  color: 'var(--forest-soft)',
                  transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 300ms'
                }}
              >
                BECOMES
              </div>
            </div>

            {/* Line 4: IMPACT. */}
            <div
              className="hero-line-mask"
              style={{
                overflow: 'hidden',
                lineHeight: 0.82
              }}
            >
              <div
                className="hero-line hero-line-primary hero-line-impact"
                style={{
                  color: 'var(--teal)',
                  transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                  transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 400ms'
                }}
              >
                IMPACT.
              </div>
            </div>
          </h1>

          {/* Support Copy Paragraph */}
          <p
            className="hero-paragraph"
            style={{
              maxWidth: '480px',
              fontSize: '17px',
              lineHeight: 1.55,
              color: 'var(--forest-soft)',
              marginBottom: '30px'
            }}
          >
            A multidisciplinary research, innovation and incubation centre bringing science,
            engineering, business and entrepreneurship together for societal impact.
          </p>

          {/* CTAs */}
          <div
            className="hero-cta-group"
            style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}
          >
            <a href="#research" className="btn-forest-solid">
              <span>Explore Research</span>
              <span className="btn-arrow">→</span>
            </a>

            <a href="#about" className="btn-text-secondary">
              Discover CIIRC
            </a>
          </div>
        </div>

        {/* Columns 8–12: Hero Visual (560–600px width/height, separation preserved) */}
        <div
          className="hero-visual-col"
          style={{
            gridColumn: '8 / 13',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate3d(${fieldX}px, 0, 0) scale(${fieldScale})`,
            opacity: fieldOpacity,
            transition: 'opacity 0.1s ease-out',
            clipPath: mounted ? 'inset(0)' : 'inset(0 0 100% 0)',
            transitionProperty: 'clip-path',
            transitionDuration: '1200ms',
            transitionDelay: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            minWidth: 0
          }}
        >
          <div
            className="hero-visual-wrapper"
            style={{
              width: '100%',
              maxWidth: '580px',
              aspectRatio: '1 / 1'
            }}
          >
            <ResearchField />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* White-space nowrap on all individual lines */
        .hero-line {
          white-space: nowrap;
          will-change: transform;
        }

        /* Desktop Typography Specs >= 1440px */
        @media (min-width: 1440px) {
          .hero-line-small {
            font-size: 32px;
          }
          .hero-line-primary {
            font-size: 108px;
          }
          .hero-line-secondary {
            font-size: 78px;
          }
        }

        /* Responsive Type at 1280px */
        @media (min-width: 1025px) and (max-width: 1439px) {
          .hero-line-small {
            font-size: 30px;
          }
          .hero-line-primary {
            font-size: 94px;
          }
          .hero-line-secondary {
            font-size: 70px;
          }
        }

        /* Responsive Type at 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-grid-container {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          .hero-copy {
            grid-column: 1 / 8 !important;
          }
          .hero-visual-col {
            grid-column: 8 / 13 !important;
          }
          .hero-line-small {
            font-size: 26px;
          }
          .hero-line-primary {
            font-size: 76px;
          }
          .hero-line-secondary {
            font-size: 58px;
          }
        }

        /* Mobile Recomposition <= 768px */
        @media (max-width: 768px) {
          .hero-grid-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-copy {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }
          .hero-visual-col {
            grid-column: 1 / -1 !important;
            justify-content: center !important;
          }
          .hero-visual-wrapper {
            max-width: 380px !important;
          }
          .hero-line-small {
            font-size: 24px;
          }
          .hero-line-primary {
            font-size: 56px;
          }
          .hero-line-secondary {
            font-size: 42px;
          }
        }
      `}</style>
    </section>
  );
};
