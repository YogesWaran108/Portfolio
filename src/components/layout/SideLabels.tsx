import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SideLabelsProps {
  onScrollTop: () => void;
  activeSection?: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'HOMEPAGE',
  about: 'ABOUT ME',
  services: 'SERVICES',
  portfolio: 'PORTFOLIO',
  stack: 'TECH STACK',
  contact: 'CONTACT'
};

export const SideLabels: React.FC<SideLabelsProps> = ({ onScrollTop, activeSection = 'hero' }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0) {
        const progress = Math.min(Math.max(winScroll / height, 0), 1);
        setScrollProgress(progress);
        setShowScrollTop(progress > 0.08);

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleY(${progress})`;
        }
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Continuous RAF ticker syncs with Lenis smooth scroll engine
    let rafId: number;
    const loop = () => {
      updateScrollProgress();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Fixed Vertical Right-Side Smooth Scroll Progress Bar */}
      <div className="fixed top-0 right-0 bottom-0 w-1 bg-slate-300/40 dark:bg-white/10 z-[100] pointer-events-none overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400 origin-top will-change-transform shadow-[0_0_16px_rgba(37,99,235,0.95)]"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      {/* Fixed Left Vertical Page Name Label */}
      <div className="hidden lg:flex fixed left-8 bottom-12 z-20 items-center select-none transition-colors duration-300">
        <span className="writing-mode-vertical rotate-180 uppercase font-mono-code font-bold tracking-[0.25em] text-slate-900 dark:text-white text-[11px] hover:text-[#2563eb] dark:hover:text-[#3b82f6] transition-colors cursor-default">
          {SECTION_LABELS[activeSection] || 'HOMEPAGE'}
        </span>
      </div>

      {/* Fixed Right Scroll to Top Widget (Visible when scrolled down) */}
      <div
        className={`fixed right-8 bottom-12 z-20 flex flex-col items-center gap-3 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={onScrollTop}
          className="w-10 h-10 rounded-full bg-slate-200 hover:bg-[#2563eb] dark:bg-white/10 dark:hover:bg-[#3b82f6] text-slate-900 dark:text-white hover:text-white transition-all duration-300 flex items-center justify-center shadow-md focus:outline-none group cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={onScrollTop}
          className="writing-mode-vertical rotate-180 uppercase font-mono-code font-bold tracking-[0.25em] text-slate-900 dark:text-white text-[10px] hover:text-[#2563eb] dark:hover:text-[#3b82f6] transition-colors cursor-pointer select-none"
        >
          BACK TO TOP
        </button>
      </div>
    </>
  );
};

