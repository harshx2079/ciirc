'use client';

import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div
      className="atmospheric-canvas-layer"
      aria-hidden="true"
    >
      {/* Primary Research Blue Atmospheric Drift (#3B8CFF) */}
      <div className="atmospheric-orb atmospheric-orb-blue" />

      {/* Secondary Scientific Teal Atmospheric Drift (#22C7B8) */}
      <div className="atmospheric-orb atmospheric-orb-teal" />
    </div>
  );
};
