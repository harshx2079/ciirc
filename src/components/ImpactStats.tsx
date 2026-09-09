'use client';

import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { CIIRC_STATS } from '../data/ciircData';

export const ImpactStats: React.FC = () => {
  return (
    <section
      id="impact"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(3, 10, 19, 0.40)',
        color: 'var(--text-primary)',
        borderBottom: '1px solid var(--border)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Eyebrow & Title (One Institutional Statement - Section 22) */}
        <div style={{ maxWidth: '820px', marginBottom: '48px' }}>
          <div className="section-eyebrow eyebrow-accent">
            <ShieldCheck size={13} /> IMPACT
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.75rem)' }}>
            Empirical Output &amp; Institutional Scale
          </h2>
          <p className="section-description">
            Validated scientific output delivered across central government grants, defense and space projects,
            international bilateral consortia, and societal product commercialization.
          </p>
        </div>

        {/* Unified Statistics Grid (Not separate colorful cards - Section 22) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {CIIRC_STATS.map((stat) => (
            <div
              key={stat.id}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
                e.currentTarget.style.borderColor = stat.isHighlight ? 'var(--accent)' : 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div>
                {/* Number in #EAF2F8 with optional small accent in #F6B84B or #67B7FF */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(2.5rem, 4vw, 3.2rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    marginBottom: '10px'
                  }}
                >
                  {stat.value.replace('+', '')}
                  <span style={{ color: stat.isHighlight ? 'var(--accent)' : 'var(--primary-bright)', fontSize: '0.85em' }}>
                    +
                  </span>
                </div>

                <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {stat.label}
                </div>
              </div>

              {/* Label in #6F879D */}
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '16px'
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Agency Endorsement Strip */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--surface-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}
        >
          <Award size={18} color="var(--primary-bright)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Funded by Premier National &amp; Bilateral Agencies:</strong> DST,
            DRDO, DBT, MOES, DOS (ISRO), VGST, KCTU, CEFIPRA (Indo-French), DST-GITA, UGC-DAE, VTU, and AYUSH;
            including bilateral scientific programs with France, Sweden, Belarus, ASEAN, Egypt, and the European Union.
          </p>
        </div>
      </div>
    </section>
  );
};
