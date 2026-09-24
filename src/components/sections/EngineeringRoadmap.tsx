import React from 'react';
import { CheckCircle2, Clock, CircleDot, ChevronRight } from 'lucide-react';

interface RoadmapPhase {
  phase: string;
  title: string;
  status: 'Completed' | 'Current Focus' | 'Planned';
  items: string[];
}

export default function EngineeringRoadmap() {
  const phases: RoadmapPhase[] = [
    {
      phase: 'Phase 01',
      title: 'Foundation',
      status: 'Completed',
      items: [
        'RISC-V ISA selection & unprivileged spec conformance',
        'Modular RTL architecture scaffolding',
        'Basic 32-bit single-cycle datapath',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Core Execution',
      status: 'Current Focus',
      items: [
        'Instruction decode & immediate generation',
        'Hardwired control logic unit',
        'Synchronous memory operations (LW / SW)',
        'Branch and jump conditional evaluation',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Verification',
      status: 'Current Focus',
      items: [
        'Directed assembly test suites',
        'Self-checking simulation testbenches',
        'Functional assertions & corner-case checks',
        'Code and branch coverage metrics',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Microarchitecture',
      status: 'Planned',
      items: [
        '5-stage pipelined datapath (IF, ID, EX, MEM, WB)',
        'Data hazard detection & pipeline stalls',
        'Operand forwarding unit',
        'Branch prediction heuristics',
      ],
    },
    {
      phase: 'Phase 05',
      title: 'SoC & Interconnect',
      status: 'Planned',
      items: [
        'TileLink / Wishbone on-chip system bus',
        'Standard memory-mapped peripherals (UART, Timer)',
        'Vectored interrupts & CSR registers',
        'Minimal bootloader firmware flow',
      ],
    },
    {
      phase: 'Phase 06',
      title: 'Silicon Exploration',
      status: 'Planned',
      items: [
        'Logic synthesis with Yosys',
        'Physical design exploration via LibreLane / OpenLane',
        'Static timing analysis (STA) closure',
        'Standard cell DRC / LVS and clean GDSII export',
      ],
    },
  ];

  return (
    <section id="roadmap" className="relative bg-[#030508]/85 py-28 border-t border-white/5 backdrop-blur-[2px]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              DEVELOPMENT HORIZON
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Engineering Roadmap
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              A transparent engineering plan guiding AURA-RV from foundation architecture toward pipelined microarchitectures and physical silicon layout.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Completed
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Clock className="h-4 w-4" /> Current
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600">
              <CircleDot className="h-4 w-4" /> Planned
            </span>
          </div>
        </div>

        {/* 6 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((p) => {
            const isCompleted = p.status === 'Completed';
            const isCurrent = p.status === 'Current Focus';

            return (
              <div
                key={p.phase}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                  isCurrent
                    ? 'border-cyan-400/50 bg-[#091424] shadow-[0_0_25px_rgba(34,211,238,0.12)] ring-1 ring-cyan-400/30'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-[#061017]/60'
                    : 'border-white/10 bg-[#05070c]/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wider">
                      {p.phase}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        isCurrent
                          ? 'text-cyan-300 border-cyan-400/40 bg-cyan-950/50'
                          : isCompleted
                          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
                          : 'text-zinc-500 border-zinc-700/40 bg-zinc-900/40'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {p.title}
                  </h3>

                  <ul className="mt-5 space-y-2.5 text-xs text-zinc-300">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isCurrent ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-zinc-600'}`} />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Scope: Open-Source</span>
                  <span>{isCurrent ? 'Active Sprint' : isCompleted ? 'Verified' : 'Backlog'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
