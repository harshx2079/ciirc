'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Microscope, Compass, ShieldCheck, Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Restrained scientific network canvas (materials, instrumentation telemetry)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 500);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 440);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || 500;
      height = canvas.height = canvas.parentElement?.offsetHeight || 440;
    };
    window.addEventListener('resize', handleResize);

    // Nodes representing multidisciplinary scientific telemetry
    const nodeCount = 38;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Distinct palette accents: Research Blue (#3B8CFF), Scientific Teal (#22C7B8), Signal Blue (#67B7FF)
    const nodeColors = ['#3B8CFF', '#22C7B8', '#67B7FF', '#AFC2D4'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1.2,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint interconnect lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 140, 255, ${0.14 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      style={{
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Strong Asymmetric Layout: Left Editorial, Right Scientific Visual */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Editorial Hierarchy */}
          <div style={{ maxWidth: '680px' }}>
            {/* 01: Small Institutional Eyebrow (200ms) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                backgroundColor: 'var(--primary-subtle)',
                border: '1px solid rgba(59, 140, 255, 0.25)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '20px',
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 650ms var(--ease-emphasized) 200ms, transform 650ms var(--ease-emphasized) 200ms'
              }}
            >
              <ShieldCheck size={14} color="var(--primary-bright)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--primary-bright)',
                  textTransform: 'uppercase'
                }}
              >
                DSIR RECOGNIZED SIRO INSTITUTION • GOI
              </span>
            </div>

            {/* 02: Large Confident Headline (350ms) */}
            <h1
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 750ms var(--ease-emphasized) 350ms, transform 750ms var(--ease-emphasized) 350ms'
              }}
            >
              Pioneering Product Development &amp;{' '}
              <span style={{ color: 'var(--primary-bright)' }}>
                Multidisciplinary Science.
              </span>
            </h1>

            {/* 03: Supporting Institutional Statement (480ms) */}
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                lineHeight: 1.65,
                marginBottom: '32px',
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 750ms var(--ease-emphasized) 480ms, transform 750ms var(--ease-emphasized) 480ms'
              }}
            >
              The centralized scientific research and incubation centre of{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Jyothy Institute of Technology</strong>, supported by{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Sri Sringeri Sharada Peetham</strong>.
              Spanning <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>50,000 sq.ft.</span> across 18 specialized
              laboratories to advance national defense, healthcare, and polar climate missions.
            </p>

            {/* 04: CTA Hierarchy (620ms) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                marginBottom: '40px',
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 650ms var(--ease-emphasized) 620ms, transform 650ms var(--ease-emphasized) 620ms'
              }}
            >
              {/* Primary Action: AMBER with tactile click and directional arrow follower */}
              <a href="#research" className="btn btn-primary btn-tactile group-arrow">
                Explore Research Vistas <ArrowRight size={16} className="arrow-icon" />
              </a>

              {/* Secondary Action: Transparent with Research Blue border */}
              <a href="#instrumentation" className="btn btn-secondary btn-tactile">
                <Microscope size={16} color="var(--primary-bright)" />
                Instrumentation Facility (SIF)
              </a>
            </div>

            {/* 05: Verified Institutional Metadata Row (740ms) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid var(--border)',
                opacity: isMounted ? 1 : 0,
                transition: 'opacity 700ms var(--ease-standard) 740ms'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  50,000+
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Sq. Ft. Labs
                </span>
              </div>

              <span style={{ color: 'var(--border)' }}>•</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>
                  27
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Doctorates
                </span>
              </div>

              <span style={{ color: 'var(--border)' }}>•</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-bright)' }}>
                  50+
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Funded Projects
                </span>
              </div>

              <span style={{ color: 'var(--border)' }}>•</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--scientific)' }}>
                  35+
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Products
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Restrained Scientific Telemetry Visualization (850ms) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? 'scale(1)' : 'scale(1.02)',
              transition: 'opacity 900ms var(--ease-emphasized) 850ms, transform 900ms var(--ease-emphasized) 850ms'
            }}
          >
            <div
              className="card-lift"
              style={{
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                position: 'relative'
              }}
            >
              {/* Header inside visual card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="var(--primary-bright)" />
                  <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.04em' }}>
                    CENTRALIZED RESEARCH MATRIX
                  </span>
                </div>
                <span className="badge badge-blue">18 VISTAS</span>
              </div>

              {/* Canvas Container */}
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  backgroundColor: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block'
                  }}
                />
              </div>

              {/* Context Summary inside visual */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Key Sponsors</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>DST • DRDO • DOS/ISRO • DBT • EU</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Incubation Hub</span>
                  <span style={{ color: 'var(--scientific)', fontWeight: 600 }}>AIC - JIT Foundation (NITI Aayog)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Polar Expeditions</span>
                  <span style={{ color: 'var(--primary-bright)', fontWeight: 600 }}>4th Arctic (North Pole) &amp; Antarctica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
