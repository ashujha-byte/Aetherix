
'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  return null;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, .magnetic')
      );
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor-glow"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transform: hovering ? 'scale(2.5)' : 'scale(1)',
          opacity: hovering ? 0.8 : 0.5,
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border border-brand-primary/30 transition-all duration-200 ease-out"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: hovering ? 'rgba(200,155,109,0.6)' : 'rgba(59,31,23,0.3)',
        }}
      />
    </>
  );
}
