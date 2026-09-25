'use client';

import React from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { SectionIdea } from '../components/SectionIdea';
import { ResearchDomains } from '../components/ResearchDomains';
import { ResearchScale } from '../components/ResearchScale';
import { AchievementsTimeline } from '../components/AchievementsTimeline';
import { ResearchToImpact } from '../components/ResearchToImpact';
import { DirectorSection } from '../components/DirectorSection';
import { CollaborationsMarquee } from '../components/CollaborationsMarquee';
import { LatestResearchNews } from '../components/LatestResearchNews';
import { EngageSection } from '../components/EngageSection';
import { Footer } from '../components/Footer';
export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'var(--background)',
        overflowX: 'clip'
      }}
    >
      {/* Minimal Institutional Loading Screen */}
      <LoadingScreen />

      {/* Floating Institutional Navigation */}
      <Navigation />

      {/* 12-Section Narrative Architecture */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* 01 — HERO: 3D Porous Organic Lattice Hero Sphere + Staggered Typography + CTAs */}
        <Hero />

        {/* 02 — INSTITUTIONAL INTRO: The Convergence Principle */}
        <SectionIdea />

        {/* 03 & 04 — RESEARCH ECOSYSTEM & EXPLORER: 17 Domains + Interactive Visual Previews */}
        <ResearchDomains />

        {/* 05 — RESEARCH SCALE & IMPACT: Factual verified institutional data */}
        <ResearchScale />

        {/* 06 — SIGNATURE ACHIEVEMENTS TIMELINE: Scroll-pinned editorial milestone journey */}
        <AchievementsTimeline />

        {/* 07 — INNOVATION & INCUBATION: AIC-JIT translational pipeline & products */}
        <ResearchToImpact />

        {/* 08 — DIRECTOR: Official portrait, verified quotation, institutional philosophy */}
        <DirectorSection />

        {/* 09 — COLLABORATIONS: National & international research partners */}
        <CollaborationsMarquee />

        {/* 10 — LATEST RESEARCH DISPATCHES: Verified academic notices & fellowship calls */}
        <LatestResearchNews />

        {/* 11 — ENGAGEMENT & CONTACT: Direct collaborative touchpoint & campus coordinates */}
        <EngageSection />
      </main>

      {/* 12 — INSTITUTIONAL FOOTER */}
      <Footer />
    </div>
  );
}
