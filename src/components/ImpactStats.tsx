'use client';

import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { CIIRC_STATS, StatItem } from '../data/ciircData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

interface StatCardProps {
  stat: StatItem;
  startTrigger: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, startTrigger }) => {
  const numericTarget = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
  const count = useCountUp({ end: numericTarget, duration: 1200, startTrigger });
  const hasPlus = stat.value.includes('+');

  return (
    <div
      className="card-lift"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Animated Number with authentic real data count-up */}
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
          {count}
          {hasPlus && (
            <span style={{ color: stat.isHighlight ? 'var(--accent)' : 'var(--primary-bright)', fontSize: '0.85em' }}>
              +
            </span>
          )}
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
  );
};

export const ImpactStats: React.FC = () => {
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const gridReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

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
        {/* Section Eyebrow & Title with Editorial Reveal */}
        <div
          ref={headerReveal.ref}
          className={`motion-reveal-editorial ${headerReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{ maxWidth: '820px', marginBottom: '48px' }}
        >
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

        {/* Unified Statistics Grid with Count-Up Reveal */}
        <div
          ref={gridReveal.ref}
          className={`motion-reveal ${gridReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {CIIRC_STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} startTrigger={gridReveal.isRevealed} />
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
