'use client';

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const InstitutionalIntro: React.FC = () => {
  const sectionReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section
      id="about"
      style={{
        paddingTop: '180px',
        paddingBottom: '200px',
        backgroundColor: '#EFEEE8', // Section 25: warm paper
        borderBottom: '1px solid rgba(23, 35, 43, 0.10)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Asymmetric Grid: Left 3 cols, Right 8 cols */}
        <div
          ref={sectionReveal.ref}
          className={`grid-12 reveal-editorial ${sectionReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{ alignItems: 'start', position: 'relative' }}
        >
          {/* Left 3 Columns: Index 01 / ABOUT CIIRC */}
          <div className="col-3" style={{ paddingTop: '8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 650,
                color: '#3157C8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              <span>01</span>
              <span style={{ color: 'rgba(23, 35, 43, 0.25)' }}>/</span>
              <span>ABOUT CIIRC</span>
            </div>
          </div>

          {/* Right 8 Columns: Editorial Statement & Paragraphs */}
          <div className="col-8" style={{ position: 'relative' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                fontWeight: 650,
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
                color: '#17232B',
                marginBottom: '48px',
                maxWidth: '820px'
              }}
            >
              Converging science, applied engineering, and enterprise incubation.
            </h2>

            {/* Thin horizontal line above paragraph */}
            <div
              style={{
                width: '100%',
                maxWidth: '650px',
                height: '1px',
                backgroundColor: 'rgba(23, 35, 43, 0.14)',
                marginBottom: '32px'
              }}
            />

            <div
              style={{
                maxWidth: '650px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '18px',
                  lineHeight: 1.68,
                  color: '#33434B'
                }}
              >
                CIIRC® is a multidisciplinary research, innovation, and incubation centre established as a joint initiative of{' '}
                <strong style={{ color: '#17232B', fontWeight: 650 }}>Sri Sringeri Sharada Peetham</strong>, Sringeri, and{' '}
                <strong style={{ color: '#17232B', fontWeight: 650 }}>Jyothy Institute of Technology (JIT)</strong>. Certified as an official{' '}
                <strong style={{ color: '#17232B', fontWeight: 650 }}>Scientific and Industrial Research Organisation (SIRO)</strong> by DSIR,
                Ministry of Science &amp; Technology, Government of India.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  lineHeight: 1.68,
                  color: '#69777A'
                }}
              >
                Operating across 50,000 sq.ft. of centralized research space, our scholars and faculty bridge fundamental chemistry,
                physics, and biology with industrial translational engineering. Through our on-campus Atal Incubation Centre (AIC - JIT Foundation)
                and Innovation &amp; Entrepreneurship Development Centre (IEDC), intellectual discoveries advance systematically toward patenting,
                field trials, and societal deployment.
              </p>
            </div>
          </div>

          {/* Far-right vertical scientific coordinate structure */}
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '20px',
              bottom: '20px',
              width: '60px',
              display: 'flex',
              justifyContent: 'space-between',
              opacity: 0.35,
              pointerEvents: 'none'
            }}
            className="intro-coordinate-structure"
          >
            <div style={{ width: '1px', height: '100%', backgroundColor: 'rgba(49, 87, 200, 0.35)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '15%', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3157C8' }} />
              <div style={{ position: 'absolute', top: '75%', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4C8176' }} />
            </div>
            <div style={{ width: '1px', height: '100%', backgroundColor: 'rgba(76, 129, 118, 0.30)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '40%', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3157C8' }} />
              <div style={{ position: 'absolute', top: '90%', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#17232B' }} />
            </div>
            <div style={{ width: '1px', height: '100%', backgroundColor: 'rgba(23, 35, 43, 0.20)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '25%', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4C8176' }} />
              <div style={{ position: 'absolute', top: '60%', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3157C8' }} />
              <span
                style={{
                  position: 'absolute',
                  top: '48%',
                  right: '-28px',
                  transform: 'rotate(90deg)',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  fontFamily: 'var(--font-mono)',
                  color: '#3157C8',
                  fontWeight: 600
                }}
              >
                12.87N
              </span>
              <span
                style={{
                  position: 'absolute',
                  top: '80%',
                  right: '-28px',
                  transform: 'rotate(90deg)',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  fontFamily: 'var(--font-mono)',
                  color: '#4C8176',
                  fontWeight: 600
                }}
              >
                77.51E
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .intro-coordinate-structure {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
