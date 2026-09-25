'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const DirectorSection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.22 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="director"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--background)',
        paddingTop: '180px',
        paddingBottom: '180px',
        overflow: 'hidden'
      }}
    >
      {/* Narrative Drawing Divider Line (Section 23 & 36) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--border)',
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />

      <div className="atlas-container">
        {/* Section Header */}
        <div style={{ marginBottom: '72px' }}>
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <div className="eyebrow-capsule" style={{ marginBottom: '22px' }}>
              <span className="eyebrow-pulse-dot" />
              <span>08 // LEADERSHIP &amp; PHILOSOPHY</span>
            </div>
          </div>

          <h2
            style={{
              fontSize: 'clamp(38px, 4.4vw, 68px)',
              lineHeight: 1.02,
              letterSpacing: '-0.045em',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 850ms cubic-bezier(0.22, 1, 0.36, 1) 120ms'
            }}
          >
            The Director&apos;s Message
          </h2>
        </div>

        {/* Large Editorial Composition (Section 18: Slow cinematic pacing) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '44% 56%',
            gap: '68px',
            alignItems: 'center'
          }}
          className="director-editorial-grid"
        >
          {/* Left Column: Official Portrait with Slow Architectural Clip Reveal */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 24px 56px rgba(20, 33, 61, 0.08)',
              clipPath: inView ? 'inset(0)' : 'inset(8% 0 8% 0)',
              transform: inView ? 'scale(1) translateY(0)' : 'scale(1.04) translateY(24px)',
              opacity: inView ? 1 : 0,
              transition: 'clip-path 1300ms cubic-bezier(0.22, 1, 0.36, 1), transform 1300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1100ms ease'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '560px'
              }}
            >
              <Image
                src="/images/director-krishna-venkatesh.jpg"
                alt="Dr. Krishna Venkatesh, Founder-Director of CIIRC"
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
                priority
              />
            </div>

            {/* Micro Caption Bar */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {CIIRC_IDENTITY.director.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {CIIRC_IDENTITY.director.role}
                </div>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(22, 119, 255, 0.08)'
                }}
              >
                IISc Alumnus
              </div>
            </div>
          </div>

          {/* Right Column: Statement, Philosophy, Institutional Direction (Delayed line reveal) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <blockquote
              style={{
                fontSize: 'clamp(24px, 2.6vw, 36px)',
                fontWeight: 650,
                lineHeight: 1.28,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                margin: 0,
                position: 'relative',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 950ms cubic-bezier(0.22, 1, 0.36, 1) 320ms, transform 950ms cubic-bezier(0.22, 1, 0.36, 1) 320ms'
              }}
            >
              <span
                style={{
                  color: 'var(--blue)',
                  fontFamily: 'serif',
                  fontSize: '1.4em',
                  lineHeight: 0,
                  verticalAlign: '-0.25em',
                  marginRight: '6px'
                }}
              >
                “
              </span>
              {CIIRC_IDENTITY.director.quote}
              <span
                style={{
                  color: 'var(--blue)',
                  fontFamily: 'serif',
                  fontSize: '1.4em',
                  lineHeight: 0,
                  verticalAlign: '-0.25em',
                  marginLeft: '4px'
                }}
              >
                ”
              </span>
            </blockquote>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: 0,
                maxWidth: '580px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 950ms cubic-bezier(0.22, 1, 0.36, 1) 480ms, transform 950ms cubic-bezier(0.22, 1, 0.36, 1) 480ms'
              }}
            >
              Founded as a joint initiative between Sri Sringeri Sharada Peetham and Jyothy Institute of Technology,
              CIIRC was conceived from inception not merely as an academic pursuit, but as a living ecosystem where
              fundamental laboratory discoveries rapidly cross into translational products, patents, and societal solutions.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 950ms cubic-bezier(0.22, 1, 0.36, 1) 620ms, transform 950ms cubic-bezier(0.22, 1, 0.36, 1) 620ms'
              }}
              className="director-pillars-grid"
            >
              <div
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  PURPOSE
                </div>
                <div style={{ fontSize: '14px', fontWeight: 650, color: 'var(--text-primary)' }}>
                  Translational Impact
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  From bench to clinical &amp; industry deployment.
                </div>
              </div>

              <div
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  ECOSYSTEM
                </div>
                <div style={{ fontSize: '14px', fontWeight: 650, color: 'var(--text-primary)' }}>
                  Interdisciplinary
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  17 convergent domains under one roof.
                </div>
              </div>

              <div
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  RECOGNITION
                </div>
                <div style={{ fontSize: '14px', fontWeight: 650, color: 'var(--text-primary)' }}>
                  DSIR–SIRO
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Autonomous scientific research center.
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: '8px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 950ms cubic-bezier(0.22, 1, 0.36, 1) 750ms, transform 950ms cubic-bezier(0.22, 1, 0.36, 1) 750ms'
              }}
            >
              <a
                href="https://ciirc.res.in/directors-profile/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-ciirc"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Read Full Director Profile</span>
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .director-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .director-pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
