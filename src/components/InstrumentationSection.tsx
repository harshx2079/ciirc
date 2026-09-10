'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AUTHENTIC_INSTRUMENTS, InstrumentItem } from '../data/ciircData';

export const InstrumentationSection: React.FC = () => {
  const [activeInst, setActiveInst] = useState<InstrumentItem>(AUTHENTIC_INSTRUMENTS[0]);

  return (
    <section
      id="facilities"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper)',
        padding: '130px 0',
        borderBottom: '1px solid var(--line)',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container">
        {/* Header Metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span className="mono-meta" style={{ color: 'var(--teal)' }}>
              SECTION 03 // ANALYTICAL SUITE
            </span>
            <h2
              style={{
                fontSize: 'clamp(42px, 6vw, 84px)',
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: '-0.05em',
                color: 'var(--forest)',
                marginTop: '12px',
                textTransform: 'uppercase'
              }}
            >
              PRECISION
              <br />
              AT EVERY SCALE.
            </h2>
          </div>
          <span className="mono-meta" style={{ display: 'none' }}>
            CIIRC CENTRAL INSTRUMENTATION FACILITY
          </span>
        </div>

        {/* Interactive Instrument Workbench Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '38% 62%',
            gap: '40px',
            alignItems: 'center',
            marginTop: '56px'
          }}
          className="instrument-grid"
        >
          {/* Left: Floating Physical Annotation Labels */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {AUTHENTIC_INSTRUMENTS.map((inst) => {
              const isSelected = activeInst.id === inst.id;
              return (
                <div
                  key={inst.id}
                  onMouseEnter={() => setActiveInst(inst)}
                  style={{
                    position: 'relative',
                    padding: '16px 20px',
                    border: isSelected ? '1px solid var(--teal)' : '1px solid var(--line)',
                    backgroundColor: isSelected ? 'var(--paper-warm)' : 'transparent',
                    cursor: 'pointer',
                    transform: isSelected ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          color: isSelected ? 'var(--forest)' : 'var(--forest-soft)'
                        }}
                      >
                        {inst.code}
                      </span>
                      <span className="mono-meta" style={{ fontSize: '9px', color: 'var(--muted)' }}>
                        {inst.role}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--muted)',
                        marginTop: '3px'
                      }}
                    >
                      {inst.fullName}
                    </div>
                  </div>

                  {isSelected && (
                    <span
                      style={{
                        color: 'var(--teal)',
                        fontSize: '16px',
                        fontWeight: 700
                      }}
                    >
                      ●
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Active Authentic Instrument Reveal with Measurement Vector */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--paper-warm)',
              border: '1px solid var(--line-strong)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Top Telemetry Line */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--line)',
                paddingBottom: '14px',
                marginBottom: '20px'
              }}
            >
              <span className="mono-meta" style={{ color: 'var(--teal)' }}>
                VERIFIED SPECIFICATION // {activeInst.code}
              </span>
              <span className="mono-meta">DSIR–SIRO CENTRAL LAB</span>
            </div>

            {/* Instrument Image with dynamic clip-path reveal */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                overflow: 'hidden',
                backgroundColor: 'var(--forest)'
              }}
            >
              <Image
                src={activeInst.image}
                alt={activeInst.fullName}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{
                  objectFit: 'cover',
                  filter: 'contrast(1.04) saturate(0.95)',
                  transition: 'transform 700ms var(--ease-editorial)'
                }}
              />
              {/* Measurement Overlay Callout */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(16, 37, 31, 0.82)',
                  color: 'var(--paper)',
                  backdropFilter: 'blur(8px)',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.08em'
                }}
              >
                RESOLUTION: HIGH VACUUM ANALYTIC MODE
              </div>
            </div>

            {/* Technical Specification & Authentic Role */}
            <div style={{ marginTop: '22px' }}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 650,
                  letterSpacing: '-0.02em',
                  color: 'var(--forest)',
                  marginBottom: '6px'
                }}
              >
                {activeInst.fullName}
              </div>
              <p
                style={{
                  fontSize: '14.5px',
                  color: 'var(--forest-soft)',
                  lineHeight: 1.55
                }}
              >
                {activeInst.specs}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .instrument-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};
