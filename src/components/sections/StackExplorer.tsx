import React from 'react';
import InfiniteSpiral from '@/components/ui/InfiniteSpiral';
import { stackItems } from '@/data/stackData';
import { Layers, Terminal, Sparkles } from 'lucide-react';

export function StackExplorer() {
  return (
    <section
      id="stack"
      className="relative min-h-[720px] overflow-hidden bg-[#030508]/85 py-32 border-t border-white/5 backdrop-blur-[2px]"
    >
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            THE STACK
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl text-balance">
            From instruction set
            <br />
            to physical design.
          </h2>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
            Explore the technologies, tooling, and hardware blocks that make up
            the AURA-RV development stack—spanning specifications, RTL logic, verification engines, and physical EDA.
          </p>
        </div>

        {/* 3D Infinite Spiral Viewport */}
        <div className="relative mx-auto h-[560px] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
          
          <InfiniteSpiral
            items={stackItems}
            animationMode="all"
            speed={0.32}
            direction="up"
            radius={180}
            cardWidth={160}
            cardHeight={160}
            verticalSpacing={76}
            perspective={1100}
            cardsPerTurn={8}
            cardRadius={18}
            centerScale={1.25}
            edgeFade={0.34}
            edgeBlur={7}
            pauseOnHover
            imageFit="contain"
            grayscale={0}
            className="h-full w-full"
          />

          {/* Radial masking vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,5,8,0.85)_75%)]" />

          {/* Interactive Hint Overlay */}
          <div className="pointer-events-none absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Interactive 3D Stack · Drag or hover to pause</span>
            </span>
            <span className="hidden sm:inline text-zinc-400 font-mono">
              9 Core Hardware Blocks
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default StackExplorer;
