'use client';

import React from 'react';
import Image from 'next/image';

interface PartnerLogoItem {
  id: string;
  name: string;
  category: string;
  region: string;
  logo: string;
}

// Category 1: Academic & International Research Institutions
const ACADEMIC_INTERNATIONAL_PARTNERS: PartnerLogoItem[] = [
  {
    id: 'lebedev',
    name: 'P.N. Lebedev Physical Institute',
    category: 'Russian Academy of Sciences',
    region: 'Russia',
    logo: '/images/partners/lebedev-institute.jpg'
  },
  {
    id: 'tunghai',
    name: 'Tunghai University',
    category: 'International Academic Research',
    region: 'Taiwan',
    logo: '/images/partners/tunghai-university.jpg'
  },
  {
    id: 'nust',
    name: 'National Univ. of Science & Technology',
    category: 'Advanced Scientific Consortium',
    region: 'International',
    logo: '/images/partners/nust.jpg'
  },
  {
    id: 'svyasa',
    name: 'S-VYASA Deemed University',
    category: 'Yoga & Botanical Sciences',
    region: 'India',
    logo: '/images/partners/svyasa.jpg'
  },
  {
    id: 'nrsc',
    name: 'National Remote Sensing Centre',
    category: 'ISRO Earth Observation',
    region: 'India',
    logo: '/images/partners/nrsc.jpg'
  },
  {
    id: 'tuv',
    name: 'TÜV Rheinland',
    category: 'Industrial Quality & Certification',
    region: 'Germany',
    logo: '/images/partners/tuv-rheinland.jpg'
  },
  {
    id: 'le-system',
    name: 'LE System Co., Ltd.',
    category: 'Vanadium Redox Battery Storage',
    region: 'Japan',
    logo: '/images/partners/le-system.jpg'
  },
  {
    id: 'dover',
    name: 'Dover Corporation',
    category: 'Enterprise Engineering Consultancy',
    region: 'Global',
    logo: '/images/partners/dover.jpg'
  }
];

// Category 2: Industrial Innovation & Enterprise Consortia
const INDUSTRIAL_ENTERPRISE_PARTNERS: PartnerLogoItem[] = [
  {
    id: 'boheco',
    name: 'BOHECO (Bombay Hemp Company)',
    category: 'Industrial Biopolymers & Hemp Composites',
    region: 'India',
    logo: '/images/partners/boheco.jpg'
  },
  {
    id: 'desicon',
    name: 'Desicon Engineering',
    category: 'Advanced Mechanical & Thermal Systems',
    region: 'India',
    logo: '/images/partners/desicon.jpg'
  },
  {
    id: 'maiyas',
    name: 'Maiyas Beverages & Foods',
    category: 'Food Processing & Formulation',
    region: 'India',
    logo: '/images/partners/maiyas.jpg'
  },
  {
    id: 'modtech',
    name: 'Modtech Engineering Models',
    category: 'Precision Prototyping & CAD',
    region: 'India',
    logo: '/images/partners/modtech.jpg'
  },
  {
    id: 'itie',
    name: 'ITIE Knowledge Solutions',
    category: 'Biomedical Signal & Image Processing',
    region: 'India',
    logo: '/images/partners/itie.jpg'
  },
  {
    id: 'vsix',
    name: 'VSIX Analytical Labs',
    category: 'Chemical & Environmental Testing',
    region: 'India',
    logo: '/images/partners/vsix.jpg'
  },
  {
    id: 'isometric',
    name: 'Isometric Solutions',
    category: 'Instrumentation & Process Automation',
    region: 'India',
    logo: '/images/partners/isometric-solutions.jpg'
  },
  {
    id: 'impact-solutions',
    name: 'Impact Engineering Solutions',
    category: 'Applied Engineering Consulting',
    region: 'India',
    logo: '/images/partners/impact-solutions.jpg'
  }
];

