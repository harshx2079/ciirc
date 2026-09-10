'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, [data-cursor="view"], [data-cursor="inspect"]');
      if (interactive) {
        setIsHovered(true);
        if (interactive.getAttribute('data-cursor') === 'view') {
          setCursorText('VIEW');
        } else if (interactive.getAttribute('data-cursor') === 'inspect') {
          setCursorText('SCAN');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor-dot ${isHovered ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {cursorText && isHovered && (
        <span
          style={{
            fontSize: '7px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--forest)',
            letterSpacing: '0.05em'
          }}
        >
          {cursorText}
        </span>
      )}
    </div>
  );
};
