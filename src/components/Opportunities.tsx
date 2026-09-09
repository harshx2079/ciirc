'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, ArrowUpRight } from 'lucide-react';
import { LIVE_OPPORTUNITIES } from '../data/ciircData';

export const Opportunities: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Open Application'>('All');

  const items = LIVE_OPPORTUNITIES.filter((item) =>
    filter === 'All' ? true : item.status === 'Open Application'
  );

  return (
    <section
      id="opportunities"
      className="section-wrapper"
      style={{
        backgroundColor: 'rgba(7, 19, 33, 0.40)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Section Header (Section 26) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          <div>
            <div className="section-eyebrow eyebrow-accent">
              <Briefcase size={13} /> LATEST FROM CIIRC
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.75rem)' }}>
              Research Opportunities &amp; Fellowships
            </h2>
            <p className="section-description">
              Official institutional postings for doctoral and postgraduate research fellows in funded laboratories.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilter('All')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                backgroundColor: filter === 'All' ? 'var(--surface-elevated)' : 'var(--surface)',
                color: filter === 'All' ? 'var(--primary-bright)' : 'var(--text-muted)',
                border: '1px solid var(--border)',
                transition: 'all var(--transition-fast)'
              }}
            >
              All Records
            </button>
            <button
              onClick={() => setFilter('Open Application')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                backgroundColor: filter === 'Open Application' ? 'var(--surface-elevated)' : 'var(--surface)',
                color: filter === 'Open Application' ? 'var(--primary-bright)' : 'var(--text-muted)',
                border: '1px solid var(--border)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Active Fellowships Only
            </button>
          </div>
        </div>

        {/* Opportunities List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((opp) => (
            <div
              key={opp.id}
              style={{
                padding: '20px 24px',
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-elevated)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span
                    className={`badge ${
                      opp.status === 'Open Application' ? 'badge-scientific' : 'badge-surface'
                    }`}
                  >
                    {opp.status}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {opp.date}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    • {opp.department}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {opp.title}
                </h4>
              </div>

              <div>
                <a
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                  style={{ fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}
                >
                  Read Opportunity <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
