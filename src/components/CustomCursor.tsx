import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, [data-interactive="true"]');
      const projectRow = target.closest('[data-cursor-text]');

      if (projectRow) {
        setIsHovering(true);
        setCursorText(projectRow.getAttribute('data-cursor-text') || 'VOIR');
      } else if (interactive) {
        setIsHovering(true);
        setCursorText(null);
      } else {
        setIsHovering(false);
        setCursorText(null);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth inertia interpolation
    const loop = () => {
      const ease = 0.18;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      setTrailingPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central precise dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF1E1E] transition-opacity duration-150"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          opacity: cursorText ? 0 : 1,
        }}
      />

      {/* Trailing follower circle / badge */}
      <div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-200 ease-out ${
          cursorText
            ? 'w-20 h-20 bg-[#FF1E1E] text-white border-0 shadow-lg shadow-red-600/30'
            : isHovering
            ? 'w-12 h-12 border border-[#FF1E1E] bg-[#FF1E1E]/15 scale-110'
            : isMouseDown
            ? 'w-7 h-7 border border-white/60 bg-white/20'
            : 'w-8 h-8 border border-white/30'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (cursorText ? 40 : isHovering ? 24 : 16)}px, ${
            trailingPos.y - (cursorText ? 40 : isHovering ? 24 : 16)
          }px, 0)`,
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase select-none animate-in fade-in">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
