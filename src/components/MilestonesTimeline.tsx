'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

const EXTENDED_MILESTONES = [
  {
    year: '2017',
    badge: 'AUTOMOTIVE INNOVATION',
    title: '100% WCO Biodiesel Vehicle Pace Car',
    desc: 'Successfully engineered vehicle running on 100% used cooking oil (WCO) biodiesel, serving as official pace car at the Asia Pacific Coffee-500 rally.',
    category: 'Bioenergy & Tribology',
    imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2018',
    badge: 'NATIONAL HONOUR',
    title: 'Bangalore Nano Most Innovative Product Display',
    desc: 'Awarded at Bangalore India Nano summit for breakthrough innovative nanotechnology displays and translational materials developed in CIIRC laboratories.',
    category: 'Nanotechnology',
    imgUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2019',
    badge: 'POLAR MILESTONE',
    title: '4th Indian Scientific Expedition to the Arctic',
    desc: 'Led the Indian scientific contingent to the North Pole (Arctic) for glacier mapping, proudly becoming first Indians to fly autonomous UAV drones in Arctic terrain.',
    category: 'Avionics & Robotics',
    imgUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2019',
    badge: 'SPACE TELEMETRY',
    title: 'ISRO IRNSS (NavIC) Satellite Receiver',
    desc: 'Commissioned on-campus dedicated ISRO NavIC satellite receiver station for atmospheric data collection and aerospace positioning telemetry.',
    category: 'Space & Geospatial',
    imgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2020',
    badge: 'TRANSLATIONAL AWARD',
    title: 'National Nano Sparx Innovation Recognition',
    desc: 'Conferred the acclaimed Nano Sparx award for translational research in functional nanomaterials and healthcare biosensors.',
    category: 'Nanotechnology',
    imgUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2022',
    badge: 'POLAR EXPEDITION',
    title: 'Scientific Expedition to Antarctica (South Pole)',
    desc: 'CIIRC faculty selected as part of elite international scientific expedition to the South Pole for ice shelf and climate instrumentation.',
    category: 'Environmental & Sensors',
    imgUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2024-26',
    badge: 'DEEP TECH TRANSLATION',
    title: 'Next-Gen Multi-Scale Sensor & Hydrogen Consortia',
    desc: 'Secured national multi-institutional consortia grants across clean hydrogen storage, advanced micro-electrochemical diagnostics, and societal water nanotech.',
    category: 'Societal Impact',
    imgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  }
];

