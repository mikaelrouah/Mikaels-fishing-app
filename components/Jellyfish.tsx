"use client";

import { useEffect, useState } from "react";

export default function Jellyfish() {
  const [jellys, setJellys] = useState<{ id: number; left: string; top: string; delay: string; size: number }[]>([]);

  useEffect(() => {
    const js = [
      { id: 1, left: "5%", top: "20%", delay: "0s", size: 60 },
      { id: 2, left: "85%", top: "45%", delay: "2s", size: 80 },
      { id: 3, left: "10%", top: "70%", delay: "5s", size: 50 },
      { id: 4, left: "90%", top: "15%", delay: "3s", size: 70 },
      { id: 5, left: "3%", top: "40%", delay: "7s", size: 65 },
    ];
    setJellys(js);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {jellys.map((j) => (
        <div
          key={j.id}
          className="absolute animate-jelly-float"
          style={{
            left: j.left,
            top: j.top,
            animationDelay: j.delay,
            width: `${j.size}px`,
            height: `${j.size}px`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 filter drop-shadow-[0_0_15px_rgba(100,200,255,0.8)]">
            {/* Bell */}
            <path
              d="M20 50 Q20 20 50 20 Q80 20 80 50"
              fill="rgba(100, 200, 255, 0.4)"
              className="animate-jelly-pulse"
            />
            {/* Tentacles */}
            <path d="M30 50 Q30 80 25 90" stroke="rgba(100, 200, 255, 0.3)" fill="none" strokeWidth="2" className="animate-tentacle-1" />
            <path d="M40 55 Q40 85 45 95" stroke="rgba(100, 200, 255, 0.3)" fill="none" strokeWidth="2" className="animate-tentacle-2" />
            <path d="M50 50 Q50 90 55 100" stroke="rgba(100, 200, 255, 0.3)" fill="none" strokeWidth="2" className="animate-tentacle-3" />
            <path d="M60 55 Q60 85 65 95" stroke="rgba(100, 200, 255, 0.3)" fill="none" strokeWidth="2" className="animate-tentacle-1" />
            <path d="M70 50 Q70 80 75 90" stroke="rgba(100, 200, 255, 0.3)" fill="none" strokeWidth="2" className="animate-tentacle-2" />
          </svg>
        </div>
      ))}
    </div>
  );
}