export const CollaborationConstellation: React.FC = () => {
  // Duplicate arrays for seamless infinite looping
  const ribbon1Items = [...ACADEMIC_INTERNATIONAL_PARTNERS, ...ACADEMIC_INTERNATIONAL_PARTNERS];
  const ribbon2Items = [...INDUSTRIAL_ENTERPRISE_PARTNERS, ...INDUSTRIAL_ENTERPRISE_PARTNERS];

  return (
    <section
      id="collaboration"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper-blue)',
        padding: '140px 0',
        borderBottom: '1px solid var(--line)',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container" style={{ marginBottom: '56px' }}>
        {/* Section Header */}
        <span className="mono-meta" style={{ color: 'var(--teal)', display: 'inline-block' }}>
          SECTION 09 // RESEARCH CONSTELLATION
        </span>
        <h2
          style={{
            fontSize: 'clamp(36px, 5.2vw, 68px)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.045em',
            color: 'var(--forest)',
            marginTop: '12px',
            textTransform: 'uppercase'
          }}
        >
          GLOBAL COLLABORATIVE
          <br />
          ARCHITECTURE.
        </h2>
        <p
          style={{
            maxWidth: '560px',
            fontSize: '16px',
            color: 'var(--forest-soft)',
            marginTop: '16px',
            lineHeight: 1.55
          }}
        >
          Active research pacts, bilateral scientific programs, joint patent filings, and translational industry partnerships.
        </p>
      </div>

      {/* Ribbon Marquee Container with subtle gradient edge masks */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Left and Right Fade Masks for smooth entry and exit */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '8vw',
            background: 'linear-gradient(to right, var(--paper-blue), transparent)',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '8vw',
            background: 'linear-gradient(to left, var(--paper-blue), transparent)',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />

        {/* Ribbon 1 Header: Academic & International Research */}
        <div className="atlas-container" style={{ marginBottom: '-4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--cobalt)' }} />
            <span className="mono-meta" style={{ color: 'var(--cobalt)', fontSize: '11px', letterSpacing: '0.08em', fontWeight: 600 }}>
              ACADEMIC & INTERNATIONAL RESEARCH INSTITUTIONS
            </span>
          </div>
        </div>

        {/* Ribbon 1: Scrolls Left */}
        <div className="ribbon-row">
          <div className="ribbon-track ribbon-scroll-left">
            {ribbon1Items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="partner-card">
                <div className="partner-logo-wrapper">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="250px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="partner-info">
                  <span className="partner-name">{item.name}</span>
                  <div className="partner-meta">
                    <span className="mono-meta" style={{ fontSize: '10px', color: 'var(--teal)', fontWeight: 600 }}>
                      {item.region}
                    </span>
                    <span className="partner-dot">•</span>
                    <span className="mono-meta" style={{ fontSize: '10px', color: 'var(--muted)' }}>
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ribbon 2 Header: Industrial Innovation & Enterprise Consortia */}
        <div className="atlas-container" style={{ marginTop: '24px', marginBottom: '-4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--teal)' }} />
            <span className="mono-meta" style={{ color: 'var(--teal)', fontSize: '11px', letterSpacing: '0.08em', fontWeight: 600 }}>
              INDUSTRIAL INNOVATION & ENTERPRISE CONSORTIA
            </span>
          </div>
        </div>

        {/* Ribbon 2: Scrolls Right */}
        <div className="ribbon-row">
          <div className="ribbon-track ribbon-scroll-right">
            {ribbon2Items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="partner-card">
                <div className="partner-logo-wrapper">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="250px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="partner-info">
                  <span className="partner-name">{item.name}</span>
                  <div className="partner-meta">
                    <span className="mono-meta" style={{ fontSize: '10px', color: 'var(--teal)', fontWeight: 600 }}>
                      {item.region}
                    </span>
                    <span className="partner-dot">•</span>
                    <span className="mono-meta" style={{ fontSize: '10px', color: 'var(--muted)' }}>
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ribbon-row {
          width: 100%;
          overflow: hidden;
          display: flex;
        }

        .ribbon-track {
          display: flex;
          gap: 24px;
          width: max-content;
          will-change: transform;
        }

        /* Continuous Smooth Scroll Left */
        .ribbon-scroll-left {
          animation: scrollLeft 42s linear infinite;
        }

        /* Continuous Smooth Scroll Right */
        .ribbon-scroll-right {
          animation: scrollRight 42s linear infinite;
        }

        /* Pause smoothly on hover */
        .ribbon-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .partner-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 20px 20px;
          background-color: var(--paper);
          border: 1px solid var(--line);
          cursor: pointer;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
          min-width: 290px;
          max-width: 320px;
          flex-shrink: 0;
        }

        .partner-card:hover {
          transform: translateY(-3px);
          border-color: var(--teal);
          box-shadow: 0 8px 24px rgba(16, 37, 31, 0.08);
        }

        .partner-logo-wrapper {
          position: relative;
          width: 176px;
          height: 88px;
          flex-shrink: 0;
          background-color: #ffffff;
          padding: 10px 16px;
          border: 1px solid var(--line);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
        }

        .partner-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: 100%;
          text-align: center;
        }

        .partner-name {
          font-size: 14.5px;
          font-weight: 650;
          color: var(--forest);
          letter-spacing: -0.015em;
          white-space: normal;
          line-height: 1.35;
          text-align: center;
        }

        .partner-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          white-space: normal;
          text-align: center;
        }

        .partner-dot {
          color: var(--line-strong);
          font-size: 10px;
        }

        @media (max-width: 768px) {
          .partner-card {
            min-width: 250px;
            max-width: 270px;
            padding: 18px 14px 16px;
          }
          .partner-logo-wrapper {
            width: 144px;
            height: 74px;
            margin-bottom: 12px;
          }
          .ribbon-scroll-left,
          .ribbon-scroll-right {
            animation-duration: 32s;
          }
        }
      `}</style>
    </section>
  );
};
