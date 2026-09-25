'use client';

import React, { useState } from 'react';
import { VolumetricParticleFormation } from '../../components/VolumetricParticleFormation';

export default function ParticleTestPage() {
  const [preset, setPreset] = useState<'front' | 'left45' | 'right45' | 'elevated'>('front');
  const [interactiveOrbit, setInteractiveOrbit] = useState(true);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F7F9FC',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0
      }}
    >
      {/* 3D Particle Formation Fullscreen Stage */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <VolumetricParticleFormation
          cameraAnglePreset={preset}
          interactiveCamera={interactiveOrbit}
        />
      </div>

      {/* Minimal Visual Test Controls (Section 21 & 22) */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          padding: '8px 14px',
          borderRadius: '12px',
          border: '1px solid rgba(228, 234, 242, 0.85)',
          boxShadow: '0 8px 24px rgba(20, 33, 61, 0.08)',
          zIndex: 100
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#5E718F',
            marginRight: '6px',
            textTransform: 'uppercase'
          }}
        >
          Camera Angle:
        </span>

        {[
          { id: 'front', label: 'Front' },
          { id: 'left45', label: '45° Left' },
          { id: 'right45', label: '45° Right' },
          { id: 'elevated', label: 'Elevated' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setPreset(btn.id as any)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              borderRadius: '8px',
              border: preset === btn.id ? '1px solid #1677FF' : '1px solid #E4EAF2',
              backgroundColor: preset === btn.id ? '#1677FF' : '#FFFFFF',
              color: preset === btn.id ? '#FFFFFF' : '#14213D',
              cursor: 'pointer',
              transition: 'all 180ms ease'
            }}
          >
            {btn.label}
          </button>
        ))}

        <div style={{ width: '1px', height: '18px', backgroundColor: '#E4EAF2', margin: '0 4px' }} />

        <button
          onClick={() => setInteractiveOrbit(!interactiveOrbit)}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            borderRadius: '8px',
            border: interactiveOrbit ? '1px solid #16B77A' : '1px solid #E4EAF2',
            backgroundColor: interactiveOrbit ? 'rgba(22, 183, 122, 0.12)' : '#FFFFFF',
            color: interactiveOrbit ? '#0F8758' : '#5E718F',
            cursor: 'pointer'
          }}
        >
          {interactiveOrbit ? 'Orbit Drag: ON' : 'Orbit Drag: OFF'}
        </button>
      </div>
    </div>
  );
}
