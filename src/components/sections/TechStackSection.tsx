import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { TECH_STACK } from '../../data/portfolioData';
import { Atom, FileCode, Move, Palette, Box, Server, Database, Zap, Cpu, CheckCircle2, GitBranch, Github } from 'lucide-react';

gsap.registerPlugin(Flip);

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Frontend', 'Animation & 3D', 'Backend & DB', 'Architecture & Tools'];

  const handleCategorySelect = (cat: string) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
  };

  // Ultra-liquid smooth GSAP Flip 2D sliding movement on category filter change
  useLayoutEffect(() => {
    if (!gridContainerRef.current) return;

    const container = gridContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.tech-card');

    // 1. Capture exact 2D position state of cards before layout change
    const state = Flip.getState(cards, { props: 'transform,opacity' });

    // 2. Toggle card display in DOM
    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const isMatch = selectedCategory === 'All' || category === selectedCategory;
      if (isMatch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // 3. Execute ultra-liquid GSAP Flip 2D sliding card repositioning & scale physics
    Flip.from(state, {
      targets: cards,
      duration: 0.8,
      ease: 'expo.out',
      scale: true,
      fade: true,
      stagger: 0.04,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.85, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'expo.out', stagger: 0.03 }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.85, y: 15, duration: 0.3, ease: 'power2.in' })
    });
  }, [selectedCategory]);

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'Move':
        return <Move className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'Box':
        return <Box className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'Database':
        return <Database className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'GitBranch':
      case 'Github':
        return <GitBranch className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
      default:
        return <Cpu className="w-5 h-5 text-[#3b82f6] group-hover:text-cyan-400 transition-colors" />;
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="stack"
      className="relative bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-white py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-32 xl:px-16 border-b border-slate-200 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600" />
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
                // TECHNICAL EXPERTISE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Skills & Technical Tools.
            </h2>
          </div>

          <p className="text-slate-600 dark:text-neutral-300 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Frontend development stack built for scalable component architectures, strict type safety, responsive layouts, and sub-second web performance.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-extrabold shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-white hover:bg-slate-100 hover:border-cyan-300 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Stack Cards Grid with GSAP Flexbox/Grid Filtering */}
        <div ref={gridContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-[height] duration-500 ease-out">
          {TECH_STACK.map((item) => (
            <div
              key={item.name}
              data-category={item.category}
              className="tech-card relative overflow-hidden bg-white dark:bg-[#0b1329] hover:bg-slate-50 dark:hover:bg-[#111c3a] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500 transition-all duration-500 ease-out flex flex-col justify-between group shadow-xl dark:shadow-none hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Top Glowing Gradient Line sweep animation on hover */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 transition-all duration-500 ease-out group-hover:w-full" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 flex items-center justify-center text-[#0284c7] dark:text-[#3b82f6] group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    {getTechIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 font-bold uppercase">
                    {item.experience} YRS
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono-code mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#0284c7] dark:text-cyan-400" /> PROFICIENCY
                  </span>
                  <span className="font-bold text-[#0284c7] dark:text-cyan-400">{item.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
