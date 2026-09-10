'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AUTHENTIC_17_RESEARCH_AREAS, ResearchAreaItem } from '../data/ciircData';

export const ResearchAtlas: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<ResearchAreaItem>(AUTHENTIC_17_RESEARCH_AREAS[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleRowMouseEnter = (item: ResearchAreaItem, idx: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    setHoveredItem(item);
    setHoveredIndex(idx);
    const rect = e.currentTarget.getBoundingClientRect();
    if (sectionRef.current) {
      const secRect = sectionRef.current.getBoundingClientRect();
      setMouseY(rect.top - secRect.top + rect.height / 2);
    }
  };

  return (
    <section
      id="research"
      ref={sectionRef}
      aria-label="02 / RESEARCH"
      style={{
        backgroundColor: '#F5F1E8', // Section 45 & 88: Warm ivory
        padding: '180px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="ciirc-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header (Section 45) */}
        <div style={{ marginBottom: '80px' }}>
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
            02 / RESEARCH
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
            17 DIRECTIONS. ONE RESEARCH ECOSYSTEM.
          </h2>
        </div>

        {/* Section 46: Full-Width Editorial Rows (NO cards!) */}
        <div
          className="editorial-research-list"
          style={{
            borderTop: '1px solid rgba(24, 36, 45, 0.12)',
            position: 'relative'
          }}
        >
          {AUTHENTIC_17_RESEARCH_AREAS.map((item, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`research-editorial-row ${isHovered ? 'active' : ''}`}
                onMouseEnter={(e) => handleRowMouseEnter(item, idx, e)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setHoveredItem(item);
                  setHoveredIndex(idx);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '82px',
                  borderBottom: '1px solid rgba(24, 36, 45, 0.12)',
                  textDecoration: 'none',
                  backgroundColor: isHovered ? '#E8EDF1' : 'transparent', // Section 47: background #E8EDF1
                  paddingInline: '16px',
                  transition: 'background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                {/* 8% number (Section 46 & 47: color #3558C8 on hover) */}
                <div
                  style={{
                    width: '8%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isHovered ? '#3558C8' : '#718087',
                    letterSpacing: '0.04em',
                    transition: 'color 220ms ease'
                  }}
                >
                  {item.number}
                </div>

                {/* 58% research name (Section 46 & 47: translateX(8px), color #3558C8 on hover) */}
                <div
                  style={{
                    width: '58%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(20px, 2.2vw, 28px)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: isHovered ? '#3558C8' : '#18242D',
                    transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                    transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms ease'
                  }}
                >
                  {item.name}
                </div>

                {/* 24% secondary information (Section 46) */}
                <div
                  className="row-secondary-info"
                  style={{
                    width: '24%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#718087',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {item.metadata}
                </div>

                {/* 10% arrow (Section 46 & 47: translateX(6px) on hover) */}
                <div
                  style={{
                    width: '10%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <ArrowUpRight
                    size={20}
                    style={{
                      color: isHovered ? '#3558C8' : 'rgba(24, 36, 45, 0.4)'
                    }}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Section 48: Research Preview on Hover
            Dimensions: 320 x 210px, Position: right 7vw
            Initial: opacity: 0, translateY(15px) scale(.97), clip-path: inset(100% 0 0 0)
            Hover: opacity: 1, translateY(0) scale(1), clip-path: inset(0), 450ms */}
        {hoveredIndex !== null && (
          <div
            className="research-hover-preview-box"
            style={{
              position: 'absolute',
              right: '7vw',
              top: `${mouseY}px`,
              transform: 'translateY(-50%)',
              width: '320px',
              height: '210px',
              pointerEvents: 'none',
              zIndex: 30,
              display: 'none'
            }}
          >
            <div
              className="preview-clip-wrapper"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Image
                src={hoveredItem.image}
                alt={hoveredItem.name}
                fill
                sizes="320px"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '8px 12px',
                  backgroundColor: 'rgba(24, 36, 45, 0.88)',
                  color: '#F5F1E8',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                {hoveredItem.category} // DISCIPLINARY DOMAIN
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Desktop Floating Preview (Section 48) */
        @media (min-width: 1025px) {
          .research-hover-preview-box {
            display: block !important;
          }
          .preview-clip-wrapper {
            animation: clipReveal 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        }

        @keyframes clipReveal {
          0% {
            opacity: 0;
            transform: translateY(15px) scale(0.97);
            clip-path: inset(100% 0 0 0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            clip-path: inset(0);
          }
        }

        @media (max-width: 1024px) {
          .row-secondary-info {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
