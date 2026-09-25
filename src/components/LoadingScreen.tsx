'use client';

import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if session has already seen loader or prefers reduced motion
    const hasLoaded = sessionStorage.getItem('ciirc_loaded');
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    const startTime = performance.now();
    const duration = 750;

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // smooth cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        sessionStorage.setItem('ciirc_loaded', 'true');
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
          }, 450);
        }, 120);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#F7F9FC',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
        transition: 'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#14213D'
          }}
        >
          CIIRC
        </span>

        {/* Minimal Growing Horizontal Line */}
        <div
          style={{
            width: '120px',
            height: '1.5px',
            backgroundColor: 'rgba(20, 33, 61, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#1677FF',
              transition: 'width 60ms linear'
            }}
          />
        </div>
      </div>
    </div>
  );
};
