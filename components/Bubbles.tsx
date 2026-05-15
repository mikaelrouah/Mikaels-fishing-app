"use client";

import { useEffect, useState } from "react";

export default function Bubbles() {
  const [items, setItems] = useState<{ id: number; left: number; size: number; duration: number; delay: number; type: 'bubble' | 'plankton' }[]>([]);

  useEffect(() => {
    const b = Array.from({ length: 40 }).map((_, i) => {
      const type = i % 2 === 0 ? 'bubble' : 'plankton';
      return {
        id: i,
        left: Math.random() * 100,
        size: type === 'bubble' ? Math.random() * 15 + 5 : Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 20,
        type: type as 'bubble' | 'plankton'
      };
    });
    setItems(b);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute bottom-[-20px] rounded-full animate-bubble ${
            item.type === 'bubble' 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-cyan-200/40 shadow-[0_0_8px_rgba(200,255,255,0.6)]'
          }`}
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
