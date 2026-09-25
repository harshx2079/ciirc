'use client';

import React from 'react';
import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
  type: string;
  country: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'National Remote Sensing Centre (NRSC)',
    logo: '/images/partners/nrsc.jpg',
    type: 'Space & Earth Observation',
    country: 'ISRO · India'
  },
  {
    name: 'P.N. Lebedev Physical Institute',
    logo: '/images/partners/lebedev-institute.jpg',
    type: 'Russian Academy of Sciences',
    country: 'Russia'
  },
  {
    name: 'TÜV Rheinland',
    logo: '/images/partners/tuv-rheinland.jpg',
    type: 'Industrial Safety & Standards',
    country: 'Germany'
  },
  {
    name: 'Tunghai University',
    logo: '/images/partners/tunghai-university.jpg',
    type: 'International Academic Accords',
    country: 'Taiwan'
  },
  {
    name: 'BOHECO',
    logo: '/images/partners/boheco.jpg',
    type: 'Sustainable Materials Enterprise',
    country: 'India'
  },
  {
    name: 'Dover Corporation',
    logo: '/images/partners/dover.jpg',
    type: 'Industrial Manufacturing Tech',
    country: 'Global'
  },
  {
    name: 'Desicon',
    logo: '/images/partners/desicon.jpg',
    type: 'Advanced Engineering Materials',
    country: 'India'
  },
  {
    name: 'LE System',
    logo: '/images/partners/le-system.jpg',
    type: 'Energy Storage & Electrolytes',
    country: 'Japan - India'
  },
  {
    name: 'NUST',
    logo: '/images/partners/nust.jpg',
    type: 'University of Science & Tech',
    country: 'International'
  },
  {
    name: 'S-VYASA University',
    logo: '/images/partners/svyasa.jpg',
    type: 'Translational Health Sciences',
    country: 'India'
  },
  {
    name: 'VSIX Semiconductor',
    logo: '/images/partners/vsix.jpg',
    type: 'Integrated Circuits & VLSI',
    country: 'India'
  },
  {
    name: 'ITIE Knowledge Solutions',
    logo: '/images/partners/itie.jpg',
    type: 'Signal Processing & AI Systems',
    country: 'India'
  },
  {
    name: 'Maiyas',
    logo: '/images/partners/maiyas.jpg',
    type: 'Food Technology & Bio-Processing',
    country: 'India'
  },
  {
    name: 'Impact Engineering Solutions',
    logo: '/images/partners/impact-solutions.jpg',
    type: 'Structural & Thermal Simulation',
    country: 'India'
  },
  {
    name: 'Isometric Solutions',
    logo: '/images/partners/isometric-solutions.jpg',
    type: 'Precision Design & Prototyping',
    country: 'India'
  },
  {
    name: 'Modtech Engineering',
    logo: '/images/partners/modtech.jpg',
    type: 'Industrial Scale Prototyping',
    country: 'India'
  }
];

export const CollaborationsMarquee: React.FC = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="collaborations"
      style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '130px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container" style={{ marginBottom: '52px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="eyebrow-capsule" style={{ alignSelf: 'flex-start' }}>
              <span className="eyebrow-pulse-dot" />
              <span>07 // COLLABORATIVE NETWORK</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(32px, 3.6vw, 52px)',
                fontWeight: 650,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              Institutional partners &amp; sponsors.
            </h2>
          </div>

          <span
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              maxWidth: '440px',
              lineHeight: 1.6
            }}
          >
            Sustained research accords, bilateral international agreements, and corporate consultancy with premier government and industrial institutions.
          </span>
        </div>
      </div>

      {/* Marquee Track with Real Logos (36s linear loop, pauses on hover) */}
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="marquee-item"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '22px 20px 16px 20px',
                borderRadius: '18px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                marginRight: '24px',
                width: '270px',
                height: '215px',
                flexShrink: 0,
                boxShadow: '0 4px 20px rgba(20, 33, 61, 0.04)',
                transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {/* Prominent Authentic Logo Image (Expanded dimensions + subtle scale boost) */}
              <div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '86px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} Logo`}
                  fill
                  sizes="180px"
                  style={{
                    objectFit: 'contain',
                    transform: 'scale(1.28)',
                    transition: 'transform 300ms ease'
                  }}
                />
              </div>

              {/* Partner Name */}
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: 650,
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  margin: '2px 0 6px 0',
                  height: '35px'
                }}
              >
                {partner.name}
              </span>

              {/* Micro Metadata */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(228, 234, 242, 0.7)'
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    maxWidth: '140px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {partner.type}
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--blue)',
                    fontWeight: 650
                  }}
                >
                  {partner.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          padding: 8px 0;
        }

        .marquee-content {
          display: flex;
          animation: marqueeScroll 40s linear infinite;
        }

        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }

        .marquee-item {
          opacity: 0.88;
        }

        .marquee-item:hover {
          opacity: 1;
          background-color: #FFFFFF;
          border-color: rgba(22, 119, 255, 0.35);
          box-shadow: 0 12px 32px rgba(22, 119, 255, 0.1);
          transform: translateY(-3px);
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
