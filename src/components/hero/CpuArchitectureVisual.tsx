import React, { useState, useEffect } from 'react';

interface VisualNode {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rtl: string;
}

export default function CpuArchitectureVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Cycle through CPU execution steps to animate real hardware flow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const nodes: VisualNode[] = [
    { id: 'pc', name: 'PC', sub: 'Program Counter', x: 40, y: 155, width: 85, height: 50, rtl: 'rtl/cpu_datapath.sv' },
    { id: 'imem', name: 'Instruction Memory', sub: 'ROM / I-Cache', x: 170, y: 55, width: 140, height: 54, rtl: 'rtl/instruction_memory.sv' },
    { id: 'decode', name: 'Instruction Decode', sub: 'Opcode / Reg Addr', x: 170, y: 155, width: 140, height: 54, rtl: 'rtl/immediate_generator.sv' },
    { id: 'regfile', name: 'Register File', sub: '32 x 32-bit Registers', x: 170, y: 255, width: 140, height: 54, rtl: 'rtl/register_file.sv' },
    { id: 'alu', name: 'ALU', sub: 'Arithmetic / Logic', x: 170, y: 355, width: 140, height: 54, rtl: 'rtl/alu.sv' },
    { id: 'dmem', name: 'Data Memory', sub: 'SRAM / Load-Store', x: 80, y: 460, width: 130, height: 54, rtl: 'rtl/data_memory.sv' },
    { id: 'branch', name: 'Branch / Jump', sub: 'PC Target Mux', x: 270, y: 460, width: 130, height: 54, rtl: 'rtl/cpu_datapath.sv' },
    { id: 'wb', name: 'Writeback Mux', sub: 'rd <- ALU / Mem', x: 175, y: 560, width: 130, height: 50, rtl: 'rtl/cpu_datapath.sv' },
  ];

  return (
    <div className="relative h-full w-full flex items-center justify-center p-4">
      {/* Background radial gradient glow behind CPU datapath */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-[500px] h-[640px]">
        <svg
          viewBox="0 0 480 640"
          className="w-full h-full drop-shadow-2xl select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="busGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="activePulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>

            {/* Arrow Marker */}
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#22d3ee" />
            </marker>
            <marker id="arrowMuted" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#52525b" />
            </marker>
          </defs>

          {/* Interconnect Signal Buses */}
          {/* PC -> IMEM */}
          <path
            d="M 82 155 L 82 82 L 164 82"
            stroke={activeStep === 0 ? '#22d3ee' : '#3f3f46'}
            strokeWidth={activeStep === 0 ? '2' : '1.2'}
            strokeDasharray={activeStep === 0 ? '6 4' : 'none'}
            className={activeStep === 0 ? 'animate-[dash_1s_linear_infinite]' : ''}
            markerEnd={activeStep === 0 ? 'url(#arrow)' : 'url(#arrowMuted)'}
          />

          {/* PC -> Decode */}
          <path
            d="M 125 180 L 164 180"
            stroke={activeStep === 0 ? '#22d3ee' : '#3f3f46'}
            strokeWidth="1.2"
            markerEnd="url(#arrowMuted)"
          />

          {/* IMEM -> Decode */}
          <path
            d="M 240 109 L 240 149"
            stroke={activeStep === 1 ? '#22d3ee' : '#3f3f46'}
            strokeWidth={activeStep === 1 ? '2.5' : '1.2'}
            strokeDasharray={activeStep === 1 ? '6 4' : 'none'}
            markerEnd="url(#arrow)"
          />

          {/* Decode -> RegFile */}
          <path
            d="M 240 209 L 240 249"
            stroke={activeStep === 2 ? '#22d3ee' : '#3f3f46'}
            strokeWidth={activeStep === 2 ? '2.5' : '1.2'}
            strokeDasharray={activeStep === 2 ? '6 4' : 'none'}
            markerEnd="url(#arrow)"
          />

          {/* RegFile -> ALU */}
          <path
            d="M 240 309 L 240 349"
            stroke={activeStep === 3 ? '#22d3ee' : '#3f3f46'}
            strokeWidth={activeStep === 3 ? '2.5' : '1.2'}
            strokeDasharray={activeStep === 3 ? '6 4' : 'none'}
            markerEnd="url(#arrow)"
          />

          {/* ALU -> Data Memory */}
          <path
            d="M 210 409 L 210 435 L 145 435 L 145 454"
            stroke={activeStep === 4 ? '#22d3ee' : '#3f3f46'}
            strokeWidth={activeStep === 4 ? '2.5' : '1.2'}
            strokeDasharray={activeStep === 4 ? '6 4' : 'none'}
            markerEnd="url(#arrow)"
          />

          {/* ALU -> Branch */}
          <path
            d="M 270 409 L 270 435 L 335 435 L 335 454"
            stroke={activeStep === 4 ? '#818cf8' : '#3f3f46'}
            strokeWidth={activeStep === 4 ? '2.5' : '1.2'}
            strokeDasharray={activeStep === 4 ? '6 4' : 'none'}
            markerEnd="url(#arrow)"
          />

          {/* Data Memory -> Writeback */}
          <path
            d="M 145 514 L 145 540 L 215 540 L 215 554"
            stroke={activeStep === 5 ? '#22d3ee' : '#3f3f46'}
            strokeWidth={activeStep === 5 ? '2.5' : '1.2'}
            strokeDasharray={activeStep === 5 ? '6 4' : 'none'}
            markerEnd="url(#arrow)"
          />

          {/* Branch -> Writeback / PC feedback */}
          <path
            d="M 335 514 L 335 540 L 265 540 L 265 554"
            stroke="#3f3f46"
            strokeWidth="1.2"
            markerEnd="url(#arrowMuted)"
          />

          {/* Writeback feedback bus up to RegFile */}
          <path
            d="M 175 585 L 20 585 L 20 282 L 164 282"
            stroke={activeStep === 5 ? '#818cf8' : '#27272a'}
            strokeWidth={activeStep === 5 ? '1.8' : '1'}
            strokeDasharray={activeStep === 5 ? '5 3' : '3 3'}
            markerEnd={activeStep === 5 ? 'url(#arrow)' : 'url(#arrowMuted)'}
          />

          {/* Hardware Blocks / Nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isCurrentActive =
              (node.id === 'pc' && activeStep === 0) ||
              (node.id === 'imem' && activeStep === 1) ||
              (node.id === 'decode' && activeStep === 2) ||
              (node.id === 'regfile' && activeStep === 3) ||
              (node.id === 'alu' && activeStep === 3) ||
              ((node.id === 'dmem' || node.id === 'branch') && activeStep === 4) ||
              (node.id === 'wb' && activeStep === 5);

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Node Box */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx="8"
                  fill="#060911"
                  stroke={isHovered ? '#22d3ee' : isCurrentActive ? '#38bdf8' : '#27272a'}
                  strokeWidth={isHovered || isCurrentActive ? '1.8' : '1'}
                  className="transition-colors duration-200"
                />

                {/* Subtle top indicator bar */}
                <rect
                  x={node.x + 8}
                  y={node.y}
                  width={node.width - 16}
                  height="2"
                  fill={isCurrentActive ? '#22d3ee' : 'transparent'}
                />

                {/* Node Title */}
                <text
                  x={node.x + node.width / 2}
                  y={node.y + 22}
                  textAnchor="middle"
                  fill={isHovered || isCurrentActive ? '#ffffff' : '#e4e4e7'}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {node.name}
                </text>

                {/* Subtitle / Spec */}
                <text
                  x={node.x + node.width / 2}
                  y={node.y + 38}
                  textAnchor="middle"
                  fill="#71717a"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Hardware Flow Legend Box */}
        <div className="absolute bottom-1 right-2 left-2 rounded-xl border border-white/10 bg-[#060a12]/90 p-3 backdrop-blur-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              STAGE: <span className="text-cyan-300 font-semibold">{
                ['01 IF (Fetch)', '02 ID (Decode)', '03 EX (Execute)', '04 ALU Math', '05 MEM (Access)', '06 WB (Commit)'][activeStep]
              }</span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">
            RV32I · 32-bit Single Cycle Datapath
          </span>
        </div>
      </div>
    </div>
  );
}
