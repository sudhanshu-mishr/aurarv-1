import React from 'react';
import { Github, ArrowUpRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GithubCta() {
  return (
    <section className="relative overflow-hidden bg-[#020305]/85 py-32 border-t border-white/5 backdrop-blur-[2px]">
      {/* Precision circuit grid */}
      <div className="absolute inset-0 subtle-circuit-grid opacity-20 pointer-events-none" />

      {/* Atmospheric gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020305]/80 via-transparent to-[#020305]/80 z-[1]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold mb-6">
            <Terminal className="h-4 w-4" />
            <span>OPEN-SOURCE HARDWARE REPOSITORY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Build the processor.
            <br />
            Understand the silicon.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
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
        </motion.div>

      </div>
    </section>
  );
}
