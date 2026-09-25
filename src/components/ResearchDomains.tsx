'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface DomainItem {
  id: string;
  number: string;
  title: string;
  category: string;
  specs: string;
  image: string;
  imageAlt: string;
  url: string;
}

const DOMAINS: DomainItem[] = [
  {
    id: 'cell-bio',
    number: '01',
    title: 'Cell & Molecular Biology',
    category: 'Biological Sciences',
    specs: 'Oncology biomarker screening, mammalian cytotoxicity assays & gene expression profiling.',
    image: '/images/official/cell-biology.jpg',
    imageAlt: 'CIIRC Molecular Characterization & Cell Biology Laboratory',
    url: 'https://ciirc.res.in/service/cell-and-molecular-biology/'
  },
  {
    id: 'autonomous-systems',
    number: '02',
    title: 'Autonomous Systems & Polar Robotics',
    category: 'Aerospace & Telemetry',
    specs: 'Extreme-cold UAV platforms, polar robotics, computer vision & flight control telemetry.',
    image: '/images/official/autonomous-systems.jpg',
    imageAlt: 'CIIRC Autonomous Drone and Polar Robotics Platform Facility',
    url: 'https://ciirc.res.in/service/autonomous-systems/'
  },
  {
    id: 'computational-eng',
    number: '03',
    title: 'Computational Engineering & CFD',
    category: 'Applied Mathematics & Modeling',
    specs: 'Finite element analysis (FEA), high-speed aerodynamic CFD & thermal dissipation mechanics.',
    image: '/images/official/computational-engineering.jpg',
    imageAlt: 'High-Performance Computational Engineering Workstations at CIIRC',
    url: 'https://ciirc.res.in/service/computational-engineering/'
  },
  {
    id: 'energy-storage',
    number: '04',
    title: 'Energy & Storage Technologies',
    category: 'Clean Energy & Electrochemistry',
    specs: 'Next-gen nanostructured electrodes for lithium/sodium ion batteries & high-density supercapacitors.',
    image: '/images/official/energy.jpg',
    imageAlt: 'CIIRC Energy Storage & Electrochemical Characterization Laboratory',
    url: 'https://ciirc.res.in/service/energy/'
  },
  {
    id: 'environmental-eng',
    number: '05',
    title: 'Environmental Science & CCS',
    category: 'Ecology & Climate Technologies',
    specs: 'Solid nano-adsorbents for industrial flue gas carbon capture (CCS) & toxic effluent decomposition.',
    image: '/images/official/environment.jpg',
    imageAlt: 'Environmental Science Spectroscopy & Catalysis Suite at CIIRC',
    url: 'https://ciirc.res.in/service/environment/'
  },
  {
    id: 'nanoscience',
    number: '06',
    title: 'Nanoscience & Engineering',
    category: 'Advanced Material Synthesis',
    specs: '0D, 1D, and 2D nanomaterials including graphene, quantum dots & functional MXenes.',
    image: '/images/official/nanosciences.jpg',
    imageAlt: 'Advanced Nanomaterial Synthesis & Characterization Facility at CIIRC',
    url: 'https://ciirc.res.in/service/nanosciences-and-engineering/'
  },
  {
    id: 'water-tech',
    number: '07',
    title: 'Water Treatment & Ceramic Membranes',
    category: 'Hydrological Filtration',
    specs: 'Engineered ceramic functional membranes removing arsenic, fluoride & hazardous industrial dyes.',
    image: '/images/official/water.jpg',
    imageAlt: 'CIIRC Water Quality Testing & Membrane Characterization Laboratory',
    url: 'https://ciirc.res.in/service/water/'
  },
  {
    id: 'remote-sensing',
    number: '08',
    title: 'Remote Sensing & GIS Systems',
    category: 'Geospatial & Satellite Telemetry',
    specs: 'Hosting on-campus ISRO IRNSS (NavIC) ground station & multi-spectral Himalayan glacier GIS.',
    image: '/images/official/remote-sensing.jpg',
    imageAlt: 'CIIRC Remote Sensing, Satellite Telemetry & GIS Laboratory',
    url: 'https://ciirc.res.in/service/remote-sensing/'
  },
  {
    id: 'biocomposites',
    number: '09',
    title: 'Biopolymers & Biocomposites',
    category: 'Bio-Derived Materials',
    specs: 'Biodegradable agricultural polymer composites and natural fiber reinforced lightweight structures.',
    image: '/images/official/biocomposites.jpg',
    imageAlt: 'CIIRC Biopolymers and Natural Composite Processing Laboratory',
    url: 'https://ciirc.res.in/service/biopolymers-and-biocomposites/'
  },
  {
    id: 'instrumentation',
    number: '10',
    title: 'Sophisticated Instrumentation Facility',
    category: 'Analytical Infrastructure',
    specs: 'Centralized characterization housing SEM, XRD, GC-MS, FTIR, DSC, TGA, and BET analyzers.',
    image: '/images/official/instrumentation-facility.jpg',
    imageAlt: 'CIIRC Sophisticated Instrumentation & Analytical Characterization Suite',
    url: 'https://ciirc.res.in/service/sophisticated-instrumentation-facility/'
  }
];

