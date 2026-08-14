import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { ProjectDetailsModal } from '../modals/ProjectDetailsModal';
import { ArrowDown, ArrowUpRight, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; visible: boolean; activeId: string }>({
    x: 0,
    y: 0,
    visible: false,
    activeId: ''
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const categories = ['ALL', 'UI/UX & Animation', '3D & eCommerce', 'Enterprise B2B'];

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 70, opacity: 0.3 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 45%',
                scrub: 0.6
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
      activeId: id
    });
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white py-20 sm:py-28 px-8 sm:px-16 md:px-20 lg:px-28 xl:px-36 border-b border-slate-200 dark:border-white/10 overflow-hidden"
    >
      {/* Background Watermark Polygon Geometry */}
      <div className="absolute right-0 top-10 w-[500px] h-[500px] opacity-10 dark:opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-slate-900 dark:stroke-white fill-none stroke-[0.5]">
          <polygon points="100,10 170,50 170,130 100,170 30,130 30,50" />
          <polygon points="100,30 150,60 150,120 100,150 50,120 50,60" />
          <line x1="100" y1="10" x2="100" y2="170" />
          <line x1="30" y1="50" x2="170" y2="130" />
          <line x1="30" y1="130" x2="170" y2="50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Breadcrumb & Big Heading matching reference screenshot */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono-code uppercase tracking-widest text-slate-400 dark:text-neutral-400 font-semibold">
            <span>HOMEPAGE</span>
            <span>/</span>
            <span className="text-[#0284c7] dark:text-cyan-400 font-bold">PORTFOLIO</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                <span className="block sm:inline">Designing a</span>{' '}
                <span className="block sm:inline">
                  <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                    Better World
                  </span>{' '}
                  Today.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-4">
              <p className="text-slate-600 dark:text-neutral-300 text-sm sm:text-base font-normal leading-relaxed max-w-sm">
                Curated selection of enterprise web applications, high-throughput platforms, and 3D WebGL experiences.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-slate-500 dark:text-neutral-400">
                <span>OUR WORKS</span>
                <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-white/10 flex items-center justify-center text-[#0284c7] dark:text-cyan-400">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 border-b border-slate-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500 dark:text-neutral-400 font-semibold">
            <Filter className="w-4 h-4 text-[#0284c7] dark:text-cyan-400" />
            <span>CATEGORIES:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-extrabold shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-white hover:bg-slate-100 hover:border-cyan-300 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-neutral-300 border border-slate-200 dark:border-white/10 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Staggered Project Cards Flow */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          {filteredProjects.map((project, index) => {
            const isRightColumn = index % 2 !== 0;
            const colSpan = isRightColumn ? 'md:col-span-6 md:mt-16' : 'md:col-span-6';

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`group cursor-pointer ${colSpan}`}
              >
                {/* Interactive Image Container with Curved Corners & Hover Link Badge */}
                <div
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-md group-hover:shadow-2xl transition-all duration-500 mb-6 cursor-none"
                >
                  <div className="relative h-[320px] sm:h-[400px] md:h-[440px] overflow-hidden rounded-2xl sm:rounded-3xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-2xl sm:rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Top Category Badge (Rounded Pills) */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#0284c7] dark:text-cyan-400 text-[11px] font-mono-code uppercase tracking-wider border border-slate-200 dark:border-cyan-500/40 font-bold shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-white/95 backdrop-blur-md text-white dark:text-slate-900 text-[11px] font-mono-code font-bold">
                      {project.year}
                    </span>
                  </div>

                  {/* Hover Quick Link Badge: Direct Open in New Webpage */}
                  {project.liveUrl && (
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-white backdrop-blur-md text-xs font-mono-code font-bold border border-white/20 shadow-xl transition-all hover:scale-105"
                      >
                        <span>VISIT SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
                      </a>
                    </div>
                  )}

                  {/* Interactive Designer Mouse-Follow Badge (Circular dark badge like reference image) */}
                  {cursorPos.visible && cursorPos.activeId === project.id && (
                    <div
                      className="pointer-events-none absolute z-30 w-20 h-20 rounded-full bg-slate-950/90 dark:bg-black/90 text-white backdrop-blur-md flex flex-col items-center justify-center font-bold shadow-2xl transition-transform duration-75 ease-out border border-white/20 scale-100"
                      style={{
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-[11px] font-mono-code uppercase tracking-widest text-cyan-400 font-bold">
                        MORE
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Meta Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#0284c7] dark:text-cyan-400 font-extrabold">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span className="text-slate-500 dark:text-slate-400 font-normal">MAY {project.year}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-cyan-50 dark:bg-white/10 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 text-[#0284c7] dark:text-white group-hover:text-white transition-all flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 line-clamp-2 font-normal leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      <ProjectDetailsModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
