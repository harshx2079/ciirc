'use client';

import React, { useState, useEffect } from 'react';
import { ResearchTopology } from './ResearchField';
import { ArrowUpRight } from 'lucide-react';

interface ResearchEcosystemProps {
  onTopologyChange?: (topology: ResearchTopology) => void;
}

interface DomainItem {
  index: string;
  name: string;
  topology: ResearchTopology;
  discipline: string;
  scope: string;
  focus: string[];
}

const DOMAINS: DomainItem[] = [
  {
    index: '01',
    name: 'MATERIALS & NANOTECHNOLOGY',
    topology: 'materials',
    discipline: 'CRYSTALLINE & NANOSTRUCTURAL',
    scope: 'Synthesis of 0D, 1D, and 2D nanomaterials, MXenes, quantum dots, and superhydrophobic interfaces.',
    focus: ['Quantum Dots', 'Graphene & MXenes', 'Surface Physics', 'Characterization']
  },
  {
    index: '02',
    name: 'LIFE SCIENCES & HEALTHCARE',
    topology: 'life',
    discipline: 'BRANCHING BIOMEDICAL',
    scope: 'Translational oncology therapeutics, point-of-care microfluidic biosensors, and botanical bioactive molecules.',
    focus: ['Electrochemical Biosensors', 'Cellular Oncology', 'Bioactive Actives', 'Food Tech']
  },
  {
    index: '03',
    name: 'ADVANCED ENGINEERING',
    topology: 'engineering',
    discipline: 'GEOMETRIC TRAJECTORIES & AVIONICS',
    scope: 'Autonomous aerial platforms flown in polar Arctic glaciers, high-temperature tribology, and geopolymer structures.',
    focus: ['Polar Glacial UAVs', 'Tribology', 'Flight Dynamics', 'Geopolymers']
  },
  {
    index: '04',
    name: 'EARTH & ENVIRONMENT',
    topology: 'earth',
    discipline: 'FLUID & TOPOGRAPHIC DYNAMICS',
    scope: 'ISRO NavIC satellite telemetry ground station, CO2 carbon capture adsorption, and nano-filtration water recovery.',
    focus: ['ISRO NavIC Telemetry', 'Carbon Capture (CCS)', 'Water Nano-Membranes', 'Glacier GIS']
  },
  {
    index: '05',
    name: 'COMPUTING & SYSTEMS',
    topology: 'computing',
    discipline: 'DISCRETE COMPUTATIONAL GRIDS',
    scope: 'Multi-scale finite element physics simulation, computational fluid dynamics, and embedded sensor architectures.',
    focus: ['CFD Simulation', 'Finite Element FEA', 'Sensor Fusion', 'Predictive Modeling']
  },
  {
    index: '06',
    name: 'INNOVATION & VENTURES',
    topology: 'innovation',
    discipline: 'HIGHLY INTERCONNECTED TRANSLATION',
    scope: 'Atal Incubation Centre (AIC-JIT) translating laboratory discoveries into commercial licenses and social impact products.',
    focus: ['Seed Incubation', '35+ Societal Products', 'IP & Patent Filing', 'Enterprise']
  }
];

