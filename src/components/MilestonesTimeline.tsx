'use client';

import React from 'react';
import { Compass } from 'lucide-react';
import { HISTORIC_MILESTONES } from '../data/ciircData';

export const MilestonesTimeline: React.FC = () => {
  return (
    <section
      id="milestones"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(5, 13, 24, 0.35)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '48px' }}>
          <div className="section-eyebrow eyebrow-scientific">
            <Compass size={13} /> EXPEDITIONS &amp; RECORD
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.75rem)' }}>
            Historic Breakthroughs &amp; Expeditions
          </h2>
          <p className="section-description">
            An institutional record of first-of-their-kind scientific feats, extreme-environment expeditions,
            and national innovation honours.
          </p>
        </div>

        {/* Editorial Timeline Grid with Thin Lines & Small Blue Indicators (Section 23) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {HISTORIC_MILESTONES.map((item) => (
            <div
              key={item.year + item.title}
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
                e.currentTarget.style.borderColor = item.isArcticOrPolar ? 'var(--scientific)' : 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div>
                {/* Year + Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: item.isArcticOrPolar ? 'var(--scientific)' : 'var(--primary)'
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--primary-bright)'
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <span
                    className={`badge ${
                      item.isArcticOrPolar ? 'badge-scientific' : 'badge-blue'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Achievement Title (#EAF2F8) */}
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    lineHeight: 1.35
                  }}
                >
                  {item.title}
                </h3>

                {/* Supporting Text (#AFC2D4) */}
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65
                  }}
                >
                  {item.description}
                </p>
              </div>

              {item.isArcticOrPolar && (
                <div
                  style={{
                    marginTop: '18px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--surface-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--scientific)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Compass size={13} /> Extreme-Environment Autonomous Flight
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
