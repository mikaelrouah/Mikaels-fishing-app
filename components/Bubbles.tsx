"use client";

import { useEffect, useState } from "react";

export default function Bubbles() {
  const [bubbles, setBubbles] = useState<{ id: number; left: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const b = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 15 + 5,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 10
    }));
    setBubbles(b);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-[-20px] rounded-full bg-white/10 border border-white/20 animate-bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
