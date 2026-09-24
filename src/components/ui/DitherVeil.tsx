import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import './DitherVeil.css';

export interface DitherVeilProps {
  src?: string;
  type?: 'bayer' | 'blue' | 'random';
  pixelSize?: number;
  levels?: number;
  inkColor?: string;
  paperColor?: string;
  contrast?: number;
  brightness?: number;
  revealRadius?: number;
  softness?: number;
  linger?: number;
  rimColor?: string;
  rim?: number;
  wander?: boolean;
  clickBurst?: boolean;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255 || 0;
  const g = parseInt(clean.substring(2, 4), 16) / 255 || 0;
  const b = parseInt(clean.substring(4, 6), 16) / 255 || 0;
  return [r, g, b];
}

// Procedural semiconductor die floorplan canvas texture for authentic VLSI aesthetic
function createSiliconLayoutCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // Deep dark silicon substrate
  ctx.fillStyle = '#060a12';
  ctx.fillRect(0, 0, 1024, 768);

  // Outer pad ring boundary
  ctx.strokeStyle = '#18304f';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, 964, 708);

  // I/O pads around the die
  ctx.fillStyle = '#1e3d64';
  for (let x = 45; x < 970; x += 36) {
    ctx.fillRect(x, 15, 20, 24);
    ctx.fillRect(x, 728, 20, 24);
  }
  for (let y = 45; y < 720; y += 36) {
    ctx.fillRect(15, y, 24, 20);
    ctx.fillRect(984, y, 24, 20);
  }

  // Major macro blocks
  // 1. Instruction Cache / ROM (Top-Left)
  ctx.fillStyle = '#10233d';
  ctx.fillRect(80, 80, 260, 240);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, 260, 240);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '13px monospace';
  ctx.fillText('MACRO // I-SRAM (8KB)', 95, 105);

  // Draw memory bitcell sub-arrays
  ctx.fillStyle = '#16365c';
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillRect(95 + c * 58, 120 + r * 30, 48, 22);
    }
  }

  // 2. Data Cache / SRAM (Top-Right)
  ctx.fillStyle = '#10233d';
  ctx.fillRect(680, 80, 260, 240);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(680, 80, 260, 240);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('MACRO // D-SRAM (8KB)', 695, 105);
  ctx.fillStyle = '#16365c';
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillRect(695 + c * 58, 120 + r * 30, 48, 22);
    }
  }

  // 3. Central Datapath Core: ALU, RegFile, Decode
  ctx.fillStyle = '#0c1b30';
  ctx.fillRect(370, 80, 280, 360);
  ctx.strokeStyle = '#818cf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(370, 80, 280, 360);
  ctx.fillStyle = '#818cf8';
  ctx.fillText('AURA-RV // CORE DATAPATH', 385, 105);

  // Sub-blocks in core
  ctx.fillStyle = '#183658';
  ctx.fillRect(390, 125, 240, 70); // ALU
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('ALU + SHIFTER', 400, 155);

  ctx.fillStyle = '#183658';
  ctx.fillRect(390, 210, 240, 90); // Regfile (32 x 32)
  ctx.fillStyle = '#818cf8';
  ctx.fillText('REGISTER FILE (32x32)', 400, 240);

  ctx.fillStyle = '#183658';
  ctx.fillRect(390, 315, 240, 105); // Control & Decode
  ctx.fillStyle = '#22d3ee';
  ctx.fillText('CONTROL & DECODE LOGIC', 400, 345);

  // 4. Standard Cell Placement Area (Bottom)
  ctx.fillStyle = '#091322';
  ctx.fillRect(80, 460, 860, 210);
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 1;
  ctx.strokeRect(80, 460, 860, 210);
  ctx.fillStyle = '#22d3ee';
  ctx.fillText('STANDARD CELL PLACEMENT & ROUTING TRACKS (M1-M4)', 95, 485);

  // Cell rows with dense logic gates
  ctx.fillStyle = '#142c4a';
  for (let row = 0; row < 12; row++) {
    const y = 500 + row * 13;
    let x = 95;
    while (x < 920) {
      const cellW = 8 + Math.floor(Math.sin(x + row) * 16 + 18);
      ctx.fillRect(x, y, cellW, 9);
      x += cellW + 3;
    }
  }

  // Interconnect bus lines connecting blocks
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Bus from I-SRAM to Core
  ctx.moveTo(340, 200);
  ctx.lineTo(370, 200);
  // Bus from Core to D-SRAM
  ctx.moveTo(650, 200);
  ctx.lineTo(680, 200);
  // Bus from Core to Std Cells
  ctx.moveTo(510, 440);
  ctx.lineTo(510, 460);
  ctx.stroke();

  return canvas;
}

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uRevealRadius;
  uniform float uSoftness;
  uniform float uLinger;
  uniform float uPixelSize;
  uniform float uLevels;
  uniform float uContrast;
  uniform float uBrightness;
  uniform vec3 uInkColor;
  uniform vec3 uPaperColor;
  uniform vec3 uRimColor;
  uniform float uRim;
  uniform float uBurst;
  varying vec2 vUv;

  // 4x4 Bayer matrix
  float bayer4(vec2 p) {
    vec2 m = mod(p, 4.0);
    int x = int(m.x);
    int y = int(m.y);
    if (y == 0) {
      if (x == 0) return 0.0 / 16.0;
      if (x == 1) return 8.0 / 16.0;
      if (x == 2) return 2.0 / 16.0;
      return 10.0 / 16.0;
    } else if (y == 1) {
      if (x == 0) return 12.0 / 16.0;
      if (x == 1) return 4.0 / 16.0;
      if (x == 2) return 14.0 / 16.0;
      return 6.0 / 16.0;
    } else if (y == 2) {
      if (x == 0) return 3.0 / 16.0;
      if (x == 1) return 11.0 / 16.0;
      if (x == 2) return 1.0 / 16.0;
      return 9.0 / 16.0;
    } else {
      if (x == 0) return 15.0 / 16.0;
      if (x == 1) return 7.0 / 16.0;
      if (x == 2) return 13.0 / 16.0;
      return 5.0 / 16.0;
    }
  }

  void main() {
    // Pixelate UV
    vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
    vec2 uv = pixelCoord / uResolution;

    vec4 tex = texture2D(tMap, uv);
    float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    luma = (luma - 0.5) * uContrast + 0.5 + uBrightness;
    luma = clamp(luma, 0.0, 1.0);

    // Distance to pointer
    float dist = distance(pixelCoord, uPointer);
    float rad = uRevealRadius + uBurst * 180.0;
    float reveal = 1.0 - smoothstep(rad * (1.0 - uSoftness), rad, dist);

    // Dither threshold
    float threshold = bayer4(pixelCoord / uPixelSize);
    float quantized = step(threshold, luma);

    // Color mixing
    vec3 ditherColor = mix(uInkColor, uPaperColor, quantized);
    
    // Reveal interaction glow
    vec3 activeColor = mix(ditherColor, tex.rgb * 1.35, reveal * 0.85);

    // Rim highlight around revealed area
    float rimFactor = smoothstep(rad - rad * uRim, rad, dist) * (1.0 - smoothstep(rad, rad + 12.0, dist));
    activeColor += uRimColor * rimFactor * 0.9;

    gl_FragColor = vec4(activeColor, 1.0);
  }
