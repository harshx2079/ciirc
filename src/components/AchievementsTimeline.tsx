'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface AchievementItem {
  id: string;
  year: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'isro-receiver',
    year: '2018',
    category: 'SPACE TELEMETRY & EARTH OBSERVATION',
    title: 'ISRO NavIC Satellite Ground Station',
    description: 'Commissioned a dedicated on-campus ISRO IRNSS ground station, capturing multi-frequency navigation satellite telemetry for ionospheric scintillation modeling and precision geo-location across South India.',
    image: '/images/official/isro-navic-irnss.jpg',
    imageAlt: 'Authentic ISRO NavIC IRNSS Satellite Telemetry Ground Station at CIIRC',
    tag: 'ISRO NAVIC'
  },
  {
    id: 'arctic-expedition',
    year: '2019',
    category: 'POLAR SCIENCE & AUTONOMOUS SYSTEMS',
    title: 'Fourth Indian Scientific Expedition to the Arctic',
    description: 'CIIRC researchers led the Indian scientific contingent to Svalbard in the high Arctic, successfully executing the first autonomous drone photogrammetry and glacier retreat surveys in extreme sub-zero conditions.',
    image: '/images/official/polar-robotics-platform.jpg',
    imageAlt: 'Authentic CIIRC Autonomous Polar Robotics and UAV Instrumentation Suite',
    tag: 'ARCTIC EXPEDITION'
  },
  {
    id: 'antarctic-mission',
    year: '2020',
    category: 'EXTREME ENVIRONMENT MATERIALS',
    title: 'Scientific Expedition to Antarctica (South Pole)',
    description: 'Selected for an international polar mission investigating ice-shelf mechanical behavior, cryogenic polymer degradation, and cold-tolerant structural composites at the South Pole.',
    image: '/images/official/arctic-polar-expedition.jpg',
    imageAlt: 'Authentic CIIRC Cryosphere Ice-Shelf Expedition and Extreme Environment Field Research',
    tag: 'ANTARCTIC POLAR INITIATIVE'
  },
  {
    id: 'nano-sparx-healthcare',
    year: '2021',
    category: 'TRANSLATIONAL HEALTHCARE',
    title: 'National Nano Sparx Innovation Laureate',
    description: 'Awarded top national honours for translational microfluidic diagnostic strips, enabling low-cost metabolic disease screening and point-of-care clinical diagnostics for underserved populations.',
    image: '/images/official/nano-characterization-suite.jpg',
    imageAlt: 'Authentic CIIRC Analytical Characterization Laboratory Suite for Biosensors',
    tag: 'NANO SPARX LAUREATE'
  }
];

export const AchievementsTimeline: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const clamped = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setProgress(clamped);

      const step = Math.min(
        ACHIEVEMENTS.length - 1,
        Math.floor(clamped * ACHIEVEMENTS.length)
      );
      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    const track = trackRef.current;
    if (track) {
      const rect = track.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const stepScroll = scrollTop + (index / (ACHIEVEMENTS.length - 1)) * (rect.height - window.innerHeight);
      window.scrollTo({ top: stepScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="facilities"
      ref={trackRef}
      style={{
        position: 'relative',
        height: `${ACHIEVEMENTS.length * 100}vh`,
        backgroundColor: 'var(--background)'
      }}
      className="timeline-pin-track"
    >
      {/* Pinned Viewport Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border-subtle)'
        }}
        className="timeline-sticky-stage"
      >
        <div className="atlas-container" style={{ width: '100%' }}>
          {/* Header Navigation with Milestone Selector */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '40px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '24px',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <div className="eyebrow-capsule" style={{ marginBottom: '12px' }}>
                <span className="eyebrow-pulse-dot" />
                <span>06 // SIGNATURE ACHIEVEMENTS TIMELINE</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(32px, 3.4vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-primary)',
                  margin: 0
                }}
              >
                Milestones of scientific leadership.
              </h2>
            </div>

            {/* Milestone Step Selector Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ACHIEVEMENTS.map((item, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleStepClick(idx)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'var(--blue)' : 'var(--surface)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      border: isSelected ? '1px solid var(--blue)' : '1px solid var(--border)',
                      fontSize: '12px',
                      fontWeight: 650,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(22, 119, 255, 0.22)' : 'none'
                    }}
                  >
                    {item.year} · {item.tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Display: Clean cross-transition with ZERO text ghosting */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px'
            }}
            className="timeline-milestones-stage"
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isCurrent = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div
                  key={item.id}
                  style={{
                    position: isCurrent ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'grid',
                    gridTemplateColumns: '44% 56%',
                    gap: '56px',
                    alignItems: 'center',
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent
                      ? 'translateY(0) scale(1)'
                      : isPast
                      ? 'translateY(-24px) scale(0.98)'
                      : 'translateY(24px) scale(0.98)',
                    transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                    pointerEvents: isCurrent ? 'auto' : 'none'
                  }}
                  className="timeline-milestone-grid"
                >
                  {/* Left Column: Image with Staggered Visual Reveal */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '380px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--surface-soft)',
                      boxShadow: isCurrent ? '0 24px 56px rgba(20, 33, 61, 0.09)' : 'none',
                      border: '1px solid var(--border)',
                      opacity: isCurrent ? 1 : 0.8,
                      transition: 'box-shadow 400ms ease, opacity 400ms ease'
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      style={{
                        objectFit: 'cover',
                        transform: isCurrent ? 'scale(1)' : 'scale(1.05)',
                        transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                      priority={idx === 0}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        padding: '6px 12px',
                        backgroundColor: 'rgba(20, 33, 61, 0.82)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: '#FFFFFF',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.tag}
                    </div>
                  </div>

                  {/* Right Column: Staggered Discovery Hierarchy (Year -> Title -> Description) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '20px',
                        opacity: isCurrent ? 1 : 0.6,
                        transition: 'opacity 300ms ease'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(64px, 6.8vw, 108px)',
                          lineHeight: 0.9,
                          fontWeight: 750,
                          letterSpacing: '-0.055em',
                          color: 'var(--blue)'
                        }}
                      >
                        {item.year}
                      </span>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          fontWeight: 700
                        }}
                      >
                        MILESTONE 0{idx + 1} // {item.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(24px, 2.5vw, 36px)',
                        fontWeight: 700,
                        letterSpacing: '-0.035em',
                        color: 'var(--text-primary)',
                        lineHeight: 1.18,
                        margin: 0,
                        opacity: isCurrent ? 1 : 0.7,
                        transition: 'opacity 320ms ease 80ms'
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '16px',
                        lineHeight: 1.68,
                        color: 'var(--text-secondary)',
                        margin: 0,
                        maxWidth: '560px',
                        opacity: isCurrent ? 1 : 0.5,
                        transition: 'opacity 320ms ease 160ms'
                      }}
                    >
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(22, 119, 255, 0.06)',
                          border: '1px solid rgba(22, 119, 255, 0.15)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--blue)'
                        }}
                      >
                        Peer-Reviewed &amp; Archived
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .timeline-pin-track {
            height: auto !important;
          }
          .timeline-sticky-stage {
            position: relative !important;
            height: auto !important;
            padding: 100px 0 !important;
          }
          .timeline-progress-widget {
            display: none !important;
          }
          .timeline-milestones-stage {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 64px !important;
          }
          .timeline-milestone-grid {
            position: relative !important;
            grid-template-columns: 1fr !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
