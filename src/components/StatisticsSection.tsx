import React, { useEffect, useRef, useState } from 'react';

interface MetricItem {
  id: string;
  targetNum: number;
  suffix: string;
  label: string;
  caption: string;
  isDecimal?: boolean;
}

const METRICS: MetricItem[] = [
  {
    id: 'exp',
    targetNum: 10,
    suffix: '+',
    label: 'Years of Experience',
    caption: 'Decade of aerodynamic and kinetic chassis innovation in Modena.',
  },
  {
    id: 'projects',
    targetNum: 100,
    suffix: '+',
    label: 'Projects Delivered',
    caption: 'Bespoke vehicle commissions engineered to FIA GT and road specs.',
  },
  {
    id: 'clients',
    targetNum: 50,
    suffix: '+',
    label: 'Happy Clients',
    caption: 'Discerning collectors and performance enthusiasts worldwide.',
  },
  {
    id: 'launch',
    targetNum: 2.1,
    suffix: 's',
    label: '0 – 100 KM/H Launch',
    caption: 'Dual axial-flux electric motor torque fill with all-wheel traction.',
    isDecimal: true,
  },
  {
    id: 'power',
    targetNum: 1250,
    suffix: ' HP',
    label: 'Hybrid Output',
    caption: 'Flat-plane 4.0L twin-turbocharged V8 with 800V SiC architecture.',
  },
  {
    id: 'vmax',
    targetNum: 380,
    suffix: ' km/h',
    label: 'Maximum Velocity',
    caption: 'Electronically regulated hyper-speed envelope with low-drag aero.',
  },
];

export const StatisticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    exp: 0,
    projects: 0,
    clients: 0,
    launch: 0,
    power: 0,
    vmax: 0,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate count-up smoothly
          const duration = 1600;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const nextCounts: { [key: string]: number } = {};
            METRICS.forEach((m) => {
              if (m.isDecimal) {
                nextCounts[m.id] = Number((m.targetNum * easeProgress).toFixed(1));
              } else {
                nextCounts[m.id] = Math.round(m.targetNum * easeProgress);
              }
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="statistics"
      className="relative w-full py-28 sm:py-36 bg-[#060608] border-t border-white/[0.08] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-orange-400 mb-2">
              03 / Empirical Metrics
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white">
              PERFORMANCE & LEGACY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-sans">
            Quantified achievements across a decade of precision motorsport engineering and bespoke hypercar delivery.
          </p>
        </div>

        {/* Refined Editorial Metrics Grid with Fine Hairline Dividers (NO CLUNKY CARDS) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {METRICS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between pt-6 border-t border-white/[0.12] transition-colors hover:border-orange-500/60"
            >
              <div>
                {/* Large Lightweight Numerals */}
                <div className="text-5xl sm:text-6xl lg:text-7xl font-extralight font-display text-white tracking-tight tabular-nums flex items-baseline">
                  <span>{item.isDecimal ? counts[item.id]?.toFixed(1) : counts[item.id]}</span>
                  <span className="text-2xl sm:text-3xl font-normal text-orange-400 ml-1">
                    {item.suffix}
                  </span>
                </div>

                {/* Small Uppercase Label */}
                <div className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">
                  {item.label}
                </div>
              </div>

              {/* Supporting Editorial Caption */}
              <p className="mt-4 text-xs text-neutral-400 font-sans leading-relaxed">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