`;

export default function DitherVeil({
  src,
  type = 'bayer',
  pixelSize = 3,
  levels = 3,
  inkColor = '#071018',
  paperColor = '#d8f7ff',
  contrast = 1.15,
  brightness = 0,
  revealRadius = 240,
  softness = 0.65,
  linger = 1,
  rimColor = '#22d3ee',
  rim = 0.12,
  wander = false,
  clickBurst = true,
  className = '',
}: DitherVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let burstVal = 0;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.canvas.className = 'dither-veil-canvas';

    const geometry = new Triangle(gl);

    // Texture loading
    const defaultCanvas = createSiliconLayoutCanvas();
    const texture = new Texture(gl, { image: defaultCanvas });

    if (src) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        texture.image = img;
      };
      img.src = src;
    }

    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h);

    let pointerX = w * 0.5;
    let pointerY = h * 0.5;
    let targetX = pointerX;
    let targetY = pointerY;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        uResolution: { value: [w, h] },
        uPointer: { value: [pointerX, pointerY] },
        uRevealRadius: { value: revealRadius },
        uSoftness: { value: softness },
        uLinger: { value: linger },
        uPixelSize: { value: pixelSize },
        uLevels: { value: levels },
        uContrast: { value: contrast },
        uBrightness: { value: brightness },
        uInkColor: { value: hexToRgb(inkColor) },
        uPaperColor: { value: hexToRgb(paperColor) },
        uRimColor: { value: hexToRgb(rimColor) },
        uRim: { value: rim },
        uBurst: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = rect.height - (e.clientY - rect.top);
    };

    const handleClick = () => {
      if (clickBurst) {
        burstVal = 1.0;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || window.innerWidth;
      const nh = container.clientHeight || window.innerHeight;
      renderer.setSize(nw, nh);
      program.uniforms.uResolution.value = [nw, nh];
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      pointerX += (targetX - pointerX) * 0.08;
      pointerY += (targetY - pointerY) * 0.08;
      program.uniforms.uPointer.value = [pointerX, pointerY];

      if (burstVal > 0.001) {
        burstVal *= 0.92;
      } else {
        burstVal = 0;
      }
      program.uniforms.uBurst.value = burstVal;

      renderer.render({ scene: mesh });
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      if (gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [brightness, clickBurst, contrast, inkColor, levels, linger, paperColor, pixelSize, revealRadius, rim, rimColor, softness, src]);

  return <div ref={containerRef} className={`dither-veil-container ${className}`} />;
}
