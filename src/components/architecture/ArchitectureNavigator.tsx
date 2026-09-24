import React from 'react';
import BranchedMenu, { BranchedMenuItem } from '@/components/ui/BranchedMenu';

export const architectureMenu: BranchedMenuItem[] = [
  {
    label: 'Architecture',
    children: [
      { value: 'nav-overview', label: 'Overview' },
      { value: 'nav-silicon', label: 'Silicon Die' },
      { value: 'nav-datapath', label: 'CPU Datapath' },
      { value: 'nav-isa', label: 'RISC-V ISA' },
    ],
  },
  {
    label: 'Hardware Blocks',
    children: [
      { value: 'alu', label: 'ALU Unit' },
      { value: 'regfile', label: 'Register File' },
      { value: 'dmem', label: 'Data Memory' },
      { value: 'control', label: 'Control Logic' },
    ],
  },
  {
    label: 'EDA & Physical',
    children: [
      { value: 'nav-stack', label: 'Hardware Stack' },
      { value: 'nav-physical', label: 'Synthesis Flow' },
      { value: 'nav-roadmap', label: 'Silicon Roadmap' },
    ],
  },
];

interface ArchitectureNavigatorProps {
  onSelectNode?: (val: string) => void;
  activeNode?: string;
}

export default function ArchitectureNavigator({ onSelectNode, activeNode = 'alu' }: ArchitectureNavigatorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#060a13]/90 p-5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wider uppercase">
          NAVIGATOR
        </span>
        <span className="font-mono text-[10px] text-cyan-400">TREE VIEW</span>
      </div>
      <BranchedMenu
        items={architectureMenu}
        defaultOpen={[0, 1]}
        defaultActive={activeNode}
        onSelect={(value) => {
          if (onSelectNode) onSelectNode(value);

          const targetIdMap: Record<string, string> = {
            'nav-overview': 'overview',
            'nav-silicon': 'code-silicon',
            'nav-datapath': 'architecture',
            'nav-isa': 'isa',
            'nav-stack': 'stack',
            'nav-physical': 'physical-design',
            'nav-roadmap': 'roadmap',
            alu: 'architecture',
            regfile: 'architecture',
            dmem: 'architecture',
            control: 'architecture',
          };

          const targetId = targetIdMap[value] || value;
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }}
        color="#a1a1aa"
        accentColor="#22d3ee"
        lineColor="#27272a"
        width={260}
        rowHeight={36}
        indent={36}
        trunk={12}
        radius={8}
        lineWidth={1.2}
        fontSize={13}
        drawDuration={300}
        foldDuration={200}
      />
    </div>
  );
}
