'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PorousLatticeSphere } from './PorousLatticeSphere';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section 22: Refined Physical Button Interaction (4-6px subtle magnet on desktop only)
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = primaryBtnRef.current;
    if (!btn || window.innerWidth < 1024) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.12;
    const deltaY = (e.clientY - centerY) * 0.12;

    const clampX = Math.max(Math.min(deltaX, 6), -6);
    const clampY = Math.max(Math.min(deltaY, 6), -6);

    btn.style.transform = `translate(${clampX}px, ${clampY - 2}px)`;
  };

  const handleBtnMouseLeave = () => {
    const btn = primaryBtnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease, background-color 220ms ease';
    setTimeout(() => {
      if (btn) {
        btn.style.transition = '';
      }
    }, 260);
  };

  // Section 4: Hero Scroll Exit Choreography (Page feels like a camera moving through CIIRC)
  const scrollRatio = Math.min(scrollY / 500, 1);
  const headlineOffsetY = scrollRatio * 40; // 0 -> -40px translation
  const headlineScale = 1 - scrollRatio * 0.04; // 1 -> 0.96 scale
  const headlineOpacity = 1 - scrollRatio * 0.8; // 1 -> 0.2 opacity
  const descOffsetY = scrollRatio * 24;
  const descOpacity = Math.max(1 - scrollRatio * 0.9, 0);
  const ctaOpacity = Math.max(1 - scrollRatio * 1.1, 0);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 20 : 38;
    const particles = Array.from({ length: count }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        baseX: x,
        baseY: y,
        x,
        y,
        r: Math.random() * 0.7 + 0.7,
        opacity: Math.random() * 0.08 + 0.06,
        ampX: Math.random() * 14 + 6,
        ampY: Math.random() * 10 + 4,
        speed: Math.random() * 0.0004 + 0.0002,
        phase: Math.random() * Math.PI * 2
      };
    });

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x = p.baseX + Math.sin(time * p.speed + p.phase) * p.ampX;
        p.y = p.baseY + Math.cos(time * p.speed + p.phase) * p.ampY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(22, 119, 255, ${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: '100svh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'clamp(96px, 12vh, 150px)',
        paddingBottom: 'clamp(48px, 6vh, 80px)',
        overflow: 'hidden',
        backgroundColor: 'var(--background)'
      }}
      className="hero-stage"
    >
      {/* Multi-Layer Soft Atmospheric Blue Field (Expansive organic drift all over hero, strictly screen-bounded) */}
      <div
        className="hero-atmosphere-field"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
          transform: `translateY(${Math.min(scrollY * 0.07, 32)}px)`,
          transition: 'transform 80ms ease-out'
        }}
        aria-hidden="true"
      >
        {/* Layer 1: Primary Soft Atmospheric Blue Gradient */}
        <div className="hero-atmosphere-primary" />

        {/* Layer 2: Harmonic Secondary Ambient Drift */}
        <div className="hero-atmosphere-secondary" />

        {/* Canvas for delicate ambient particles */}
        <canvas
          ref={particleCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      </div>

      {/* Hero Content Container (Unified Responsive CSS Grid) */}
      <div
        className="atlas-container hero-container"
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)',
          alignItems: 'center',
          gap: 'clamp(24px, 3.5vw, 56px)'
        }}
      >
        {/* Left Column: Editorial Typography */}
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto'
          }}
          className="hero-copy-column"
        >
          {/* Eyebrow Capsule */}
          <div
            className="hero-eyebrow-wrapper"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(14px)',
              transition:
                'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) 250ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) 250ms',
              marginBottom: 'clamp(24px, 2.8vw, 38px)'
            }}
          >
            <div className="eyebrow-capsule">
              <span className="eyebrow-pulse-dot" />
              <span>Centre for Incubation, Innovation, Research &amp; Consultancy</span>
            </div>
          </div>

          {/* Masked Editorial Headline (Reliable line boxes, no collision with descenders) */}
          <h1
            style={{
              fontSize: 'clamp(46px, 5.4vw, 94px)',
              lineHeight: 0.98,
              letterSpacing: '-0.052em',
              fontWeight: 650,
              color: 'var(--text-primary)',
              margin: 0,
              padding: 0,
              transform: `translateY(-${headlineOffsetY}px) scale(${headlineScale})`,
              transformOrigin: 'left top',
              opacity: headlineOpacity,
              transition: 'transform 80ms ease-out, opacity 80ms ease-out'
            }}
            className="hero-headline"
          >
            {/* Line 1: Where research */}
            <span
              style={{
                display: 'block',
                overflow: 'hidden',
                paddingBottom: '2px'
              }}
            >
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(100%)',
                  transition:
                    'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms'
                }}
              >
                Where research
              </span>
            </span>

            {/* Line 2: becomes */}
            <span
              style={{
                display: 'block',
                overflow: 'hidden',
                paddingBottom: '2px'
              }}
            >
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(115%)',
                  transition:
                    'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 430ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 430ms'
                }}
              >
                becomes
              </span>
            </span>

            {/* Line 3: Accent with generous bottom padding for descender ("y.") clearance */}
            <span
              style={{
                display: 'block',
                overflow: 'hidden',
                paddingBottom: '0.28em',
                marginBottom: '-0.16em'
              }}
            >
              <span
                className="hero-gradient-word"
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  paddingBottom: '0.22em',
                  marginBottom: '-0.22em',
                  background:
                    'linear-gradient(135deg, #0F62EC 0%, #1677FF 38%, #3C8FFF 68%, #1464D2 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'var(--blue)',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(90%)',
                  transition:
                    'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 510ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 510ms'
                }}
              >
                possibility.
              </span>
            </span>
          </h1>

          {/* Description Paragraph with strictly governed responsive breathing space */}
          <p
            className="hero-paragraph"
            style={{
              fontSize: 'clamp(15.5px, 1.25vw, 18px)',
              lineHeight: 1.66,
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: 0,
              marginTop: 'clamp(20px, 2.4vw, 34px)',
              transform: `translateY(-${descOffsetY}px)`,
              opacity: descOpacity * (mounted ? 1 : 0),
              transition: mounted
                ? 'transform 80ms ease-out, opacity 80ms ease-out'
                : 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 700ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 700ms'
            }}
          >
            A multidisciplinary research and incubation centre uniting fundamental science,
            advanced engineering, and translational enterprise to transform pioneering discovery
            into profound societal consequence.
          </p>

          {/* CTAs with balanced breathing space */}
          <div
            className="hero-cta-wrapper"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(12px, 1.5vw, 16px)',
              flexWrap: 'wrap',
              marginTop: 'clamp(24px, 2.6vw, 38px)',
              opacity: ctaOpacity * (mounted ? 1 : 0),
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: mounted
                ? 'opacity 80ms ease-out'
                : 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 800ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 800ms'
            }}
          >
            <a
              ref={primaryBtnRef}
              href="#research"
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="btn-primary-ciirc hero-btn"
              style={{
                height: 'clamp(48px, 4vw, 52px)',
                padding: '0 24px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Explore Research</span>
              <span
                className="cta-arrow"
                style={{ transition: 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                →
              </span>
            </a>

            <a
              href="#idea"
              className="btn-secondary-ciirc hero-btn"
              style={{
                height: 'clamp(48px, 4vw, 52px)',
                padding: '0 24px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Discover CIIRC</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Stage (Integrated directly into the fluid CSS Grid) */}
        <div
          className="hero-3d-stage"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '680px',
            height: 'clamp(400px, 46vw, 660px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            pointerEvents: 'auto',
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? `translateY(${scrollRatio * 24}px) scale(${1 - scrollRatio * 0.05})`
              : 'scale(0.96)',
            transition: mounted
              ? 'transform 100ms ease-out'
              : 'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 300ms'
          }}
        >
          <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
            <PorousLatticeSphere scrollY={scrollY} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Middle - Bottom Centre) */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(16px, 2.8vh, 30px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: Math.max(1 - scrollY / 80, 0),
          pointerEvents: 'none',
          transition: 'opacity 250ms ease',
          zIndex: 5
        }}
        className="hero-scroll-indicator"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          SCROLL TO EXPLORE
        </span>

        <div
          style={{
            width: '1px',
            height: '36px',
            backgroundColor: 'rgba(20, 33, 61, 0.12)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="scroll-light-travel" />
        </div>
      </div>

      <style jsx global>{`
        /* Atmospheric Drift Animations (Expansive multi-quadrant drift all over hero, strictly screen-bounded) */
        @keyframes atmosphericDriftPrimary {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 54% 46% 50% 50% / 48% 52% 48% 52%;
          }
          18% {
            /* Sweeps into top-right quadrant, bathing the 3D lattice in atmospheric blue */
            transform: translate3d(clamp(140px, 18vw, 240px), clamp(-110px, -13vh, -50px), 0) rotate(18deg) scale(1.08);
            border-radius: 46% 54% 52% 48% / 54% 46% 50% 50%;
          }
          38% {
            /* Sweeps down into bottom-right quadrant */
            transform: translate3d(clamp(110px, 15vw, 200px), clamp(60px, 14vh, 120px), 0) rotate(32deg) scale(0.96);
            border-radius: 52% 48% 46% 54% / 48% 52% 46% 54%;
          }
          58% {
            /* Sweeps across lower center into bottom-left quadrant */
            transform: translate3d(clamp(-220px, -16vw, -110px), clamp(50px, 13vh, 110px), 0) rotate(14deg) scale(1.06);
            border-radius: 48% 52% 54% 46% / 52% 48% 52% 48%;
          }
          78% {
            /* Sweeps up into top-left quadrant behind the headline & eyebrow */
            transform: translate3d(clamp(-230px, -18vw, -130px), clamp(-100px, -12vh, -40px), 0) rotate(-16deg) scale(1.02);
            border-radius: 54% 46% 50% 50% / 46% 54% 48% 52%;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 54% 46% 50% 50% / 48% 52% 48% 52%;
          }
        }

        @keyframes atmosphericDriftSecondary {
          0% {
            transform: translate3d(clamp(-190px, -15vw, -100px), clamp(50px, 11vh, 100px), 0) rotate(0deg) scale(0.95);
            border-radius: 48% 52% 50% 50% / 52% 48% 52% 48%;
          }
          26% {
            /* Sweeps up into top-center / top-right */
            transform: translate3d(clamp(80px, 12vw, 160px), clamp(-120px, -14vh, -60px), 0) rotate(-22deg) scale(1.08);
            border-radius: 54% 46% 52% 48% / 46% 54% 50% 50%;
          }
          52% {
            /* Sweeps over to mid-right */
            transform: translate3d(clamp(120px, 16vw, 210px), clamp(35px, 8vh, 80px), 0) rotate(16deg) scale(0.94);
            border-radius: 46% 54% 48% 52% / 54% 46% 52% 48%;
          }
          74% {
            /* Sweeps across to mid-left */
            transform: translate3d(clamp(-160px, -14vw, -80px), clamp(-70px, -9vh, -30px), 0) rotate(-14deg) scale(1.05);
            border-radius: 52% 48% 54% 46% / 48% 52% 46% 54%;
          }
          100% {
            transform: translate3d(clamp(-190px, -15vw, -100px), clamp(50px, 11vh, 100px), 0) rotate(0deg) scale(0.95);
            border-radius: 48% 52% 50% 50% / 52% 48% 52% 48%;
          }
        }

        @keyframes atmosphericDriftMobile {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(28px, -20px, 0) scale(1.05);
          }
          66% {
            transform: translate3d(-24px, 16px, 0) scale(0.96);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        /* Desktop Atmospheric Field Layers — More Visible, Silky Drift, Strictly Screen-Bounded */
        .hero-atmosphere-primary {
          position: absolute;
          left: 50%;
          top: 48%;
          width: clamp(460px, 46vw, 680px);
          height: clamp(380px, 40vw, 560px);
          margin-left: calc(-1 * clamp(230px, 23vw, 340px));
          margin-top: calc(-1 * clamp(190px, 20vw, 280px));
          border-radius: 50%;
          background: radial-gradient(
            ellipse 64% 58% at 50% 50%,
            rgba(22, 119, 255, 0.38) 0%,
            rgba(20, 100, 220, 0.28) 28%,
            rgba(22, 119, 255, 0.14) 54%,
            rgba(15, 98, 236, 0.04) 74%,
            transparent 88%
          );
          filter: blur(65px);
          will-change: transform, border-radius;
          animation: atmosphericDriftPrimary 14s cubic-bezier(0.42, 0, 0.58, 1) infinite !important;
        }

        .hero-atmosphere-secondary {
          position: absolute;
          left: 50%;
          top: 52%;
          width: clamp(400px, 42vw, 620px);
          height: clamp(340px, 36vw, 480px);
          margin-left: calc(-1 * clamp(200px, 21vw, 310px));
          margin-top: calc(-1 * clamp(170px, 18vw, 240px));
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(15, 98, 236, 0.30) 0%,
            rgba(22, 119, 255, 0.19) 34%,
            rgba(20, 100, 210, 0.07) 62%,
            transparent 84%
          );
          filter: blur(72px);
          will-change: transform, border-radius;
          animation: atmosphericDriftSecondary 18s cubic-bezier(0.42, 0, 0.58, 1) infinite !important;
        }

        /* Gradient word treatment */
        .hero-gradient-word {
          background: linear-gradient(135deg, #0F62EC 0%, #1677FF 38%, #3C8FFF 68%, #1464D2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: 0.22em;
          margin-bottom: -0.22em;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .hero-stage {
            padding-top: 110px !important;
            padding-bottom: 56px !important;
            min-height: auto !important;
          }
          .hero-container {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-copy-column {
            max-width: 100% !important;
          }
          .hero-3d-stage {
            width: 100% !important;
            height: clamp(340px, 55vw, 460px) !important;
            max-width: 480px !important;
            margin: 0 auto !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
          .hero-atmosphere-primary {
            width: clamp(380px, 68vw, 540px);
            height: clamp(320px, 58vw, 440px);
            margin-left: calc(-1 * clamp(190px, 34vw, 270px));
            margin-top: calc(-1 * clamp(160px, 29vw, 220px));
            filter: blur(65px);
          }
          .hero-atmosphere-secondary {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .hero-stage {
            padding-top: 84px !important;
            padding-bottom: 36px !important;
          }
          .hero-headline {
            font-size: clamp(36px, 8.8vw, 50px) !important;
            line-height: 0.98 !important;
            letter-spacing: -0.048em !important;
          }
          .hero-eyebrow-wrapper {
            margin-bottom: 18px !important;
          }
          .hero-paragraph {
            font-size: 15.5px !important;
            line-height: 1.62 !important;
            margin-top: 18px !important;
          }
          .hero-cta-wrapper {
            margin-top: 22px !important;
            gap: 10px !important;
          }
          .hero-btn {
            height: 48px !important;
            padding: 0 20px !important;
            font-size: 13.5px !important;
          }
          .hero-3d-stage {
            height: clamp(280px, 72vw, 360px) !important;
            max-width: 360px !important;
          }
          .hero-atmosphere-primary {
            width: 78vw;
            height: 78vw;
            max-width: 320px;
            max-height: 320px;
            margin-left: calc(-1 * min(39vw, 160px));
            margin-top: calc(-1 * min(39vw, 160px));
            filter: blur(50px);
            animation: atmosphericDriftMobile 10s ease-in-out infinite alternate !important;
          }
        }
      `}</style>
    </section>
  );
};
