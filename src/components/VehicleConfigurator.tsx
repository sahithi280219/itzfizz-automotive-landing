import React, { useState } from 'react';
import { CAR_IMAGES } from '../assets/images';
import { ColorFinish, ViewAngle } from '../types/automotive';
import { engineAudio } from '../utils/audio';
import { Volume2, Check, Sparkles, ShieldCheck, Compass, ArrowRight, Eye, Gauge } from 'lucide-react';

const VIEW_ANGLES: ViewAngle[] = [
  {
    id: 'side',
    name: '01 / Profile Stance',
    imageSrc: CAR_IMAGES.heroSide,
    caption: 'Low-slung aerodynamic silhouette with active intake flanks and ground effect Venturi',
  },
  {
    id: 'front',
    name: '02 / Front Attack',
    imageSrc: CAR_IMAGES.frontQuarter,
    caption: 'Aggressive twin LED matrix projectors with carbon aero splitters and vortex gills',
  },
  {
    id: 'rear',
    name: '03 / Rear Aero Blade',
    imageSrc: CAR_IMAGES.rearDiffuser,
    caption: 'Sculpted carbon underfloor diffuser and continuous glowing neon LED light blade',
  },
  {
    id: 'cockpit',
    name: '04 / Pilot Cockpit',
    imageSrc: CAR_IMAGES.cockpit,
    caption: 'Formula-inspired steering yolk with OLED digital telemetry displays and orange stitching',
  },
];

const COLOR_FINISHES: ColorFinish[] = [
  {
    id: 'apex-orange',
    name: 'Apex Orange (Signature)',
    hex: '#ea580c',
    accentClass: 'bg-orange-600',
    finishType: 'Multi-stage Pearlescent Lacquer with Gold Flake',
  },
  {
    id: 'obsidian-carbon',
    name: 'Obsidian Matte Carbon',
    hex: '#18181b',
    accentClass: 'bg-neutral-900',
    finishType: 'Exposed Autoclaved 3K Carbon Twill Finish',
  },
  {
    id: 'pure-white',
    name: 'Polar White Metallic',
    hex: '#f4f4f5',
    accentClass: 'bg-neutral-100',
    finishType: 'High-Gloss Ceramic Clearcoat with Blue Pearlescence',
  },
  {
    id: 'solar-amber',
    name: 'Velocity Gold Amber',
    hex: '#d97706',
    accentClass: 'bg-amber-600',
    finishType: 'Liquid Anodized Metal with Deep Luster',
  },
];

interface VehicleConfiguratorProps {
  onOpenReserve: () => void;
}

