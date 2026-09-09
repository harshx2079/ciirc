'use client';

import React from 'react';
import { Microscope, ArrowUpRight, Activity, Shield } from 'lucide-react';

export const InstrumentationFacility: React.FC = () => {
  const instruments = [
    {
      code: "SEM",
      name: "Scanning Electron Microscope",
      focus: "High-resolution nanoscale surface topography, morphology & elemental EDS analysis",
      specs: "Secondary & backscattered electron imaging for nanomaterials, polymers & metallurgical alloys"
    },
    {
      code: "XRD",
      name: "X-Ray Diffractometer",
      focus: "Crystallographic phase identification, grain sizing & lattice parameter quantification",
      specs: "Powder & thin-film diffraction for advanced ceramics, geological specimens & catalytic materials"
    },
    {
      code: "FT-IR",
      name: "Fourier Transform Infrared Spectrophotometer",
      focus: "Molecular bonding, organic functional group identification & chemical purity assay",
      specs: "Attenuated Total Reflectance (ATR) and transmission modes for solid/liquid analysis"
    },
    {
      code: "GC",
      name: "Gas Chromatography System",
      focus: "Separation, quantitative detection & profiling of volatile organic compounds and fuels",
      specs: "High-sensitivity flame ionization detection (FID) for biofuels, botanical extracts & effluents"
    },
    {
      code: "DSC & TGA",
      name: "Simultaneous Thermal Analyzer",
      focus: "Thermal degradation, glass transition (Tg), melting points & decomposition kinetics",
      specs: "Sub-ambient to 1200°C inert/oxidative atmospheric profiling for composites & polymers"
    },
    {
      code: "BET",
      name: "Surface Area & Porosimetry Analyzer",
      focus: "Specific surface area (m²/g), pore volume & micropore size distribution",
      specs: "Nitrogen gas physisorption for carbon adsorbents, MOFs & catalytic substrates"
    }
  ];

  return (
    <section
      id="instrumentation"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(5, 13, 24, 0.35)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'end',
            marginBottom: '44px'
          }}
        >
          <div>
            <div className="section-eyebrow eyebrow-scientific">
              <Microscope size={13} /> SOPHISTICATED INSTRUMENTATION FACILITY
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.75rem)' }}>
              Centralized Analytical Infrastructure
            </h2>
            <p className="section-description">
              Housed within CIIRC's 50,000 sq.ft. facility, our central characterization suites provide atomic-to-macroscale
              analytical tools for internal scholars, external academic researchers, and industry partners.
            </p>
          </div>

          <div>
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <Shield size={22} color="var(--primary-bright)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Testing &amp; Consultancy Access:</strong> Students from inside
                and outside institutions have the benefit of utilizing these facilities to carry out funded projects, dissertations, and testing.
              </div>
            </div>
          </div>
        </div>

        {/* Instruments Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          {instruments.map((inst) => (
            <div
              key={inst.code}
              style={{
                backgroundColor: 'var(--surface)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
                e.currentTarget.style.borderColor = 'var(--scientific)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--scientific)',
                      padding: '3px 10px',
                      backgroundColor: 'var(--scientific-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(34, 199, 184, 0.2)'
                    }}
                  >
                    {inst.code}
                  </span>
                  <Activity size={16} color="var(--text-muted)" />
                </div>

                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {inst.name}
                </h4>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
                  {inst.focus}
                </p>

                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--surface-subtle)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    lineHeight: 1.45,
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <strong style={{ color: 'var(--text-secondary)' }}>Analytical Capability:</strong> {inst.specs}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://ciirc.res.in/service/sophisticated-instrumentation-facility/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            Inquire About Analytical Testing Services <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};
