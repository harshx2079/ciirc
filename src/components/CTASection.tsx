'use client';

import React from 'react';
import { ArrowRight, Mail, Phone, Microscope, ShieldCheck } from 'lucide-react';
import { CIIRC_IDENTITY } from '../data/ciircData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CTASection: React.FC = () => {
  const ctaReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      style={{
        backgroundColor: 'rgba(11, 27, 44, 0.45)',
        borderBottom: '1px solid var(--border)',
        paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div
          ref={ctaReveal.ref}
          className={`motion-reveal-editorial ${ctaReveal.isRevealed ? 'is-revealed' : ''}`}
          style={{ maxWidth: '760px', margin: '0 auto' }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid rgba(246, 184, 75, 0.25)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            <ShieldCheck size={14} /> ENGAGE WITH CIIRC
          </div>

          {/* Headline (#EAF2F8) */}
          <h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(2.1rem, 4.2vw, 3rem)',
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '20px'
            }}
          >
            Partner With Our Scientists to Translate Breakthrough Discoveries.
          </h2>

          {/* Supporting text */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.7,
              marginBottom: '36px'
            }}
          >
            Whether your enterprise requires precision testing at our <strong>Sophisticated Instrumentation Facility</strong>,
            your department seeks bilateral project collaborations, or you are an aspiring researcher looking to pursue doctoral work,
            we welcome your engagement.
          </p>

          {/* Primary Action (#F6B84B) & Supporting Accent (#3B8CFF) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '36px'
            }}
          >
            <a
              href={`mailto:${CIIRC_IDENTITY.email}?subject=Research%20Collaboration%20Inquiry%20-%20CIIRC`}
              className="btn btn-primary btn-tactile group-arrow"
            >
              Initiate Research Collaboration <ArrowRight size={16} className="arrow-icon" />
            </a>

            <a
              href="https://ciirc.res.in/service/sophisticated-instrumentation-facility/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-tactile"
            >
              <Microscope size={16} color="var(--primary-bright)" />
              Inquire About Instrumentation Usage
            </a>
          </div>

          {/* Contact Verification Strip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={15} color="var(--primary)" /> {CIIRC_IDENTITY.email}
            </span>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={15} color="var(--primary)" /> {CIIRC_IDENTITY.phone}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
