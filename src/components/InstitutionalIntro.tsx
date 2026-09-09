'use client';

import React from 'react';
import { Building2, CheckCircle2, Layers, Cpu, Dna, Rocket, Bot, Radio, Compass } from 'lucide-react';
import { INDUSTRY_5_ENABLERS } from '../data/ciircData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const InstitutionalIntro: React.FC = () => {
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const panelsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });
  const enablersReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  const enablerIcons = [
    <Layers key="nano" size={20} color="var(--primary-bright)" />,
    <Cpu key="additive" size={20} color="var(--accent)" />,
    <Dna key="bio" size={20} color="var(--scientific)" />,
    <Rocket key="auto" size={20} color="var(--primary)" />,
    <Bot key="ai" size={20} color="var(--primary-bright)" />,
    <Radio key="5g" size={20} color="var(--scientific)" />
  ];

  return (
    <section
      id="about"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(5, 13, 24, 0.35)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Editorial Two-Column Header Structure (Section 18) */}
        <div
          ref={headerReveal.ref}
          className={`motion-reveal-editorial ${headerReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '52px'
          }}
        >
          {/* Left Column: Eyebrow + Large Statement */}
          <div>
            <div className="section-eyebrow">
              <Building2 size={13} /> ABOUT CIIRC
            </div>
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 2.75rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.2
              }}
            >
              Converging Science, Applied Engineering, and Enterprise Incubation.
            </h2>
          </div>

          {/* Right Column: Supporting Institutional Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '10px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.75 }}>
              CIIRC® is a multidisciplinary research, innovation, and incubation centre established as a joint initiative
              of <strong style={{ color: 'var(--text-primary)' }}>Sri Sringeri Sharada Peetham</strong>, Sringeri, and{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Jyothy Institute of Technology (JIT)</strong>.
              It serves as JIT's centralized R&amp;D centre, holding official DSIR certification as a recognized
              Scientific and Industrial Research Organisation (SIRO).
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.75 }}>
              By integrating market research, intellectual property prosecution, and enterprise mentorship directly into
              scientific curricula, the Centre prepares researchers to build societal enterprises through the on-campus
              Atal Incubation Centre (AIC - JIT Foundation) and the Innovation &amp; Entrepreneurship Development Centre (IEDC).
            </p>
          </div>
        </div>

        {/* 4 Structural Metric Panels */}
        <div
          ref={panelsReveal.ref}
          className={`motion-reveal ${panelsReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '48px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 20px',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={16} color="var(--primary-bright)" />
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                SIRO Accreditation
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Formally certified by the Department of Scientific &amp; Industrial Research, Ministry of Science &amp; Technology, GoI.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 20px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={16} color="var(--scientific)" />
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                AIC-JIT Foundation
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              On-campus Atal Incubation Centre sanctioned under NITI Aayog to translate lab discoveries into licensed commercial firms.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 20px',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={16} color="var(--primary)" />
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                50,000 Sq. Ft. Facility
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              18 specialized lab vistas and central characterization suites operating within Bengaluru's educational corridor.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 20px',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={16} color="var(--accent)" />
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                IEDC Entrepreneurship
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Dedicated Innovation and Entrepreneurship Development Centre nurturing student and faculty patenting.
            </p>
          </div>
        </div>

        {/* Industry 5.0 Enablers Matrix (Authentic CIIRC Architecture) */}
        <div
          ref={enablersReveal.ref}
          className={`motion-reveal ${enablersReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px 28px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-bright)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                INDUSTRY 5.0 ENABLERS
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                Core Technology Drivers
              </h3>
            </div>
            <span className="badge badge-amber">Multidisciplinary Matrix</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '16px'
            }}
          >
            {INDUSTRY_5_ENABLERS.map((item, idx) => (
              <div
                key={item.title}
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={{ marginBottom: '10px' }}>{enablerIcons[idx]}</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '24px',
              padding: '12px 18px',
              backgroundColor: 'var(--surface-subtle)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Compass size={18} color="var(--scientific)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Founded under the patronship of <strong>Jagadguru Shankaracharya of Sri Sringeri Sharada Peetham</strong>,
              anchoring scientific inquiry in ethical stewardship and national capability building.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