export const VehicleConfigurator: React.FC<VehicleConfiguratorProps> = ({ onOpenReserve }) => {
  const [activeAngleId, setActiveAngleId] = useState<string>('side');
  const [selectedColorId, setSelectedColorId] = useState<string>('apex-orange');
  const [isAeroTrackPackage, setIsAeroTrackPackage] = useState<boolean>(true);
  const [activeExhaustMode, setActiveExhaustMode] = useState<'SPORT' | 'LOUD' | 'TRACK'>('TRACK');

  const activeAngle = VIEW_ANGLES.find((v) => v.id === activeAngleId) || VIEW_ANGLES[0];
  const activeColor = COLOR_FINISHES.find((c) => c.id === selectedColorId) || COLOR_FINISHES[0];

  const handleRevSound = () => {
    engineAudio.revEngine(activeExhaustMode === 'TRACK' ? 1.0 : 0.7);
  };

  // Color CSS filter tint logic
  const getColorFilter = () => {
    if (selectedColorId === 'obsidian-carbon') {
      return 'grayscale(85%) contrast(115%) brightness(88%)';
    }
    if (selectedColorId === 'pure-white') {
      return 'grayscale(60%) contrast(120%) brightness(125%)';
    }
    if (selectedColorId === 'solar-amber') {
      return 'hue-rotate(-15deg) saturate(135%) brightness(105%)';
    }
    // apex-orange default
    return 'none';
  };

  return (
    <section id="configurator" className="relative w-full py-28 bg-[#070709] border-t border-white/10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-orange-400 mb-2">
              Bespoke Atelier // Studio 360 Specification
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white">
              STUDIO CONFIGURATOR
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-sans">
            Inspect all four camera angles, toggle handcrafted paint finishes, and audition the exhaust note before reserving your production build.
          </p>
        </div>

        {/* Studio Viewport & Controls Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black aspect-[16/9] flex items-center justify-center group shadow-2xl">
              <img
                src={activeAngle.imageSrc}
                alt={`ITZFIZZ ${activeAngle.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: getColorFilter(),
                }}
              />

              {/* Angle Description Scrim */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex items-end justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-orange-400">
                    Camera Perspective · {activeAngle.name}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 mt-1 max-w-lg">
                    {activeAngle.caption}
                  </p>
                </div>

                {/* Rev Audio Button */}
                <button
                  onClick={handleRevSound}
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500 text-orange-400 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Blip Throttle</span>
                </button>
              </div>
            </div>

            {/* View Angle Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VIEW_ANGLES.map((angle) => {
                const isActive = angle.id === activeAngleId;
                return (
                  <button
                    key={angle.id}
                    onClick={() => setActiveAngleId(angle.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-neutral-800/90 border-orange-500 text-white shadow-md'
                        : 'bg-white/3 border-white/5 text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider text-orange-400">
                      {angle.name.split(' / ')[0]}
                    </div>
                    <div className="text-sm font-bold font-display uppercase tracking-wide mt-0.5">
                      {angle.name.split(' / ')[1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Configurator Option Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0b0b0e] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400">Vehicle Base</div>
                  <div className="text-2xl font-bold font-display uppercase text-white">ITZFIZZ GT-01</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono uppercase text-orange-400">CHASSIS NUMBER</div>
                  <div className="text-sm font-mono text-white">ITZ-GT01-042/049</div>
                </div>
              </div>

              {/* Paint Finish Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-300 mb-3">
                  <span>Exterior Finish</span>
                  <span className="text-orange-400">{activeColor.name}</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {COLOR_FINISHES.map((color) => {
                    const isSelected = color.id === selectedColorId;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColorId(color.id)}
                        title={color.name}
                        className={`h-11 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 scale-105 shadow-[0_0_14px_rgba(249,115,22,0.5)]'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 ${
                              color.id === 'pure-white' ? 'text-black' : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] font-mono text-neutral-400">
                  {activeColor.finishType}
                </p>
              </div>

              {/* Exhaust Valve Acoustics Toggle */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-300 mb-2">
                  <span>Active Exhaust Valves</span>
                  <span className="text-orange-400">{activeExhaustMode} MODE</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['SPORT', 'LOUD', 'TRACK'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setActiveExhaustMode(mode);
                        engineAudio.revEngine(mode === 'TRACK' ? 1.0 : 0.6);
                      }}
                      className={`py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                        activeExhaustMode === mode
                          ? 'bg-orange-500 text-black font-bold'
                          : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aero Track Package Toggle */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold font-display uppercase text-white">
                      Active Aerodynamic Package
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Hydraulic articulating rear wing with 120ms airbrake response.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAeroTrackPackage(!isAeroTrackPackage)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      isAeroTrackPackage ? 'bg-orange-500' : 'bg-neutral-800 border border-white/10'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        isAeroTrackPackage ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4">
              <button
                onClick={onOpenReserve}
                className="w-full py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold font-display uppercase tracking-wider text-base transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(249,115,22,0.3)] active:scale-98 cursor-pointer"
              >
                <span>Request Allocation Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] font-mono text-neutral-500 mt-2">
                Confidential factory delivery · Strictly 49 serialized examples
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
