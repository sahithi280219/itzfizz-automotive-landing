import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { engineAudio } from '../utils/audio';

interface NavbarProps {
  onOpenReserve: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReserve, onNavigateSection }) => {
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = engineAudio.toggleMute();
    setAudioActive(active);
    if (active) {
      engineAudio.revEngine(0.65);
    }
  };

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070709]/80 backdrop-blur-xl border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="group flex items-center gap-2.5 text-2xl font-black tracking-[0.25em] text-white uppercase font-display whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <span>ITZFIZZ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block transition-transform duration-300 group-hover:scale-150" />
        </a>

        {/* Zone 2: 4-5 single-line editorial nav links */}
        <nav className="hidden md:flex items-center gap-9 text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400">
          <button
            onClick={() => handleLinkClick('story')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>01 / Story</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleLinkClick('editorial')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>02 / Editorial</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleLinkClick('statistics')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>03 / Metrics</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleLinkClick('showcase')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 group"
          >
            <span>04 / Showcase</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Zone 3: 1 primary action & sound toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleSound}
            title={audioActive ? 'Mute engine audio' : 'Audition V8 twin-turbo acoustic engine'}
            aria-label={audioActive ? 'Mute engine sound' : 'Unmute engine sound'}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
              audioActive
                ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.35)]'
                : 'bg-white/[0.04] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
            }`}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenReserve}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold font-mono tracking-[0.15em] uppercase text-black bg-orange-500 hover:bg-orange-400 transition-all rounded-md shadow-[0_0_25px_rgba(249,115,22,0.3)] active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Allocation
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white border border-white/10 rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0d] px-6 py-6 flex flex-col gap-4 text-xs font-mono tracking-widest uppercase">
          <button
            onClick={() => handleLinkClick('story')}
            className="text-left text-neutral-300 hover:text-orange-400 py-1.5"
          >
            01 / Story
          </button>
          <button
            onClick={() => handleLinkClick('editorial')}
            className="text-left text-neutral-300 hover:text-orange-400 py-1.5"
          >
            02 / Editorial
          </button>
          <button
            onClick={() => handleLinkClick('statistics')}
            className="text-left text-neutral-300 hover:text-orange-400 py-1.5"
          >
            03 / Metrics
          </button>
          <button
            onClick={() => handleLinkClick('showcase')}
            className="text-left text-neutral-300 hover:text-orange-400 py-1.5"
          >
            04 / Showcase
          </button>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-3 text-xs font-bold font-mono tracking-wider uppercase text-black bg-orange-500 hover:bg-orange-400 rounded-md"
            >
              Request Allocation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
