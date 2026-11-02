import React from 'react';
import InfiniteSpiral from '@/components/ui/InfiniteSpiral';
import { stackItems } from '@/data/stackData';
import { Layers, Terminal, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function StackExplorer() {
  const stackLayers = [
    { title: 'ISA Specification', spec: 'RISC-V RV32I Base Integer', tag: 'SPEC' },
    { title: 'Hardware RTL', spec: 'SystemVerilog (IEEE 1800)', tag: 'LOGIC' },
    { title: 'Verification', spec: 'Icarus Verilog + GTKWave', tag: 'VERIF' },
    { title: 'Physical EDA', spec: 'Yosys + LibreLane / OpenLane', tag: 'EDA' },
  ];

  return (
    <section
      id="stack"
      className="relative min-h-[720px] overflow-hidden bg-[#030508]/85 py-32 border-t border-white/5 backdrop-blur-[2px]"
    >
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            THE STACK
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl text-balance">
            From instruction set
            <br />
            to physical design.
          </h2>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            Explore the technologies, tooling, and hardware blocks that make up
            the AURA-RV development stack—spanning specifications, RTL logic, verification engines, and physical EDA.
          </p>

          {/* Layer badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stackLayers.map((l) => (
              <div
                key={l.tag}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs font-mono"
              >
                <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                  {l.tag}
                </span>
                <div className="text-white font-medium text-xs mt-1 truncate">
                  {l.title}
                </div>
                <div className="text-zinc-500 text-[10px] truncate mt-0.5">
                  {l.spec}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D Infinite Spiral Viewport */}
        <div className="relative mx-auto h-[540px] sm:h-[580px] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
          
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
              9 Core Hardware Blocks & Tools
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default StackExplorer;
