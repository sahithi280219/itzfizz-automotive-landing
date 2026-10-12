import React, { useState } from 'react';
import { CAR_IMAGES } from '../assets/images';
import { Zap, Gauge, Timer, Cpu, Activity, BarChart2 } from 'lucide-react';

interface TelemetryRow {
  index: string;
  metric: string;
  gtValue: string;
  unit: string;
  note: string;
}

const TELEMETRY_DATA: TelemetryRow[] = [
  { index: '01', metric: '0 – 100 KM/H LAUNCH', gtValue: '2.1', unit: 'SEC', note: 'All-wheel torque vectoring with dual axial-flux electric drive' },
  { index: '02', metric: '0 – 200 KM/H SPRINT', gtValue: '6.4', unit: 'SEC', note: 'Dual-clutch 8-speed paddle gearbox with pre-synchronized ratios' },
  { index: '03', metric: 'MAXIMUM TOP VELOCITY', gtValue: '380', unit: 'KM/H', note: 'Aerodynamically trimmed in low-drag supersonic mode' },
  { index: '04', metric: 'COMBINED HYBRID POWER', gtValue: '1,250', unit: 'HP', note: '800 HP 4.0L Twin-Turbo V8 + 450 HP front electric motors' },
  { index: '05', metric: 'PEAK CRANKSHAFT TORQUE', gtValue: '1,400', unit: 'NM', note: 'Flat torque curve available seamlessly from 1,800 to 7,200 RPM' },
  { index: '06', metric: '100 – 0 KM/H DECELERATION', gtValue: '29.2', unit: 'M', note: 'Carbon-ceramic 420mm drilled discs with 10-piston monobloc calipers' },
  { index: '07', metric: 'DRY KERB VEHICLE MASS', gtValue: '1,380', unit: 'KG', note: 'Single-piece pre-preg autoclaved carbon monocoque safety tub' },
  { index: '08', metric: 'TORSIONAL STIFFNESS', gtValue: '52,000', unit: 'NM/°', note: 'Exceeds Le Mans prototype rigidity specifications' },
];

export const PerformanceSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'DYNO_CURVE'>('TELEMETRY');

  return (
    <section id="powertrain" className="relative w-full py-28 bg-[#050507] border-t border-white/10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-orange-400 mb-2">
              Dynamometer Certified Telemetry // Modena Facility
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white">
              POWERTRAIN & KINETICS
            </h2>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-2 p-1 bg-[#101014] border border-white/10 rounded-xl">
            <button
              onClick={() => setActiveTab('TELEMETRY')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'TELEMETRY'
                  ? 'bg-orange-500 text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              DATA SHEET
            </button>
            <button
              onClick={() => setActiveTab('DYNO_CURVE')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'DYNO_CURVE'
                  ? 'bg-orange-500 text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              DYNO POWERBAND
            </button>
          </div>
        </div>

        {/* Hero Technical Visual Feature */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Stance in Attack Angle */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-black flex flex-col justify-between p-6 sm:p-8 min-h-[460px] shadow-2xl">
            <img
              src={CAR_IMAGES.frontQuarter}
              alt="ITZFIZZ Front Stance"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400">
                Front Attack Perspective
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase text-white mt-1">
                Silicon-Carbide Dual Axle Drive
              </h3>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10">
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Independent front e-motors provide instantaneous torque vectoring in under 2 milliseconds, rotating the vehicle through apex corners with zero steering understeer.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">REDLINE GOVERNOR:</span>
                <span className="text-orange-400 font-bold">10,200 RPM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tabular Telemetry Matrix or Dyno Curve */}
          <div id="specs" className="lg:col-span-7 flex flex-col justify-between bg-[#0b0b0e] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {activeTab === 'TELEMETRY' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TELEMETRY_DATA.map((row) => (
                    <div
                      key={row.index}
                      className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-orange-500/40 hover:bg-white/5 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>{row.index}</span>
                        <span>{row.metric}</span>
                      </div>
                      <div className="my-2 flex items-baseline gap-1.5">
                        <span className="text-3xl font-black font-display text-white tabular-nums tracking-tight">
                          {row.gtValue}
                        </span>
                        <span className="text-xs font-mono font-bold text-orange-400">
                          {row.unit}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans leading-tight">
                        {row.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Dyno Curve Interactive Visualization */
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                    <span>ENGINE POWER (HP) & TORQUE (NM) VS RPM</span>
                    <span className="text-orange-400">800V SiC INVERTER</span>
                  </div>

                  {/* SVG Dyno Graph */}
                  <div className="w-full h-64 bg-black/60 rounded-xl border border-white/10 p-4 relative overflow-hidden flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                      {/* Torque Curve (Flat instant electric fill 1,400 Nm) */}
                      <path
                        d="M 20 160 Q 80 40 200 45 T 400 65 L 480 110"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3.5"
                      />

                      {/* Horsepower Curve (Peaks at 10,200 RPM) */}
                      <path
                        d="M 20 180 Q 150 150 280 80 T 450 20 L 480 35"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                    </svg>

                    <div className="absolute top-4 left-6 flex items-center gap-6 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-white inline-block" />
                        <span className="text-white">POWER (1,250 HP Peak)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-orange-500 inline-block" />
                        <span className="text-orange-400">TORQUE (1,400 NM Flat Peak)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-orange-950/20 border border-orange-500/20 text-xs font-mono text-neutral-300 flex items-center justify-between">
                  <span>Twin e-Motors provide instant torque at 0 RPM before turbo boost spools.</span>
                  <span className="text-orange-400 font-bold">ZERO TURBO LAG</span>
                </div>
              </div>
            )}

            {/* Bottom Certification Datum */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>TEST BENCH: AVL DYNOCON-9000</span>
              <span className="text-white">AMBIENT: 21°C / 1013 HPA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
