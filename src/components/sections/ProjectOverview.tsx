import React from 'react';
import MoltenMetal from '@/components/ui/MoltenMetal';
import { Cpu, Binary, Layers, ShieldCheck } from 'lucide-react';

export default function ProjectOverview() {
  const pillars = [
    {
      icon: <Binary className="h-5 w-5 text-cyan-400" />,
      title: 'RV32I Base Integer ISA',
      description:
        'Engineered to adhere strictly to the open RISC-V specification with 32 general-purpose registers, 32-bit program counter, and standard instruction formats.',
    },
    {
      icon: <Layers className="h-5 w-5 text-indigo-400" />,
      title: 'Modular SystemVerilog RTL',
      description:
        'Decomposed into clean synthesizable modules: register file, arithmetic logic unit, sign-extending immediate generator, memory interfaces, and control state machines.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
      title: 'Regression Verification',
      description:
        'Self-checking testbenches, cycle-by-cycle memory monitoring, and compiled assembly test sequences to systematically prove correctness before physical synthesis.',
    },
    {
      icon: <Cpu className="h-5 w-5 text-indigo-400" />,
      title: 'Physical Design Target',
      description:
        'Synthesizable down to logic gates and cell placement tracks with open-source toolchains, exploring timing closure and floorplanning toward standard cell GDSII.',
    },
  ];

  return (
    <section id="overview" className="relative bg-[#020305] py-28 border-t border-white/5 overflow-hidden">
      {/* Subtle MoltenMetal Liquid Field Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen z-0">
        <MoltenMetal
          color1="#061224"
          color2="#1e3a8a"
          color3="#38bdf8"
          speed={0.18}
          scale={4.2}
          detail={2}
          glow={1.2}
          coreSize={0.06}
          swirl={0.7}
          fold={-0.15}
          blackPoint={0.12}
          brightness={1.0}
          colorMode="frost"
          grain={false}
          mouseInteraction={true}
          mouseStrength={0.2}
          opacity={0.65}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
            ENGINEERING MANIFESTO
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Transparent computing from
            <br />
            HDL to silicon physics.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
            AURA-RV is an open-source processor development project focused on understanding and building
            a RISC-V CPU from the hardware description level upward. The project explores CPU architecture,
            RTL design, verification, simulation and the path toward physical implementation.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="group relative rounded-2xl border border-white/10 bg-[#060911]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#080d18]/90"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10">
                  {pillar.icon}
                </div>
                <span className="font-mono text-xs text-zinc-600 font-semibold">0{idx + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
