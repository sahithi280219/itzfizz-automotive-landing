import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAR_IMAGES } from '../assets/images';
import { engineAudio } from '../utils/audio';
import { Volume2, ChevronDown, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollSectionProps {
  onOpenReserve: () => void;
}

export const HeroScrollSection: React.FC<HeroScrollSectionProps> = ({ onOpenReserve }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  // Jump to story chapter
  const jumpToChapter = useCallback((chapterIndex: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + (chapterIndex / 3) * totalHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  const handleAudioBlip = () => {
    setIsRevving(true);
    engineAudio.revEngine(0.85);
    setTimeout(() => setIsRevving(false), 500);
  };

  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const carWrapper = carWrapperRef.current;
    const headingWrapper = headingWrapperRef.current;

    if (!container || !pinSection || !carWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Animation
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .fromTo(
          '.hero-fade-in',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, delay: 0.1 }
        )
        .fromTo(
          headingWrapper,
          { opacity: 0, scale: 0.96, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3 },
          '-=0.8'
        )
        .fromTo(
          carWrapper,
          { opacity: 0, x: -100, scale: 0.9, filter: 'blur(10px)' },
          { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 1.5 },
          '-=1.0'
        )
        .fromTo(
          '.hero-scroll-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.5'
        );

      // 2. Master Pinned Scroll-Driven Storytelling Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=4200',
          pin: pinSection,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            engineAudio.updateThrottleBySpeed(p * 1.25);

            if (p < 0.25) setActiveStage(0);
            else if (p < 0.55) setActiveStage(1);
            else if (p < 0.82) setActiveStage(2);
            else setActiveStage(3);
          },
        },
      });

      // PHASE 0: Hero heading dissolves into depth, car glides forward
      masterTl
        .to(headingWrapper, {
          y: -140,
          scale: 1.18,
          opacity: 0,
          filter: 'blur(14px)',
          duration: 1,
          ease: 'power2.inOut',
        }, 0)
        .to('.hero-scroll-indicator', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, 0)
        .to(carWrapper, {
          x: '14vw',
          y: '3vh',
          scale: 1.1,
          rotationZ: 0.6,
          duration: 1.2,
          ease: 'power1.inOut',
        }, 0);

      // PHASE 1: Chapter 01 - Aerodynamic Downforce
      masterTl
        .fromTo(
          '.story-chapter-1',
          { opacity: 0, x: -60, pointerEvents: 'none' },
          { opacity: 1, x: 0, pointerEvents: 'auto', duration: 0.8, ease: 'power2.out' },
          1.1
        )
        .to(carWrapper, {
          x: '18vw',
          y: '-2vh',
          scale: 1.15,
          rotationZ: -0.4,
          duration: 1.2,
          ease: 'power1.inOut',
        }, 1.1)
        .to('.story-chapter-1', {
          opacity: 0,
          x: -30,
          pointerEvents: 'none',
          duration: 0.5,
          ease: 'power2.in',
        }, 2.2);

      // PHASE 2: Chapter 02 - Hybrid Propulsion
      masterTl
        .fromTo(
          '.story-chapter-2',
          { opacity: 0, x: 60, pointerEvents: 'none' },
          { opacity: 1, x: 0, pointerEvents: 'auto', duration: 0.8, ease: 'power2.out' },
          2.4
        )
        .to(carWrapper, {
          x: '-12vw',
          y: '2vh',
          scale: 1.22,
          rotationZ: 1.0,
          duration: 1.3,
          ease: 'power1.inOut',
        }, 2.4)
        .to('.story-chapter-2', {
          opacity: 0,
          x: 30,
          pointerEvents: 'none',
          duration: 0.5,
          ease: 'power2.in',
        }, 3.6);

      // PHASE 3: Chapter 03 - Carbon Monocoque Cell
      masterTl
        .fromTo(
          '.story-chapter-3',
          { opacity: 0, y: 50, pointerEvents: 'none' },
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.8, ease: 'power2.out' },
          3.8
        )
        .to(carWrapper, {
          x: '0vw',
          y: '0vh',
          scale: 1.26,
          rotationZ: 0,
          duration: 1.2,
          ease: 'power2.out',
        }, 3.8);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative w-full bg-[#060608] text-white">
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center select-none"
      >
        {/* Deep studio ambient backdrop lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1300px] h-[500px] bg-radial from-orange-500/12 via-orange-950/4 to-transparent blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#060608] via-[#060608]/70 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent z-10" />
        </div>

        {/* TOP ZONE: Editorial Category & Stance */}
        <div className="relative z-20 w-full max-w-7xl mx-auto pt-24 sm:pt-28 px-6 lg:px-10 flex flex-col items-center text-center">
          <div className="hero-fade-in flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-orange-400 mb-3">
            <span>Prototype Serie-01</span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span>Kinetic Hypercar</span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span>Modena Atelier</span>
          </div>

          {/* OVERSIZED EDITORIAL HEADLINE: "WELCOME TO ITZFIZZ" */}
          <div ref={headingWrapperRef} className="w-full flex flex-col items-center">
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[11.2rem] font-black uppercase font-display tracking-tight leading-[0.85] text-white drop-shadow-2xl">
              WELCOME TO{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                ITZFIZZ
              </span>
            </h1>
            <p className="hero-fade-in mt-4 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-neutral-400 max-w-xl text-balance">
              Where aerodynamic kinetic sculpture meets uncompromising hybrid velocity
            </p>
          </div>
        </div>

        {/* CENTER ZONE: THE CAR AS DOMINANT VISUAL HERO */}
        <div
          ref={carWrapperRef}
          className="relative z-15 w-full max-w-5xl px-6 my-auto flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full max-w-[960px] aspect-[16/9] flex items-center justify-center">
            {/* Deep ground shadow and studio surface reflection */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[88%] h-12 bg-black/95 blur-2xl rounded-full" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[72%] h-6 bg-orange-500/25 blur-xl rounded-full" />

            {/* The Sports Car Visual */}
            <img
              src={CAR_IMAGES.heroSide}
              alt="ITZFIZZ Hypercar profile in vivid racing orange"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] select-none transition-transform duration-300"
              style={{
                filter: isRevving ? 'drop-shadow(0 0 30px rgba(249,115,22,0.4))' : 'none',
              }}
            />

            {/* Tactile Acoustic Audition Trigger */}
            <div className="absolute bottom-2 right-4 pointer-events-auto">
              <button
                type="button"
                onClick={handleAudioBlip}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 hover:border-orange-500/60 text-neutral-400 hover:text-white transition-all text-[11px] font-mono tracking-wider uppercase cursor-pointer backdrop-blur-md shadow-xl"
              >
                <Volume2 className="w-3.5 h-3.5 text-orange-500 transition-transform group-hover:scale-110" />
                <span>Audition Throttle</span>
              </button>
            </div>
          </div>
        </div>

        {/* STORY CHAPTER PANELS (Elegantly revealed during scroll stages) */}

        {/* Chapter 01: Aerodynamics */}
        <div className="story-chapter-1 absolute z-25 top-1/4 left-6 sm:left-14 lg:left-24 max-w-md bg-[#0a0a0d]/90 border border-white/10 backdrop-blur-2xl p-7 rounded-xl shadow-2xl opacity-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-orange-400 mb-2">
            Chapter 01 / Aerodynamics
          </div>
          <h2 className="text-3xl font-black uppercase font-display text-white tracking-tight leading-tight">
            Sculpted by Atmospheric Wind
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            Underbody Venturi carbon tunnels and micro-actuated front flaps channel air across the flat floor, generating 820 kg of ground downforce without parasitic turbulence.
          </p>
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-black font-display text-white tabular-nums">0.24 <span className="text-xs font-normal text-neutral-400">Cd</span></div>
              <div className="text-[10px] uppercase font-mono text-neutral-400">Laminar Drag</div>
            </div>
            <div>
              <div className="text-2xl font-black font-display text-orange-400 tabular-nums">820 <span className="text-xs font-normal text-neutral-400">KG</span></div>
              <div className="text-[10px] uppercase font-mono text-neutral-400">Downforce @ 250 km/h</div>
            </div>
          </div>
        </div>

        {/* Chapter 02: Powertrain */}
        <div className="story-chapter-2 absolute z-25 top-1/4 right-6 sm:right-14 lg:right-24 max-w-md bg-[#0a0a0d]/90 border border-white/10 backdrop-blur-2xl p-7 rounded-xl shadow-2xl opacity-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-orange-400 mb-2">
            Chapter 02 / Propulsion
          </div>
          <h2 className="text-3xl font-black uppercase font-display text-white tracking-tight leading-tight">
            1,250 HP Quad-Cam Hybrid Architecture
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            A flat-plane crankshaft twin-turbo V8 spinning to 10,200 RPM integrates with dual front silicon-carbide axial-flux electric motors for instant 1,400 Nm all-wheel drive.
          </p>
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-black font-display text-orange-400 tabular-nums">2.1 <span className="text-xs font-normal text-neutral-400">SEC</span></div>
              <div className="text-[10px] uppercase font-mono text-neutral-400">0–100 KM/H Launch</div>
            </div>
            <div>
              <div className="text-2xl font-black font-display text-white tabular-nums">380 <span className="text-xs font-normal text-neutral-400">KM/H</span></div>
              <div className="text-[10px] uppercase font-mono text-neutral-400">Top Velocity</div>
            </div>
          </div>
        </div>

        {/* Chapter 03: Chassis */}
        <div className="story-chapter-3 absolute z-25 bottom-28 left-6 sm:left-14 lg:left-24 max-w-md bg-[#0a0a0d]/90 border border-white/10 backdrop-blur-2xl p-7 rounded-xl shadow-2xl opacity-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-orange-400 mb-2">
            Chapter 03 / Architecture
          </div>
          <h2 className="text-3xl font-black uppercase font-display text-white tracking-tight leading-tight">
            Single-Piece Carbon Monocoque Cell
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            Aerospace-grade autoclave carbon tub delivering 52,000 Nm/degree torsional resistance with a dry curb weight of just 1,380 kg.
          </p>
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black font-display text-white tabular-nums">1,380 <span className="text-xs font-normal text-neutral-400">KG</span></div>
              <div className="text-[10px] uppercase font-mono text-neutral-400">Dry Vehicle Mass</div>
            </div>
            <button
              onClick={onOpenReserve}
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-400 text-black rounded transition-colors cursor-pointer"
            >
              Configure Build
            </button>
          </div>
        </div>

        {/* BOTTOM ZONE: MINIMALIST SCROLL CUE & EDITORIAL STRIP */}
        <div className="relative z-20 w-full max-w-7xl mx-auto pb-8 sm:pb-10 px-6 lg:px-10 flex flex-col items-center">
          {/* Vertical Scroll Indicator */}
          <div className="hero-scroll-indicator flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
            <span>Scroll to Explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
          </div>
        </div>

        {/* SIDEBAR: DISCREET EDITORIAL PROGRESS MILESTONES */}
        <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl">
          {[
            { num: '00', title: 'LAUNCH' },
            { num: '01', title: 'AERO' },
            { num: '02', title: 'POWER' },
            { num: '03', title: 'CHASSIS' },
          ].map((item, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={item.num}
                onClick={() => jumpToChapter(idx)}
                className={`text-left px-2.5 py-1.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'text-orange-400 font-bold bg-white/5 translate-x-1'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>{item.num}</span> / <span>{item.title}</span>
              </button>
            );
          })}
          <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-orange-500 transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
