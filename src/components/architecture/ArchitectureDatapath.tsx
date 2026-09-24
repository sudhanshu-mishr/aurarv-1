import React, { useState } from 'react';
import ArchitectureNavigator from './ArchitectureNavigator';
import { ArrowRight, CheckCircle2, Clock, FileCode, Cpu } from 'lucide-react';

interface DatapathBlock {
  id: string;
  name: string;
  category: string;
  rtl: string;
  status: 'Implemented' | 'In development' | 'Planned';
  description: string;
  operations: string[];
  signals: string[];
}

export default function ArchitectureDatapath() {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('alu');

  const blocks: DatapathBlock[] = [
    {
      id: 'pc',
      name: 'Program Counter (PC)',
      category: 'Fetch Unit',
      rtl: 'rtl/cpu_datapath.sv',
      status: 'Implemented',
      description: 'Holds the 32-bit byte address of the instruction being fetched. Automatically increments by +4 for sequential instructions or loads target address during branches and jumps.',
      operations: ['PC <= PC + 4', 'PC <= Branch Target (imm)', 'PC <= Jump Target (rs1 + imm)'],
      signals: ['clk', 'rst_n', 'pc_next[31:0]', 'pc_curr[31:0]'],
    },
    {
      id: 'imem',
      name: 'Instruction Memory',
      category: 'Memory Stage',
      rtl: 'rtl/instruction_memory.sv',
      status: 'Implemented',
      description: 'Synthesizable ROM/RAM block indexed by PC[31:2]. Delivers 32-bit machine code instructions to the instruction decoder on each clock cycle.',
      operations: ['Word Addressing', 'Read-Only Memory', 'Default NOP generation on OOB'],
      signals: ['pc_addr[31:0]', 'instruction[31:0]'],
    },
    {
      id: 'imm_gen',
      name: 'Immediate Generator',
      category: 'Decode Unit',
      rtl: 'rtl/immediate_generator.sv',
      status: 'Implemented',
      description: 'Reconstructs and sign-extends literals packed across asymmetric bit fields in RISC-V instructions into standard 32-bit two\'s-complement values.',
      operations: ['I-type sign extension', 'S-type store offset', 'B-type branch offset', 'U-type upper 20-bit', 'J-type 20-bit jump offset'],
      signals: ['instruction[31:0]', 'imm_out[31:0]'],
    },
    {
      id: 'control',
      name: 'Control Logic Unit',
      category: 'Control Unit',
      rtl: 'rtl/cpu.sv',
      status: 'Implemented',
      description: 'Decodes the opcode, funct3, and funct7 fields to generate active control signals for multiplexers, write enables, and the ALU operation controller.',
      operations: ['Opcode Decoding', 'ALU Operation Multiplexing', 'Memory Read/Write Arbitration', 'Branch Condition Check'],
      signals: ['reg_write', 'alu_src', 'mem_to_reg', 'mem_write', 'branch', 'alu_ctrl[3:0]'],
    },
    {
      id: 'regfile',
      name: 'Register File',
      category: 'Execution Unit',
      rtl: 'rtl/register_file.sv',
      status: 'Implemented',
      description: '32 general-purpose 32-bit dual-read single-write registers (x0–x31). Register x0 is physically hardwired to 0x00000000.',
      operations: ['Asynchronous 2-Port Read (rs1, rs2)', 'Synchronous 1-Port Write (rd)', 'Hardwired x0 Zero Guard'],
      signals: ['rs1_addr[4:0]', 'rs2_addr[4:0]', 'rd_addr[4:0]', 'rd_data[31:0]', 'reg_write_en'],
    },
    {
      id: 'alu',
      name: 'Arithmetic Logic Unit (ALU)',
      category: 'Execution Unit',
      rtl: 'rtl/alu.sv',
      status: 'Implemented',
      description: 'Executes core integer arithmetic, logical bitwise operations, shifts, and signed/unsigned magnitude comparisons on two 32-bit operands.',
      operations: ['ADD', 'SUB', 'AND', 'OR', 'XOR', 'SLT', 'SLL', 'SRL'],
      signals: ['alu_in_a[31:0]', 'alu_in_b[31:0]', 'alu_ctrl[3:0]', 'alu_out[31:0]', 'alu_zero'],
    },
    {
      id: 'dmem',
      name: 'Data Memory',
      category: 'Memory Stage',
      rtl: 'rtl/data_memory.sv',
      status: 'Implemented',
      description: 'Dual-access byte/word SRAM memory subsystem handling LW (load word) and SW (store word) operations at calculated effective addresses.',
      operations: ['Synchronous Word Write', 'Asynchronous / Synced Read', 'Address Boundary Guard'],
      signals: ['clk', 'mem_write_en', 'mem_read_en', 'addr[31:0]', 'write_data[31:0]', 'read_data[31:0]'],
    },
    {
      id: 'branch',
      name: 'Branch / Jump Logic',
      category: 'Control Flow',
      rtl: 'rtl/cpu_datapath.sv',
      status: 'In development',
      description: 'Evaluates branch conditions (BEQ, BNE) based on ALU zero and sign flags, dynamically redirecting the program counter to the target offset.',
      operations: ['BEQ (Branch Equal)', 'BNE (Branch Not Equal)', 'JAL (Jump and Link)'],
      signals: ['branch_en', 'alu_zero', 'pc_target[31:0]', 'pc_sel'],
    },
    {
      id: 'wb',
      name: 'Writeback Mux',
      category: 'Writeback Stage',
      rtl: 'rtl/cpu_datapath.sv',
      status: 'Implemented',
      description: 'Selects the writeback result between ALU calculation output, memory read data, and PC+4 (for link registers) to commit into destination register rd.',
      operations: ['ALU result bypass', 'Memory load data commit', 'Return address linking'],
      signals: ['mem_to_reg', 'alu_out[31:0]', 'mem_data[31:0]', 'wb_data[31:0]'],
    },
  ];

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[5];

  return (
    <section id="architecture" className="relative bg-[#030508]/85 py-28 border-t border-white/5 backdrop-blur-[2px]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              PROCESSOR ARCHITECTURE
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Inside AURA-RV
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              A transparent view of the processor datapath. Select any hardware block to inspect its RTL source, operational matrix, and signal buses.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="h-4 w-4" /> Synthesizable RTL
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-indigo-300">
              <Clock className="h-4 w-4" /> Single-Cycle Target
            </span>
          </div>
        </div>

        {/* Main Grid: Left is Datapath Visual & Selector, Right is Floating Navigator & Block Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Interactive Datapath Stage Selector (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Visual Datapath Pipeline Flow Track */}
            <div className="rounded-2xl border border-white/10 bg-[#060911]/80 p-6 backdrop-blur-md">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>DATAPATH_INTERCONNECT_FLOW</span>
                <span className="text-cyan-400">CLICK BLOCK TO INSPECT</span>
              </div>

              {/* Sequential Flow Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {blocks.map((block) => {
                  const isSelected = block.id === selectedBlockId;
                  return (
                    <button
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`relative flex flex-col items-start p-4 rounded-xl text-left transition-all duration-200 border ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(34,211,238,0.15)] ring-1 ring-cyan-400/50'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">
                        {block.category}
                      </span>
                      <span className="mt-1 text-sm font-semibold text-white truncate w-full">
                        {block.name}
                      </span>
                      <div className="mt-3 flex items-center justify-between w-full text-[11px] font-mono">
                        <span className="text-zinc-400 truncate max-w-[100px]">{block.rtl.split('/')[1]}</span>
                        <span className={block.status === 'Implemented' ? 'text-cyan-400' : 'text-amber-400'}>
                          {block.status === 'Implemented' ? 'Active' : 'Dev'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Signal Bus Flow diagram summary */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span>Fetch (PC/IMEM)</span>
                  <span className="text-zinc-600">→</span>
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span>Decode (RegFile/Imm)</span>
                  <span className="text-zinc-600">→</span>
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span>Execute (ALU)</span>
                  <span className="text-zinc-600">→</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Commit (MEM/WB)</span>
                </div>
              </div>
            </div>

            {/* Selected Block Detailed Spec Card */}
            <div className="rounded-2xl border border-white/10 bg-[#060a13] p-7 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {selectedBlock.name}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 border border-cyan-400/30 bg-cyan-950/40 rounded px-2 py-0.5">
                      {selectedBlock.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs font-mono text-zinc-400">
                    <FileCode className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-zinc-300">{selectedBlock.rtl}</span>
                    <span>·</span>
                    <span>{selectedBlock.category}</span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {selectedBlock.description}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Operations */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Operations & Instructions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBlock.operations.map((op) => (
                      <span
                        key={op}
                        className="rounded bg-white/[0.06] px-2 py-1 font-mono text-xs text-cyan-300"
                      >
                        {op}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ports & Signal Buses */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Interface Ports & Buses
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBlock.signals.map((sig) => (
                      <span
                        key={sig}
                        className="rounded bg-white/[0.06] px-2 py-1 font-mono text-xs text-indigo-300"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating BranchedMenu Desktop Navigator (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <ArchitectureNavigator
              activeNode={selectedBlockId}
              onSelectNode={(val) => {
                const match = blocks.find((b) => val.includes(b.id));
                if (match) setSelectedBlockId(match.id);
              }}
            />

            {/* Quick Spec Highlights */}
            <div className="rounded-2xl border border-white/10 bg-[#060911]/60 p-5 text-xs font-mono">
              <div className="text-zinc-400 font-semibold mb-3 flex items-center justify-between">
                <span>CORE METRICS</span>
                <span className="text-cyan-400">ESTIMATED</span>
              </div>
              <div className="space-y-2.5 text-zinc-400">
                <div className="flex justify-between">
                  <span>Architecture</span>
                  <span className="text-white font-medium">RV32I Base</span>
                </div>
                <div className="flex justify-between">
                  <span>Datapath Width</span>
                  <span className="text-white font-medium">32-bit Uniform</span>
                </div>
                <div className="flex justify-between">
                  <span>General Regs</span>
                  <span className="text-white font-medium">32 (x0 hardwired 0)</span>
                </div>
                <div className="flex justify-between">
                  <span>Instruction Width</span>
                  <span className="text-white font-medium">32-bit Fixed</span>
                </div>
                <div className="flex justify-between">
                  <span>RTL Standard</span>
                  <span className="text-white font-medium">IEEE 1800-2012</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
