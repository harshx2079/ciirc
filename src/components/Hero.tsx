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
        paddingTop: '165px',
        paddingBottom: '80px',
        overflow: 'hidden',
        backgroundColor: 'var(--background)'
      }}
      className="hero-stage"
    >
      {/* Multi-Layer Soft Atmospheric Blue Field (Smooth continuous drift, strictly contained within viewport) */}
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

      {/* Hero Content Container */}
      <div
        className="atlas-container hero-container"
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        {/* Left Column: Editorial Typography */}
        <div
          style={{
            width: '100%',
            maxWidth: '620px',
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
              marginBottom: 'clamp(32px, 3.2vw, 42px)'
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
              fontSize: 'clamp(52px, 5.8vw, 102px)',
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
              fontSize: '18px',
              lineHeight: 1.66,
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: 0,
              marginTop: 'clamp(26px, 2.5vw, 36px)',
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
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: 'clamp(28px, 2.8vw, 40px)',
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
                height: '52px',
                padding: '0 24px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
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
                height: '52px',
                padding: '0 24px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <span>Discover CIIRC</span>
            </a>
          </div>
        </div>
      </div>

      {/* Integrated 3D Element: Part of the hero environment, full-height stage across the right */}
      <div
        className="hero-3d-stage"
        style={{
          position: 'absolute',
          top: 0,
          right: '2%',
          bottom: 0,
          width: '48vw',
          maxWidth: '720px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? `translateY(${scrollRatio * 30}px) scale(${1 - scrollRatio * 0.06})`
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

      {/* Scroll Indicator (Middle - Bottom Centre) */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '9px',
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
        /* Atmospheric Drift Animations (Fluid, visibly drifting across the hero while strictly bounded) */
        @keyframes atmosphericDriftPrimary {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 54% 46% 50% 50% / 48% 52% 48% 52%;
          }
          28% {
            /* Smoothly drifts rightwards, enveloping the 3D lattice in vibrant atmospheric blue */
            transform: translate3d(185px, -42px, 0) rotate(14deg) scale(1.08);
            border-radius: 48% 52% 54% 46% / 52% 48% 52% 48%;
          }
          55% {
            /* Glides through lower-center with gentle compression */
            transform: translate3d(35px, 46px, 0) rotate(22deg) scale(0.95);
            border-radius: 52% 48% 46% 54% / 46% 54% 48% 52%;
          }
          78% {
            /* Smoothly drifts leftwards, bathing the headline & editorial copy */
            transform: translate3d(-175px, -24px, 0) rotate(8deg) scale(1.06);
            border-radius: 46% 54% 52% 48% / 54% 46% 52% 48%;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 54% 46% 50% 50% / 48% 52% 48% 52%;
          }
        }

        @keyframes atmosphericDriftSecondary {
          0% {
            transform: translate3d(-110px, 30px, 0) rotate(0deg) scale(0.94);
            border-radius: 48% 52% 50% 50% / 52% 48% 52% 48%;
          }
          32% {
            /* Counter-balances primary drift across the center */
            transform: translate3d(130px, 38px, 0) rotate(-16deg) scale(1.07);
            border-radius: 52% 48% 46% 54% / 48% 52% 46% 54%;
          }
          68% {
            transform: translate3d(40px, -45px, 0) rotate(-8deg) scale(0.95);
            border-radius: 46% 54% 52% 48% / 54% 46% 50% 50%;
          }
          100% {
            transform: translate3d(-110px, 30px, 0) rotate(0deg) scale(0.94);
            border-radius: 48% 52% 50% 50% / 52% 48% 52% 48%;
          }
        }

        @keyframes atmosphericDriftMobile {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(36px, -24px, 0) scale(1.05);
          }
          66% {
            transform: translate3d(-32px, 20px, 0) scale(0.96);
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
          width: clamp(500px, 50vw, 740px);
          height: clamp(400px, 42vw, 580px);
          margin-left: calc(-1 * clamp(250px, 25vw, 370px));
          margin-top: calc(-1 * clamp(200px, 21vw, 290px));
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
          animation: atmosphericDriftPrimary 12s cubic-bezier(0.42, 0, 0.58, 1) infinite !important;
        }

        .hero-atmosphere-secondary {
          position: absolute;
          left: 52%;
          top: 50%;
          width: clamp(440px, 46vw, 660px);
          height: clamp(360px, 38vw, 520px);
          margin-left: calc(-1 * clamp(220px, 23vw, 330px));
          margin-top: calc(-1 * clamp(180px, 19vw, 260px));
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
          animation: atmosphericDriftSecondary 16s cubic-bezier(0.42, 0, 0.58, 1) infinite !important;
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

        /* Default Desktop Styling */
        .hero-stage {
          padding-top: 165px;
          padding-bottom: 80px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .hero-atmosphere-primary {
            width: clamp(420px, 72vw, 580px);
            height: clamp(340px, 60vw, 480px);
            margin-left: calc(-1 * clamp(210px, 36vw, 290px));
            margin-top: calc(-1 * clamp(170px, 30vw, 240px));
            filter: blur(75px);
          }
          .hero-atmosphere-secondary {
            width: clamp(360px, 64vw, 500px);
            height: clamp(300px, 54vw, 420px);
            margin-left: calc(-1 * clamp(180px, 32vw, 250px));
            margin-top: calc(-1 * clamp(150px, 27vw, 210px));
            filter: blur(80px);
          }
          .hero-stage {
            flex-direction: column !important;
            padding-top: 120px !important;
            padding-bottom: 60px !important;
            min-height: auto !important;
          }
          .hero-container {
            order: 1 !important;
          }
          .hero-copy-column {
            max-width: 100% !important;
          }
          .hero-3d-stage {
            position: relative !important;
            width: 100% !important;
            height: 520px !important;
            max-width: 560px !important;
            margin: 40px auto 0 !important;
            right: auto !important;
            bottom: auto !important;
            order: 2 !important;
          }
          .hero-headline {
            font-size: clamp(48px, 6vw, 76px) !important;
          }
          .hero-paragraph {
            margin-top: 30px !important;
          }
          .hero-scroll-indicator {
            bottom: 20px !important;
          }
        }

        @media (max-width: 768px) {
          .hero-atmosphere-primary {
            width: 76vw;
            height: 76vw;
            max-width: 340px;
            max-height: 340px;
            margin-left: calc(-1 * min(38vw, 170px));
            margin-top: calc(-1 * min(38vw, 170px));
            top: 38%;
            background: radial-gradient(
              circle at 50% 50%,
              rgba(22, 119, 255, 0.34) 0%,
              rgba(22, 119, 255, 0.18) 42%,
              rgba(20, 100, 210, 0.05) 65%,
              transparent 80%
            );
            filter: blur(55px);
            animation: atmosphericDriftMobile 10s ease-in-out infinite alternate !important;
          }
          .hero-atmosphere-secondary {
            display: none !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
          .hero-stage {
            padding-top: 96px !important;
            padding-bottom: 48px !important;
          }
          .hero-eyebrow-wrapper {
            margin-bottom: 24px !important;
          }
          .hero-headline {
            font-size: clamp(42px, 8.8vw, 54px) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.048em !important;
          }
          .hero-paragraph {
            font-size: 16.5px !important;
            line-height: 1.62 !important;
            margin-top: 26px !important;
          }
          .hero-cta-wrapper {
            margin-top: 28px !important;
            gap: 12px !important;
          }
          .hero-btn {
            height: 52px !important;
          }
          .hero-3d-stage {
            height: 420px !important;
            max-width: 440px !important;
            margin: 36px auto 0 !important;
          }
        }

        @media (max-width: 480px) {
          .hero-stage {
            padding-top: 88px !important;
          }
          .hero-headline {
            font-size: clamp(38px, 8.4vw, 46px) !important;
          }
          .hero-3d-stage {
            height: 340px !important;
            max-width: 340px !important;
            margin-top: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};
