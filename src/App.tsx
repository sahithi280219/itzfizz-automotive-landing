import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroScrollSection } from './components/HeroScrollSection';
import { EditorialSection } from './components/EditorialSection';
import { StatisticsSection } from './components/StatisticsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';

export default function App() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  // Smooth scroll helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard accessibility for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReserveModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-sans selection:bg-orange-500 selection:text-black antialiased overflow-x-hidden">
      {/* Top Minimal Navigation */}
      <Navbar
        onOpenReserve={() => setIsReserveModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Cinematic Scroll Sequence */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Cinematic Hero & Scroll-Driven Storytelling */}
        <HeroScrollSection onOpenReserve={() => setIsReserveModalOpen(true)} />

        {/* 2. Editorial Section: "ENGINEERED TO MOVE YOU." */}
        <EditorialSection onOpenReserve={() => setIsReserveModalOpen(true)} />

        {/* 3. Performance & Statistics: Editorial Metrics */}
        <StatisticsSection />

        {/* 4. Full-Width Premium Vehicle Showcase */}
        <ShowcaseSection />

        {/* 5. Final Call-to-Action: "THE ROAD IS YOURS." */}
        <FinalCTASection
          onOpenReserve={() => setIsReserveModalOpen(true)}
          onNavigateSection={handleNavigateSection}
        />
      </main>

      {/* Architectural Clean Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenReserve={() => setIsReserveModalOpen(true)}
      />

      {/* Private Allocation Reservation Dialog */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}
