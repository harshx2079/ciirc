'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export const InfrastructureSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Compute progress through section (-1 to 1)
        const progress =
          (viewportHeight / 2 - (rect.top + rect.height / 2)) / (viewportHeight / 2);
        setOffsetY(Math.max(-1, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Parallax bounded strictly to respective containers
  const imageParallax = offsetY * -80; // translateY(80px → -80px)
  const textParallax = offsetY * 30;   // translateY(40px → -20px)

  return (
    <section
      ref={sectionRef}
      id="infrastructure"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper-warm)',
        padding: '160px 0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)'
      }}
    >
      <div className="atlas-container">
        {/* 12-Column Layout: Columns 1–5 Text, Columns 6–12 Image */}
        <div
          className="infra-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: '24px',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Columns 1–5: Text Block (Strictly contained, no collision) */}
          <div
            className="infra-text-col"
            style={{
              gridColumn: '1 / 6',
              maxWidth: '500px',
              transform: `translate3d(0, ${textParallax}px, 0)`,
              transition: 'transform 0.1s ease-out',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 2
            }}
          >
            <span
              className="mono-meta"
              style={{ color: 'var(--teal)', marginBottom: '16px' }}
            >
              SECTION 04 // PHYSICAL ARCHITECTURE
            </span>

            {/* 50,000+ Scaled to fit column 1-5 without colliding with image */}
            <div
              className="infra-number"
              style={{
                fontWeight: 800,
                lineHeight: 0.82,
                letterSpacing: '-0.075em',
                color: 'var(--forest)',
                textTransform: 'uppercase',
                margin: '0 0 16px 0'
              }}
            >
              50,000+
            </div>

            {/* Secondary Heading: Multi-line block */}
            <h2
              className="infra-heading"
              style={{
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.055em',
                color: 'var(--forest)',
                textTransform: 'uppercase',
                margin: '0 0 24px 0',
                maxWidth: '500px'
              }}
            >
              SQ. FT.
              <br />
              OF RESEARCH
              <br />
              INFRASTRUCTURE.
            </h2>

            {/* Description Paragraph (max-width 420px, entirely within left column) */}
            <p
              className="infra-description"
              style={{
                maxWidth: '420px',
                fontSize: '15.5px',
                lineHeight: 1.55,
                color: 'var(--forest-soft)',
                margin: 0
              }}
            >
              A dedicated campus ecosystem housing advanced micro-analytical instrumentation,
              wet chemistry bays, microfluidic prototyping, cleanrooms, and incubation suites.
            </p>
          </div>

          {/* Columns 6–12: Laboratory Image (Begins around 42% of viewport width) */}
          <div
            className="infra-image-col"
            style={{
              gridColumn: '6 / 13',
              position: 'relative',
              height: '560px',
              zIndex: 1,
              transform: `translate3d(0, ${imageParallax}px, 0)`,
              transition: 'transform 0.1s ease-out',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                clipPath: inView ? 'inset(0)' : 'inset(0 0 12% 0)',
                transform: inView ? 'scale(1)' : 'scale(1.06)',
                transition:
                  'clip-path 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <Image
                src="/images/facilities/ciirc-lab-main.jpg"
                alt="CIIRC Advanced Laboratory Infrastructure"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                style={{
                  objectFit: 'cover',
                  filter: 'contrast(1.06) saturate(0.92)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid var(--line-strong)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Desktop Typography Specs >= 1440px */
        @media (min-width: 1440px) {
          .infra-number {
            font-size: 178px;
          }
          .infra-heading {
            font-size: 58px;
          }
        }

        /* Responsive at 1280px */
        @media (min-width: 1025px) and (max-width: 1439px) {
          .infra-number {
            font-size: 156px;
          }
          .infra-heading {
            font-size: 52px;
          }
        }

        /* Responsive at 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .infra-number {
            font-size: 125px;
          }
          .infra-heading {
            font-size: 44px;
          }
          .infra-image-col {
            height: 480px !important;
          }
        }

        /* Mobile Layout <= 768px */
        @media (max-width: 768px) {
          .infra-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .infra-text-col {
            grid-column: 1 / -1 !important;
            max-width: 100% !important;
            transform: none !important;
          }
          .infra-image-col {
            grid-column: 1 / -1 !important;
            height: 380px !important;
            transform: none !important;
          }
          .infra-number {
            font-size: 88px !important;
          }
          .infra-heading {
            font-size: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};
