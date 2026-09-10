'use client';

import React, { useEffect, useRef } from 'react';

export const HeroAmbientDrift: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const physicsRef = useRef({
    // Continuous physical position
    posX: 0,
    posY: 0,
    // Physical velocity
    velX: 1.2,
    velY: 0.9,
    // Wandering angle
    angle: 0.8,
    // Cursor previous coordinate
    prevCursorX: null as number | null,
    prevCursorY: null as number | null,
    isInitialized: false,
    isVisible: true
  });

  useEffect(() => {
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const state = physicsRef.current;
      if (state.prevCursorX !== null && state.prevCursorY !== null) {
        // Calculate the direction and magnitude of cursor movement
        const deltaX = e.clientX - state.prevCursorX;
        const deltaY = e.clientY - state.prevCursorY;

        // Apply a gentle nudge in the direction of cursor movement (not jumping to cursor)
        state.velX += deltaX * 0.025;
        state.velY += deltaY * 0.025;
      }

      state.prevCursorX = e.clientX;
      state.prevCursorY = e.clientY;
    };

    const handleMouseLeave = () => {
      physicsRef.current.prevCursorX = null;
      physicsRef.current.prevCursorY = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        physicsRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (container) observer.observe(container);

    const loop = () => {
      const state = physicsRef.current;
      if (state.isVisible && gradientRef.current && containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;

        // Initialize position at screen center on first frame
        if (!state.isInitialized && w > 0 && h > 0) {
          state.posX = w * 0.5;
          state.posY = h * 0.5;
          state.isInitialized = true;
        }

        if (state.isInitialized) {
          // 1. Organic autonomous wandering force (smooth pseudo-random steering)
          state.angle += (Math.random() - 0.5) * 0.08;
          const wanderForceX = Math.cos(state.angle) * 0.12;
          const wanderForceY = Math.sin(state.angle) * 0.12;

          state.velX += wanderForceX;
          state.velY += wanderForceY;

          // 2. Soft boundary steering (smooth cushion pushing away from edges so it never leaves)
          const orbRadius = 360; // 720px orb diameter
          const margin = orbRadius * 0.5; // padding margin

          if (state.posX < margin) {
            state.velX += (margin - state.posX) * 0.015;
          } else if (state.posX > w - margin) {
            state.velX -= (state.posX - (w - margin)) * 0.015;
          }

          if (state.posY < margin) {
            state.velY += (margin - state.posY) * 0.015;
          } else if (state.posY > h - margin) {
            state.velY -= (state.posY - (h - margin)) * 0.015;
          }

          // 3. Fluid drag & gentle cruising speed normalization
          const currentSpeed = Math.hypot(state.velX, state.velY);
          const TARGET_CRUISE_SPEED = 1.6; // steady, elegant drift speed
          const MAX_SPEED = 4.2; // ceiling when pushed by fast cursor movement

          if (currentSpeed > MAX_SPEED) {
            state.velX = (state.velX / currentSpeed) * MAX_SPEED;
            state.velY = (state.velY / currentSpeed) * MAX_SPEED;
          }

          // Gradually relax back toward the normal cruising speed
          if (currentSpeed > TARGET_CRUISE_SPEED) {
            state.velX *= 0.985;
            state.velY *= 0.985;
          } else if (currentSpeed < TARGET_CRUISE_SPEED * 0.8 && currentSpeed > 0.01) {
            state.velX *= 1.02;
            state.velY *= 1.02;
          }

          // 4. Update physical continuous position (never resets or snaps back)
          state.posX += state.velX;
          state.posY += state.velY;

          // Hard safety clamp to absolutely prevent any accidental overflow
          state.posX = Math.max(margin * 0.6, Math.min(w - margin * 0.6, state.posX));
          state.posY = Math.max(margin * 0.6, Math.min(h - margin * 0.6, state.posY));

          // Render at current continuous position
          gradientRef.current.style.transform = `translate3d(${state.posX - orbRadius}px, ${state.posY - orbRadius}px, 0)`;
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Roaming Unified Scientific Teal Radial Gradient */}
      <div
        ref={gradientRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '720px',
          height: '720px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(8, 127, 120, 0.28) 0%, rgba(45, 148, 139, 0.16) 38%, rgba(215, 236, 232, 0.07) 65%, transparent 78%)',
          filter: 'blur(75px)',
          willChange: 'transform'
        }}
      />
    </div>
  );
};
