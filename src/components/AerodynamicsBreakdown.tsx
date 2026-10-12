import React, { useState } from 'react';
import { CAR_IMAGES } from '../assets/images';
import { Wind, Sliders, ArrowUpRight, Gauge } from 'lucide-react';

interface AeroPoint {
  id: string;
  name: string;
  tag: string;
  posTop: string;
  posLeft: string;
  metric: string;
  detail: string;
}

const AERO_POINTS: AeroPoint[] = [
  {
    id: 'spoiler',
    name: 'Active Hydraulic Rear Wing',
    tag: 'AERO-01',
    posTop: '28%',
    posLeft: '68%',
    metric: '+450 KG @ 250 KM/H',
    detail: 'Articulates from 0° low drag to 45° airbrake in 120ms. Stabilizes rear axle under heavy trail braking.',
  },
  {
    id: 'diffuser',
    name: 'Sculpted Underbody Diffuser',
    tag: 'AERO-02',
    posTop: '72%',
    posLeft: '56%',
    metric: '62% GROUND SUCTION',
    detail: 'Twin carbon Venturi tunnels expand air behind the rear axle, creating ground-effect aerodynamic vacuum.',
  },
  {
    id: 'exhaust',
    name: 'Inconel Center Blowout Exhaust',
    tag: 'AERO-03',
    posTop: '50%',
    posLeft: '67%',
    metric: '850°C THERMAL FLOW',
    detail: 'Blows high-energy exhaust gases above the central diffuser to energize the boundary layer and delay flow separation.',
  },
  {
    id: 'scoop',
    name: 'Dorsal Carbon Ram-Air Duct',
    tag: 'AERO-04',
    posTop: '24%',
    posLeft: '48%',
    metric: '320 L/S INDUCTION',
    detail: 'Directs undisturbed atmospheric high-pressure air into the twin intake plenums without turbulent vortex disturbance.',
  },
];

export const AerodynamicsBreakdown: React.FC = () => {
  const [selectedPointId, setSelectedPointId] = useState<string>(AERO_POINTS[0].id);
  const [simSpeed, setSimSpeed] = useState<number>(250);

  const activePoint = AERO_POINTS.find((p) => p.id === selectedPointId) || AERO_POINTS[0];

  // Dynamic physics calculation based on speed
  const calculatedDownforce = Math.round(820 * Math.pow(simSpeed / 250, 1.8));
  const calculatedDrag = (0.24 * (1 + (simSpeed > 280 ? 0.04 : 0))).toFixed(2);

  return (
    <section id="aero" className="relative w-full py-28 bg-[#070709] border-t border-white/10 text-white overflow-hidden">
      {/* Background Blueprint Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-orange-400 mb-2">
              Computational Fluid Dynamics // Aerodynamic Lab
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white">
              AERODYNAMIC ARCHITECTURE
            </h2>
          </div>
          <div className="text-right text-xs font-mono text-neutral-400">
            <div>WIND TUNNEL CALIBRATION · MODENA CFD LAB</div>
            <div className="text-orange-400">STATUS: HOMOLOGATED FIA GT</div>
          </div>
        </div>

        {/* INTERACTIVE WIND TUNNEL SIMULATOR SLIDER */}
        <div className="my-10 p-6 rounded-2xl bg-[#0c0c10] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Interactive Velocity Wind Tunnel
              </div>
              <div className="text-xl font-black font-display uppercase text-white">
                Fluid Velocity: <span className="text-orange-400 tabular-nums">{simSpeed} KM/H</span>
              </div>
            </div>
          </div>

          {/* Slider Control */}
          <div className="w-full md:w-80 flex flex-col gap-1">
            <input
              type="range"
              min="100"
              max="380"
              step="5"
              value={simSpeed}
              onChange={(e) => setSimSpeed(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <span>100 KM/H</span>
              <span>250 KM/H BASELINE</span>
              <span>380 KM/H MAX</span>
            </div>
          </div>

          {/* Live Output Calculated Telemetry */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Aero Downforce</div>
              <div className="text-2xl font-black font-display text-orange-400 tabular-nums">
                {calculatedDownforce} <span className="text-xs font-normal text-white">KG</span>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Drag Coefficient</div>
              <div className="text-2xl font-black font-display text-white tabular-nums">
                {calculatedDrag} <span className="text-xs font-normal text-neutral-400">Cd</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN TECHNICAL BLUEPRINT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Canvas with Hotspots */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/15 bg-black min-h-[440px] flex items-center justify-center group shadow-2xl">
            <img
              src={CAR_IMAGES.rearDiffuser}
              alt="Rear Aero Diffuser"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Interactive Datum Points Overlaid on Image */}
            {AERO_POINTS.map((pt) => {
              const isSelected = pt.id === selectedPointId;
              return (
                <div
                  key={pt.id}
                  style={{ top: pt.posTop, left: pt.posLeft }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                  onClick={() => setSelectedPointId(pt.id)}
                >
                  <div
                    className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/20 scale-125 shadow-[0_0_16px_rgba(249,115,22,0.6)]'
                        : 'border-white/30 bg-black/60 hover:border-white hover:scale-110'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-white">{pt.tag.slice(-2)}</span>
                    <span className="absolute inset-0 rounded-full border border-orange-500 animate-ping opacity-40 pointer-events-none" />
                  </div>
                </div>
              );
            })}

            {/* Bottom Scrim Callout */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-orange-400 uppercase">{activePoint.tag} · {activePoint.name}</div>
                <div className="text-sm text-neutral-300 font-sans mt-0.5">{activePoint.detail}</div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-xs font-mono text-neutral-400">PERFORMANCE</div>
                <div className="text-base font-bold font-display text-white">{activePoint.metric}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Blueprint Specification Strip */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              {AERO_POINTS.map((pt) => {
                const isSelected = pt.id === selectedPointId;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPointId(pt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0f0f14] border-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.15)]'
                        : 'bg-white/3 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-orange-400">{pt.tag}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-neutral-500'}`} />
                    </div>
                    <div className="text-base font-bold font-display uppercase text-white mt-1">
                      {pt.name}
                    </div>
                    <div className="text-xs font-mono text-neutral-400 mt-1">
                      {pt.metric}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Engineering Homologation Badge */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-400 space-y-1">
              <div className="flex justify-between">
                <span>WIND TUNNEL MODEL:</span>
                <span className="text-white">1:1 SCALE FULL VEHICLE</span>
              </div>
              <div className="flex justify-between">
                <span>SUPERCOMPUTER FLUID RUNS:</span>
                <span className="text-orange-400 font-bold">1,400+ ITERATIONS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