export const ResearchDomains: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevIdxRef = React.useRef(0);

  const currentIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const currentDomain = DOMAINS[currentIdx];

  const handleSelectDomain = (index: number) => {
    if (index !== currentIdx) {
      setDirection(index > currentIdx ? 1 : -1);
      prevIdxRef.current = currentIdx;
      setActiveIdx(index);
    }
  };

  const handleHoverDomain = (index: number | null) => {
    if (index !== null && index !== currentIdx) {
      setDirection(index > currentIdx ? 1 : -1);
      prevIdxRef.current = currentIdx;
    }
    setHoveredIdx(index);
  };

  return (
    <section
      id="research"
      style={{
        position: 'relative',
        backgroundColor: 'var(--background)',
        paddingTop: '160px',
        paddingBottom: '160px',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '80px' }}>
          <div className="eyebrow-capsule" style={{ marginBottom: '22px' }}>
            <span className="eyebrow-pulse-dot" />
            <span>03 // RESEARCH CONVERGENCE EXPLORER</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 4.5vw, 68px)',
              lineHeight: 1.04,
              letterSpacing: '-0.045em',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 20px 0'
            }}
          >
            Pioneering inquiry across ten interconnected fields.
          </h2>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: 0
            }}
          >
            Hover or select any domain below to examine its primary research objectives, physical
            characterization protocols, and verified laboratory suite.
          </p>
        </div>

        {/* 2-Column Editorial Explorer */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            gap: '56px',
            alignItems: 'start'
          }}
          className="research-explorer-grid"
        >
          {/* Left Column: Interactive Domain List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {DOMAINS.map((domain, index) => {
              const isSelected = currentIdx === index;
              return (
                <div
                  key={domain.id}
                  onMouseEnter={() => handleHoverDomain(index)}
                  onMouseLeave={() => handleHoverDomain(null)}
                  onClick={() => handleSelectDomain(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? 'var(--surface)' : 'transparent',
                    border: isSelected ? '1px solid var(--border)' : '1px solid transparent',
                    boxShadow: isSelected ? '0 12px 32px rgba(20, 33, 61, 0.05)' : 'none',
                    transform: isSelected ? 'translateX(8px)' : 'translateX(0)',
                    cursor: 'pointer',
                    transition: 'all 240ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="research-domain-row"
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        letterSpacing: '0.1em',
                        color: isSelected ? 'var(--blue)' : 'var(--text-muted)',
                        fontWeight: 700,
                        transition: 'color 200ms ease'
                      }}
                    >
                      {domain.number}
                    </span>

                    <div>
                      <h3
                        style={{
                          fontSize: 'clamp(18px, 1.8vw, 24px)',
                          fontWeight: 650,
                          letterSpacing: '-0.03em',
                          color: isSelected ? 'var(--blue)' : 'var(--text-primary)',
                          margin: 0,
                          transition: 'color 200ms ease'
                        }}
                      >
                        {domain.title}
                      </h3>

                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          display: isSelected ? 'inline-block' : 'none',
                          marginTop: '4px'
                        }}
                      >
                        {domain.category}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '18px',
                      color: 'var(--blue)',
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? 'translateX(4px)' : 'translateX(-6px)',
                      transition: 'all 240ms cubic-bezier(0.22, 1, 0.36, 1)',
                      display: 'inline-block'
                    }}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Verified Photographic Preview with Layered Image Transitions */}
          <div
            style={{
              position: 'sticky',
              top: '110px',
              backgroundColor: 'var(--surface)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              padding: '24px',
              boxShadow: '0 20px 48px rgba(20, 33, 61, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
            className="research-preview-sticky"
          >
            {/* Image Container with Layered Directional Transition (Section 9) */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '340px',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: 'var(--surface-soft)'
              }}
            >
              {DOMAINS.map((domain, index) => {
                const isActive = currentIdx === index;
                const isExit = prevIdxRef.current === index && !isActive;
                return (
                  <div
                    key={domain.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : isExit ? 0.25 : 0,
                      transform: isActive
                        ? 'scale(1) translateX(0)'
                        : isExit
                        ? `scale(1.03) translateX(${direction * -35}px)`
                        : `scale(1.04) translateX(${direction * 45}px)`,
                      clipPath: isActive
                        ? 'inset(0)'
                        : direction > 0
                        ? 'inset(0 0 0 100%)'
                        : 'inset(0 100% 0 0)',
                      transition: 'opacity 480ms cubic-bezier(0.22, 1, 0.36, 1), transform 480ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 480ms cubic-bezier(0.22, 1, 0.36, 1)',
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <Image
                      src={domain.image}
                      alt={domain.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                    />
                  </div>
                );
              })}
            </div>

            {/* Content Details with Delayed Transition */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--blue)',
                    fontWeight: 700,
                    transition: 'color 300ms ease'
                  }}
                >
                  FIELD {currentDomain.number} // {currentDomain.category}
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                  }}
                >
                  Verified CIIRC Facility
                </span>
              </div>

              <h4
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  margin: 0,
                  transition: 'opacity 280ms ease 60ms'
                }}
              >
                {currentDomain.title}
              </h4>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  transition: 'opacity 280ms ease 100ms'
                }}
              >
                {currentDomain.specs}
              </p>

              <div style={{ paddingTop: '8px' }}>
                <a
                  href={currentDomain.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-ciirc"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '42px',
                    padding: '0 18px',
                    fontSize: '13px',
                    borderRadius: '10px'
                  }}
                >
                  <span>Domain Publications &amp; Team</span>
                  <span className="cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .research-explorer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .research-preview-sticky {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
