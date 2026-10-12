import React from 'react';
import { CAR_IMAGES } from '../assets/images';
import { ArrowUpRight } from 'lucide-react';

interface EditorialSectionProps {
  onOpenReserve: () => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onOpenReserve }) => {
  return (
    <section id="editorial" className="relative w-full py-32 sm:py-40 bg-[#08080a] border-t border-white/[0.08] text-white overflow-hidden">
      {/* Subtle fine ambient gradient */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-600/[0.03] blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-orange-400">
            02 / Editorial Manifesto
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
            Design Philosophy · Volume 01
          </div>
        </div>

        {/* Asymmetric Two-Column Editorial Spread */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Editorial Statement & Narrative (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-3">
                The Pure Pursuit of Form & Kinetic Purpose
              </span>

              {/* OVERSIZED HEADLINE */}
              <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase font-display tracking-tight text-white leading-[0.88] text-balance">
                ENGINEERED TO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                  MOVE YOU.
                </span>
              </h2>

              <p className="mt-8 text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-xl">
                Every curve is drawn with physical necessity. We reject ornamentation that does not serve aerodynamic downforce or cooling airflow. The ITZFIZZ GT-01 exists in the quiet tension between raw mechanical ferocity and sculptured elegance.
              </p>
            </div>

            {/* Editorial Quotation & Architectural Datum */}
            <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-1">
                  Aerodynamic Stance
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Low roofline measuring 1,140 mm with an aggressive frontal cross-section optimized for minimal boundary layer drag.
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-1">
                  Tactile Craftsmanship
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Exposed dry carbon weaves paired with matte aluminum tactile switches machined to within 10 microns of precision.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={onOpenReserve}
                className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-orange-400 transition-colors cursor-pointer"
              >
                <span>Read the Atelier Monograph</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Full-Bleed Dramatic Car Photograph (5 Cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c10] aspect-[4/5] shadow-2xl">
              <img
                src={CAR_IMAGES.frontQuarter}
                alt="ITZFIZZ front attack angle in dark studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Editorial Caption on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-orange-400">
                    Figure 01.4 // Modena Prototype
                  </div>
                  <div className="text-sm font-bold font-display uppercase text-white mt-0.5">
                    Front Carbon Aeroflaps & Matrix Array
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-400">01 / 49</span>
              </div>
            </div>

            {/* Hairline Border Accent */}
            <div className="absolute -inset-1 rounded-2xl border border-orange-500/10 pointer-events-none -z-10 group-hover:border-orange-500/30 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
};
