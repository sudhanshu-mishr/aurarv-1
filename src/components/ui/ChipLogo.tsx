import React from 'react';

interface ChipLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export default function ChipLogo({ size = 28, className = '', glow = true }: ChipLogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
          glow ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''
        }`}
      >
        {/* Exterior Connector Pins */}
        {/* Top Pins */}
        <line x1="10" y1="1.5" x2="10" y2="5.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="1.5" x2="16" y2="5.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="22" y1="1.5" x2="22" y2="5.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />

        {/* Bottom Pins */}
        <line x1="10" y1="26.5" x2="10" y2="30.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="26.5" x2="16" y2="30.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="22" y1="26.5" x2="22" y2="30.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />

        {/* Left Pins */}
        <line x1="1.5" y1="10" x2="5.5" y2="10" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="1.5" y1="16" x2="5.5" y2="16" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="1.5" y1="22" x2="5.5" y2="22" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />

        {/* Right Pins */}
        <line x1="26.5" y1="10" x2="30.5" y2="10" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26.5" y1="16" x2="30.5" y2="16" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26.5" y1="22" x2="30.5" y2="22" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />

        {/* Outer Package Substrate */}
        <rect
          x="5.5"
          y="5.5"
          width="21"
          height="21"
          rx="4"
          fill="url(#chip-package-gradient)"
          stroke="#0ea5e9"
          strokeWidth="1.2"
        />

        {/* Silicon Die Cavity */}
        <rect
          x="9.5"
          y="9.5"
          width="13"
          height="13"
          rx="2.5"
          fill="#040914"
          stroke="#0284c7"
          strokeWidth="1"
        />

        {/* Central Core Architecture Geometry */}
        <path
          d="M12.5 13.5L16 19.5L19.5 13.5"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="13.5" r="1" fill="#22d3ee" />

        {/* Pin 1 Notch / Orientation Marker */}
        <circle cx="8" cy="8" r="0.9" fill="#22d3ee" />

        <defs>
          <linearGradient id="chip-package-gradient" x1="5.5" y1="5.5" x2="26.5" y2="26.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#091427" />
            <stop offset="0.5" stopColor="#0b2447" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
