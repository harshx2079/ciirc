import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { InstitutionalIntro } from '../components/InstitutionalIntro';
import { ResearchEcosystem } from '../components/ResearchEcosystem';
import { InstrumentationFacility } from '../components/InstrumentationFacility';
import { ImpactStats } from '../components/ImpactStats';
import { MilestonesTimeline } from '../components/MilestonesTimeline';
import { DirectorMessage } from '../components/DirectorMessage';
import { Collaborations } from '../components/Collaborations';
import { Opportunities } from '../components/Opportunities';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 01 — Modern Sticky Glass Navigation */}
      <Header />

      <main style={{ flex: 1 }}>
        {/* 02 — Editorial & Scientific Hero */}
        <Hero />

        {/* 03 — Institutional Introduction & Industry 5.0 Matrix */}
        <InstitutionalIntro />

        {/* 04 — Interactive Research Ecosystem (18 Vistas) */}
        <ResearchEcosystem />

        {/* 05 — Sophisticated Instrumentation Facility (SEM, XRD, etc.) */}
        <InstrumentationFacility />

        {/* 06 — Impact & Empirical Scale (Midnight Navy) */}
        <ImpactStats />

        {/* 07 — Scientific Milestones & Polar Expeditions Timeline */}
        <MilestonesTimeline />

        {/* 08 — Director's Perspective & Leadership Profile */}
        <DirectorMessage />

        {/* 09 — Global Collaborations & Faculty Fellowships */}
        <Collaborations />

        {/* 10 — Open Research Fellowships & Opportunities */}
        <Opportunities />

        {/* 11 — High-Impact Final Institutional CTA */}
        <CTASection />
      </main>

      {/* 12 — Substantial Midnight Navy Footer */}
      <Footer />
    </div>
  );
}
