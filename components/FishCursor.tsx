"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function FishCursor() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [burst, setBurst] = useState(false);
  const [hidden, setHidden] = useState(false);
  const fishRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, angle: 0, flip: 1 });
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (pathname !== "/") {
      setHidden(true);
      return;
    }
    setHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const triggerBurst = () => {
      if (!visible || burst) return;
      setBurst(true);
      setTimeout(() => {
        setVisible(false);
        setBurst(false);
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", triggerBurst);
    window.addEventListener("click", triggerBurst);

    let frameId: number;
    const update = () => {
      if (!fishRef.current || !visible || burst) {
        frameId = requestAnimationFrame(update);
        return;
      }

      // Chase logic: stay slightly behind and offset
      const lerp = 0.04; 
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;
      
      const dx = targetX - pos.current.x;
      const dy = targetY - pos.current.y;
      
      pos.current.x += dx * lerp;
      pos.current.y += dy * lerp;

      // Calculate angle and flip
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const flip = dx < 0 ? -1 : 1;

      // Update fish styles - use scaleX for flip to avoid upside down
      // When flip is -1, we need to adjust the rotation because the fish is facing the other way
      const displayAngle = flip === -1 ? angle + 180 : angle;
      
      fishRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scaleX(${flip}) rotate(${displayAngle}deg)`;

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", triggerBurst);
      window.removeEventListener("click", triggerBurst);
      cancelAnimationFrame(frameId);
    };
  }, [pathname, visible, burst]);

  if (hidden || !visible) return null;

  return (
    <div
      ref={fishRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -ml-10 -mt-5 transition-opacity duration-500 ${burst ? "animate-fish-burst opacity-0" : "opacity-100"}`}
    >
      <svg width="100" height="50" viewBox="0 0 100 50" fill="none" className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        {/* Tail Fin - animated wiggle */}
        <path d="M15 25 L0 10 Q10 25 0 40 L15 25" fill="#FF9F1C" className="animate-fish-tail origin-right" />
        
        {/* Body Gradient */}
        <defs>
          <linearGradient id="goldfishBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9F1C" />
            <stop offset="50%" stopColor="#FFBF69" />
            <stop offset="100%" stopColor="#FF9F1C" />
          </linearGradient>
        </defs>

        {/* Main Body (Goldfish) */}
        <path d="M15 25 C15 10 40 5 75 12 C85 16 90 22 90 25 C90 28 85 34 75 38 C40 45 15 40 15 25Z" fill="url(#goldfishBody)" />
        
        {/* Eye */}
        <circle cx="80" cy="20" r="3" fill="white" />
        <circle cx="81.5" cy="19" r="1.5" fill="black" />

        {/* Shark Fin (strapped on) */}
        <path d="M40 12 L55 0 L65 12 Z" fill="#457B9D" />
        
        {/* Harness / Strap */}
        <path d="M40 12 Q52 14 65 12" stroke="#1D3557" strokeWidth="1.5" fill="none" />
        <path d="M42 12 Q45 35 63 12" stroke="#1D3557" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Fins */}
        <path d="M35 10 Q45 2 55 10" fill="#FF9F1C" opacity="0.8" />
        <path d="M45 28 Q40 38 55 35 Z" fill="#FF9F1C" opacity="0.7" />
      </svg>
    </div>
  );
}
