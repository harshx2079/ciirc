'use client';

import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ResearchEcosystem } from '../components/ResearchEcosystem';
import { InstrumentationSection } from '../components/InstrumentationSection';
import { InfrastructureSection } from '../components/InfrastructureSection';
import { PeopleNumbers } from '../components/PeopleNumbers';
import { FundingFlow } from '../components/FundingFlow';
import { ImpactNarrative } from '../components/ImpactNarrative';
import { AchievementsMap } from '../components/AchievementsMap';
import { CollaborationConstellation } from '../components/CollaborationConstellation';
import { DirectorStory } from '../components/DirectorStory';
import { FinalCTA } from '../components/FinalCTA';
import { FooterAtlas } from '../components/FooterAtlas';
import { CustomCursor } from '../components/CustomCursor';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'var(--paper)'
      }}
    >
      {/* Subtle 8px Custom Cursor */}
      <CustomCursor />

      {/* 01 HEADER: Fixed 72px, Typographic CIIRC®, Cobalt underline hover, Outlined Forest CTA */}
      <Header />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* 02 HERO: 100svh Asymmetric Split + Staggered Masked Headline + Procedural Research Field Visual */}
        <Hero />

        {/* 03 SECTION 02: "THE RESEARCH ECOSYSTEM" (--paper-blue, 17 Directions Matrix + Dynamic Generative Map) */}
        <ResearchEcosystem />

        {/* 04 SECTION 03: "RESEARCH INSTRUMENT" (--paper, "PRECISION AT EVERY SCALE" + SEM/XRD/GC/FT-IR/DSC/TGA/BET) */}
        <InstrumentationSection />

        {/* 05 SECTION 04: "50,000+ SQ. FT." (--paper-warm, Massive 220-300px Typography + Lab Photo Parallax) */}
        <InfrastructureSection />

        {/* 06 SECTION 05: "PEOPLE" (--paper, Giant "27 DOCTORATES", "13 MASTERS", "20 PG RESEARCH FELLOWS") */}
        <PeopleNumbers />

        {/* 07 SECTION 06: "RESEARCH FUNDING" (--paper-warm, 50 Funded Projects + Progressive Research Flow Diagram) */}
        <FundingFlow />

        {/* 08 SECTION 07: "IMPACT" (--forest, "RESEARCH THAT LEAVES THE LAB" + Travelling Line Metric Activation) */}
        <ImpactNarrative />

        {/* 09 SECTION 08: "ACHIEVEMENTS" (--paper, Giant Scientific Expedition Map + Waypoint Trajectory) */}
        <AchievementsMap />

        {/* 10 SECTION 09: "COLLABORATION" (--paper-blue, 5 Distinct Geometric Domains Around CIIRC Central Node) */}
        <CollaborationConstellation />

        {/* 11 SECTION 10: "DIRECTOR / HUMAN STORY" (--paper-green, Authentic Portrait + Verified Philosophy) */}
        <DirectorStory />

        {/* 12 SECTION 11: "FINAL CTA" (--paper, "BUILD WHAT COMES NEXT" + Distilled Sparse Research Field) */}
        <FinalCTA />
      </main>

      {/* 13 SECTION 12: FOOTER (--forest, Editorial 4-Column Directory + DSIR-SIRO Authentic Details) */}
      <FooterAtlas />
    </div>
  );
}
