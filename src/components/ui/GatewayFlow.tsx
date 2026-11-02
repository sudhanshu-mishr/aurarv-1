import React, { useEffect, useRef } from 'react';

export interface GatewayFlowProps {
  mode?: 'lines' | 'grid' | 'particles' | 'tracks';
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  color?: string;
  accentColor?: string;
  className?: string;
}

export default function GatewayFlow({
  mode = 'tracks',
  speed = 0.6,
  size = 36,
  gap = 40,
  length = 120,
  density = 0.8,
  strokeWidth = 1.2,
  opacity = 0.35,
  color = '#22d3ee',
  accentColor = '#818cf8',
  className = '',
}: GatewayFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth || window.innerWidth;
      height = canvas.height = container.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate physical routing channels (horizontal + vertical standard-cell routing tracks)
    const numChannels = Math.max(1, Math.floor(height / gap));
    const channels = Array.from({ length: numChannels }, (_, i) => ({
      y: i * gap + gap / 2,
      pulses: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
        x: Math.random() * width,
        len: length * (0.6 + Math.random() * 0.8),
        speed: (speed + Math.random() * 0.4) * 60,
        color: Math.random() > 0.3 ? color : accentColor,
        alpha: (0.2 + Math.random() * 0.6) * opacity,
        hasVia: Math.random() > 0.4,
        viaLength: 30 + Math.random() * 40,
      })),
    }));

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw faint baseline tracks
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      channels.forEach((ch) => {
        ctx.beginPath();
        ctx.moveTo(0, ch.y);
        ctx.lineTo(width, ch.y);
        ctx.stroke();
      });

      // Animate signal pulses and via drops
      channels.forEach((ch) => {
        ch.pulses.forEach((p) => {
          p.x += p.speed * dt;
          if (p.x - p.len > width) {
            p.x = -p.len;
          }

          // Main horizontal trace
          const grad = ctx.createLinearGradient(p.x - p.len, ch.y, p.x, ch.y);
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(0.7, p.color);
          grad.addColorStop(1, '#ffffff');

          ctx.strokeStyle = grad;
          ctx.lineWidth = strokeWidth;
          ctx.beginPath();
          ctx.moveTo(Math.max(0, p.x - p.len), ch.y);
          ctx.lineTo(Math.min(width, p.x), ch.y);
          ctx.stroke();

          // Via drop
          if (p.hasVia && p.x > 0 && p.x < width) {
            const viaY = ch.y + p.viaLength;
            if (viaY < height) {
              const viaGrad = ctx.createLinearGradient(p.x, ch.y, p.x, viaY);
              viaGrad.addColorStop(0, p.color);
              viaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

              ctx.strokeStyle = viaGrad;
              ctx.lineWidth = strokeWidth * 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, ch.y);
              ctx.lineTo(p.x, viaY);
              ctx.stroke();
            }
          }
        });
      });

      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (isVisible && isTabActive && animId === 0) {
        lastTime = performance.now();
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
      window.removeEventListener('resize', handleResize);
    };
  }, [accentColor, color, gap, length, opacity, speed, strokeWidth]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
