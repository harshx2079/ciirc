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

      {/* Hero Content Container (Fluid Multi-Regime Responsive Grid) */}
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
              marginBottom: '32px'
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
              fontSize: 'clamp(52px, 5.4vw, 94px)',
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
              marginTop: '26px',
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
              marginTop: '28px',
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
                height: '52px',
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

        {/* Right Column: 3D Stage (Integrated directly into the fluid responsive grid) */}
        <div
          className="hero-3d-stage"
          style={{
            position: 'relative',
            width: '100%',
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

      {/* Scroll Indicator (Middle - Bottom Centre on desktop, below 3D object on mobile) */}
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
        /* Atmospheric Drift Animations (Expansive multi-quadrant drift all over hero, strictly screen-bounded) */
        @keyframes atmosphericDriftPrimary {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 54% 46% 50% 50% / 48% 52% 48% 52%;
          }
          18% {
            transform: translate3d(clamp(140px, 18vw, 240px), clamp(-110px, -13vh, -50px), 0) rotate(18deg) scale(1.08);
            border-radius: 46% 54% 52% 48% / 54% 46% 50% 50%;
          }
          38% {
            transform: translate3d(clamp(110px, 15vw, 200px), clamp(60px, 14vh, 120px), 0) rotate(32deg) scale(0.96);
            border-radius: 52% 48% 46% 54% / 48% 52% 46% 54%;
          }
          58% {
            transform: translate3d(clamp(-220px, -16vw, -110px), clamp(50px, 13vh, 110px), 0) rotate(14deg) scale(1.06);
            border-radius: 48% 52% 54% 46% / 52% 48% 52% 48%;
          }
          78% {
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
            transform: translate3d(clamp(80px, 12vw, 160px), clamp(-120px, -14vh, -60px), 0) rotate(-22deg) scale(1.08);
            border-radius: 54% 46% 52% 48% / 46% 54% 50% 50%;
          }
          52% {
            transform: translate3d(clamp(120px, 16vw, 210px), clamp(35px, 8vh, 80px), 0) rotate(16deg) scale(0.94);
            border-radius: 46% 54% 48% 52% / 54% 46% 52% 48%;
          }
          74% {
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

        /* Default Desktop Atmospheric Field Layers (Normal Desktop) */
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
          padding-bottom: 0.24em;
          margin-bottom: -0.24em;
        }

        /* Default Desktop Styling (1025px - 1599px): 100% Approved Baseline */
        .hero-stage {
          min-height: 100svh;
          padding-top: 155px;
          padding-bottom: 75px;
        }
        .hero-container {
          display: grid !important;
          grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr) !important;
          align-items: center !important;
          gap: clamp(32px, 3.5vw, 64px) !important;
        }
        .hero-copy-column {
          max-width: 680px;
        }
        .hero-headline {
          font-size: clamp(52px, 5.4vw, 94px);
          line-height: 0.98;
          letter-spacing: -0.052em;
        }
        .hero-paragraph {
          font-size: 18px;
          line-height: 1.66;
          max-width: 540px;
          margin-top: 26px;
        }
        .hero-cta-wrapper {
          gap: 16px;
          margin-top: 28px;
        }
        .hero-btn {
          height: 52px;
          padding: 0 24px;
        }
        .hero-3d-stage {
          height: 640px !important;
          max-width: 680px !important;
        }

        /* Large Desktop Regime (1600px - 1999px, e.g. 80% browser zoom) */
        @media (min-width: 1600px) {
          .hero-stage {
            padding-top: 175px !important;
            padding-bottom: 85px !important;
          }
          .hero-container {
            grid-template-columns: minmax(0, 1.18fr) minmax(460px, 0.82fr) !important;
            gap: clamp(48px, 4vw, 84px) !important;
          }
          .hero-copy-column {
            max-width: 840px !important;
          }
          .hero-eyebrow-wrapper {
            margin-bottom: 36px !important;
          }
          .eyebrow-capsule {
            font-size: 12px !important;
            padding: 7px 16px !important;
          }
          .hero-headline {
            font-size: clamp(86px, 5.2vw, 108px) !important;
            line-height: 0.97 !important;
            letter-spacing: -0.05em !important;
          }
          .hero-paragraph {
            font-size: 20px !important;
            line-height: 1.68 !important;
            max-width: 660px !important;
            margin-top: 32px !important;
          }
          .hero-cta-wrapper {
            gap: 18px !important;
            margin-top: 34px !important;
          }
          .hero-btn {
            height: 56px !important;
            padding: 0 28px !important;
            font-size: 15px !important;
          }
          .hero-3d-stage {
            height: 720px !important;
            max-width: 760px !important;
          }
          .hero-atmosphere-primary {
            width: clamp(720px, 48vw, 960px) !important;
            height: clamp(580px, 42vw, 780px) !important;
            margin-left: calc(-1 * clamp(360px, 24vw, 480px)) !important;
            margin-top: calc(-1 * clamp(290px, 21vw, 390px)) !important;
            filter: blur(85px) !important;
          }
          .hero-atmosphere-secondary {
            width: clamp(620px, 44vw, 860px) !important;
            height: clamp(500px, 38vw, 680px) !important;
            margin-left: calc(-1 * clamp(310px, 22vw, 430px)) !important;
            margin-top: calc(-1 * clamp(250px, 19vw, 340px)) !important;
            filter: blur(95px) !important;
          }
        }

        /* Ultra-Wide Desktop Regime (>= 2000px, e.g. 67% and 50% browser zoom) */
        @media (min-width: 2000px) {
          .hero-stage {
            padding-top: 195px !important;
            padding-bottom: 95px !important;
          }
          .hero-container {
            grid-template-columns: minmax(0, 1.2fr) minmax(540px, 0.8fr) !important;
            gap: clamp(64px, 4.5vw, 104px) !important;
          }
          .hero-copy-column {
            max-width: 1060px !important;
          }
          .hero-eyebrow-wrapper {
            margin-bottom: 42px !important;
          }
          .eyebrow-capsule {
            font-size: 13.5px !important;
            padding: 8px 18px !important;
          }
          .hero-headline {
            font-size: clamp(104px, 4.6vw, 128px) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.048em !important;
          }
          .hero-paragraph {
            font-size: 23px !important;
            line-height: 1.70 !important;
            max-width: 820px !important;
            margin-top: 38px !important;
          }
          .hero-cta-wrapper {
            gap: 20px !important;
            margin-top: 42px !important;
          }
          .hero-btn {
            height: 62px !important;
            padding: 0 32px !important;
            font-size: 16.5px !important;
            border-radius: 14px !important;
          }
          .hero-3d-stage {
            height: 800px !important;
            max-width: 860px !important;
          }
          .hero-atmosphere-primary {
            width: clamp(980px, 48vw, 1300px) !important;
            height: clamp(780px, 42vw, 1020px) !important;
            margin-left: calc(-1 * clamp(490px, 24vw, 650px)) !important;
            margin-top: calc(-1 * clamp(390px, 21vw, 510px)) !important;
            filter: blur(110px) !important;
          }
          .hero-atmosphere-secondary {
            width: clamp(860px, 44vw, 1150px) !important;
            height: clamp(680px, 38vw, 900px) !important;
            margin-left: calc(-1 * clamp(430px, 22vw, 575px)) !important;
            margin-top: calc(-1 * clamp(340px, 19vw, 450px)) !important;
            filter: blur(120px) !important;
          }
        }

        /* Responsive Breakpoints */
        /* Tablet & Intermediate: 768px - 1024px */
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
        }

        /* Squeeze transition: When width <= 960px, deliberately transition into centered composition */
        @media (max-width: 960px) {
          .hero-stage {
            flex-direction: column !important;
            padding-top: 120px !important;
            padding-bottom: 60px !important;
            min-height: 100svh !important;
            height: auto !important;
          }
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            max-width: 640px !important;
            margin-inline: auto !important;
            text-align: center !important;
          }
          .hero-copy-column {
            order: 1 !important;
            max-width: 100% !important;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-eyebrow-wrapper {
            display: flex !important;
            justify-content: center !important;
          }
          .eyebrow-capsule {
            margin-inline: auto !important;
          }
          .hero-headline {
            text-align: center !important;
            transform-origin: center top !important;
            font-size: clamp(48px, 6vw, 76px) !important;
          }
          .hero-paragraph {
            text-align: center !important;
            margin-top: 28px !important;
            margin-inline: auto !important;
            max-width: 480px !important;
          }
          .hero-cta-wrapper {
            justify-content: center !important;
            margin-top: 28px !important;
          }
          .hero-3d-stage {
            order: 2 !important;
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 580px !important;
            height: 580px !important;
            margin: 48px auto 0 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .hero-scroll-indicator {
            order: 3 !important;
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            margin: 40px auto 0 !important;
            display: flex !important;
          }
        }

        /* Mobile Viewport (<= 767px): Deliberately Centered Mobile Composition */
        @media (max-width: 767px) {
          .hero-stage {
            padding-top: clamp(96px, 12vh, 110px) !important;
            padding-bottom: 48px !important;
            min-height: 100svh !important;
            height: auto !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            overflow-x: hidden !important;
          }

          /* Mobile Centered Container */
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            order: 1 !important;
            width: 100% !important;
            max-width: 560px !important;
            margin-inline: auto !important;
            padding-left: clamp(20px, 5.5vw, 24px) !important;
            padding-right: clamp(20px, 5.5vw, 24px) !important;
            box-sizing: border-box !important;
          }

          .hero-copy-column {
            order: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
            align-items: center !important;
            text-align: center !important;
            margin-inline: auto !important;
          }

          /* 1. Mobile Eyebrow — Centered compact pill */
          .hero-eyebrow-wrapper {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            margin-bottom: clamp(24px, 3.5vh, 32px) !important;
          }

          .eyebrow-capsule {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            width: fit-content !important;
            max-width: 100% !important;
            font-size: clamp(9px, 2.5vw, 11px) !important;
            letter-spacing: clamp(0.10em, 1.2vw, 0.14em) !important;
            line-height: 1.45 !important;
            padding: 8px 14px !important;
            white-space: normal !important;
            margin-inline: auto !important;
            flex-wrap: wrap !important;
          }

          /* 2. Mobile Headline — Dominant, Centered, Responsive Lines */
          .hero-headline {
            text-align: center !important;
            font-size: clamp(42px, 10.8vw, 56px) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.048em !important;
            transform-origin: center top !important;
            transform: none !important;
            opacity: 1 !important;
            margin: 0 auto !important;
            width: 100% !important;
          }

          .hero-headline span {
            text-align: center !important;
          }

          .hero-gradient-word {
            display: inline-block !important;
            white-space: nowrap !important;
            padding-bottom: 0.24em !important;
            margin-bottom: -0.24em !important;
            padding-right: 0.04em !important;
          }

          /* 3. Mobile Paragraph — Controlled reading width, clear breathing room */
          .hero-paragraph {
            text-align: center !important;
            max-width: min(350px, 92vw) !important;
            width: 100% !important;
            margin-inline: auto !important;
            margin-top: clamp(24px, 3.2vh, 32px) !important;
            font-size: clamp(15.5px, 3.8vw, 17px) !important;
            line-height: 1.62 !important;
            transform: none !important;
            opacity: 1 !important;
          }

          /* 4. Mobile CTA Group — Centered, Side-by-Side pair or gracefully stacked */
          .hero-cta-wrapper {
            margin-top: clamp(28px, 3.5vh, 36px) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            gap: clamp(10px, 2.5vw, 12px) !important;
            flex-wrap: wrap !important;
            width: 100% !important;
            margin-inline: auto !important;
            transform: none !important;
            opacity: 1 !important;
          }

          .hero-btn {
            width: fit-content !important;
            min-height: 50px !important;
            height: 50px !important;
            padding: 0 clamp(18px, 4.5vw, 24px) !important;
            white-space: nowrap !important;
            font-size: 14.5px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          /* 5. Mobile 3D Object — Centered, PRESERVED APPROVED SCALE, Sufficient Space */
          .hero-3d-stage {
            order: 2 !important;
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            top: auto !important;
            left: auto !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 560px !important;
            height: 580px !important;
            margin: clamp(55px, 7vh, 75px) auto 0 !important;
            transform: none !important;
            opacity: 1 !important;
            pointer-events: auto !important;
          }

          /* 6. Mobile Scroll Indicator — Centered beneath 3D Object */
          .hero-scroll-indicator {
            order: 3 !important;
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 8px !important;
            margin: clamp(40px, 5vh, 56px) auto 0 !important;
            opacity: 1 !important;
            pointer-events: none !important;
            z-index: 5 !important;
          }

          /* Mobile Atmospheric Soft Blue Atmosphere */
          .hero-atmosphere-primary {
            width: clamp(340px, 85vw, 480px);
            height: clamp(340px, 85vw, 480px);
            margin-left: calc(-1 * clamp(170px, 42.5vw, 240px));
            margin-top: calc(-1 * clamp(170px, 42.5vw, 240px));
            top: 36%;
            background: radial-gradient(
              ellipse 60% 60% at 50% 50%,
              rgba(22, 119, 255, 0.35) 0%,
              rgba(20, 100, 220, 0.24) 34%,
              rgba(22, 119, 255, 0.10) 60%,
              rgba(15, 98, 236, 0.02) 78%,
              transparent 88%
            );
            filter: blur(60px);
            animation: atmosphericDriftMobile 10s ease-in-out infinite alternate !important;
          }

          .hero-atmosphere-secondary {
            display: none !important;
          }
        }

        /* Very Narrow Mobile Viewports (<= 340px) */
        @media (max-width: 340px) {
          .hero-headline {
            font-size: clamp(36px, 10.5vw, 42px) !important;
          }
          .hero-cta-wrapper {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .hero-btn {
            width: min(100%, 280px) !important;
            margin: 0 auto !important;
          }
          .hero-3d-stage {
            height: 540px !important;
          }
        }
      `}</style>
    </section>
  );
};
