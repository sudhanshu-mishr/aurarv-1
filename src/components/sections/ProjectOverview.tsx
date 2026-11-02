import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Binary, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProjectOverview() {
  const pillars = [
    {
      code: 'SPEC_01',
      icon: <Binary className="h-5 w-5 text-cyan-400" />,
      title: 'RV32I Base Integer ISA',
      description:
        'Engineered to adhere strictly to the open RISC-V specification with 32 general-purpose registers, 32-bit program counter, and standard instruction formats.',
      tag: 'UNPRIVILEGED V2.2',
    },
    {
      code: 'RTL_02',
      icon: <Layers className="h-5 w-5 text-indigo-400" />,
      title: 'Modular SystemVerilog RTL',
      description:
        'Decomposed into clean synthesizable modules: register file, arithmetic logic unit, sign-extending immediate generator, memory interfaces, and control state machines.',
      tag: 'IEEE 1800-2012',
    },
    {
      code: 'VERIF_03',
      icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
      title: 'Regression Verification',
      description:
        'Self-checking testbenches, cycle-by-cycle memory monitoring, and compiled assembly test sequences to systematically prove correctness before physical synthesis.',
      tag: 'ASSERTION-BASED',
    },
    {
      code: 'PHYS_04',
      icon: <Cpu className="h-5 w-5 text-indigo-400" />,
      title: 'Physical Design Target',
      description:
        'Synthesizable down to logic gates and cell placement tracks with open-source toolchains, exploring timing closure and floorplanning toward standard cell GDSII.',
      tag: 'YOSYS + OPENROAD',
    },
  ];

  return (
    <section id="overview" className="relative bg-[#020305]/85 py-28 border-t border-white/5 backdrop-blur-[2px] overflow-hidden">
      {/* Precision grid accents */}
      <div className="absolute inset-0 subtle-circuit-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
            ENGINEERING MANIFESTO
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Transparent computing from
            <br />
            HDL to silicon physics.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            AURA-RV is an open-source processor development project focused on understanding and building
            a RISC-V CPU from the hardware description level upward. The project explores CPU architecture,
            RTL design, verification, simulation and the path toward physical implementation.
          </p>
        </motion.div>

        {/* 4 Architectural Pillars with Staggered Motion */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#060911]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#080d18]/90 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 font-semibold tracking-wider">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>{pillar.tag}</span>
                <span className="text-cyan-400/80 group-hover:text-cyan-300">STAGE 0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
