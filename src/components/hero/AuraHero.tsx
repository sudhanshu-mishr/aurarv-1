import React from 'react';
import ShapeBlur from '@/components/ui/ShapeBlur';
import ShapeWaves from '@/components/ui/ShapeWaves';
import CpuArchitectureVisual from './CpuArchitectureVisual';
import { ArrowRight, Github, Cpu, Terminal, Layers } from 'lucide-react';

export default function AuraHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#030508]/85 pt-20"
    >
      {/* 1. Deep Semiconductor ShapeBlur Ambient Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShapeBlur
          variation={0}
          pixelRatioProp={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)}
          shapeSize={0.72}
          roundness={0.72}
          borderSize={0.025}
          circleSize={0.20}
          circleEdge={0.75}
          shapeColor="#0e1a2d"
          className="w-full h-full"
        />
      </div>

      {/* 2. React Bits ShapeWaves Quantum / Semiconductor Field */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-45 mix-blend-screen">
        <ShapeWaves
          text="AURA-RV"
          fontFamily='JetBrains Mono, monospace'
          fontWeight={700}
          textSize={0.28}
          shapes="mixed"
          cellSize={13}
          dotSize={0.7}
          color="#16385d"
          hoverColor="#22d3ee"
          backgroundColor="#00000000"
          speed={0.8}
          scale={1.2}
          contrast={1.1}
          brightness={0.38}
          flow={0}
          direction={0}
          fade={0.32}
          interactive={true}
          splashRadius={45}
          splashStrength={0.45}
          glow={0.35}
          intro={true}
          introDuration={1.8}
          paused={false}
          className="h-full w-full"
        />
      </div>

      {/* 3. Subtle Semiconductor Grid */}
      <div className="absolute inset-0 z-[2] hero-grid pointer-events-none" />

      {/* 4. Main Content Container */}
      <div className="relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-6 flex items-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Architectural Kicker (No pill box, clean typographic text) */}
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-6">
              <span className="text-cyan-400 tracking-[0.25em] font-semibold uppercase">AURA-RV PROJECT</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">RV32I BASE ISA</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">IEEE 1800 SYSTEMVERILOG</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              A RISC-V CPU.
              <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-cyan-300 bg-clip-text text-transparent">
                Built from RTL to Silicon.
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="mt-7 text-lg sm:text-xl text-zinc-300/90 leading-relaxed max-w-2xl font-light">
              An open-source processor architecture engineered from
              instruction set to RTL, verification, synthesis and
              physical-design exploration.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('architecture')}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/5 transition-all hover:bg-cyan-50 hover:shadow-cyan-500/20 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explore Architecture</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://github.com/sudhanshu-mishra/AURA-RV"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <Github className="h-4 w-4 text-zinc-400" />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Quick Micro-Metrics Bar */}
            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">32-bit</div>
                <div className="text-xs text-zinc-400 mt-1">Single-cycle core</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight text-cyan-400 tabular-nums">RV32I</div>
                <div className="text-xs text-zinc-400 mt-1">Target specification</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight text-indigo-300 tabular-nums">OpenEDA</div>
                <div className="text-xs text-zinc-400 mt-1">LibreLane synthesis</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero CPU Visualization */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-md lg:max-w-none rounded-2xl border border-white/10 bg-[#060a12]/80 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                  <span>CORE_DATAPATH_VIEW</span>
                </span>
                <span className="text-[11px] text-cyan-400/90 font-mono">CYCLE-EXACT</span>
              </div>
              <CpuArchitectureVisual />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
