import React from 'react';
import DitherVeil from '@/components/ui/DitherVeil';
import MoltenMetal from '@/components/ui/MoltenMetal';
import { Layers, Sparkles, Cpu, Eye } from 'lucide-react';

export function CodeToSilicon() {
  return (
    <section id="code-silicon" className="relative min-h-[680px] overflow-hidden bg-black border-t border-white/5">
      {/* 1. Underlying MoltenMetal liquid silicon caustics */}
      <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen z-0">
        <MoltenMetal
          color1="#041226"
          color2="#0284c7"
          color3="#38bdf8"
          speed={0.25}
          scale={3.6}
          detail={3}
          glow={1.5}
          coreSize={0.08}
          swirl={0.8}
          fold={-0.2}
          blackPoint={0.08}
          brightness={1.2}
          colorMode="frost"
          grain={true}
          grainIntensity={0.04}
          mouseInteraction={true}
          mouseStrength={0.25}
          opacity={0.85}
        />
      </div>

      {/* 2. Interactive OGL DitherVeil Canvas (Die layout & metal tracks) */}
      <DitherVeil
        type="bayer"
        pixelSize={3}
        levels={3}
        inkColor="#050912"
        paperColor="#93c5fd"
        contrast={1.2}
        brightness={0.05}
        revealRadius={220}
        softness={0.65}
        linger={1}
        rimColor="#22d3ee"
        rim={0.15}
        wander={false}
        clickBurst={true}
        className="absolute inset-0 opacity-80 z-[1]"
      />

      {/* Subtle radial scrim to preserve typography legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent z-[2]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 flex items-center min-h-[680px]">
        <div className="max-w-2xl">
          
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-4">
            <Cpu className="h-4 w-4" />
            <span>CODE → SILICON</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Revealing physical geometry
            <br />
            beneath the abstraction.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            Every line of SystemVerilog directly maps to physical standard cell transistors, metal routing tracks (M1–M5), and silicon diffusion layers.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 backdrop-blur-md">
              <Eye className="h-4 w-4 text-cyan-400" />
              <span>Hover & Click over canvas to reveal die layout</span>
            </div>
            <span className="text-zinc-500">Bayer Matrix 4×4 · Molten Silicon Substrate</span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase">Standard Cell Logic</div>
              <div className="text-xl font-bold text-white mt-1">NAND, NOR, DFF</div>
              <div className="text-xs text-zinc-400 mt-1">SkyWater / LibreLane tech cells</div>
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase">Routing Metal Hierarchy</div>
              <div className="text-xl font-bold text-cyan-400 mt-1">Layers M1 to M5</div>
              <div className="text-xs text-zinc-400 mt-1">Power straps & clock grid routing</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CodeToSilicon;
