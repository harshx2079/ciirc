'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PartnerRibbonItem {
  id: string;
  name: string;
  category: string;
  domain: string;
  logoUrl?: string;
  initials: string;
  scale?: number;
}

const PARTNERS_ROW_1: PartnerRibbonItem[] = [
  {
    id: 'isro',
    name: 'ISRO / DOS Dept. of Space',
    category: 'Government / Space Agency',
    domain: 'Space Telemetry & NavIC Receiver Ground Station',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/512px-Indian_Space_Research_Organisation_Logo.svg.png',
    initials: 'ISRO',
    scale: 1.15
  },
  {
    id: 'nrsc',
    name: 'National Remote Sensing Centre',
    category: 'Government / Geospatial (ISRO)',
    domain: 'Glacier GIS Telemetry & Satellite Data',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/01/National-Remote-Sensing-Centre.jpg',
    initials: 'NRSC',
    scale: 3.4 // Calibrated to fill the container without shrinking the centered strip
  },
  {
    id: 'lebedev',
    name: 'P.N. Lebedev Physical Institute',
    category: 'International Academic (Russia)',
    domain: 'High-Energy Physics, Spectroscopy & Optics',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/05/PN-Lebedev-Institute-Russia.jpg',
    initials: 'LPI',
    scale: 1.7
  },
  {
    id: 'drdo',
    name: 'DRDO Defence Research',
    category: 'Government / Strategic Defence',
    domain: 'Autonomous Avionics, UAV Sensors & Materials',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Defence_Research_and_Development_Organisation_Logo.svg/512px-Defence_Research_and_Development_Organisation_Logo.svg.png',
    initials: 'DRDO',
    scale: 1.15
  },
  {
    id: 'tunghai',
    name: 'Tunghai University',
    category: 'International Academic (Taiwan)',
    domain: 'Semiconductor Microfluidics & Nanotech',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/01/Tunghai-University.jpg',
    initials: 'THU',
    scale: 2.0
  },
  {
    id: 'tuv',
    name: 'TÜV Rheinland',
    category: 'Global Industry & Standards (Germany)',
    domain: 'Analytical Certification & Industrial Testing',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/01/TUV-Rheinland.jpg',
    initials: 'TÜV',
    scale: 1.45
  }
];

const PARTNERS_ROW_2: PartnerRibbonItem[] = [
  {
    id: 'dst',
    name: 'DST Dept. of Science & Technology',
    category: 'Government / National Funding',
    domain: 'Central Nano Characterization & SIRO Facility',
    logoUrl: 'https://dst.gov.in/sites/default/files/dst-logo.png',
    initials: 'DST',
    scale: 1.5
  },
  {
    id: 'boheco',
    name: 'BOHECO Biomaterials',
    category: 'Industry & Enterprise',
    domain: 'Natural Bast Fiber & Polymer Composites',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/01/BOHECO.jpg',
    initials: 'BHC',
    scale: 2.4
  },
  {
    id: 'dbt',
    name: 'DBT Dept. of Biotechnology',
    category: 'Government / Life Sciences',
    domain: 'Point-of-Care Sensors & Diagnostic Inks',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Department_of_Biotechnology_India_logo.png/480px-Department_of_Biotechnology_India_logo.png',
    initials: 'DBT',
    scale: 1.3
  },
  {
    id: 'dover',
    name: 'Dover Corporation',
    category: 'Multinational Enterprise',
    domain: 'Precision Fluidics & Thermal Systems',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/01/Dover.jpg',
    initials: 'DVR',
    scale: 2.6
  },
  {
    id: 'desicon',
    name: 'Desicon Engineering',
    category: 'Industry & Enterprise',
    domain: 'Advanced Structural Geopolymers & Materials',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/05/Desicon.jpg',
    initials: 'DSC',
    scale: 2.1
  },
  {
    id: 'svyasa',
    name: 'S-VYASA University',
    category: 'Academic Research Partner',
    domain: 'Ancient Heritage S&T & Botanical Health',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/05/svyasa-logo.jpg',
    initials: 'SVYASA',
    scale: 1.55
  },
  {
    id: 'vsix',
    name: 'Vsix Analytical Solutions',
    category: 'Analytical Instrumentation Industry',
    domain: 'High-Precision Characterization Tools',
    logoUrl: 'https://ciirc.res.in/wp-content/uploads/2021/05/Vsix_new.jpg',
    initials: 'VSIX',
    scale: 2.4
  }
];

