'use client';

import React from 'react';
import { ArrowDown, CornerDownRight, Compass, Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="CIIRC Living Research Hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '820px',
        maxHeight: '1100px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '78px', // offset header
        zIndex: 1
      }}
    >
      {/* Top Scientific Measurement Metadata Bar */}
      <div
        style={{
          width: '100%',
          padding: '16px 42px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--line)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="scientific-badge active">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--ink)', display: 'inline-block' }} />
            SYSTEM LIVE · SIRO NO. 11/592/2013
          </span>
          <span className="micro-label" style={{ display: 'none' }} id="desktop-coords">
            LAT 12.8615° N · LON 77.5064° E · BENGALURU
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className="micro-label">
            FIELD ATTRACTOR · COORD: 72VW 50VH
          </span>
          <span className="scientific-badge ultramarine">
            50,000 SQ. FT.
          </span>
        </div>
      </div>

      {/* Main Asymmetric Composition (Section 05 & 06) */}
      {/* Approximately: left: 7vw, top: 25vh, width: 54vw */}
      <div
        style={{
          position: 'relative',
          paddingLeft: '7vw',
          width: '54vw',
          minWidth: '320px',
          maxWidth: '860px',
          boxSizing: 'border-box',
          marginTop: '4vh'
        }}
        className="hero-content-block"
      >
        {/* Editorial Index Number */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '18px'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--ultramarine)',
              letterSpacing: '0.08em'
            }}
          >
            [01 / LIVING RESEARCH]
          </span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--line)' }} />
          <span className="micro-label">CIIRC AUTONOMOUS RESEARCH SYSTEM</span>
        </div>

        {/* Section 05 & 06 Headline: unusual line arrangement with mask animation on FOR IMPACT */}
        <h1 className="hero-headline">
          PIONEERING<br />
          MULTIDISCIPLINARY<br />
          SCIENCE <span className="mask-reveal">FOR IMPACT.</span>
        </h1>

        {/* Authentic Subtitle / Scientific Scope */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
            lineHeight: 1.5,
            color: 'var(--ink-soft)',
            marginTop: '32px',
            maxWidth: '520px',
            letterSpacing: '-0.01em'
          }}
        >
          An autonomous DSIR-SIRO scientific institution bridging advanced nanomaterials, 
          autonomous polar robotics, biopolymers, and societal technologies into measurable real-world transformations.
        </p>

        {/* Primary Action Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '36px',
            flexWrap: 'wrap'
          }}
        >
          <a href="#ecosystem" className="btn-rect-dark">
            <span>Explore Living System</span>
            <CornerDownRight size={14} />
          </a>
          <a href="#facilities" className="btn-rect-outline">
            <span>50,000 Sq. Ft. Facility</span>
          </a>
        </div>
      </div>

      {/* Bottom Scientific Viewport Status Bar */}
      <div
        style={{
          width: '100%',
          padding: '16px 42px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '1px solid var(--line)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div className="micro-label">GOVERNMENT RECOGNITION</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)' }}>
              DSIR · SIRO CERTIFIED
            </div>
          </div>
          <div>
            <div className="micro-label">SCIENTIFIC IMPACT</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)' }}>
              300+ PAPERS · 35+ PATENTS
            </div>
          </div>
          <div style={{ display: 'none' }} className="status-extra">
            <div className="micro-label">POLAR MISSIONS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)' }}>
              ARCTIC (2019) · ANTARCTIC (2022)
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <a
          href="#ecosystem"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--ink-soft)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          <span>Scroll to enter research</span>
          <ArrowDown size={14} style={{ color: 'var(--ultramarine)' }} />
        </a>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          #desktop-coords {
            display: inline-block !important;
          }
          .status-extra {
            display: block !important;
          }
        }
        @media (max-width: 767px) {
          .hero-content-block {
            width: 90vw !important;
            padding-left: 5vw !important;
            margin-top: 2vh !important;
          }
        }
      `}</style>
    </section>
  );
};
