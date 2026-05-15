"use client";

import { useEffect, useRef, useState } from "react";

export default function FishCursor() {
  const [visible, setVisible] = useState(false);
  const fishRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, angle: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    const update = () => {
      if (!fishRef.current) return;

      const lerp = 0.06; // Smooth swimming follow
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      pos.current.x += dx * lerp;
      pos.current.y += dy * lerp;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      fishRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${angle}deg)`;

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={fishRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -ml-10 -mt-5 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
        {/* Tail Fin with wiggle */}
        <path d="M10 20 L0 5 Q5 20 0 35 L10 20" fill="#1b4332" className="animate-fish-tail origin-right" />
        {/* Body Gradient */}
        <defs>
          <linearGradient id="fishBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2d6a4f" />
            <stop offset="50%" stopColor="#40916c" />
            <stop offset="100%" stopColor="#1b4332" />
          </linearGradient>
        </defs>
        {/* Main Body */}
        <path d="M10 20 C10 5 35 2 65 8 C75 12 80 18 80 20 C80 22 75 28 65 32 C35 38 10 35 10 20Z" fill="url(#fishBody)" />
        {/* Dorsal Fin with wave */}
        <path d="M30 8 Q45 -2 55 10 L30 10Z" fill="#1b4332" className="animate-fish-fin origin-bottom" />
        {/* Eye */}
        <circle cx="70" cy="15" r="2.5" fill="white" />
        <circle cx="71" cy="14.5" r="1.2" fill="black" />
        {/* Gill Cover */}
        <path d="M60 12 Q65 20 60 28" stroke="#081c15" strokeWidth="1" fill="none" opacity="0.3" />
        {/* Side Fin */}
        <path d="M40 22 Q35 30 45 28 Z" fill="#1b4332" opacity="0.6" />
      </svg>
    </div>
  );
}
