'use client';

import React from 'react';

const CATEGORIES = [
  'MATERIALS & NANO',
  'BIOTECHNOLOGY & LIFE SCIENCES',
  'AUTONOMOUS SYSTEMS & AVIONICS',
  'EARTH & POLAR ENVIRONMENT',
  'COMPUTING & SENSORS',
  'INNOVATION & INCUBATION',
  'SURFACES & INTERFACES',
  'CLEAN ENERGY & STORAGE',
  'WATER PURIFICATION & REMEDIATION',
  'REMOTE SENSING & SATELLITE TELEMETRY'
];

export const ResearchRibbon: React.FC = () => {
  const repeated = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  return (
    <div
      style={{
        height: '72px',
        borderTop: '1px solid rgba(23, 35, 43, 0.10)',
        borderBottom: '1px solid rgba(23, 35, 43, 0.10)',
        backgroundColor: '#EFEEE8', // Section 25: warm paper
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 5
      }}
      className="ribbon-loop-wrapper"
    >
      <div
        className="ribbon-track-left"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
          whiteSpace: 'nowrap',
          animationDuration: '62s'
        }}
      >
        {repeated.map((cat, idx) => (
          <React.Fragment key={`${cat}-${idx}`}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 650,
                letterSpacing: '0.14em',
                color: idx % 3 === 0 ? '#3157C8' : idx % 3 === 1 ? '#4C8176' : '#33434B',
                textTransform: 'uppercase'
              }}
            >
              {cat}
            </span>
            <span
              style={{
                color: 'rgba(23, 35, 43, 0.20)',
                fontSize: '14px'
              }}
            >
              •
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
