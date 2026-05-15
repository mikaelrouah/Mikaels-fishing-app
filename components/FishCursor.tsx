"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function FishCursor() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [burst, setBurst] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const fishRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, angle: 0, currentAngle: 0, flip: 1 });

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleExit = (e: MouseEvent | Event) => {
      if (!visible || burst) return;
      
      // Target specific sections or links
      const target = e.target as HTMLElement;
      const isInteraction = target.closest('a, button, [role="button"], #knots, #spots, #reading');
      
      if (isInteraction) {
        setBurst(true);
        setTimeout(() => {
          setVisible(false);
          setBurst(false);
        }, 600);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleExit);
    window.addEventListener("scroll", handleExit, { passive: true });

    let frameId: number;
    const update = () => {
      if (!fishRef.current || !visible || burst) {
        frameId = requestAnimationFrame(update);
        return;
      }

      // Chase logic: stay slightly behind
      const lerp = 0.05;
      const offsetDist = 30; 
      const dx_mouse = mouse.current.x - pos.current.x;
      const dy_mouse = mouse.current.y - pos.current.y;
      const dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
      
      if (dist > offsetDist) {
        const targetX = mouse.current.x - (dx_mouse / dist) * offsetDist;
        const targetY = mouse.current.y - (dy_mouse / dist) * offsetDist;
        
        pos.current.x += (targetX - pos.current.x) * lerp;
        pos.current.y += (targetY - pos.current.y) * lerp;
      }

      // Target angle based on movement
      const targetAngle = Math.atan2(dy_mouse, dx_mouse) * (180 / Math.PI);
      
      // Smooth turning (interpolate angle)
      let angleDiff = targetAngle - pos.current.currentAngle;
      while (angleDiff < -180) angleDiff += 360;
      while (angleDiff > 180) angleDiff -= 360;
      pos.current.currentAngle += angleDiff * 0.1;

      // Flip logic
      const newFlip = dx_mouse < 0 ? -1 : 1;
      pos.current.flip = newFlip;
      
      const displayAngle = pos.current.flip === -1 ? pos.current.currentAngle + 180 : pos.current.currentAngle;
      
      fishRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scaleX(${pos.current.flip}) rotate(${displayAngle}deg)`;

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleExit);
      window.removeEventListener("scroll", handleExit);
      cancelAnimationFrame(frameId);
    };
  }, [isHome, visible, burst]);

  if (!isHome || (!visible && !burst)) return null;

  return (
    <div
      ref={fishRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -ml-8 -mt-4 transition-opacity duration-500 ${burst ? "animate-fish-burst opacity-0" : "opacity-100"}`}
      style={{ 
        filter: "url(#paint-texture) drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
      }}
    >
      {/* Smaller size (80x40 instead of 120x60) */}
      <svg width="80" height="40" viewBox="0 0 100 50" fill="none">
        <defs>
          <filter id="paint-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>

          <linearGradient id="koiBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <path 
          d="M20 25 L5 8 Q15 25 5 42 L20 25" 
          fill="#ffffff" 
          className="animate-fish-tail origin-right" 
          stroke="#dddddd"
          strokeWidth="0.5"
        />

        {/* Main Body (Koi) */}
        <path 
          d="M20 25 C20 5 45 2 80 12 C90 16 95 22 95 25 C95 28 90 34 80 38 C45 48 20 45 20 25Z" 
          fill="url(#koiBody)" 
          stroke="#dddddd"
          strokeWidth="1"
        />

        {/* Koi Patterns (Red/Orange patches) */}
        <path d="M70 12 Q80 15 75 22 Q65 18 70 12Z" fill="#e63946" opacity="0.9" />
        <path d="M40 8 Q55 10 50 20 Q35 15 40 8Z" fill="#f4a261" opacity="0.8" />
        <path d="M25 20 Q35 25 30 35 Q20 30 25 20Z" fill="#e63946" opacity="0.8" />
        
        {/* Eye */}
        <circle cx="85" cy="20" r="2.5" fill="black" />

        {/* Shark Fin strapped on */}
        <path d="M45 12 L60 0 L70 12 Z" fill="#457b9d" stroke="#1d3557" strokeWidth="1" />
        <path d="M45 12 Q58 14 70 12" stroke="#1d3557" strokeWidth="1.5" fill="none" />
        <path d="M46 12 Q50 35 68 12" stroke="#1d3557" strokeWidth="0.5" fill="none" opacity="0.3" />

        {/* Fins */}
        <path d="M40 10 Q50 4 55 10" fill="#ffffff" opacity="0.7" />
        <path d="M50 32 Q45 42 55 38 Z" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
}
