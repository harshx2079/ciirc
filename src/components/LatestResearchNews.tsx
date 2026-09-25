'use client';

import React from 'react';

interface NewsItem {
  id: string;
  date: string;
  title: string;
  category: string;
  url: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    date: 'September 5, 2023',
    title: 'Requirement for Research Fellow — Translational Instrumentation & Characterization',
    category: 'CALL FOR FELLOWS',
    url: 'https://ciirc.res.in/requirement-for-research-fellow/'
  },
  {
    id: 'news-2',
    date: 'April 11, 2023',
    title: 'Requirement for Research Fellow RS — Remote Sensing & Geospatial Satellite Telemetry',
    category: 'SPACE & GIS',
    url: 'https://ciirc.res.in/requirement-for-research-fellow-rs/'
  },
  {
    id: 'news-3',
    date: 'April 11, 2023',
    title: 'Requirement for Research Fellow AS — Autonomous Systems, Drone Avionics & Flight Control',
    category: 'ROBOTICS & AVIONICS',
    url: 'https://ciirc.res.in/requirement-for-research-fellow-as/'
  }
];

export const LatestResearchNews: React.FC = () => {
  return (
    <section
      id="news"
      style={{
        position: 'relative',
        paddingTop: '140px',
        paddingBottom: '140px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <div className="atlas-container">
        {/* Section Header */}
        <div
          style={{
            maxWidth: '680px',
            marginBottom: '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <span className="mono-meta" style={{ color: 'var(--blue)' }}>
            07 / RESEARCH ANNOUNCEMENTS
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 3.6vw, 48px)',
              fontWeight: 650,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              margin: 0
            }}
          >
            Latest appointments &amp; dispatches.
          </h2>
        </div>

        {/* 3 Rows (Section 37: date, title, category, arrow) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid var(--border)'
          }}
        >
          {NEWS_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 180px 48px',
                alignItems: 'center',
                gap: '24px',
                padding: '32px 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'background-color 220ms ease'
              }}
            >
              {/* Date */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em'
                }}
              >
                {item.date}
              </span>

              {/* Title with growing blue line beneath */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  className="news-title"
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), color 250ms ease'
                  }}
                >
                  {item.title}
                </span>

                {/* Blue line grows 0px -> 80px on hover (Section 37) */}
                <div
                  className="news-hover-line"
                  style={{
                    height: '2px',
                    width: '0px',
                    backgroundColor: 'var(--blue)',
                    transition: 'width 300ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />
              </div>

              {/* Category */}
              <span
                className="mono-meta"
                style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  textAlign: 'right'
                }}
              >
                {item.category}
              </span>

              {/* Arrow */}
              <span
                className="news-arrow"
                style={{
                  fontSize: '18px',
                  color: 'var(--blue)',
                  textAlign: 'right',
                  transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .news-row:hover .news-title {
          color: var(--blue);
          transform: translateX(6px);
        }
        .news-row:hover .news-hover-line {
          width: 80px;
        }
        .news-row:hover .news-arrow {
          transform: translateX(6px);
        }

        @media (max-width: 900px) {
          .news-row {
            grid-template-columns: 1fr auto !important;
            gap: 12px !important;
            padding: 24px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
