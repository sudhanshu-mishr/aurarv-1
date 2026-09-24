import React, { useState } from 'react';
import GatewayFlow from '@/components/ui/gateway-flow';
import MoltenMetal from '@/components/ui/MoltenMetal';
import { ArrowRight, CheckCircle2, Clock, CircleDot, Layers, Box, Cpu } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  tool: string;
  status: 'Completed' | 'Current' | 'Planned';
  description: string;
}

export function SiliconFlow() {
  const [selectedStepId, setSelectedStepId] = useState<string>('synthesis');

  const pipeline: PipelineStep[] = [
    {
      id: 'rtl',
      name: 'RTL Design',
      tool: 'SystemVerilog (IEEE 1800)',
      status: 'Completed',
      description: 'Human-authored modular CPU architecture with explicit control/datapath separation.',
    },
    {
      id: 'lint',
      name: 'Lint & Check',
      tool: 'Verilator / Verible',
      status: 'Completed',
      description: 'Static analysis, linting, width mismatch prevention, and synthesizability checks.',
    },
    {
      id: 'sim',
      name: 'Simulation',
      tool: 'Icarus Verilog / GTKWave',
      status: 'Completed',
      description: 'Cycle-by-cycle logic execution and self-checking testbench assertion verification.',
    },
    {
      id: 'synthesis',
      name: 'Logic Synthesis',
      tool: 'Yosys Open Synthesis Suite',
      status: 'Current',
      description: 'Translates SystemVerilog RTL into technology-mapped gate-level netlists with standard cells.',
    },
    {
      id: 'floorplan',
      name: 'Floorplanning',
      tool: 'LibreLane / OpenLane',
      status: 'Current',
      description: 'Defines core die area, aspect ratio, I/O pad boundaries, and power distribution ring (VDD/VSS).',
    },
    {
      id: 'placement',
      name: 'Placement',
      tool: 'RePLace / OpenDP',
      status: 'Planned',
      description: 'Global and detailed placement of standard logic cells to minimize wire length and congestion.',
    },
    {
      id: 'cts',
      name: 'Clock Tree Synthesis (CTS)',
      tool: 'TritonCTS',
      status: 'Planned',
      description: 'Synthesizes balanced clock distribution tree to minimize skew across all registers.',
    },
    {
      id: 'routing',
      name: 'Routing',
      tool: 'FastRoute / TritonRoute',
      status: 'Planned',
      description: 'Detailed routing across metal interconnect layers (M1–M5) without antenna violations.',
    },
    {
      id: 'drc',
      name: 'DRC / LVS',
      tool: 'Magic / KLayout / Netgen',
      status: 'Planned',
      description: 'Design Rule Checking (geometric tolerances) and Layout vs Schematic connectivity equivalence.',
    },
    {
      id: 'gdsii',
      name: 'GDSII Stream',
      tool: 'KLayout',
      status: 'Planned',
      description: 'Final binary Calma GDSII database representation ready for photomask generation.',
    },
  ];

  const selectedStep = pipeline.find((p) => p.id === selectedStepId) || pipeline[3];

  const getStatusColor = (status: PipelineStep['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
      case 'Current':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30 ring-1 ring-cyan-400/40';
      case 'Planned':
        return 'text-zinc-500 border-zinc-700/40 bg-zinc-900/20';
    }
  };

  return (
    <section
      id="physical-design"
      className="relative min-h-[760px] overflow-hidden bg-[#020305] py-28 border-t border-white/5"
    >
      {/* 1. Underlying MoltenMetal liquid metal background field */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen z-0">
        <MoltenMetal
          color1="#081b33"
          color2="#0369a1"
          color3="#22d3ee"
          speed={0.2}
          scale={3.8}
          detail={3}
          glow={1.3}
          coreSize={0.07}
          swirl={0.9}
          fold={-0.2}
          blackPoint={0.1}
          brightness={1.1}
          colorMode="frost"
          grain={true}
          grainIntensity={0.03}
          mouseInteraction={true}
          mouseStrength={0.25}
          opacity={0.7}
        />
      </div>

      {/* 2. GatewayFlow Vector Flow Tracks */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-[1]">
        <GatewayFlow className="h-full w-full" />
      </div>

      {/* 3. Atmospheric gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020305] via-transparent to-[#020305] z-[2]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold">
            RTL → GDSII
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            From hardware description
            <br />
            toward physical silicon.
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400">
            AURA-RV is designed around a modern hardware-development flow
            spanning RTL design, simulation, synthesis and physical
            design exploration using open-source EDA tooling.
          </p>
        </div>

        {/* Horizontal Technical EDA Pipeline */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex items-center min-w-[950px] gap-2">
            {pipeline.map((step, idx) => {
              const isSelected = step.id === selectedStepId;
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setSelectedStepId(step.id)}
                    className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all min-w-[155px] ${
                      isSelected
                        ? 'border-cyan-400 bg-[#0c192c] shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                        : 'border-white/10 bg-[#05080e]/90 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="font-mono text-[10px] text-zinc-500">
                        STAGE 0{idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getStatusColor(step.status)}`}>
                        {step.status}
                      </span>
                    </div>
                    <span className="font-semibold text-xs text-white truncate w-full">
                      {step.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 mt-1 truncate w-full">
                      {step.tool.split(' ')[0]}
                    </span>
                  </button>

                  {idx < pipeline.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Pipeline Stage Details Card */}
        <div className="rounded-2xl border border-white/10 bg-[#060a12]/90 p-7 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedStep.name}
                </h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getStatusColor(selectedStep.status)}`}>
                  Status: {selectedStep.status}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-1">
                Target Toolchain: <span className="text-cyan-300">{selectedStep.tool}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Automated Open-Source ASIC Flow</span>
            </div>
          </div>

          <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            {selectedStep.description}
          </p>

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span>* All stages target standard cell libraries (e.g., SkyWater 130nm or generic open tech libs).</span>
            <span className="text-zinc-400">Pre-silicon exploration stage</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SiliconFlow;
