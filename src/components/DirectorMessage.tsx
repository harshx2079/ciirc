'use client';

import React from 'react';
import { ArrowUpRight, GraduationCap, Quote } from 'lucide-react';
import { CIIRC_IDENTITY } from '../data/ciircData';

export const DirectorMessage: React.FC = () => {
  const { director } = CIIRC_IDENTITY;

  return (
    <section
      id="director"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(7, 19, 33, 0.40)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Editorial Composition (Section 24) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Statement & Authentic Quote */}
          <div>
            <div className="section-eyebrow">
              <Quote size={13} /> DIRECTOR'S MESSAGE
            </div>

            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(1.85rem, 3.2vw, 2.4rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                marginBottom: '24px'
              }}
            >
              "Teaching and research are becoming increasingly multidisciplinary. Globalization requires scholars prepared with a multitude of skills."
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.75 }}>
                {director.quote}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                As Founding Director, Dr. Venkatesh has steered CIIRC to establish incubation and research facilities
                spanning 18 different domains of science alongside an Atal Incubation Centre from NITI Aayog, GoI.
              </p>
            </div>

            {/* Director Bio & Qualifications Strip */}
            <div
              style={{
                padding: '20px 22px',
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                marginBottom: '28px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <GraduationCap size={18} color="var(--primary-bright)" />
                <strong style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
                  {director.name}
                </strong>
                <span className="badge badge-blue">{director.role}</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--primary-bright)', marginBottom: '8px' }}>
                {director.qualifications}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {director.bio}
              </p>
            </div>

            <div>
              <a
                href="https://ciirc.res.in/directors-profile/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Read Full Director's Profile <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Photograph Composition */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '460px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(6, 17, 31, 0.4)'
              }}
            >
              <img
                src="https://ciirc.res.in//wp-content/uploads/2021/06/unnamed.jpg"
                alt="Dr. Krishna Venkatesh, Founder-Director CIIRC®"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: 'var(--surface-subtle)',
                  borderTop: '1px solid var(--border)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                  Dr. Krishna Venkatesh
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Founder-Director, CIIRC® • IISc Alumnus &amp; Ph.D. in Nanoengineering
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
