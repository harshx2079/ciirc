'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AUTHENTIC_INSTRUMENTS, InstrumentItem } from '../data/ciircData';

export const InstrumentationFacility: React.FC = () => {
  const [activeInst, setActiveInst] = useState<InstrumentItem>(AUTHENTIC_INSTRUMENTS[0]);
  const [isFacilityVisible, setIsFacilityVisible] = useState(false);
  const facilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFacilityVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    if (facilityRef.current) {
      observer.observe(facilityRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* =========================================================================
          03 / FACILITIES (Sections 49–52, 88: Background #E8EDF1 Cool blue-gray)
          ========================================================================= */}
      <section
        id="facilities"
        aria-label="03 / FACILITIES"
        style={{
          backgroundColor: '#E8EDF1', // Section 49 & 88: Cool blue-gray
          padding: '170px 0',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden'
        }}
      >
        <div className="ciirc-container" style={{ marginBottom: '50px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 650,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#557C70', // Mineral #557C70
              display: 'inline-block',
              marginBottom: '16px'
            }}
          >
            03 / FACILITIES
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(38px, 4.4vw, 68px)',
              lineHeight: 0.96,
              letterSpacing: '-0.055em',
              fontWeight: 600,
              color: '#18242D',
              margin: 0
            }}
          >
            50,000+ SQ. FT. OF RESEARCH INFRASTRUCTURE.
          </h2>
        </div>

        {/* Section 50 & 51: Facility Stage with Oversized Typography Overlap */}
        <div
          ref={facilityRef}
          className="facility-stage"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '620px'
          }}
        >
          {/* Facility Image: width 64vw, height 620px, left 0, no cards, no heavy shadow (Section 50 & 52) */}
          <div
            className={`facility-image-box ${isFacilityVisible ? 'revealed' : ''}`}
            style={{
              position: 'relative',
              width: '64vw',
              height: '620px',
              overflow: 'hidden'
            }}
          >
            <Image
              src="/images/facilities/ciirc-lab-main.jpg"
              alt="CIIRC Laboratory Infrastructure"
              fill
              sizes="64vw"
              style={{ objectFit: 'cover' }}
              className="facility-img"
            />
          </div>

          {/* Section 51: Oversized 50,000+ partially outside image */}
          <div
            className="facility-typography-overlap"
            style={{
              position: 'absolute',
              left: '60vw',
              top: '120px',
              width: '36vw',
              zIndex: 10
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(80px, 11vw, 170px)',
                lineHeight: 0.85,
                fontWeight: 650,
                letterSpacing: '-0.065em',
                color: '#18242D' // Section 51: Large 50,000+ #18242D
              }}
            >
              50,000+
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#557C70', // Section 51: #557C70
                marginTop: '16px'
              }}
            >
              RESEARCH INFRASTRUCTURE
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                lineHeight: 1.62,
                color: '#3E4D55',
                marginTop: '20px',
                maxWidth: '440px'
              }}
            >
              Housing the central Sophisticated Instrumentation Facility (SIF), incubation labs, and dedicated clean characterization bays for internal scholars and national defense/space projects.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INSTRUMENTATION (Section 53, 88: Background #F5F1E8 Warm ivory)
          ========================================================================= */}
      <section
        id="instrumentation"
        aria-label="Precision Instrumentation"
        style={{
          backgroundColor: '#F5F1E8', // Section 53 & 88: Warm ivory
          padding: '170px 0',
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid rgba(24, 36, 45, 0.10)'
        }}
      >
        <div className="ciirc-container">
          <div style={{ marginBottom: '70px', maxWidth: '820px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#3558C8',
                display: 'inline-block',
                marginBottom: '16px'
              }}
            >
              SOPHISTICATED INSTRUMENTATION FACILITY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(42px, 4.5vw, 68px)',
                lineHeight: 0.96,
                letterSpacing: '-0.05em',
                fontWeight: 600,
                color: '#18242D',
                margin: 0
              }}
            >
              PRECISION AT THE MICRO SCALE.
            </h2>
          </div>

          {/* Typographic List: SEM, XRD, GC, FT-IR, DSC, TGA, BET (70px rows, Section 53) */}
          <div
            className="instruments-container"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '64px',
              alignItems: 'start'
            }}
          >
            <div style={{ borderTop: '1px solid rgba(24, 36, 45, 0.12)' }}>
              {AUTHENTIC_INSTRUMENTS.map((inst) => {
                const isActive = activeInst.id === inst.id;
                return (
                  <div
                    key={inst.id}
                    onMouseEnter={() => setActiveInst(inst)}
                    onClick={() => setActiveInst(inst)}
                    style={{
                      height: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(24, 36, 45, 0.12)',
                      cursor: 'pointer',
                      color: isActive ? '#3558C8' : '#18242D',
                      transition: 'color 180ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(20px, 2vw, 24px)',
                          fontWeight: 650,
                          letterSpacing: '-0.02em',
                          color: isActive ? '#3558C8' : '#18242D'
                        }}
                      >
                        {inst.code}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: '#718087',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {inst.role}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      style={{
                        color: isActive ? '#3558C8' : 'rgba(24, 36, 45, 0.3)',
                        transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                        transition: 'all 180ms ease'
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Sticky Photographic Reveal on Hover */}
            <div
              className="inst-preview-panel"
              style={{
                position: 'sticky',
                top: '120px'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '380px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Image
                  key={activeInst.id}
                  src={activeInst.image}
                  alt={activeInst.fullName}
                  fill
                  sizes="400px"
                  style={{ objectFit: 'cover' }}
                  className="inst-fade-img"
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '18px',
                    fontWeight: 650,
                    color: '#18242D',
                    marginBottom: '6px'
                  }}
                >
                  {activeInst.fullName}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: '#718087'
                  }}
                >
                  {activeInst.specs}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Section 52 Facility Image Animation:
           Initial: scale(1.08), clip-path: inset(0 0 12% 0) ->
           Final: scale(1), clip-path: inset(0), Duration: 1000ms */
        .facility-image-box {
          clip-path: inset(0 0 12% 0);
          transform: scale(1.08);
          transition: clip-path 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .facility-image-box.revealed {
          clip-path: inset(0);
          transform: scale(1);
        }

        .inst-fade-img {
          animation: fadeIn 350ms ease forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .facility-image-box {
            width: 100% !important;
            height: 420px !important;
          }
          .facility-typography-overlap {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin-top: -30px;
          }
          .instruments-container {
            grid-template-columns: 1fr !important;
          }
          .inst-preview-panel {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
