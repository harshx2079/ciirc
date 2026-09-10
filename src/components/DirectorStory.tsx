'use client';

import React from 'react';
import Image from 'next/image';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const DirectorStory: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper-green)',
        padding: '160px 0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)'
      }}
    >
      <div className="atlas-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: '56px',
            alignItems: 'center'
          }}
          className="director-story-grid"
        >
          {/* Left: Authentic Portrait Unboxed and Partially Overlapping */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '620px',
              backgroundColor: 'var(--forest)'
            }}
          >
            <Image
              src="/images/director-krishna-venkatesh.jpg"
              alt="Dr. Krishna Venkatesh, Founder-Director, CIIRC®"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{
                objectFit: 'cover',
                filter: 'contrast(1.05) saturate(0.95)'
              }}
            />
            {/* Minimalist edge coordinate label */}
            <div
              className="mono-meta"
              style={{
                position: 'absolute',
                bottom: '-28px',
                left: 0,
                color: 'var(--forest-soft)'
              }}
            >
              DR. KRISHNA VENKATESH // FOUNDER-DIRECTOR
            </div>
          </div>

          {/* Right: The Human Side of Research & Authentic Philosophy */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="mono-meta"
              style={{
                color: 'var(--teal)',
                marginBottom: '28px',
                display: 'inline-block'
              }}
            >
              THE HUMAN SIDE OF RESEARCH
            </span>

            <blockquote
              style={{
                fontSize: 'clamp(28px, 3.8vw, 48px)',
                fontWeight: 650,
                lineHeight: 1.15,
                letterSpacing: '-0.04em',
                color: 'var(--forest)',
                margin: 0
              }}
            >
              “Bringing science, engineering, business orientation, skill development, innovation, incubation and research onto one platform to generate technologies with profound societal consequence.”
            </blockquote>

            <div
              style={{
                marginTop: '44px',
                borderTop: '1px solid var(--line)',
                paddingTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--forest)' }}>
                {CIIRC_IDENTITY.director.name}
              </span>
              <span className="mono-meta" style={{ color: 'var(--muted)' }}>
                {CIIRC_IDENTITY.director.qualifications}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .director-story-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};
