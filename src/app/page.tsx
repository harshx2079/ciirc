'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ResearchEcosystem } from '../components/ResearchEcosystem';
import { ResearchAtlas } from '../components/ResearchAtlas';
import { InstrumentationFacility } from '../components/InstrumentationFacility';
import { ImpactStats } from '../components/ImpactStats';
import { MilestonesTimeline } from '../components/MilestonesTimeline';
import { Collaborations } from '../components/Collaborations';
import { DirectorMessage } from '../components/DirectorMessage';
import { Opportunities } from '../components/Opportunities';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { ResearchField, ResearchTopology } from '../components/ResearchField';

export default function Home() {
  const [currentTopology, setCurrentTopology] = useState<ResearchTopology>('default');
  const [isConverging, setIsConverging] = useState<boolean>(false);
  const [isImpactVisible, setIsImpactVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* AUTHORITATIVE GENERATIVE RESEARCH FIELD (Section 07-15) */}
      <ResearchField
        topology={currentTopology}
        isConverging={isConverging}
        isImpactVisible={isImpactVisible}
        scrollProgress={scrollProgress}
      />

      {/* 01 HEADER: Fixed 78px, Left 42px Logo, Right-side Cluster, Rectangular CTA (Section 04) */}
      <Header />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* 02 HERO: 100svh Asymmetric Viewport, Mask Reveal, Central Attractor (Section 03, 05, 06) */}
        <Hero />

        {/* 03 RESEARCH ECOSYSTEM: "WE RESEARCH ACROSS BOUNDARIES", Spatial Drift, Category Topology Triggers (Section 16-21) */}
        <ResearchEcosystem onTopologyChange={setCurrentTopology} />

        {/* 04 THE RESEARCH ATLAS: 35%/65% Split, Distortion Displacement Image Transitions (Section 22-23) */}
        <ResearchAtlas onTopologyChange={setCurrentTopology} />

        {/* 05 FACILITIES: 72vw x 65vh Photo, Scale 1.12 -> 1.0, Collision Headline, Cursor Badge (Section 24-26) */}
        <InstrumentationFacility />

        {/* 06 IMPACT SHOCK: Full-Screen Cobalt #3155FF, Mechanical Measurement Counters (Section 27-29) */}
        <ImpactStats onImpactVisibilityChange={setIsImpactVisible} />

        {/* 07 TIMELINE: Horizontal 300vw Pinned Trajectory (2017-2026) (Section 30-31) */}
        <MilestonesTimeline />

        {/* 08 COLLABORATIONS: Kinetic Institutional Network (No Logo Grid) (Section 32) */}
        <Collaborations />

        {/* 09 DIRECTOR MESSAGE: 46vw x 70vh Portrait, Parallax Drift, Overlapping Quote (Section 33) */}
        <DirectorMessage />

        {/* 10 NEWS & CALLS: 65% Featured Story + 35% Secondary List (Section 34) */}
        <Opportunities />

        {/* 11 FINAL CTA & CONVERGENCE: "LET'S BUILD WHAT COMES NEXT", Particle Convergence into CIIRC Mark (Section 35-36) */}
        <CTASection onConvergenceChange={setIsConverging} />
      </main>

      {/* 12 FOOTER: Deep Ink Baseline Grounding */}
      <Footer />
    </div>
  );
}
