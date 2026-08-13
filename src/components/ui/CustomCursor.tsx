import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      if (target) {
        const isClickable =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.classList.contains('interactive-hover') ||
          target.getAttribute('role') === 'button';

        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let animId: number;
    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    const render = () => {
      // Lerp follower position smoothly
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.25);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.25);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 0.6 : 1})`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [enabled, isHovered]);

  if (!enabled) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center Small Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#3b82f6] rounded-full shadow-[0_0_10px_#3b82f6] transition-transform duration-75"
      />

      {/* Outer Smooth Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 border rounded-full transition-all duration-200 ease-out ${
          isPointer
            ? 'w-12 h-12 bg-[#3b82f6]/20 border-[#3b82f6] backdrop-blur-[1px] shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            : isHovered
            ? 'w-8 h-8 bg-[#3b82f6]/25 border-[#3b82f6]'
            : 'w-10 h-10 border-[#3b82f6]/50'
        }`}
      />
    </div>
  );
};
