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

        {/* Animated Scrolling Ribbon Loop (All Companies Side by Side) */}
        <div
          ref={logosReveal.ref}
          className={`motion-reveal ${logosReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            marginBottom: '48px',
            width: '100%'
          }}
        >
          {/* Subtle contextual control indicator */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '0 4px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              14 STRATEGIC ALLIANCES &amp; RESEARCH CONSORTIA
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--primary-bright)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--scientific)',
                  display: 'inline-block'
                }}
              />
              Hover to pause inspection
            </span>
          </div>

          {/* Ribbon Viewport with Gradient Fades */}
          <div className="ribbon-wrapper">
            <div className="ribbon-track">
              {[...STRATEGIC_COLLABORATIONS, ...STRATEGIC_COLLABORATIONS].map((partner, index) => {
                const isGov = partner.category.includes('Government');
                const isAcademic = partner.category.includes('Academic');
                const badgeColor = isGov ? 'var(--primary-bright)' : isAcademic ? 'var(--accent)' : 'var(--scientific)';
                const badgeBg = isGov ? 'var(--primary-subtle)' : isAcademic ? 'var(--accent-subtle)' : 'var(--scientific-subtle)';

                return (
                  <div
                    key={`${partner.name}-${index}`}
                    className="ribbon-card"
                  >
                    {/* Logo / Monogram Container (Sized Up) */}
                    <div
                      style={{
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                      }}
                    >
                      {partner.logoUrl ? (
                        <div
                          style={{
                            backgroundColor: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '52px',
                            width: '148px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)'
                          }}
                        >
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            style={{
                              maxHeight: '40px',
                              maxWidth: '124px',
                              objectFit: 'contain',
                              display: 'block'
                            }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--surface-subtle)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--primary-bright)',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            letterSpacing: '0.04em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)'
                          }}
                        >
                          {partner.initials}
                        </div>
                      )}
                    </div>

                    {/* Company / Organization Name & Category Below Logo */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '6px',
                        width: '100%'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          lineHeight: 1.35,
                          minHeight: '2.7em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          width: '100%'
                        }}
                      >
                        {partner.name}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontSize: '0.64rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          color: badgeColor,
                          backgroundColor: badgeBg,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {partner.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
