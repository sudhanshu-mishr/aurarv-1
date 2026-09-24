import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import './BranchedMenu.css';

export interface BranchedMenuItemChild {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface BranchedMenuItem {
  label: string;
  icon?: React.ReactNode;
  children?: BranchedMenuItemChild[];
}

export interface BranchedMenuProps {
  items: BranchedMenuItem[];
  defaultOpen?: number[];
  defaultActive?: string;
  onSelect?: (value: string) => void;
  onToggle?: (index: number, isOpen: boolean) => void;
  color?: string;
  accentColor?: string;
  lineColor?: string;
  width?: number | string;
  rowHeight?: number;
  indent?: number;
  trunk?: number;
  radius?: number;
  lineWidth?: number;
  fontSize?: number;
  drawDuration?: number;
  foldDuration?: number;
  className?: string;
}

export default function BranchedMenu({
  items = [],
  defaultOpen = [0],
  defaultActive = '',
  onSelect,
  onToggle,
  color = '#d4d4d8',
  accentColor = '#22d3ee',
  lineColor = '#27272a',
  width = 300,
  rowHeight = 38,
  indent = 38,
  trunk = 14,
  radius = 8,
  lineWidth = 1.2,
  fontSize = 13,
  drawDuration = 350,
  foldDuration = 250,
  className = '',
}: BranchedMenuProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(defaultOpen);
  const [activeValue, setActiveValue] = useState<string>(defaultActive);

  const toggleGroup = (index: number) => {
    const isOpen = openIndices.includes(index);
    const next = isOpen ? openIndices.filter((i) => i !== index) : [...openIndices, index];
    setOpenIndices(next);
    if (onToggle) onToggle(index, !isOpen);
  };

  const handleSelect = (val: string) => {
    setActiveValue(val);
    if (onSelect) onSelect(val);
  };

  return (
    <LayoutGroup id="branched-menu-group">
      <div
        className={`branched-menu-wrapper ${className}`}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          fontSize: `${fontSize}px`,
          color,
        }}
      >
        <div className="flex flex-col gap-1">
          {items.map((group, groupIdx) => {
            const isOpen = openIndices.includes(groupIdx);
            const hasChildren = Boolean(group.children && group.children.length > 0);

            return (
              <motion.div
                key={group.label}
                layout="position"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="relative flex flex-col"
              >
                {/* Group Header */}
                <div
                  onClick={() => hasChildren && toggleGroup(groupIdx)}
                  className="branched-menu-item flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-white/[0.04]"
                  style={{ height: `${rowHeight}px`, color }}
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="inline-block h-2 w-2 rounded-sm"
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        backgroundColor: isOpen ? accentColor : lineColor,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-medium">
                      {group.label}
                    </span>
                  </div>

                  {hasChildren && (
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="h-3.5 w-3.5 text-zinc-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  )}
                </div>

                {/* Animated Folding Children with Framer Motion layout */}
                <AnimatePresence initial={false}>
                  {hasChildren && isOpen && (
                    <motion.div
                      key={`content-${group.label}`}
                      layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { type: 'spring', stiffness: 350, damping: 30 },
                          opacity: { duration: 0.2, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { type: 'spring', stiffness: 380, damping: 35 },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="relative flex flex-col overflow-hidden"
                      style={{
                        paddingLeft: `${indent}px`,
                      }}
                    >
                      {/* SVG tree lines */}
                      <svg
                        className="branched-svg-lines"
                        style={{
                          left: `${trunk}px`,
                          width: `${indent - trunk + 10}px`,
                          height: `${(group.children?.length || 0) * rowHeight}px`,
                        }}
                      >
                        {/* Vertical main stem */}
                        <line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2={(group.children?.length || 1) * rowHeight - rowHeight / 2}
                          stroke={lineColor}
                          strokeWidth={lineWidth}
                        />

                        {/* Horizontal branches curving out */}
                        {group.children?.map((child, cIdx) => {
                          const branchY = cIdx * rowHeight + rowHeight / 2;
                          const isActive = activeValue === child.value;
                          const branchWidth = indent - trunk - 2;

                          return (
                            <path
                              key={`line-${groupIdx}-${child.value}-${cIdx}`}
                              d={`M 1 ${branchY - radius} Q 1 ${branchY} ${radius} ${branchY} L ${branchWidth} ${branchY}`}
                              fill="none"
                              stroke={isActive ? accentColor : lineColor}
                              strokeWidth={isActive ? lineWidth * 1.5 : lineWidth}
                              style={{
                                transition: `stroke ${drawDuration}ms ease, stroke-width 0.2s ease`,
                              }}
                            />
                          );
                        })}
                      </svg>

                      {group.children?.map((child, cIdx) => {
                        const isActive = activeValue === child.value;
                        return (
                          <motion.div
                            key={`item-${groupIdx}-${child.value}-${cIdx}`}
                            layout="position"
                            onClick={() => handleSelect(child.value)}
                            className={`branched-menu-child relative rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-white/[0.04] ${
                              isActive ? 'active' : ''
                            }`}
                            style={{
                              height: `${rowHeight}px`,
                              color: isActive ? accentColor : color,
                            }}
                          >
                            {/* Animated selection highlight pill */}
                            {isActive && (
                              <motion.div
                                layoutId="branched-menu-active-pill"
                                className="absolute inset-0 rounded-md bg-cyan-500/10 border border-cyan-400/30 -z-10"
                                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              />
                            )}

                            <span className="flex items-center gap-2">
                              <motion.span
                                animate={{
                                  scale: isActive ? [1, 1.25, 1] : 1,
                                }}
                                transition={{ duration: 0.2 }}
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor: isActive ? accentColor : 'transparent',
                                  border: `1px solid ${isActive ? accentColor : '#52525b'}`,
                                }}
                              />
                              <span className="truncate">{child.label}</span>
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </LayoutGroup>
  );
}
