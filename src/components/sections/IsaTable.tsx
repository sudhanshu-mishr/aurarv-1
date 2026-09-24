import React, { useState } from 'react';
import { isaInstructions, InstructionDef } from '@/data/isaData';
import AnimatedList from '@/components/ui/AnimatedList';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Terminal,
  Binary,
  Cpu,
  ListFilter,
  TableProperties,
  ArrowUpDown,
} from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export default function IsaTable() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'matrix' | 'animated-list'>('matrix');
  const [selectedInstName, setSelectedInstName] = useState<string>('ADD');
  const [expandedInst, setExpandedInst] = useState<string | null>('ADD');

  const filteredInstructions = isaInstructions.filter((inst) => {
    const matchesType = filterType === 'all' || inst.type === filterType;
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.opcode.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const selectedInst =
    filteredInstructions.find((i) => i.name === selectedInstName) ||
    filteredInstructions[0] ||
    isaInstructions[0];

  const types = [
    { id: 'all', label: 'All Instructions' },
    { id: 'R', label: 'R-Type (Register)' },
    { id: 'I', label: 'I-Type (Immediate)' },
    { id: 'S', label: 'S-Type (Store)' },
    { id: 'B', label: 'B-Type (Branch)' },
    { id: 'J', label: 'J-Type (Jump)' },
    { id: 'U', label: 'U-Type (Upper Imm)' },
  ];

  const toggleExpand = (name: string) => {
    setExpandedInst((prev) => (prev === name ? null : name));
  };

  const getStatusBadge = (status: InstructionDef['status']) => {
    switch (status) {
      case 'Implemented':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Implemented</span>
          </span>
        );
      case 'In development':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400">
            <Clock className="h-3.5 w-3.5" />
            <span>In dev</span>
          </span>
        );
      case 'Planned':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Planned</span>
          </span>
        );
    }
  };

  return (
    <section id="isa" className="relative bg-[#020305]/85 py-28 border-t border-white/5 backdrop-blur-[2px]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              INSTRUCTION SET ARCHITECTURE
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              RV32I Instruction Set
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              Official verification status of supported 32-bit integer instructions. Filter by instruction type below to watch rows smoothly shift, reorder, and reveal bitfield encodings.
            </p>
          </div>

          {/* Search bar & View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mnemonic or opcode..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl border border-white/10 bg-[#060a12] p-1 text-xs font-mono">
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <TableProperties className="h-3.5 w-3.5" />
                <span>Full Matrix</span>
              </button>
              <button
                onClick={() => setViewMode('animated-list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'animated-list'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span>Interactive Feed</span>
              </button>
            </div>
          </div>
        </div>

        <LayoutGroup id="isa-table-motion-group">
          {/* Filter Segmented Control Tabs with Instruction Counter Badges */}
          <div className="relative flex items-center gap-1.5 overflow-x-auto pb-4 mb-8">
            {types.map((t) => {
              const isActive = filterType === t.id;
              const count =
                t.id === 'all'
                  ? isaInstructions.length
                  : isaInstructions.filter((i) => i.type === t.id).length;

              return (
                <button
                  key={t.id}
                  onClick={() => setFilterType(t.id)}
                  className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                    isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Sliding Spring Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="isa-filter-indicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                  <span
                    className={`relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${
                      isActive ? 'bg-black/25 text-zinc-950 font-bold' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* View Mode 1: Full Matrix Tabular View with AnimatePresence Accordion Transitions */}
            {viewMode === 'matrix' && (
              <motion.div
                key="matrix-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-x-auto rounded-2xl border border-white/10 bg-[#060a12]/80 backdrop-blur-md shadow-2xl"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-zinc-400">
                      <th className="py-4 px-6 w-12 text-center"></th>
                      <th className="py-4 px-6 w-32">Instruction</th>
                      <th className="py-4 px-6 w-28">Type</th>
                      <th className="py-4 px-6 w-44">Opcode / Funct</th>
                      <th className="py-4 px-6">Semantics & RTL Behavior</th>
                      <th className="py-4 px-6 w-64">Description</th>
                      <th className="py-4 px-6 w-36 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-mono relative">
                    <AnimatePresence initial={false} mode="sync">
                      {(() => {
                        if (filteredInstructions.length === 0) {
                          return (
                            <motion.tr
                              key="empty-state"
                              layout="position"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <td colSpan={7} className="py-12 text-center text-zinc-500 font-mono">
                                No matching instructions found for type "{filterType}" and query "{searchQuery}".
                              </td>
                            </motion.tr>
                          );
                        }

                        const tableRows: React.ReactNode[] = [];
                        filteredInstructions.forEach((inst) => {
                          const isExpanded = expandedInst === inst.name;

                          tableRows.push(
                            <motion.tr
                              key={`row-${inst.name}`}
                              layout="position"
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -14, transition: { duration: 0.16 } }}
                              transition={{
                                layout: { type: 'spring', stiffness: 380, damping: 32 },
                                opacity: { duration: 0.2 },
                                y: { duration: 0.2 },
                              }}
                              onClick={() => toggleExpand(inst.name)}
                              className={`cursor-pointer transition-colors ${
                                isExpanded ? 'bg-cyan-950/25' : 'hover:bg-white/[0.02]'
                              }`}
                            >
                              <td className="py-4 px-6 text-center text-zinc-500">
                                <motion.span
                                  animate={{ rotate: isExpanded ? 90 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="inline-block"
                                >
                                  <ChevronRight className="h-4 w-4 text-cyan-400" />
                                </motion.span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="font-bold text-white text-sm tracking-wide text-cyan-300">
                                  {inst.name}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="rounded bg-white/[0.05] px-2 py-0.5 text-zinc-300">
                                  {inst.type}-Type
                                </span>
                              </td>
                              <td className="py-4 px-6 text-zinc-400">
                                <div>{inst.opcode}</div>
                                {inst.funct3 && (
                                  <div className="text-[10px] text-zinc-400 mt-0.5">
                                    f3: {inst.funct3} {inst.funct7 ? `· f7: ${inst.funct7}` : ''}
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-6 font-mono text-zinc-300">
                                <code className="rounded bg-black/40 px-2 py-1 text-cyan-200 border border-white/5">
                                  {inst.semantics}
                                </code>
                              </td>
                              <td className="py-4 px-6 text-zinc-400 font-sans text-xs max-w-xs">
                                {inst.description}
                              </td>
                              <td className="py-4 px-6 text-right">
                                {getStatusBadge(inst.status)}
                              </td>
                            </motion.tr>
                          );

                          if (isExpanded) {
                            tableRows.push(
                              <motion.tr
                                key={`detail-${inst.name}`}
                                layout="position"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                className="bg-[#040810]/95"
                              >
                                <td colSpan={7} className="p-0 border-b border-cyan-500/20">
                                  <motion.div
                                    layout
                                    initial={{ height: 0, opacity: 0, y: -8 }}
                                    animate={{
                                      height: 'auto',
                                      opacity: 1,
                                      y: 0,
                                      transition: {
                                        height: { type: 'spring', stiffness: 350, damping: 32 },
                                        opacity: { duration: 0.25, delay: 0.05 },
                                        y: { duration: 0.2 },
                                      },
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                      y: -8,
                                      transition: {
                                        height: { type: 'spring', stiffness: 380, damping: 35 },
                                        opacity: { duration: 0.15 },
                                      },
                                    }}
                                    className="overflow-hidden px-8 py-6"
                                  >
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.98 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.98 }}
                                      transition={{ duration: 0.2 }}
                                      className="space-y-6"
                                    >
                                      {/* 32-bit Bitfield Breakdown with Staggered Tile Motion */}
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <Binary className="h-3.5 w-3.5 text-cyan-400" />
                                            <span>32-BIT MACHINE INSTRUCTION FIELD BREAKDOWN</span>
                                          </span>
                                          <span className="text-[10px] font-mono text-cyan-400">
                                            LITTLE ENDIAN [31:0]
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-6 gap-1.5 text-center font-mono">
                                          {inst.fields.map((field, fIdx) => (
                                            <motion.div
                                              key={fIdx}
                                              initial={{ opacity: 0, y: 8 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ delay: fIdx * 0.03, duration: 0.2 }}
                                              className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex flex-col justify-between"
                                            >
                                              <span className="text-[10px] text-zinc-500">[{field.bits}]</span>
                                              <span className={`text-xs font-bold mt-1 ${field.color || 'text-white'}`}>
                                                {field.name}
                                              </span>
                                              <span className="text-[10px] text-zinc-400 font-mono mt-1 truncate">
                                                {field.value}
                                              </span>
                                            </motion.div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Control Logic & RTL */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <motion.div
                                          initial={{ opacity: 0, x: -8 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.22, delay: 0.08 }}
                                          className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-mono"
                                        >
                                          <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                                            <span>CONTROL BUS GENERATION</span>
                                          </div>
                                          <div className="grid grid-cols-2 gap-2 text-zinc-300">
                                            <div className="flex justify-between border-b border-white/5 pb-1">
                                              <span className="text-zinc-500">RegWrite:</span>
                                              <span className="text-cyan-300 font-bold">{inst.control.regWrite}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-1">
                                              <span className="text-zinc-500">ALUSrc:</span>
                                              <span className="text-zinc-200">{inst.control.aluSrc}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-1">
                                              <span className="text-zinc-500">MemToReg:</span>
                                              <span className="text-zinc-200">{inst.control.memToReg}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-1">
                                              <span className="text-zinc-500">MemWrite:</span>
                                              <span className="text-zinc-200">{inst.control.memWrite}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-zinc-500">Branch:</span>
                                              <span className="text-zinc-200">{inst.control.branch}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-zinc-500">ALUOp:</span>
                                              <span className="text-indigo-300 font-bold">{inst.control.aluOp}</span>
                                            </div>
                                          </div>
                                        </motion.div>

                                        <motion.div
                                          initial={{ opacity: 0, x: 8 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.22, delay: 0.1 }}
                                          className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono flex flex-col justify-between"
                                        >
                                          <div>
                                            <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                                              <span>SYSTEMVERILOG RTL EXECUTION</span>
                                            </div>
                                            <pre className="text-cyan-300 bg-black/50 p-2.5 rounded-lg border border-white/5 overflow-x-auto whitespace-pre-wrap">
                                              {inst.rtlSnippet || `// RTL logic for ${inst.name}\n${inst.semantics};`}
                                            </pre>
                                          </div>
                                          <div className="text-[10px] text-zinc-500 mt-2 flex items-center justify-between">
                                            <span>Single-cycle target (1 CPI)</span>
                                            <span className="text-cyan-400/80">rtl/cpu_datapath.sv</span>
                                          </div>
                                        </motion.div>
                                      </div>
                                    </motion.div>
                                  </motion.div>
                                </td>
                              </motion.tr>
                            );
                          }
                        });

                        return tableRows;
                      })()}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* View Mode 2: Interactive Animated Feed & Live Inspector with AnimatePresence */}
            {viewMode === 'animated-list' && (
              <motion.div
                key="animated-list-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: AnimatedList Container (col-span-5) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="font-semibold uppercase text-zinc-300">INSTRUCTION FEED</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <ArrowUpDown className="h-3 w-3" />
                      <span>Arrow keys / Tab / Click</span>
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#060a12]/90 backdrop-blur-xl shadow-2xl p-2 overflow-hidden">
                    <AnimatedList<InstructionDef>
                      items={filteredInstructions}
                      selectedIndex={filteredInstructions.findIndex((i) => i.name === selectedInst.name)}
                      onItemSelect={(item) => setSelectedInstName(item.name)}
                      showGradients={true}
                      enableArrowNavigation={true}
                      displayScrollbar={true}
                      className="w-full"
                      renderItem={(inst, _, isSelected) => (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-base font-bold text-white tracking-wide text-cyan-300">
                                {inst.name}
                              </span>
                              <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                                {inst.type}-Type
                              </span>
                            </div>
                            {getStatusBadge(inst.status)}
                          </div>

                          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                            <span className="text-[11px] text-zinc-500 truncate max-w-[130px]">
                              {inst.formatName}
                            </span>
                            <code className="text-cyan-200/90 text-[11px] bg-black/40 px-2 py-0.5 rounded border border-white/5 truncate max-w-[200px]">
                              {inst.semantics}
                            </code>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* Right Column: Live Bitfield & RTL Telemetry Inspector with AnimatePresence Mode="wait" (col-span-7) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedInst.name}
                      initial={{ opacity: 0, y: 12, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.985 }}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                        opacity: { duration: 0.2 },
                      }}
                      className="rounded-2xl border border-white/10 bg-[#060a13] p-7 backdrop-blur-xl shadow-2xl"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-3xl font-bold text-white tracking-tight font-mono">
                              {selectedInst.name}
                            </h3>
                            <span className="text-xs font-mono text-cyan-400 border border-cyan-400/30 bg-cyan-950/40 rounded px-2 py-0.5">
                              {selectedInst.type}-Type
                            </span>
                            <span className="text-xs font-mono text-zinc-400">
                              Opcode: {selectedInst.opcode}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-zinc-300">
                            {selectedInst.description}
                          </p>
                        </div>
                        {getStatusBadge(selectedInst.status)}
                      </div>

                      {/* 32-bit Machine Instruction Encoding Breakdown with Micro-Stagger */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Binary className="h-4 w-4 text-cyan-400" />
                            <span>32-BIT MACHINE INSTRUCTION BITFIELDS</span>
                          </span>
                          <span className="text-[11px] font-mono text-cyan-400">
                            LITTLE-ENDIAN [31:0]
                          </span>
                        </div>

                        <div className="grid grid-cols-6 gap-2 text-center font-mono">
                          {selectedInst.fields.map((field, fIdx) => (
                            <motion.div
                              key={fIdx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: fIdx * 0.03, duration: 0.2 }}
                              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col justify-between"
                            >
                              <span className="text-[10px] text-zinc-500">[{field.bits}]</span>
                              <span className={`text-xs font-bold mt-1 ${field.color || 'text-white'}`}>
                                {field.name}
                              </span>
                              <span className="text-[11px] text-zinc-300 font-mono mt-1 truncate">
                                {field.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Control Bus Matrix & RTL Behavior */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-mono">
                          <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                            <span>DATAPATH CONTROL BUS</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2.5 text-zinc-300">
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span className="text-zinc-500">RegWrite:</span>
                              <span className="text-cyan-300 font-bold">{selectedInst.control.regWrite}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span className="text-zinc-500">ALUSrc:</span>
                              <span className="text-zinc-200">{selectedInst.control.aluSrc}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span className="text-zinc-500">MemToReg:</span>
                              <span className="text-zinc-200">{selectedInst.control.memToReg}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span className="text-zinc-500">MemWrite:</span>
                              <span className="text-zinc-200">{selectedInst.control.memWrite}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Branch:</span>
                              <span className="text-zinc-200">{selectedInst.control.branch}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">ALUOp:</span>
                              <span className="text-indigo-300 font-bold">{selectedInst.control.aluOp}</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono flex flex-col justify-between">
                          <div>
                            <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                              <span>SYNTHESIZABLE RTL BEHAVIOR</span>
                            </div>
                            <pre className="text-cyan-300 bg-black/50 p-2.5 rounded-lg border border-white/5 overflow-x-auto whitespace-pre-wrap">
                              {selectedInst.rtlSnippet || `// Execution for ${selectedInst.name}\n${selectedInst.semantics};`}
                            </pre>
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-2 flex items-center justify-between">
                            <span>Single-cycle target (1 CPI)</span>
                            <span className="text-cyan-400/80">rtl/cpu_datapath.sv</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        {/* Legend Notice */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
          <span>* Click any row to expand bitfield architecture & control bus mappings</span>
          <span className="text-cyan-400/80">RV32I Base Integer Architecture</span>
        </div>

      </div>
    </section>
  );
}
