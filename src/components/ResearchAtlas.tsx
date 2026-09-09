'use client';

import React, { useState } from 'react';
import { RESEARCH_VISTAS, ResearchVista } from '../data/ciircData';
import { ResearchTopology } from './ResearchField';
import { ExternalLink, Layers, ArrowRight } from 'lucide-react';

interface ResearchAtlasProps {
  onTopologyChange?: (topology: ResearchTopology) => void;
}

// Map the 6 primary categories from authentic CIIRC data
const ATLAS_CATEGORIES = [
  {
    id: 'nano',
    name: 'Nanomaterials & SIF',
    topology: 'materials' as ResearchTopology,
    vistaIndex: '01',
    vistaId: 'sophisticated-instrumentation-facility',
    leadStat: '0.1 nm',
    leadStatLabel: 'Characterization Resolution',
    imgUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85',
    imgCaption: 'SIF Electron Microscopy Suite — Scanning atomic topography'
  },
  {
    id: 'health',
    name: 'Translational Health & Diagnostics',
    topology: 'life' as ResearchTopology,
    vistaIndex: '05',
    vistaId: 'affordable-medical-devices-sensors',
    leadStat: '< 5 min',
    leadStatLabel: 'Point-of-Care Detection Speed',
    imgUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85',
    imgCaption: 'Microfluidic Diagnostic Chip — Conductive electrochemical biosensor'
  },
  {
    id: 'avionics',
    name: 'Polar Avionics & Extreme Robotics',
    topology: 'engineering' as ResearchTopology,
    vistaIndex: '11',
    vistaId: 'autonomous-systems',
    leadStat: '81° N',
    leadStatLabel: 'Arctic Polar Glacial Deployment',
    imgUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85',
    imgCaption: 'Indian Arctic Glacial Mapping — Autonomous telemetry UAV payload'
  },
  {
    id: 'space',
    name: 'ISRO NavIC Satellite & Environment',
    topology: 'earth' as ResearchTopology,
    vistaIndex: '18',
    vistaId: 'remote-sensing',
    leadStat: 'L5 / S',
    leadStatLabel: 'Satellite Ground Band Telemetry',
    imgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    imgCaption: 'On-Campus ISRO Satellite Receiver Ground Station — NavIC telemetry'
  },
  {
    id: 'computational',
    name: 'Multi-scale Physics Modeling',
    topology: 'computing' as ResearchTopology,
    vistaIndex: '14',
    vistaId: 'computational-engineering',
    leadStat: '10⁶',
    leadStatLabel: 'Finite Element Mesh Nodes',
    imgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    imgCaption: 'Computational Fluid Dynamics — Aerodynamic thermal analysis'
  },
  {
    id: 'incubation',
    name: 'AIC-JIT Deep Tech Incubation',
    topology: 'innovation' as ResearchTopology,
    vistaIndex: '19',
    vistaId: 'innovation-and-entrepreneurship-development-centre',
    leadStat: '35+',
    leadStatLabel: 'Commercialized Societal Products',
    imgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    imgCaption: 'Atal Incubation Centre — Translational product prototyping bench'
  }
];

