import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ShapeBlur.css';

export interface ShapeBlurProps {
  variation?: number;
  pixelRatioProp?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
  shapeColor?: string;
  className?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_shape_size;
  uniform float u_roundness;
  uniform float u_border_size;
  uniform float u_circle_size;
  uniform float u_circle_edge;
  uniform vec3 u_shape_color;
  uniform int u_variation;
  varying vec2 vUv;

  float sdRoundedBox(in vec2 p, in vec2 b, in vec4 r) {
    r.xy = (p.x > 0.0) ? r.xy : r.zw;
    r.x  = (p.y > 0.0) ? r.x  : r.y;
    vec2 q = abs(p) - b + r.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Subtle drift and mouse warp
    vec2 p = st;
    float distToMouse = length(p - mouse * 0.4);
    p += (p - mouse * 0.4) * 0.06 / (distToMouse * distToMouse + 0.6);

    // Shape sizing
    vec2 boxSize = vec2(u_shape_size * 0.9, u_shape_size * 0.65);
    vec4 radius = vec4(u_roundness * 0.35);

    float d = sdRoundedBox(p, boxSize, radius);

    // Concentric silicon track lines / geometric aura
    float outerRings = sin(d * 48.0 - u_time * 0.4) * 0.5 + 0.5;
    float innerRings = sin(length(p) * 36.0 + u_time * 0.3) * 0.5 + 0.5;

    // Soft distance field glow
    float glow = exp(-d * 3.8);
    float core = 1.0 - smoothstep(0.0, u_border_size * 2.0, abs(d));
    float inner = 1.0 - smoothstep(-0.02, 0.04, d);

    // Silicon cyan & deep indigo aura blend
    vec3 color = u_shape_color;
    vec3 cyanGlow = vec3(0.05, 0.45, 0.65);
    vec3 deepBlue = vec3(0.02, 0.12, 0.28);
    vec3 violetGlow = vec3(0.25, 0.15, 0.55);

    vec3 finalColor = mix(vec3(0.0), deepBlue, clamp(glow * 0.9, 0.0, 1.0));
    finalColor += cyanGlow * core * 0.85;
    finalColor += violetGlow * (outerRings * 0.12) * clamp(glow, 0.0, 1.0);
    finalColor += cyanGlow * (innerRings * 0.08) * inner;
    finalColor += color * inner * 0.4;

    // Edge falloff
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(st * vec2(0.85, 1.15)));
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, clamp(length(finalColor) * 1.8, 0.0, 0.85));
  }
`;

export default function ShapeBlur({
  variation = 0,
  pixelRatioProp = 1,
  shapeSize = 0.72,
  roundness = 0.72,
  borderSize = 0.025,
  circleSize = 0.20,
  circleEdge = 0.75,
  shapeColor = '#0e1828',
  className = '',
}: ShapeBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const pr = pixelRatioProp || Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(pr);
    rendererRef.current = renderer;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.domElement.className = 'shape-blur-canvas';
    container.appendChild(renderer.domElement);

    const parsedColor = new THREE.Color(shapeColor);
    const uniforms = {
      u_resolution: { value: new THREE.Vector2(width * pr, height * pr) },
      u_mouse: { value: new THREE.Vector2(width * 0.5 * pr, height * 0.5 * pr) },
      u_time: { value: 0 },
      u_shape_size: { value: shapeSize },
      u_roundness: { value: roundness },
      u_border_size: { value: borderSize },
      u_circle_size: { value: circleSize },
      u_circle_edge: { value: circleEdge },
      u_shape_color: { value: new THREE.Vector3(parsedColor.r, parsedColor.g, parsedColor.b) },
      u_variation: { value: variation },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = height - (e.clientY - rect.top);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w * pr, h * pr);
    };

    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const animate = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      uniforms.u_mouse.value.set(mouseX * pr, mouseY * pr);
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [borderSize, circleEdge, circleSize, pixelRatioProp, roundness, shapeColor, shapeSize, variation]);

  return (
    <div ref={containerRef} className={`shape-blur-container hero-shape ${className}`} />
  );
}
