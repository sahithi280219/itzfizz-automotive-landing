import React from 'react';
import { CAR_IMAGES } from '../assets/images';
import { ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenReserve: () => void;
  onNavigateSection: (id: string) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenReserve, onNavigateSection }) => {
  return (
    <section className="relative w-full bg-[#050507] text-white border-t border-white/[0.08] overflow-hidden">
      {/* Full-Bleed Dramatic Hero Backdrop Visual */}
      <div className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center justify-center py-32 px-6 lg:px-10">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={CAR_IMAGES.heroSide}
            alt="ITZFIZZ Hypercar profile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-[#050507]/90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] h-[350px] bg-radial from-orange-500/15 to-transparent blur-3xl" />
        </div>

        {/* Center Editorial Invitation */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="text-xs font-mono uppercase tracking-[0.35em] text-orange-400 mb-4">
            Production Allocation // Limited to 49 Examples
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase font-display tracking-tight text-white leading-[0.88] text-balance">
            THE ROAD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
              IS YOURS.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-300 font-sans max-w-lg leading-relaxed">
            Reserve your confidential consultation with the Modena Atelier. Custom carbon specifications and private circuit handovers for distinguished owners.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenReserve}
              className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold font-mono tracking-wider uppercase text-xs transition-all shadow-[0_0_30px_rgba(249,115,22,0.35)] active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Request Private Allocation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateSection('showcase')}
              className="px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono tracking-wider uppercase text-xs transition-all cursor-pointer"
            >
              Review Technical Dossier
            </button>
          </div>

          <div className="mt-8 text-[11px] font-mono text-neutral-500">
            Strictly by appointment · Modena Atelier · Concierge delivery
          </div>
        </div>
      </div>
    </section>
  );
};
