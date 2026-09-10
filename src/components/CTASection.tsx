'use client';

import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { KineticTopology } from './KineticTopology';

export const CTASection: React.FC = () => {
  return (
    <section
      id="cta-section"
      aria-label="Final Convergence"
      style={{
        backgroundColor: '#F5F1E8', // Section 66 & 88: Warm ivory
        minHeight: '620px',
        position: 'relative',
        zIndex: 2,
        paddingTop: '130px',
        paddingBottom: '140px',
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container" style={{ position: 'relative', minHeight: '440px' }}>
        {/* Section 66: Headline RESEARCH WITH PURPOSE.
            Font: 80-110px, Color: #18242D, Highlight: PURPOSE. #3558C8 */}
        <div style={{ maxWidth: '820px', marginBottom: '44px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(60px, 7.5vw, 108px)',
              lineHeight: 0.90,
              letterSpacing: '-0.065em',
              fontWeight: 650,
              color: '#18242D',
              margin: 0
            }}
          >
            RESEARCH WITH <span style={{ color: '#3558C8' }}>PURPOSE.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              lineHeight: 1.65,
              color: '#718087',
              marginTop: '24px',
              maxWidth: '540px',
              margin: '24px 0 0 0'
            }}
          >
            Partner with CIIRC® across doctoral research, sponsored defense and aerospace contracts, incubation of translational intellectual property, or advanced material characterization.
          </p>
        </div>

        {/* Action Group */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            zIndex: 10
          }}
        >
          <a
            href="mailto:info@ciirc.jyothyit.ac.in"
            className="btn-hero-primary"
            style={{ textDecoration: 'none' }}
          >
            <Mail size={16} />
            <span>Initiate Collaboration</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="#research"
            className="btn-hero-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>Explore 17 Directions</span>
          </a>
        </div>

        {/* Section 67: Final Kinetic Topology Callback (Scale 320px, right 8vw, bottom 60px, opacity .45) */}
        <KineticTopology isFinalCallback={true} />
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          #cta-section {
            padding-top: 80px !important;
            padding-bottom: 80px !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