export const Collaborations: React.FC = () => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const renderCard = (partner: PartnerRibbonItem, keyPrefix: string) => {
    const hasError = imageErrorMap[partner.id];

    return (
      <div
        key={`${keyPrefix}-${partner.id}`}
        style={{
          width: '340px',
          flexShrink: 0,
          backgroundColor: 'var(--paper)',
          border: '1px solid var(--line)',
          padding: '24px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '264px',
          boxSizing: 'border-box',
          transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer'
        }}
        className="partner-card"
      >
        {/* Real Logo Container - Enlarged and Fitted with overflow hidden */}
        <div
          style={{
            width: '100%',
            height: '96px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--white)',
            border: '1px solid var(--line)',
            padding: '8px 14px',
            boxSizing: 'border-box',
            marginBottom: '16px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {partner.logoUrl && !hasError ? (
            <img
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              onError={() => handleImageError(partner.id)}
              style={{
                maxWidth: '92%',
                maxHeight: '88%',
                objectFit: 'contain',
                transform: `scale(${partner.scale || 1.0})`,
                transformOrigin: 'center center',
                filter: 'contrast(105%)'
              }}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--ink)'
              }}
            >
              {partner.initials}
            </div>
          )}
        </div>

        {/* Text Structured Below the Logos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--ultramarine)',
              textTransform: 'uppercase'
            }}
          >
            {partner.category}
          </div>

          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.98rem',
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: 'var(--ink)'
            }}
          >
            {partner.name}
          </h4>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78125rem',
              lineHeight: 1.45,
              color: 'var(--ink-soft)',
              marginTop: '2px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {partner.domain}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="network"
      aria-label="CIIRC Kinetic Institutional Network"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 0',
        boxSizing: 'border-box',
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          padding: '0 42px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--line)',
          marginBottom: '56px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--ultramarine)',
              letterSpacing: '0.08em'
            }}
          >
            [07 / NETWORK]
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--ink)'
            }}
          >
            KINETIC INSTITUTIONAL NETWORK
          </h2>
        </div>

        <span className="micro-label" style={{ display: 'none' }} id="network-meta">
          GLOBAL CONSORTIA · INDUSTRY & GOVERNMENT PARTNERS
        </span>
      </div>

      {/* Kinetic Looping Ribbons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Track 1: Scrolling Left */}
        <div className="ribbon-marquee-wrapper">
          <div className="ribbon-track ribbon-scroll-left">
            {PARTNERS_ROW_1.map((p) => renderCard(p, 'r1-a'))}
            {PARTNERS_ROW_1.map((p) => renderCard(p, 'r1-b'))}
          </div>
        </div>

        {/* Track 2: Scrolling Right */}
        <div className="ribbon-marquee-wrapper">
          <div className="ribbon-track ribbon-scroll-right">
            {PARTNERS_ROW_2.map((p) => renderCard(p, 'r2-a'))}
            {PARTNERS_ROW_2.map((p) => renderCard(p, 'r2-b'))}
          </div>
        </div>
      </div>

      {/* Bottom Status Citation */}
      <div
        style={{
          padding: '48px 42px 0 42px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div className="micro-label">
          CIIRC BILATERAL RESEARCH & INDUSTRIAL CONSULTANCY CONSORTIA
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--ultramarine)', display: 'inline-block' }} />
          <span className="micro-label">
            CONTINUOUS SYNCHRONIZATION WITH NATIONAL & GLOBAL PARTNERS
          </span>
        </div>
      </div>

      <style jsx>{`
        .ribbon-marquee-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }

        .ribbon-track {
          display: flex;
          gap: 24px;
          will-change: transform;
        }

        .ribbon-track:hover {
          animation-play-state: paused !important;
        }

        .ribbon-scroll-left {
          animation: marqueeLeft 38s linear infinite;
        }

        .ribbon-scroll-right {
          animation: marqueeRight 42s linear infinite;
        }

        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .partner-card:hover {
          border-color: var(--ultramarine) !important;
          transform: translateY(-4px);
        }

        @media (min-width: 1024px) {
          #network-meta {
            display: inline-block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ribbon-scroll-left,
          .ribbon-scroll-right {
            animation: none !important;
          }
          .ribbon-track {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
};