export const ResearchEcosystem: React.FC<ResearchEcosystemProps> = ({ onTopologyChange }) => {
  const [activeDomain, setActiveDomain] = useState<string>('01');
  const [scrollShift, setScrollShift] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('ecosystem');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Progress through ecosystem
        const progress = Math.max(-1, Math.min(1, (viewportHeight / 2 - rect.top) / (rect.height / 2)));
        setScrollShift(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDomainHover = (domain: DomainItem) => {
    setActiveDomain(domain.index);
    if (onTopologyChange) {
      onTopologyChange(domain.topology);
    }
  };

  // Section 17 scroll typography transformation:
  // WE moves slightly left.
  // RESEARCH moves upward.
  // ACROSS moves right.
  // BOUNDARIES. moves downward.
  // Max movement: 60-100px
  const shiftWE = -scrollShift * 40;
  const shiftRESEARCH = -scrollShift * 35;
  const shiftACROSS = scrollShift * 40;
  const shiftBOUNDARIES = scrollShift * 35;

  return (
    <section
      id="ecosystem"
      aria-label="CIIRC Research Ecosystem"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '120px 42px 140px 42px',
        boxSizing: 'border-box',
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--paper)',
        zIndex: 2
      }}
    >
      {/* Floating Spatial Technical Labels (Section 21) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40px',
          right: '42px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.14em',
          color: 'var(--ink-muted)',
          pointerEvents: 'none'
        }}
      >
        MATERIALS · │ ·──── NANO · POLAR UAV · │ ·──── 81° N
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '42px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.14em',
          color: 'var(--ink-muted)',
          pointerEvents: 'none'
        }}
      >
        MXENE CATALYST · │ ·──── 2D · ISRO NavIC · │ ·──── TELEMETRY
      </div>

      {/* Section 16 & 17: Spatial Typography Transformation */}
      {/* Editorial composition: WE top-left, RESEARCH center, ACROSS right, BOUNDARIES bottom-left */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto 100px auto',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* WE */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 8vw, 110px)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              color: 'var(--ink)',
              transform: `translateX(${shiftWE}px)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            WE
          </span>

          {/* ACROSS */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 8vw, 110px)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              color: 'var(--ink-soft)',
              transform: `translateX(${shiftACROSS}px)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            ACROSS
          </span>
        </div>

        {/* RESEARCH */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 10vw, 140px)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.07em',
              color: 'var(--ultramarine)',
              display: 'inline-block',
              transform: `translateY(${shiftRESEARCH}px)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            RESEARCH
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* BOUNDARIES. */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 8vw, 110px)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              color: 'var(--ink)',
              transform: `translateY(${shiftBOUNDARIES}px)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            BOUNDARIES.
          </span>
        </div>
      </div>

      {/* Section 18, 19, 20: Research Categories as Typographic Objects (Not cards!) */}
      <div
        style={{
          width: '100%',
          maxWidth: '1320px',
          margin: '0 auto',
          borderTop: '1px solid var(--ink)'
        }}
      >
        {DOMAINS.map((domain) => {
          const isSelected = activeDomain === domain.index;

          return (
            <div
              key={domain.index}
              onMouseEnter={() => handleDomainHover(domain)}
              style={{
                position: 'relative',
                padding: '36px 0',
                borderBottom: '1px solid var(--line)',
                cursor: 'pointer',
                transition: 'background-color 250ms ease'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'baseline',
                  gap: '24px'
                }}
                className="domain-row"
              >
                {/* 01, 02... */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: isSelected ? 'var(--ultramarine)' : 'var(--ink-muted)',
                    transition: 'color 200ms ease'
                  }}
                >
                  [{domain.index}]
                </span>

                {/* Large Typographic Name */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 3.8vw, 54px)',
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      lineHeight: 1.05,
                      color: isSelected ? 'var(--ink)' : 'var(--ink-soft)',
                      transition: 'color 200ms ease'
                    }}
                  >
                    {domain.name}
                  </h3>

                  {isSelected && (
                    <div
                      style={{
                        marginTop: '16px',
                        maxWidth: '720px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          letterSpacing: '0.1em',
                          color: 'var(--ultramarine)',
                          textTransform: 'uppercase'
                        }}
                      >
                        TOPOLOGY MUTATION: {domain.discipline}
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9375rem',
                          lineHeight: 1.5,
                          color: 'var(--ink-soft)'
                        }}
                      >
                        {domain.scope}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {domain.focus.map((f) => (
                          <span key={f} className="scientific-badge">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Indicator / Topology Callout */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isSelected ? 'var(--ultramarine)' : 'var(--ink-muted)',
                      display: 'none'
                    }}
                    className="topology-label"
                  >
                    {domain.topology} field
                  </span>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--ultramarine)' : 'var(--line)',
                      backgroundColor: isSelected ? 'var(--ultramarine)' : 'transparent',
                      color: isSelected ? 'var(--white)' : 'var(--ink)',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .topology-label {
            display: inline-block !important;
          }
        }
        @media (max-width: 767px) {
          .domain-row {
            grid-template-columns: 48px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
