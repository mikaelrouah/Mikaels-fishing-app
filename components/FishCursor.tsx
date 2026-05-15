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
  const pos = useRef({ x: 0, y: 0, angle: 0, flip: 1 });

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleExit = () => {
      if (!visible || burst) return;
      setBurst(true);
      setTimeout(() => {
        setVisible(false);
        setBurst(false);
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    // Disappear on clicks or any scroll (indicates interaction)
    window.addEventListener("mousedown", handleExit);
    window.addEventListener("scroll", handleExit, { passive: true });

    let frameId: number;
    const update = () => {
      if (!fishRef.current || !visible || burst) {
        frameId = requestAnimationFrame(update);
        return;
      }

      // Chase logic with offset - stay slightly behind and to the side
      const lerp = 0.05;
      const offsetDist = 40; 
      const dx_mouse = mouse.current.x - pos.current.x;
      const dy_mouse = mouse.current.y - pos.current.y;
      const dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
      
      // Only move if mouse is a bit away to create that "next to" feel
      if (dist > offsetDist) {
        const targetX = mouse.current.x - (dx_mouse / dist) * offsetDist;
        const targetY = mouse.current.y - (dy_mouse / dist) * offsetDist;
        
        pos.current.x += (targetX - pos.current.x) * lerp;
        pos.current.y += (targetY - pos.current.y) * lerp;
      }

      const angle = Math.atan2(dy_mouse, dx_mouse) * (180 / Math.PI);
      // Flip logic with a smoother transition feel
      const newFlip = dx_mouse < 0 ? -1 : 1;
      pos.current.flip = newFlip;
      
      const displayAngle = pos.current.flip === -1 ? angle + 180 : angle;
      
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
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -ml-12 -mt-6 transition-opacity duration-500 ${burst ? "animate-fish-burst opacity-0" : "opacity-100"}`}
      style={{ 
        // Use a filter to give it a painted look
        filter: "url(#paint-texture) drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
        transition: "transform 0.1s ease-out, opacity 0.5s ease-in-out"
      }}
    >
      <svg width="120" height="60" viewBox="0 0 100 50" fill="none">
        <defs>
          {/* Painting texture filter */}
          <filter id="paint-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>

          <linearGradient id="goldfishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff7b00" />
            <stop offset="50%" stopColor="#ffb700" />
            <stop offset="100%" stopColor="#ff9500" />
          </linearGradient>
        </defs>

        {/* Tail - Improved wiggle */}
        <path 
          d="M20 25 L5 5 Q15 25 5 45 L20 25" 
          fill="#ff7b00" 
          className="animate-fish-tail origin-right" 
          stroke="#e85d04"
          strokeWidth="1"
        />

        {/* Main Body */}
        <path 
          d="M20 25 C20 5 45 2 80 12 C90 16 95 22 95 25 C95 28 90 34 80 38 C45 48 20 45 20 25Z" 
          fill="url(#goldfishGrad)" 
          stroke="#e85d04"
          strokeWidth="1.5"
        />
        
        {/* Eye */}
        <circle cx="85" cy="20" r="3.5" fill="white" />
        <circle cx="86.5" cy="19" r="1.8" fill="black" />

        {/* Shark Fin strapped on */}
        <path d="M45 12 L65 -5 L75 12 Z" fill="#457b9d" stroke="#1d3557" strokeWidth="1" />
        <path d="M45 12 Q60 15 75 12" stroke="#1d3557" strokeWidth="2" fill="none" />
        {/* Harness strap around belly */}
        <path d="M46 12 Q50 40 73 12" stroke="#1d3557" strokeWidth="1" fill="none" opacity="0.4" />

        {/* Painted detail lines */}
        <path d="M30 25 Q50 28 75 25" stroke="#e85d04" strokeWidth="0.5" opacity="0.3" />
        <path d="M35 15 Q55 18 70 15" stroke="#e85d04" strokeWidth="0.5" opacity="0.2" />
        
        {/* Fins */}
        <path d="M40 10 Q50 2 60 10" fill="#ff7b00" opacity="0.6" />
        <path d="M50 35 Q45 45 60 40 Z" fill="#ff7b00" opacity="0.5" />
      </svg>
    </div>
  );
}
