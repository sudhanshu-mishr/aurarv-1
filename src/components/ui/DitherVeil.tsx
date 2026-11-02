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

  // Sub-blocks in Datapath
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.strokeRect(390, 130, 110, 80);
  ctx.fillText('ALU_32', 400, 175);

  ctx.strokeRect(520, 130, 110, 80);
  ctx.fillText('REG_32X32', 530, 175);

  ctx.strokeRect(390, 230, 240, 90);
  ctx.fillText('CONTROL_UNIT & IMM_GEN', 400, 280);

  ctx.strokeRect(390, 340, 240, 80);
  ctx.fillText('WRITEBACK_MUX / PC_GEN', 400, 385);

  // 4. Standard Cell Logic Fill (Bottom Region)
  ctx.fillStyle = '#091424';
  ctx.fillRect(80, 460, 860, 240);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1;
  ctx.strokeRect(80, 460, 860, 240);
  ctx.fillStyle = '#0284c7';
  ctx.fillText('STD CELL LOGIC // OPEN ROAD PLACEMENT', 95, 485);

  // Cell rows simulation
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
  ctx.lineWidth = 1;
  for (let y = 505; y < 685; y += 14) {
    ctx.beginPath();
    ctx.moveTo(95, y);
    ctx.lineTo(925, y);
    ctx.stroke();
  }

  // Dense logic gates blocks
  ctx.fillStyle = '#102a4a';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 24; c++) {
      if ((r + c) % 3 === 0) {
        ctx.fillRect(100 + c * 34, 508 + r * 14, 26, 8);
      }
    }
  }

  // Microchip technical identifiers
  ctx.fillStyle = '#38bdf8';
  ctx.font = '11px monospace';
  ctx.fillText('SKY130 CMOS · 1.2 x 1.2 mm DIE · AURA-RV32I', 95, 685);

  return canvas;
}

const vertex = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

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

// 4x4 Bayer Matrix
const float bayerMatrix[16] = float[16](
   0.0/16.0,  8.0/16.0,  2.0/16.0, 10.0/16.0,
  12.0/16.0,  4.0/16.0, 14.0/16.0,  6.0/16.0,
   3.0/16.0, 11.0/16.0,  1.0/16.0,  9.0/16.0,
  15.0/16.0,  7.0/16.0, 13.0/16.0,  5.0/16.0
);

void main() {
  // Pixelate coordinates according to pixelSize
  vec2 pixelatedCoord = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
  vec2 uv = pixelatedCoord / uResolution;

  // Distance from current pointer
  float dist = distance(gl_FragCoord.xy, uPointer);
  float radius = uRevealRadius * (1.0 + uBurst * 0.8);
  float reveal = 1.0 - smoothstep(radius * (1.0 - uSoftness), radius, dist);

  // Sample the procedural silicon layout texture
  vec4 texColor = texture(tMap, uv);
  float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

  // Adjust contrast and brightness
  lum = (lum - 0.5) * uContrast + 0.5 + uBrightness;
  lum = clamp(lum, 0.0, 1.0);

  // Get 4x4 bayer threshold
  int x = int(mod(gl_FragCoord.x / uPixelSize, 4.0));
  int y = int(mod(gl_FragCoord.y / uPixelSize, 4.0));
  float threshold = bayerMatrix[y * 4 + x];

  // Bayer quantization
  float dithered = step(threshold, lum);

  // Rim highlight effect along the reveal circle boundary
  float rimEdge = smoothstep(radius - 24.0, radius, dist) * (1.0 - smoothstep(radius, radius + 12.0, dist));

  // Color selection
  vec3 finalColor = mix(uInkColor, uPaperColor, dithered);
  finalColor = mix(finalColor, uRimColor, rimEdge * uRim);

  // Alpha fade towards perimeter
  float alpha = mix(0.12, 0.95, reveal);
  fragColor = vec4(finalColor, alpha);
}
`;

export default function DitherVeil({
  src,
  type = 'bayer',
  pixelSize = 3,
  levels = 3,
  inkColor = '#050912',
  paperColor = '#93c5fd',
  contrast = 1.2,
  brightness = 0.05,
  revealRadius = 220,
  softness = 0.65,
  linger = 1,
  rimColor = '#22d3ee',
  rim = 0.15,
  wander = false,
  clickBurst = true,
  className = '',
}: DitherVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number = 0;
    let burstVal = 0.0;
    let isVisible = true;
    let isTabActive = !document.hidden;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

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
      renderer.render({ scene: mesh });
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

    const startLoop = () => {
      if (isVisible && isTabActive && animId === 0) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animId !== 0) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? startLoop() : stopLoop();
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const handleVisibility = () => {
      isTabActive = !document.hidden;
      isTabActive ? startLoop() : stopLoop();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    startLoop();

    return () => {
      stopLoop();
      io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [brightness, clickBurst, contrast, inkColor, levels, linger, paperColor, pixelSize, revealRadius, rim, rimColor, softness, src]);

  return <div ref={containerRef} className={`dither-veil-container ${className}`} />;
}
