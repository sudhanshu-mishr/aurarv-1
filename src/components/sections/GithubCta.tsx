import React from 'react';
import MoltenMetal from '@/components/ui/MoltenMetal';
import { Github, ArrowUpRight, Terminal } from 'lucide-react';

export default function GithubCta() {
  return (
    <section className="relative overflow-hidden bg-[#020305] py-32 border-t border-white/5">
      {/* MoltenMetal liquid metal background field */}
      <div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen z-0">
        <MoltenMetal
          color1="#0c192c"
          color2="#0ea5e9"
          color3="#e0f2fe"
          speed={0.2}
          scale={4}
          detail={3}
          glow={1.5}
          coreSize={0.09}
          swirl={1}
          fold={-0.22}
          blackPoint={0.06}
          brightness={1.15}
          colorMode="frost"
          grain={true}
          grainIntensity={0.03}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={0.8}
        />
      </div>

      {/* Atmospheric gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020305]/80 via-transparent to-[#020305]/80 z-[1]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold mb-6">
          <Terminal className="h-4 w-4" />
          <span>OPEN-SOURCE HARDWARE REPOSITORY</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
          Build the processor.
          <br />
          Understand the silicon.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-zinc-400 font-light">
          AURA-RV is completely open-source. Clone the repository, simulate the RTL testbenches, and explore the microarchitecture.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/sudhanshu-mishra/AURA-RV"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-semibold text-zinc-950 shadow-xl transition-all hover:bg-cyan-50 hover:shadow-cyan-500/20 active:scale-[0.98]"
          >
            <Github className="h-5 w-5" />
            <span>VIEW SOURCE ON GITHUB</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Git Quickstart command */}
        <div className="mt-10 mx-auto max-w-md rounded-xl border border-white/10 bg-black/75 p-3.5 backdrop-blur-md font-mono text-xs text-zinc-400 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 truncate">
            <span className="text-cyan-400">$</span>
            <span className="text-zinc-200 truncate">git clone https://github.com/sudhanshu-mishra/AURA-RV.git</span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase ml-2 shrink-0">BASH</span>
        </div>

      </div>
    </section>
  );
}
