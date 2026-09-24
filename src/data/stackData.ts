// High-fidelity SVG technical diagrams for the AURA-RV hardware stack
export const svgDataUrls = {
  riscv: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <path d="M22 30h34c11 0 18 6 18 15s-7 15-18 15H36v16H22V30zm14 20h18c4.5 0 7.5-2.5 7.5-6s-3-6-7.5-6H36v12z" fill="%2322d3ee"/>
    <path d="M52 60l24 24h-18L44 68l8-8z" fill="%23818cf8"/>
  </svg>`,

  systemverilog: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <path d="M28 26l22 10v40L28 66V26z" fill="%2338bdf8" opacity="0.8"/>
    <path d="M72 26L50 36v40l22-10V26z" fill="%23818cf8" opacity="0.9"/>
    <path d="M50 36L28 26l22-10 22 10-22 10z" fill="%2322d3ee"/>
    <circle cx="50" cy="56" r="6" fill="%23ffffff"/>
  </svg>`,

  alu: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <path d="M24 22l18 20v16l-18 20h18l14-16 14 16h18L70 58V38l18-16H70L56 34 42 22H24z" fill="%231e3d64" stroke="%2322d3ee" stroke-width="2.5"/>
    <text x="50" y="54" fill="%23ffffff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">ALU</text>
  </svg>`,

  registerFile: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <rect x="22" y="24" width="56" height="11" rx="2" fill="%23163252" stroke="%2338bdf8" stroke-width="1.5"/>
    <rect x="22" y="38" width="56" height="11" rx="2" fill="%23163252" stroke="%2338bdf8" stroke-width="1.5"/>
    <rect x="22" y="52" width="56" height="11" rx="2" fill="%23163252" stroke="%23818cf8" stroke-width="1.5"/>
    <rect x="22" y="66" width="56" height="11" rx="2" fill="%23163252" stroke="%2322d3ee" stroke-width="1.5"/>
    <circle cx="28" cy="29.5" r="2" fill="%2322d3ee"/>
    <circle cx="28" cy="43.5" r="2" fill="%2322d3ee"/>
    <circle cx="28" cy="57.5" r="2" fill="%23818cf8"/>
    <circle cx="28" cy="71.5" r="2" fill="%2322d3ee"/>
  </svg>`,

  rtl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <path d="M30 40l-12 10 12 10M70 40l12 10-12 10" stroke="%2322d3ee" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="56" y1="32" x2="44" y2="68" stroke="%23818cf8" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  simulation: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <path d="M18 40h12v-16h16v16h16v-16h16v16h8" stroke="%2322d3ee" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M18 70h20v-20h24v20h22" stroke="%23818cf8" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  verification: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <path d="M50 20L25 32v22c0 18 25 28 25 28s25-10 25-28V32L50 20z" fill="%23163252" stroke="%2322d3ee" stroke-width="2.5"/>
    <path d="M40 50l7 7 14-14" stroke="%2322d3ee" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  librelane: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <circle cx="50" cy="50" r="28" stroke="%2338bdf8" stroke-width="2"/>
    <circle cx="50" cy="50" r="16" stroke="%23818cf8" stroke-width="2"/>
    <circle cx="50" cy="50" r="5" fill="%2322d3ee"/>
    <line x1="50" y1="14" x2="50" y2="86" stroke="%2322d3ee" stroke-width="1.5" stroke-dasharray="3 3"/>
  </svg>`,

  gdsii: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="%230b1320"/>
    <rect x="22" y="22" width="56" height="56" rx="4" fill="%230e2238" stroke="%2322d3ee" stroke-width="2"/>
    <rect x="30" y="30" width="18" height="18" fill="%231e3d64" stroke="%2338bdf8" stroke-width="1"/>
    <rect x="52" y="30" width="18" height="18" fill="%231e3d64" stroke="%23818cf8" stroke-width="1"/>
    <rect x="30" y="52" width="40" height="18" fill="%231e3d64" stroke="%2322d3ee" stroke-width="1"/>
    <line x1="39" y1="48" x2="39" y2="52" stroke="%23ffffff" stroke-width="1.5"/>
    <line x1="61" y1="48" x2="61" y2="52" stroke="%23ffffff" stroke-width="1.5"/>
  </svg>`,
};

export const stackItems = [
  {
    src: svgDataUrls.riscv,
    alt: "RISC-V ISA",
    label: "RISC-V ISA",
    category: "SPECIFICATION",
    description: "RV32I Base Integer Instruction Set architecture",
  },
  {
    src: svgDataUrls.systemverilog,
    alt: "SystemVerilog",
    label: "SystemVerilog",
    category: "HARDWARE HDL",
    description: "Synthesis-ready IEEE 1800 SystemVerilog RTL",
  },
  {
    src: svgDataUrls.alu,
    alt: "ALU",
    label: "ALU Engine",
    category: "DATAPATH",
    description: "32-bit arithmetic & logical execution unit",
  },
  {
    src: svgDataUrls.registerFile,
    alt: "Register File",
    label: "Register File",
    category: "STORAGE",
    description: "32 general-purpose 32-bit registers (x0 hardwired 0)",
  },
  {
    src: svgDataUrls.rtl,
    alt: "RTL Design",
    label: "RTL Hierarchy",
    category: "MICROARCH",
    description: "Modular synthesizable pipeline architecture",
  },
  {
    src: svgDataUrls.simulation,
    alt: "Simulation",
    label: "Icarus / Verilator",
    category: "SIMULATION",
    description: "Cycle-accurate logic and waveform analysis",
  },
  {
    src: svgDataUrls.verification,
    alt: "Verification",
    label: "Verification Suite",
    category: "TESTING",
    description: "Directed assembly test suites & self-checking testbenches",
  },
  {
    src: svgDataUrls.librelane,
    alt: "LibreLane",
    label: "OpenLane / Flow",
    category: "EDA FLOW",
    description: "Open-source automated RTL-to-GDSII physical synthesis",
  },
  {
    src: svgDataUrls.gdsii,
    alt: "GDSII",
    label: "GDSII Layout",
    category: "PHYSICAL",
    description: "Calma GDSII stream format for silicon layout exploration",
  },
];
