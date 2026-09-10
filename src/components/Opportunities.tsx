'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AUTHENTIC_NEWS_POSTS } from '../data/ciircData';

export const Opportunities: React.FC = () => {
  const featured = AUTHENTIC_NEWS_POSTS.find((p) => p.isFeatured) || AUTHENTIC_NEWS_POSTS[0];
  const secondary = AUTHENTIC_NEWS_POSTS.filter((p) => p.id !== featured.id);

  return (
    <section
      id="news"
      aria-label="07 / LATEST"
      style={{
        backgroundColor: '#F5F1E8', // Section 64 & 88: Warm ivory
        padding: '170px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container">
        {/* Section Heading */}
        <div style={{ marginBottom: '70px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 650,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#3558C8',
              display: 'inline-block',
              marginBottom: '16px'
            }}
          >
            07 / LATEST
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(44px, 4.8vw, 72px)',
              lineHeight: 0.94,
              letterSpacing: '-0.055em',
              fontWeight: 600,
              color: '#18242D',
              margin: 0
            }}
          >
            NEWS &amp; NOTIFICATIONS
          </h2>
        </div>

        {/* Section 64: Asymmetric editorial layout (Featured 62% + Secondary 38%, NO equal cards!) */}
        <div
          className="news-editorial-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '62% 38%',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Featured (62%, image height 520px) */}
          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="featured-post-item"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              cursor: 'pointer'
            }}
          >
            <div
              className="featured-post-img-box"
              style={{
                width: '100%',
                height: '520px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Image
                src="/images/facilities/ciirc-cleanroom.jpg"
                alt={featured.title}
                fill
                sizes="62vw"
                style={{ objectFit: 'cover' }}
                className="featured-img"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  backgroundColor: '#3558C8',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '3px'
                }}
              >
                {featured.category}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: '#718087',
                  marginBottom: '8px'
                }}
              >
                {featured.date}
              </div>
              <h3
                className="news-post-headline"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '24px',
                  lineHeight: 1.3,
                  fontWeight: 650,
                  color: '#18242D',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px',
                  transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), color 350ms ease'
                }}
              >
                {featured.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#718087',
                  marginBottom: '16px',
                  margin: 0
                }}
              >
                {featured.summary}
              </p>
              <div
                className="news-read-action"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 650,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#3558C8',
                  marginTop: '12px'
                }}
              >
                <span>Read Requirement</span>
                <ArrowUpRight size={16} className="news-arrow-icon" />
              </div>
            </div>
          </a>

          {/* Secondary (38%, height 220px) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px'
            }}
          >
            {secondary.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-post-item"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid rgba(24, 36, 45, 0.12)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#3558C8',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#718087'
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                <h4
                  className="news-post-headline"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '18px',
                    lineHeight: 1.35,
                    fontWeight: 650,
                    color: '#18242D',
                    letterSpacing: '-0.02em',
                    transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), color 350ms ease',
                    margin: 0
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: '#718087',
                    margin: 0
                  }}
                >
                  {item.summary}
                </p>

                <div
                  className="news-read-action"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 650,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#3558C8',
                    marginTop: '6px'
                  }}
                >
                  <span>Explore Call</span>
                  <ArrowUpRight size={14} className="news-arrow-icon" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Section 65 News Hover:
           Image: scale(1) -> scale(1.025)
           Headline: translateX(0) -> translateX(5px)
           Arrow: translateX(0) -> translateX(5px)
           Duration: 350ms */
        .featured-post-item:hover :global(.featured-img) {
          transform: scale(1.025);
          transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .featured-post-item:hover .news-post-headline,
        .secondary-post-item:hover .news-post-headline {
          transform: translateX(5px);
          color: #3558C8 !important;
        }

        .featured-post-item:hover :global(.news-arrow-icon),
        .secondary-post-item:hover :global(.news-arrow-icon) {
          transform: translateX(5px);
          transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (max-width: 1024px) {
          .news-editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-post-img-box {
            height: 360px !important;
          }
        }
      `}</style>
    </section>
  );
};
