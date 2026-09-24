import React from 'react';
import { Cpu, Terminal, Shield, BookOpen } from 'lucide-react';

export default function ProjectAbout() {
  return (
    <section id="about" className="relative bg-[#020305]/85 py-28 border-t border-white/5 backdrop-blur-[2px]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              ABOUT THE PROJECT
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Demystifying processor hardware from first principles.
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              <p>
                AURA-RV is an open-source processor development project
                focused on understanding and building a RISC-V CPU from
                the hardware description level upward.
              </p>
              <p>
                The project explores CPU architecture, RTL design,
                verification, simulation and the path toward physical
                implementation.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <span>Open Educational Resource</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2">
                <Shield className="h-4 w-4 text-indigo-400" />
                <span>Apache 2.0 / Permissive Open Source</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-[#060a13] p-7 backdrop-blur-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                PROJECT MANIFEST
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-zinc-400">Core Repository</span>
                  <span className="text-white font-medium">AURA-RV</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-zinc-400">Target ISA</span>
                  <span className="text-cyan-300 font-medium">RV32I Base Integer</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-zinc-400">HDL Standard</span>
                  <span className="text-white font-medium">SystemVerilog (IEEE 1800)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-zinc-400">Verification Engine</span>
                  <span className="text-white font-medium">Icarus Verilog + GTKWave</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Physical EDA Target</span>
                  <span className="text-indigo-300 font-medium">LibreLane / Yosys Flow</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
