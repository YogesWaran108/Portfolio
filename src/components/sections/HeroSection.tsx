import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { ThreeBackground } from '../ui/ThreeBackground';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const rotatingBadgeRef = useRef<HTMLDivElement>(null);

  // Rotation value synced strictly to window scrolling + ambient spin
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    // Entrance GSAP animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          subtextRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          buttonsRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          rotatingBadgeRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          '-=0.3'
        );
    }, heroRef);

    // Scroll listener: sync text circle rotation with window scrolling
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      setScrollRotation(currentScroll * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToNext = () => {
    onNavigate('about');
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[85vh] sm:min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-white overflow-hidden pt-16 sm:pt-20 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16 border-b border-slate-200 dark:border-white/10 select-none transition-colors duration-300"
    >
      {/* 3D Wireframe Canvas */}
      <ThreeBackground />

      {/* Subtle Background Gradient Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/85 via-slate-50/40 to-transparent dark:from-[#080d1a]/85 dark:via-[#080d1a]/30 dark:to-transparent pointer-events-none z-[1]" />

      {/* Main Container aligned with max-w-6xl mx-auto (matching section 2 left margin) */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        {/* Main Content Area - Vertically Centered below Navbar with optimal padding */}
        <div className="max-w-4xl w-full my-auto pt-10 sm:pt-14 md:pt-16 flex flex-col justify-center">
          {/* Minimal Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-3xl sm:5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-slate-900 dark:text-white mb-3 sm:mb-4 max-w-3xl font-bold"
          >
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-500">Yogeshwaran.</span>
          </h1>

          {/* Short Minimal 2-Line Paragraph */}
          <p
            ref={subtextRef}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-xl mb-6"
          >
            I'm a Frontend Software Engineer specializing in building scalable, high-performance web applications with React, Redux, TypeScript & GSAP.
          </p>

          {/* Action Buttons (Vibrant Blue-to-Cyan Mix Theme) */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('services')}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>WHAT WE DO</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-slate-200/80 hover:bg-slate-300/80 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-md transform hover:scale-[1.02]"
            >
              <span>VIEW MY STACK</span>
              <div className="w-5 h-5 rounded-full bg-slate-300/60 dark:bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Right ROTATING SCROLL TEXT CIRCLE */}
        <div className="w-full flex items-end justify-end pt-2">
          {/* ROTATING CIRCULAR TEXT BADGE */}
          <div ref={rotatingBadgeRef} className="ml-auto flex items-center justify-end">
            <button
              onClick={handleScrollToNext}
              className="group relative w-22 h-22 sm:w-24 sm:h-24 flex items-center justify-center rounded-full focus:outline-none cursor-pointer"
              aria-label="Scroll Down to Next Component"
              title="Click to Scroll Down to About Section"
            >
              {/* SVG Text Circle */}
              <div
                className="w-full h-full transition-transform duration-100 ease-out"
                style={{ transform: `rotate(${scrollRotation}deg)` }}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="heroCirclePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                  <text className="font-mono-code font-extrabold uppercase fill-slate-900 dark:fill-white text-[9px] tracking-[0.2em]">
                    <textPath href="#heroCirclePath" startOffset="0%">
                      • SCROLL DOWN • EXPLORE MORE •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Center Circle Button with Down Arrow */}
              <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2563eb] group-hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-[#2563eb]/40 group-hover:scale-105 active:scale-95 border-2 border-white dark:border-[#080d1a]">
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