export const MilestonesTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Update track scrollable distance on mount / resize
  const updateMetrics = useCallback(() => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const maxShift = Math.max(0, trackWidth - windowWidth + 84);
    setMaxTranslate(maxShift);
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics]);

  // Handle document scroll to advance progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // When container hits top of viewport (rect.top <= 0), calculate progress
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to specific milestone index
  const goToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index / (EXTENDED_MILESTONES.length - 1);
    const targetScrollY = window.scrollY + rect.top + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const currentIndex = Math.round(scrollProgress * (EXTENDED_MILESTONES.length - 1));

  // Current translation in pixels
  const currentShiftPx = scrollProgress * maxTranslate;

  return (
    <section
      id="timeline"
      ref={containerRef}
      aria-label="CIIRC Historic Milestones Timeline"
      style={{
        position: 'relative',
        width: '100%',
        height: '350vh', // Provides scroll runway to drive horizontal movement
        backgroundColor: 'var(--paper)',
        zIndex: 4
      }}
    >
      {/* Pinned Viewport Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          maxWidth: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '90px 0 40px 0',
          boxSizing: 'border-box'
        }}
      >
        {/* Pinned Section Header */}
        <div
          style={{
            padding: '0 clamp(16px, 3vw, 42px) 20px clamp(16px, 3vw, 42px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--line)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--ultramarine)',
                letterSpacing: '0.08em'
              }}
            >
              [06 / HISTORIC TIMELINE]
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 3vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--ink)'
              }}
            >
              CHRONOLOGY OF DISCOVERY (2017—2026)
            </h2>
          </div>

          {/* Interactive Milestone Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Year selector pills */}
            <div style={{ display: 'none', alignItems: 'center', gap: '6px' }} className="timeline-year-pills">
              {EXTENDED_MILESTONES.map((m, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToMilestone(idx)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      padding: '4px 8px',
                      backgroundColor: isActive ? 'var(--ink)' : 'var(--paper-2)',
                      color: isActive ? 'var(--white)' : 'var(--ink-soft)',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--ink)' : 'var(--line)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease'
                    }}
                  >
                    {m.year}
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => goToMilestone(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                aria-label="Previous Milestone"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--paper-2)',
                  border: '1px solid var(--line)',
                  color: currentIndex === 0 ? 'var(--ink-muted)' : 'var(--ink)',
                  cursor: currentIndex === 0 ? 'default' : 'pointer'
                }}
              >
                <ArrowLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => goToMilestone(Math.min(EXTENDED_MILESTONES.length - 1, currentIndex + 1))}
                disabled={currentIndex === EXTENDED_MILESTONES.length - 1}
                aria-label="Next Milestone"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--paper-2)',
                  border: '1px solid var(--line)',
                  color: currentIndex === EXTENDED_MILESTONES.length - 1 ? 'var(--ink-muted)' : 'var(--ink)',
                  cursor: currentIndex === EXTENDED_MILESTONES.length - 1 ? 'default' : 'pointer'
                }}
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic ScaleX Progress Line (Section 31) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--line)',
            margin: '16px 0'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'var(--ultramarine)',
              transformOrigin: 'left',
              transform: `scaleX(${Math.max(0.04, scrollProgress)})`,
              transition: 'transform 100ms ease-out'
            }}
          />
        </div>

        {/* Horizontal Track with Exact Measured Translation */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 'clamp(32px, 5vw, 64px)',
              paddingLeft: 'clamp(16px, 3vw, 42px)',
              paddingRight: '120px',
              width: 'max-content',
              transform: `translateX(-${currentShiftPx}px)`,
              transition: 'transform 100ms ease-out',
              boxSizing: 'border-box',
              willChange: 'transform'
            }}
          >
            {EXTENDED_MILESTONES.map((item, idx) => {
              const isCurrent = idx === currentIndex;

              return (
                <div
                  key={idx}
                  style={{
                    width: 'clamp(300px, 28vw, 420px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: '2px solid',
                    borderColor: isCurrent ? 'var(--ultramarine)' : 'var(--line)',
                    paddingLeft: '28px',
                    transition: 'border-color 200ms ease'
                  }}
                >
                  {/* Year & Category */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(32px, 3.8vw, 48px)',
                        fontWeight: 700,
                        letterSpacing: '-0.06em',
                        color: isCurrent ? 'var(--ultramarine)' : 'var(--ink)',
                        lineHeight: 1,
                        transition: 'color 200ms ease'
                      }}
                    >
                      {item.year}
                    </span>
                    <span className={`scientific-badge ${isCurrent ? 'active' : ''}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Milestone Image */}
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      border: '1px solid var(--line)',
                      backgroundColor: 'var(--paper-2)'
                    }}
                  >
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>

                  <div className="micro-label" style={{ marginBottom: '6px', color: 'var(--ultramarine)' }}>
                    {item.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      lineHeight: 1.25,
                      color: 'var(--ink)',
                      marginBottom: '10px'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                      color: 'var(--ink-soft)'
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pinned Status Bar */}
        <div
          style={{
            padding: '16px clamp(16px, 3vw, 42px) 0 clamp(16px, 3vw, 42px)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span className="micro-label">
            VERIFIED INSTITUTIONAL RECORDS 2017—2026 · CIIRC
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ultramarine)', fontWeight: 600 }}>
              {Math.round(scrollProgress * 100)}%
            </span>
            <span className="micro-label">SCROLLED</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          .timeline-year-pills {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};
