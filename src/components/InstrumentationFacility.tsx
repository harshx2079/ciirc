'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Microscope, ArrowUpRight } from 'lucide-react';

export const InstrumentationFacility: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [mousePos, setMousePos] = useState<{ x: number; y: number; inside: boolean }>({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height * 0.5)));
        setScrollProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, inside: true });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, inside: false }));
  };

  // Section 24: As user scrolls into it, scale 1.12 -> 1.0
  const currentScale = 1.12 - scrollProgress * 0.12;

  // Section 26: cursor subtly offsets image-position (max 10px)
  const offsetX = mousePos.inside ? ((mousePos.x / (window.innerWidth * 0.72)) - 0.5) * 20 : 0;
  const offsetY = mousePos.inside ? ((mousePos.y / (window.innerHeight * 0.65)) - 0.5) * 20 : 0;

  return (
    <section
      id="facilities"
      ref={containerRef}
      aria-label="CIIRC Sophisticated Instrumentation Facility"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '110vh',
        padding: '120px 42px 140px 42px',
        boxSizing: 'border-box',
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      {/* Top Metadata */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '40px',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '24px'
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
            [04 / ARCHITECTURE & INFRASTRUCTURE]
          </span>
          <span className="micro-label">SIF ANALYTICAL CORE · 50,000 SQ. FT.</span>
        </div>

        <span className="scientific-badge ultramarine">
          DSIR-SIRO RECOGNIZED LABS
        </span>
      </div>

      {/* Section 24 & 25: Asymmetric Photographic Canvas & Collision Headline */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Section 25: Collision Headline "RESEARCH IS BUILT HERE." */}
        {/* Partially overlapping the image, contrast-aware */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'none',
            marginBottom: '-6vw'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 8.5vw, 126px)',
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: '-0.06em',
              color: 'var(--ink)',
              maxWidth: '900px'
            }}
          >
            RESEARCH IS<br />
            <span style={{ color: 'var(--ultramarine)' }}>BUILT HERE.</span>
          </h2>
        </div>

        {/* Section 24: Enormous Photograph 72vw width, 65vh height, placed asymmetrically */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            width: '72vw',
            height: '65vh',
            minHeight: '480px',
            marginLeft: 'auto', // Asymmetric right placement
            overflow: 'hidden',
            cursor: 'crosshair',
            border: '1px solid var(--ink)',
            backgroundColor: 'var(--paper-2)'
          }}
          className="facility-image-wrapper"
        >
          <img
            src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1600&q=85"
            alt="CIIRC Sophisticated Instrumentation Facility"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${currentScale * (mousePos.inside ? 1.015 : 1.0)}) translate(${offsetX}px, ${offsetY}px)`,
              transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Section 26: VIEW FACILITY -> label near cursor inside image */}
          {mousePos.inside && (
            <div
              style={{
                position: 'absolute',
                top: `${mousePos.y + 12}px`,
                left: `${mousePos.x + 16}px`,
                backgroundColor: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                padding: '6px 12px',
                pointerEvents: 'none',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid var(--line-light)'
              }}
            >
              <span>VIEW FACILITY</span>
              <ArrowUpRight size={12} style={{ color: 'var(--acid)' }} />
            </div>
          )}

          {/* Authentic Laboratory Overlay Badges */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'rgba(16, 24, 32, 0.88)',
              padding: '16px 20px',
              color: 'var(--white)',
              maxWidth: '380px'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', color: 'var(--acid)' }}>
              SOPHISTICATED INSTRUMENTATION FACILITY (SIF)
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.85)' }}>
              Housing SEM, XRD, GC, FT-IR Spectrophotometer, DSC/TGA & BET Surface Area Analyzer.
            </div>
          </div>
        </div>

        {/* Supporting Editorial Column */}
        <div
          style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            borderTop: '1px solid var(--line)',
            paddingTop: '32px'
          }}
        >
          <div>
            <div className="micro-label">CENTRALIZED CORE FACILITY</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--ink-soft)', marginTop: '8px' }}>
              Open-access characterization suite providing high-resolution analytical services to scholars, academic institutions, and industrial clients across South India.
            </p>
          </div>
          <div>
            <div className="micro-label">SPECIALIZED INCUBATION BEDS</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--ink-soft)', marginTop: '8px' }}>
              Dedicated cleanrooms and pilot testing bays for advanced materials, microfluidic healthcare sensors, and autonomous drone payloads.
            </p>
          </div>
          <div>
            <div className="micro-label">TRANSLATIONAL VERIFICATION</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--ink-soft)', marginTop: '8px' }}>
              Strict calibration standards compliant with international protocols and national accreditation bodies.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .facility-image-wrapper {
            width: 100% !important;
            height: 50vh !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
