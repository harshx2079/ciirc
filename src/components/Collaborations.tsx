'use client';

import React from 'react';
import { Award, Globe2, CheckCircle2 } from 'lucide-react';
import { STRATEGIC_COLLABORATIONS, RESEARCH_FELLOWSHIPS_WON } from '../data/ciircData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Collaborations: React.FC = () => {
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const logosReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.10 });
  const fellowshipsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.10 });

  return (
    <section
      id="collaborations"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(5, 13, 24, 0.35)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Section Header with Editorial Reveal */}
        <div
          ref={headerReveal.ref}
          className={`motion-reveal-editorial ${headerReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{ maxWidth: '820px', marginBottom: '44px' }}
        >
          <div className="section-eyebrow">
            <Globe2 size={13} /> GLOBAL SCIENTIFIC NETWORK
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.75rem)' }}>
            Collaborations, MOUs &amp; Academic Alliances
          </h2>
          <p className="section-description">
            Bilateral scientific initiatives, industrial testing agreements, and academic MOUs executed across
            Russia, Germany, Taiwan, France, Sweden, and national defense agencies.
          </p>
        </div>

        {/* Sophisticated Logo System with Reveal & Card Lift */}
        <div
          ref={logosReveal.ref}
          className={`motion-reveal ${logosReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
            gap: '14px',
            marginBottom: '44px'
          }}
        >
          {STRATEGIC_COLLABORATIONS.map((partner) => (
            <div
              key={partner.name}
              className="card-lift"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '120px'
              }}
            >
              {partner.logoUrl ? (
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    style={{
                      maxHeight: '36px',
                      maxWidth: '110px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--primary-bright)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    fontSize: 'var(--text-xs)'
                  }}
                >
                  {partner.initials}
                </div>
              )}

              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3
                }}
              >
                {partner.name}
              </div>
              <span
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--text-muted)',
                  marginTop: '3px'
                }}
              >
                {partner.category}
              </span>
            </div>
          ))}
        </div>

        {/* Faculty Fellowships Conferred */}
        <div
          ref={fellowshipsReveal.ref}
          className={`motion-reveal ${fellowshipsReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '28px 26px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Award size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
              National &amp; International Fellowships Conferred to CIIRC Faculty
            </h3>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Faculty members have been granted prestigious research fellowships from international councils and central ministries:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {RESEARCH_FELLOWSHIPS_WON.map((fel) => (
              <span
                key={fel}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)'
                }}
              >
                <CheckCircle2 size={12} color="var(--scientific)" />
                {fel}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
