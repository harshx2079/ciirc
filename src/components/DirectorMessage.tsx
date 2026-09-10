'use client';

import React from 'react';
import Image from 'next/image';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const DirectorMessage: React.FC = () => {
  return (
    <section
      id="director"
      aria-label="Director Perspective"
      style={{
        backgroundColor: '#EEE9DE', // Section 63 & 88: Warm stone
        padding: '170px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container">
        {/* Section Label */}
        <div style={{ marginBottom: '60px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 650,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#3558C8',
              display: 'inline-block'
            }}
          >
            LEADERSHIP &amp; PHILOSOPHY
          </span>
        </div>

        {/* Split Layout: 48vw portrait + 38vw text (Section 63) */}
        <div
          className="director-split"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            position: 'relative',
            width: '100%'
          }}
        >
          {/* Portrait: 48vw width, 680px height (Section 63) */}
          <div
            className="portrait-box"
            style={{
              position: 'relative',
              width: '48vw',
              height: '680px',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <Image
              src="/images/director-krishna-venkatesh.jpg"
              alt="Dr. Krishna Venkatesh, Founder-Director, CIIRC"
              fill
              sizes="48vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right-side message: 38vw, margin-left 7vw, margin-top 120px (Section 63) */}
          <div
            className="director-quote-col"
            style={{
              width: '38vw',
              marginLeft: '7vw',
              marginTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(34px, 3.6vw, 56px)', // Section 63: 44-62px
                lineHeight: 1.0,
                letterSpacing: '-0.045em',
                fontWeight: 600,
                color: '#18242D',
                margin: 0
              }}
            >
              &ldquo;Technological convergence requires a new class of scholars equipped with multiple perspectives, sharp creative skills, and willingness to adapt for the benefit of mankind.&rdquo;
            </blockquote>

            <div
              style={{
                borderTop: '1px solid rgba(24, 36, 45, 0.14)',
                paddingTop: '24px'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '20px',
                  fontWeight: 650,
                  color: '#18242D',
                  letterSpacing: '-0.02em',
                  marginBottom: '4px'
                }}
              >
                {CIIRC_IDENTITY.director.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 650,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3558C8',
                  marginBottom: '8px'
                }}
              >
                {CIIRC_IDENTITY.director.role}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#718087'
                }}
              >
                {CIIRC_IDENTITY.director.qualifications}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .director-split {
            flex-direction: column !important;
          }
          .portrait-box {
            width: 100% !important;
            height: 480px !important;
          }
          .director-quote-col {
            width: 100% !important;
            margin-left: 0 !important;
            margin-top: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
