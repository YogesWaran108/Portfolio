import React from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface CallToActionSectionProps {
  onNavigateContact: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ onNavigateContact }) => {
  return (
    <section className="relative bg-slate-100 dark:bg-[#0b1329] text-slate-900 dark:text-white py-16 sm:py-24 px-6 sm:px-12 md:px-16 text-center border-b border-slate-200 dark:border-white/10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-mono-code uppercase tracking-widest text-[#1d4ed8] dark:text-[#60a5fa] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#2563eb] dark:text-[#3b82f6]" />
          <span>START A PROJECT TOGETHER</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-slate-900 dark:text-white mb-6">
          Ready to bring your ideas to{' '}
          <span className="text-blue-gradient underline decoration-[#3b82f6]/40">
            life
          </span>
          ? Let's connect.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 max-w-xl mx-auto font-light leading-relaxed mb-8">
          Whether you need a high-performance React application, Redux architecture, or a GSAP interactive experience, let's build something exceptional.
        </p>

        {/* Centered Blue-Cyan Gradient Pill CTA Button */}
        <button
          onClick={onNavigateContact}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-102 active:scale-98 shadow-xl shadow-cyan-500/25"
        >
          <MessageSquare className="w-4 h-4" />
          <span>GET IN TOUCH WITH ME</span>
          <div className="w-6 h-6 rounded-full bg-white text-[#0284c7] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 font-bold">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </section>
  );
};