export const ResearchAtlas: React.FC<ResearchAtlasProps> = ({ onTopologyChange }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCategory = ATLAS_CATEGORIES[selectedIdx];
  const activeVista: ResearchVista = RESEARCH_VISTAS.find(v => v.id === activeCategory.vistaId) || RESEARCH_VISTAS[0];

  const handleSelect = (idx: number) => {
    if (idx === selectedIdx) return;
    setIsTransitioning(true);
    setSelectedIdx(idx);
    if (onTopologyChange) {
      onTopologyChange(ATLAS_CATEGORIES[idx].topology);
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 650);
  };

  return (
    <section
      id="atlas"
      aria-label="CIIRC Research Atlas"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '120px 42px',
        boxSizing: 'border-box',
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        zIndex: 2
      }}
    >
      <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--line)',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '16px'
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
              [03 / ATLAS]
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3.5vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--ink)'
              }}
            >
              THE LIVING RESEARCH ATLAS
            </h2>
          </div>

          <span className="micro-label" style={{ display: 'none' }} id="atlas-meta">
            19 RESEARCH VISTAS · DSIR-SIRO RECOGNIZED LABS
          </span>
        </div>

        {/* Section 22: Layout with ZERO horizontal overflow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.85fr)',
            gap: 'clamp(28px, 4vw, 64px)',
            alignItems: 'start',
            width: '100%',
            boxSizing: 'border-box'
          }}
          className="atlas-grid"
        >
        {/* LEFT COLUMN: 35% Large Category Names */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="micro-label" style={{ marginBottom: '24px' }}>
            SELECT DOMAIN AXIS:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ATLAS_CATEGORIES.map((cat, idx) => {
              const isCurrent = idx === selectedIdx;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => handleSelect(idx)}
                  style={{
                    padding: '24px 0',
                    borderBottom: '1px solid var(--line)',
                    textAlign: 'left',
                    background: 'none',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '16px',
                    transition: 'all 200ms ease'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: isCurrent ? 'var(--ultramarine)' : 'var(--ink-muted)'
                    }}
                  >
                    [{cat.vistaIndex}]
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: isCurrent ? 'clamp(22px, 2.4vw, 32px)' : 'clamp(18px, 1.8vw, 24px)',
                      fontWeight: isCurrent ? 700 : 500,
                      letterSpacing: '-0.03em',
                      color: isCurrent ? 'var(--ink)' : 'var(--ink-soft)',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: 65% Generative Visualization, Image with Section 23 distortion transition, Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Section 23: Image Transition with Vertical Distortion & Horizontal Displacement (650ms) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              overflow: 'hidden',
              backgroundColor: 'var(--paper-2)',
              border: '1px solid var(--line)'
            }}
          >
            <img
              src={activeCategory.imgUrl}
              alt={activeCategory.imgCaption}
              className={`atlas-image ${isTransitioning ? 'transitioning' : ''}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* In-image scientific telemetry overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '16px 24px',
                background: 'linear-gradient(to top, rgba(16, 24, 32, 0.85) 0%, transparent 100%)',
                color: 'var(--white)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--acid)' }}>
                  PRIMARY TELEMETRY
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--white)' }}>
                  {activeCategory.imgCaption}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)' }}>
                  {activeCategory.leadStat}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {activeCategory.leadStatLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Domain Typography & Specifications (No Cards, No Boxed UI) */}
          <div style={{ borderTop: '1px solid var(--ink)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <span className="scientific-badge ultramarine">
                {activeVista.tag}
              </span>
              <a
                href={activeVista.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ultramarine)'
                }}
              >
                <span>Institutional Dossier</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                color: 'var(--ink)',
                marginBottom: '16px'
              }}
            >
              {activeVista.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--ink-soft)',
                marginBottom: '20px'
              }}
            >
              {activeVista.detailedScope}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeVista.instrumentsOrFocus.map((inst) => (
                <span key={inst} className="scientific-badge">
                  {inst}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        /* Section 23: Vertical distortion + horizontal displacement transition (650ms) */
        .atlas-image {
          transition: transform 650ms cubic-bezier(0.16, 1, 0.3, 1), clip-path 650ms cubic-bezier(0.16, 1, 0.3, 1), filter 650ms ease;
          transform: scale(1) translateX(0) translateY(0);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          filter: grayscale(0%);
        }
        .atlas-image.transitioning {
          transform: scale(1.04) translateX(12px) translateY(-6px);
          clip-path: polygon(0 4%, 100% 0, 100% 96%, 0 100%);
          filter: grayscale(25%);
        }

        @media (min-width: 1024px) {
          #atlas-meta {
            display: inline-block !important;
          }
        }
        @media (max-width: 1023px) {
          .atlas-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
