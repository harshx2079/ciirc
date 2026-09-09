'use client';

import React, { useState } from 'react';
import {
  Search,
  ArrowUpRight,
  Sparkles,
  Microscope,
  Compass,
  Cpu,
  Layers,
  Dna,
  Leaf,
  Droplets,
  Wind,
  Binary,
  Radio,
  Building,
  Flame,
  X
} from 'lucide-react';
import { RESEARCH_VISTAS, ResearchVista } from '../data/ciircData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ResearchEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalVista, setActiveModalVista] = useState<ResearchVista | null>(null);

  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const gridReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.10 });

  const categories = [
    'All',
    'Materials & Nano',
    'Life & Health',
    'Engineering',
    'Earth & Environment',
    'Computing & Systems',
    'Innovation'
  ];

  const filteredVistas = RESEARCH_VISTAS.filter((vista) => {
    const matchesCategory = selectedCategory === 'All' || vista.category === selectedCategory;
    const matchesSearch =
      vista.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vista.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vista.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vista.instrumentsOrFocus.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getVistaIcon = (id: string) => {
    switch (id) {
      case 'sophisticated-instrumentation-facility':
        return <Microscope size={18} color="var(--primary-bright)" />;
      case 'nanosciences-and-engineering':
      case 'surfaces-and-interfaces':
        return <Layers size={18} color="var(--primary-bright)" />;
      case 'biopolymers-and-biocomposites':
        return <Leaf size={18} color="var(--scientific)" />;
      case 'affordable-medical-devices-sensors':
      case 'cell-and-molecular-biology':
      case 'nano-biotechnology':
      case 'food-technology':
      case 'plant-and-microbial-technology':
        return <Dna size={18} color="var(--scientific)" />;
      case 'ancient-indian-science-and-technology':
        return <Compass size={18} color="var(--accent)" />;
      case 'autonomous-systems':
        return <Cpu size={18} color="var(--primary-bright)" />;
      case 'thermal-engineering-tribology':
        return <Flame size={18} color="var(--primary-bright)" />;
      case 'construction-technology':
        return <Building size={18} color="var(--primary-bright)" />;
      case 'computational-engineering':
        return <Binary size={18} color="var(--primary-bright)" />;
      case 'remote-sensing':
        return <Radio size={18} color="var(--primary-bright)" />;
      case 'water':
        return <Droplets size={18} color="var(--scientific)" />;
      case 'environment':
      case 'energy':
        return <Wind size={18} color="var(--scientific)" />;
      default:
        return <Sparkles size={18} color="var(--primary-bright)" />;
    }
  };

  return (
    <section
      id="research"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(7, 19, 33, 0.40)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Section Header with Editorial Reveal */}
        <div
          ref={headerReveal.ref}
          className={`motion-reveal-editorial ${headerReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{ maxWidth: '820px', marginBottom: '40px' }}
        >
          <div className="section-eyebrow">
            <Microscope size={13} /> RESEARCH ECOSYSTEM
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.75rem)' }}>
            What We Investigate
          </h2>
          <p className="section-description">
            CIIRC's 18 specialized laboratories operate across advanced materials, biotechnology, autonomous systems,
            and polar instrumentation, supported by a central characterization suite and incubation hub.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '36px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border)'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="btn-tactile"
                  style={{
                    padding: '7px 15px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    backgroundColor: isActive ? 'var(--surface-elevated)' : 'var(--surface)',
                    color: isActive ? 'var(--primary-bright)' : 'var(--text-muted)',
                    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                    transition: 'all var(--motion-fast) var(--ease-standard)'
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search vistas or instruments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                fontSize: 'var(--text-xs)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Research Cards Grid with Progressive Reveal & Quiet Card Lift */}
        <div
          ref={gridReveal.ref}
          className={`motion-reveal ${gridReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredVistas.map((vista) => (
            <div
              key={vista.id}
              className="card-lift"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header: Number (#67B7FF) + Domain Marker */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      color: 'var(--primary-bright)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {vista.indexNumber}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-surface" style={{ fontSize: '0.68rem' }}>
                      {vista.tag}
                    </span>
                    <div style={{ opacity: 0.85 }}>{getVistaIcon(vista.id)}</div>
                  </div>
                </div>

                {/* Title (#EAF2F8) */}
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    lineHeight: 1.35
                  }}
                >
                  {vista.title}
                </h3>

                {/* Description (#AFC2D4) */}
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}
                >
                  {vista.summary}
                </p>

                {/* Tools / Capabilities Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                  {vista.instrumentsOrFocus.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 8px',
                        backgroundColor: 'var(--surface-subtle)',
                        color: 'var(--text-muted)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                  {vista.instrumentsOrFocus.length > 3 && (
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      +{vista.instrumentsOrFocus.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Explore Link (#3B8CFF) */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <button
                  onClick={() => setActiveModalVista(vista)}
                  className="link-arrow"
                  style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  Explore Scope &amp; Focus →
                </button>

                <a
                  href={vista.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Official Lab Archive"
                  style={{
                    color: 'var(--text-muted)',
                    padding: '4px',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-bright)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-Depth Scope & Focus */}
        {activeModalVista && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(6, 17, 31, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setActiveModalVista(null)}
          >
            <div
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid var(--border)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalVista(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  padding: '6px',
                  color: 'var(--text-muted)'
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--primary-bright)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: '0.06em'
                  }}
                >
                  VISTA {activeModalVista.indexNumber} • {activeModalVista.category}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {activeModalVista.title}
                </h3>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Scientific Scope &amp; Translational Objectives
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                  {activeModalVista.detailedScope}
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Characterization Instruments &amp; Capabilities
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeModalVista.instrumentsOrFocus.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'var(--surface-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <a
                  href={activeModalVista.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: 'var(--text-xs)', padding: '10px 18px' }}
                >
                  Visit Official Lab Archive <ArrowUpRight size={14} />
                </a>
                <button
                  onClick={() => setActiveModalVista(null)}
                  className="btn btn-surface"
                  style={{ fontSize: 'var(--text-xs)', padding: '10px 18px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
