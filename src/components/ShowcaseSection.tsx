import React, { useState } from 'react';
import { CAR_IMAGES } from '../assets/images';

interface ShowcaseDetail {
  id: string;
  index: string;
  name: string;
  category: string;
  imageSrc: string;
  specs: string;
  description: string;
}

const SHOWCASE_ITEMS: ShowcaseDetail[] = [
  {
    id: 'profile',
    index: '01',
    name: 'Aerodynamic Silhouette',
    category: 'Form & Stance',
    imageSrc: CAR_IMAGES.heroSide,
    specs: 'L: 4,680mm · W: 1,980mm · H: 1,140mm',
    description: 'Sculpted continuous carbon surface with flush intake channels guiding laminar air directly to the twin rear intercoolers.',
  },
  {
    id: 'wheel',
    index: '02',
    name: 'Forged Magnesium & Carbon Ceramics',
    category: 'Unsprung Mass',
    imageSrc: CAR_IMAGES.wheelBrake,
    specs: '420mm Discs · 10-Piston Monobloc Calipers',
    description: 'Ultra-lightweight forged center-lock wheels wrapped in Pirelli P Zero Corsa rubber with ventilated carbon-ceramic rotors.',
  },
  {
    id: 'front',
    index: '03',
    name: 'Front Kinetic Projectors & Flaps',
    category: 'Active Aero',
    imageSrc: CAR_IMAGES.frontQuarter,
    specs: 'Matrix LED · Variable Venturi Splitter',
    description: 'Laser matrix illumination with electronically variable carbon aeroflaps that alter front-axle downforce in real time.',
  },
  {
    id: 'rear',
    index: '04',
    name: 'Continuous Light Blade & Diffuser',
    category: 'Rear Stabilization',
    imageSrc: CAR_IMAGES.rearDiffuser,
    specs: '+450kg Downforce · 120ms Actuation',
    description: 'Active hydraulic spoiler acting as a variable airbrake, matched to an underbody dual-tunnel carbon Venturi diffuser.',
  },
  {
    id: 'cockpit',
    index: '05',
    name: 'Formula Pilot Cockpit',
    category: 'Interior Ergonomics',
    imageSrc: CAR_IMAGES.cockpit,
    specs: 'OLED Telemetry · Alcantara & Carbon',
    description: 'Direct-mount carbon bucket seats integrated into the monocoque safety tub with bespoke orange contrast stitching.',
  },
];

export const ShowcaseSection: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<string>(SHOWCASE_ITEMS[0].id);
  const activeItem = SHOWCASE_ITEMS.find((item) => item.id === activeItemId) || SHOWCASE_ITEMS[0];

  return (
    <section id="showcase" className="relative w-full py-32 sm:py-40 bg-[#050507] border-t border-white/[0.08] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-orange-400">
            04 / Studio Showcase
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
            Cinematic Macro Anatomy
          </div>
        </div>

        {/* Large Cinematic Automotive Image Display (CAR IS THE VISUAL HERO) */}
        <div className="mt-12 relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl group">
          <img
            src={activeItem.imageSrc}
            alt={`ITZFIZZ ${activeItem.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102"
          />

          {/* Deep cinematic gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          {/* Discreet Overlaid Specification Strip */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-orange-400">
                {activeItem.index} / {activeItem.category}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase font-display text-white mt-1">
                {activeItem.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-sans max-w-xl leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Engineering Specification
              </div>
              <div className="text-xs sm:text-sm font-mono text-white mt-0.5">
                {activeItem.specs}
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Minimal Selector Tabs (Thin dividing lines & pure typography) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SHOWCASE_ITEMS.map((item) => {
            const isActive = item.id === activeItemId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItemId(item.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'border-orange-500 bg-white/[0.04] shadow-md'
                    : 'border-white/[0.08] bg-transparent hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-orange-400">
                  {item.index}
                </div>
                <div className="text-xs sm:text-sm font-bold font-display uppercase tracking-wide text-white mt-1 truncate">
                  {item.name}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 mt-0.5 truncate">
                  {item.category}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
