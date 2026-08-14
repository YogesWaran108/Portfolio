import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUpRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  Cpu,
  LayoutGrid,
  Box,
  Coffee,
  Utensils,
  Crown,
  Code2,
  Smartphone,
  Search,
  Server,
  FileCode,
  Move,
  Zap,
  Award
} from 'lucide-react';
import { SERVICES } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onNavigateContact: (selectedService?: string) => void;
}

interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  details: string[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateContact }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('ux-audits');
  const polyRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Accordion Items as depicted in Image 4
  const accordionData: AccordionItem[] = [
    {
      id: 'ux-audits',
      title: 'UX AUDITS',
      subtitle: 'Heuristic evaluation, user flow analysis, and interaction bottleneck identification.',
      details: [
        'Comprehensive usability heuristics evaluation',
        'Conversion funnel & drop-off analysis',
        'Accessibility compliance (WCAG 2.1 AA)',
        'Actionable UI audit reports & prototype recommendations'
      ]
    },
    {
      id: 'design-thinking',
      title: 'DESIGN THINKING',
      subtitle: 'User-centered problem solving, empathy mapping, and rapid interactive prototyping.',
      details: [
        'Empathy mapping & user persona definition',
        'Rapid interactive wireframe validation',
        'Collaborative design sprint workshops',
        'Feature prioritization matrix'
      ]
    },
    {
      id: 'wireframing',
      title: 'WIREFRAMING',
      subtitle: 'High-fidelity structural layout blueprints and responsive navigation systems.',
      details: [
        'Structural page layout architecture',
        'Cross-device breakpoint mapping',
        'Navigation flow & content hierarchy',
        'Design system token synchronization'
      ]
    },
    {
      id: 'aesthetics',
      title: 'AESTHETICS & MOTION',
      subtitle: 'Bespoke UI design systems, micro-interactions, and hardware-accelerated GSAP animations.',
      details: [
        'Luxury visual aesthetic design systems',
        'Scroll-triggered GSAP timeline animations',
        'Smooth micro-interactions & feedback states',
        'Hardware-accelerated 60 FPS performance'
      ]
    },
    {
      id: 'methodologies',
      title: 'METHODOLOGIES & ARCHITECTURE',
      subtitle: 'Clean React/TypeScript architecture, Redux Toolkit state normalization, and sub-second speed.',
      details: [
        'Modular React.js & TypeScript architecture',
        'Normalized Redux Toolkit state management',
        'Lazy loading & asset bundle optimization',
        'Sub-second Lighthouse 95+ performance'
      ]
    }
  ];

  const [priceCursorPos, setPriceCursorPos] = useState<{ x: number; y: number; visible: boolean; activeId: string }>({
    x: 0,
    y: 0,
    visible: false,
    activeId: ''
  });

  // Pricing Tiers with custom Coffee, Biryani & Full Meals packages and option icons
  const pricingData = [
    {
      id: 'tier-1',
      price: '₹400',
      unit: '+ hosting charges',
      title: 'Buy me a Starbucks Coffee',
      subtitle: 'Basic Website with Basic Design',
      description: 'Basic website with custom design, clean responsive mobile layout, and essential SEO setup.',
      iconName: 'Coffee',
      features: [
        { label: 'Basic Custom Design', icon: 'Code2' },
        { label: 'Responsive Mobile Layout', icon: 'Smartphone' },
        { label: 'Core SEO Setup', icon: 'Search' },
        { label: '+ Hosting Charges', icon: 'Server' }
      ]
    },
    {
      id: 'tier-2',
      price: '₹750',
      unit: '+ hosting charges',
      title: 'Buy me a Bucket Biryani',
      subtitle: 'Inspiring and Customized Design Solutions',
      description: 'Inspiring and Customized Design Solutions. Full React & TypeScript application, GSAP scroll animations, Redux state architecture, and sub-second Lighthouse scores.',
      iconName: 'Utensils',
      features: [
        { label: 'TypeScript & Redux State', icon: 'FileCode' },
        { label: 'GSAP Scroll Animations', icon: 'Move' },
        { label: 'Sub-second Lighthouse Score', icon: 'Zap' },
        { label: '+ Hosting Charges', icon: 'Server' }
      ]
    },
    {
      id: 'tier-3',
      price: '₹1800',
      unit: '+ hosting charges',
      title: 'Buy me a Full Meals',
      subtitle: 'Enterprise WebGL & 3D Interactive Platforms',
      description: 'Enterprise WebGL & 3D Interactive Platforms. React Three Fiber WebGL viewports, high-throughput B2B dashboards, multi-tenant portals, and end-to-end frontend leadership.',
      iconName: 'Crown',
      features: [
        { label: 'React Three Fiber WebGL 3D', icon: 'Box' },
        { label: 'Multi-Tenant SaaS Dashboards', icon: 'LayoutGrid' },
        { label: 'End-to-End Architectural Leadership', icon: 'Award' },
        { label: '+ Hosting Charges', icon: 'Server' }
      ]
    }
  ];

  const renderOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Crown':
        return <Crown className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Smartphone':
        return <Smartphone className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Search':
        return <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Server':
        return <Server className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'FileCode':
        return <FileCode className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Move':
        return <Move className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Zap':
        return <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Box':
        return <Box className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'Award':
        return <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    }
  };

  // Continuous floating 3D Wireframe animation using GSAP
  useEffect(() => {
    if (polyRef.current) {
      gsap.to(polyRef.current, {
        rotateY: 360,
        rotateX: 180,
        duration: 25,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });
    }
  }, []);

  const handlePriceMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPriceCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
      activeId: id
    });
  };

  const handlePriceMouseLeave = () => {
    setPriceCursorPos((prev) => ({ ...prev, visible: false }));
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const handleScrollToSpecifics = () => {
    const specificsEl = document.getElementById('work-specifics');
    if (specificsEl) {
      specificsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToWorks = () => {
    const worksEl = document.getElementById('portfolio');
    if (worksEl) {
      worksEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white py-12 sm:py-28 px-4 sm:px-16 md:px-20 lg:px-28 xl:px-36 border-b border-slate-200 dark:border-white/10 overflow-hidden"
    >
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: HERO HEADER WITH 3D POLYHEDRON (IMAGE 3 DESIGN)   */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-28">
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
          <span>HOMEPAGE</span>
          <span>/</span>
          <span>SERVICES</span>
          <span>/</span>
          <span className="text-[#0284c7] dark:text-cyan-400 font-bold">SERVICE</span>
        </div>

        {/* Hero Grid with Title and 3D Floating Polyhedron Wireframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Website{' '}
              <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 block sm:inline">
                Design
              </span>{' '}
              and{' '}
              <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-sky-300 dark:to-cyan-300 block sm:inline">
                Development
              </span>
            </h1>

            {/* Scroll Indicator Button matching Image 3 */}
            <div className="pt-2 sm:pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={handleScrollToSpecifics}
                className="group flex items-center gap-3 text-xs font-mono-code uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span className="font-bold">ABOUT SERVICE</span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-50 dark:bg-white/10 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 group-hover:text-white transition-all shadow-md border border-cyan-200 dark:border-white/15">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </button>
            </div>
          </div>

          {/* 3D Geometric Polyhedron Wireframe (Image 3 Right Component) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative py-4 sm:py-0">
            <div className="w-48 h-48 sm:w-80 sm:h-80 relative flex items-center justify-center">
              <svg
                ref={polyRef}
                viewBox="0 0 200 200"
                className="w-full h-full text-[#0284c7] dark:text-cyan-400/80 drop-shadow-[0_0_25px_rgba(2,132,199,0.3)] dark:drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Outer Polyhedron Wireframe Mesh */}
                <polygon points="100,10 170,50 170,130 100,170 30,130 30,50" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
                <polygon points="100,30 150,60 150,120 100,150 50,120 50,60" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
                <line x1="100" y1="10" x2="100" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="30" y1="50" x2="170" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="30" y1="130" x2="170" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="100" y1="10" x2="150" y2="60" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="100" y1="170" x2="50" y2="120" stroke="#38bdf8" strokeWidth="1.2" />

                {/* Vertex Glowing Nodes */}
                <circle cx="100" cy="10" r="3" fill="#38bdf8" />
                <circle cx="170" cy="50" r="3" fill="#06b6d4" />
                <circle cx="170" cy="130" r="3" fill="#06b6d4" />
                <circle cx="100" cy="170" r="3" fill="#38bdf8" />
                <circle cx="30" cy="130" r="3" fill="#06b6d4" />
                <circle cx="30" cy="50" r="3" fill="#06b6d4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: APPROACH & ACCORDION SPECIFICS (IMAGE 4 DESIGN)   */}
      {/* ------------------------------------------------------------- */}
      <div id="work-specifics" className="max-w-7xl mx-auto mb-32 pt-10 border-t border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Approach Heading & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Your{' '}
              <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 block sm:inline">
                Approach
              </span>{' '}
              and{' '}
              <span className="font-light text-slate-600 dark:text-slate-300 block sm:inline">
                Work Specifics
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              At our agency, we have a unique approach to web design and development. We believe in creating websites that not only look great but also perform well in terms of user experience, functionality, and search engine optimization.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleScrollToWorks}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-900 dark:text-white hover:text-white font-mono-code text-xs uppercase font-bold tracking-widest transition-all border border-slate-200 dark:border-white/15 shadow-lg"
              >
                <span>VIEW WORKS</span>
                <div className="w-6 h-6 rounded-full bg-cyan-50 dark:bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-[#0284c7] dark:text-white">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {accordionData.map((item) => {
              const isOpen = openAccordion === item.id;

              return (
                <div
                  key={item.id}
                  className="border-b border-slate-200 dark:border-white/15 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between text-left py-4 group focus:outline-none cursor-pointer"
                  >
                    <span className="font-mono-code text-sm sm:text-base tracking-wider uppercase font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </span>

                    <div className={`w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 text-slate-800 dark:text-white group-hover:text-white flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rotate-180' : ''}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Collapsible Drawer */}
                  {isOpen && (
                    <div className="pt-2 pb-6 space-y-4 animate-fadeIn">
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                        {item.subtitle}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-200 shadow-sm dark:shadow-none">
                            <Check className="w-3.5 h-3.5 text-[#0284c7] dark:text-cyan-400 shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: REASONABLE PRICES PACKAGES (IMAGE 5 DESIGN)        */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-200 dark:border-white/10">
        {/* Section Heading matching Image 5 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Reasonable{' '}
            <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
              prices
            </span>{' '}
            for innovative{' '}
            <span className="font-light text-slate-600 dark:text-slate-300">
              solutions
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            At our agency, we have a unique approach to web design and development. We believe in creating in terms of user experience, functionality.
          </p>
        </div>

        {/* Pricing Horizontal Card Rows matching Image 5 Layout */}
        <div className="space-y-6">
          {pricingData.map((plan) => {
            const packageTitle = `${plan.title} (${plan.price} + hosting charges)`;
            return (
              <div
                key={plan.id}
                onClick={() => onNavigateContact(packageTitle)}
                onMouseMove={(e) => handlePriceMouseMove(e, plan.id)}
                onMouseLeave={handlePriceMouseLeave}
                className="group relative bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-[#1e293b] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-cyan-500 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl dark:shadow-none cursor-pointer overflow-hidden"
              >
                {/* Floating CHOOSE Badge following mouse cursor */}
                {priceCursorPos.visible && priceCursorPos.activeId === plan.id && (
                  <div
                    className="pointer-events-none absolute z-30 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono-code font-extrabold text-xs uppercase tracking-widest flex items-center justify-center shadow-2xl shadow-cyan-500/50 border border-cyan-300/40 transition-transform duration-75 ease-out scale-105"
                    style={{
                      left: `${priceCursorPos.x}px`,
                      top: `${priceCursorPos.y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    CHOOSE
                  </div>
                )}

                {/* Left Price Display */}
                <div className="flex flex-col md:w-1/4 shrink-0 space-y-1">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 group-hover:from-cyan-500 group-hover:to-blue-500 transition-colors">
                    {plan.price}
                  </span>
                  <span className="font-mono-code text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {plan.unit}
                  </span>
                </div>

                {/* Center Details */}
                <div className="md:w-3/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 text-[#0284c7] dark:text-blue-400 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all shadow-md shrink-0">
                      {renderOptionIcon(plan.iconName)}
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-400 transition-colors">
                        {plan.title}
                      </h3>
                      {plan.subtitle && (
                        <p className="text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-semibold mt-0.5">
                          {plan.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {plan.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {plan.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono-code px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 group-hover:border-cyan-400 transition-colors"
                      >
                        {renderOptionIcon(feat.icon)}
                        <span>{feat.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="md:w-1/6 flex justify-end shrink-0 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateContact(packageTitle);
                    }}
                    className="w-12 h-12 rounded-full bg-[#2563eb] dark:bg-blue-600 group-hover:bg-blue-700 dark:group-hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-500/30 group-hover:scale-110 cursor-pointer"
                    title="Book Package"
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
