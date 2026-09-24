import React, { useRef, useEffect, useState, useMemo } from 'react';
import './InfiniteSpiral.css';

export interface SpiralItem {
  src: string;
  alt: string;
  label?: string;
  category?: string;
  description?: string;
}

export interface InfiniteSpiralProps {
  items: SpiralItem[];
  speed?: number;
  direction?: 'up' | 'down';
  animationMode?: 'all' | 'scroll' | 'drag';
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  imageFit?: 'contain' | 'cover';
  grayscale?: number;
  className?: string;
}

export default function InfiniteSpiral({
  items = [],
  speed = 0.32,
  direction = 'up',
  animationMode = 'all',
  radius = 180,
  cardWidth = 150,
  cardHeight = 150,
  verticalSpacing = 72,
  perspective = 1100,
  cardsPerTurn = 8,
  rotation = 0,
  cardTilt = 8,
  cardRadius = 18,
  centerScale = 1.25,
  edgeFade = 0.34,
  edgeBlur = 7,
  pauseOnHover = true,
  imageFit = 'contain',
  grayscale = 0,
  className = '',
}: InfiniteSpiralProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const dragStartRef = useRef<{ y: number; offset: number } | null>(null);

  // Repeat items if count is small so spiral looks full
  const fullItems = useMemo(() => {
    if (!items.length) return [];
    if (items.length >= 16) return items;
    const copies = Math.ceil(16 / items.length);
    let result: SpiralItem[] = [];
    for (let c = 0; c < copies; c++) {
      result = result.concat(items);
    }
    return result;
  }, [items]);

  const totalCards = fullItems.length;
  const loopHeight = totalCards * verticalSpacing;

  useEffect(() => {
    const animate = (time: number) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isHovered || !pauseOnHover) {
        const dir = direction === 'up' ? -1 : 1;
        setScrollOffset((prev) => {
          let next = prev + dir * speed * 80 * dt;
          if (next < 0) next += loopHeight;
          if (next >= loopHeight) next -= loopHeight;
          return next;
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [direction, isHovered, loopHeight, pauseOnHover, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartRef.current = { y: e.clientY, offset: scrollOffset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current) return;
    const dy = e.clientY - dragStartRef.current.y;
    let next = dragStartRef.current.offset - dy;
    if (next < 0) next += loopHeight;
    if (next >= loopHeight) next -= loopHeight;
    setScrollOffset(next);
  };

  const handleMouseUp = () => {
    dragStartRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`infinite-spiral-wrapper ${className}`}
      style={{ perspective: `${perspective}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="infinite-spiral-stage">
        {fullItems.map((item, index) => {
          const rawY = index * verticalSpacing + scrollOffset;
          const normY = ((rawY % loopHeight) + loopHeight) % loopHeight;
          const y = normY - loopHeight / 2;

          const turnFrac = normY / (verticalSpacing * cardsPerTurn);
          const angle = turnFrac * 2 * Math.PI + (rotation * Math.PI) / 180;

          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          // Normalized distance from center plane
          const distFromCenter = Math.abs(y) / (loopHeight / 2);
          const depthFrac = (z + radius) / (2 * radius); // 0 (back) to 1 (front)

          // Center scaling & fade
          const scale = (1 - distFromCenter * 0.3) * (0.8 + depthFrac * (centerScale - 0.8));
          const opacity = Math.max(0, 1 - Math.pow(distFromCenter, 1.8) * edgeFade) * (0.4 + depthFrac * 0.6);
          const blur = Math.max(0, distFromCenter * edgeBlur * (1.2 - depthFrac));

          // Card tilt tangent to helix
          const rotY = (angle * 180) / Math.PI + 180;
          const rotX = -y * 0.05 * (cardTilt / 10);

          return (
            <div
              key={`${item.alt}-${index}`}
              className="infinite-spiral-card rounded-2xl border border-white/10 bg-[#080d16]/90 p-3.5 backdrop-blur-md transition-transform"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cardRadius}px`,
                transform: `translate3d(${x - cardWidth / 2}px, ${y - cardHeight / 2}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px) grayscale(${grayscale})`,
                zIndex: Math.round(depthFrac * 100),
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-between pointer-events-none">
                <div className="flex w-full items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span className="text-cyan-400/80">0{((index % items.length) + 1)}</span>
                  <span className="truncate max-w-[80px] text-zinc-500 uppercase tracking-wider">{item.category || 'ARCH'}</span>
                </div>

                <div className="my-auto flex flex-col items-center justify-center p-1 w-full text-center">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-14 w-14 object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]"
                    style={{ objectFit: imageFit }}
                    loading="lazy"
                  />
                  <div className="mt-2 text-xs font-semibold tracking-tight text-white line-clamp-1">
                    {item.label || item.alt}
                  </div>
                </div>

                <div className="w-full flex items-center justify-center">
                  <span className="h-0.5 w-6 rounded-full bg-cyan-400/40" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
