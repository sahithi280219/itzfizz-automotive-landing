import React from 'react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onOpenReserve: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenReserve }) => {
  return (
    <footer className="w-full bg-[#040406] border-t border-white/[0.08] text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.06]">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-3xl font-black font-display tracking-[0.25em] text-white flex items-center gap-2">
              <span>ITZFIZZ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block mb-1" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed font-sans">
              Sculpting next-generation kinetic hypercars and composite aerodynamic architectures. Dedicated to pure driving dynamics and high-velocity stability.
            </p>
            <div className="text-xs font-mono text-orange-400 pt-1">
              Modena Atelier · Via Emilia Ovest, Italy
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  00 / Hero Opening
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('editorial')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  01 / Editorial Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('statistics')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  02 / Empirical Metrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('showcase')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  03 / Studio Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Legal (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-4">
              Private Concierge
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Bespoke commissions are reviewed individually. Allocation requests require verification.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenReserve}
                className="text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Schedule Private Consultation →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} ITZFIZZ Automotive Labs. All technical patents reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Homologation: FIA GT Standard</span>
            <span>Carbon Monocoque Spec 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
