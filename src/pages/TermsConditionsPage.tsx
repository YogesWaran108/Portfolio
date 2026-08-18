import React from 'react';
import { Scale, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface TermsConditionsPageProps {
  onNavigate: (route: string) => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onNavigate }) => {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white pt-32 sm:pt-36 lg:pt-40 xl:pt-44 font-sans select-none transition-colors duration-300 flex flex-col justify-between relative z-10">
      <div className="max-w-3xl sm:max-w-4xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-12 lg:px-18 xl:px-16 2xl:px-20 space-y-8 lg:space-y-10 xl:space-y-12 pb-20 w-full relative z-20">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-5 relative z-30 pointer-events-auto">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-xs font-mono-code font-bold text-slate-900 dark:text-white transition-all cursor-pointer shadow-md group relative z-30 pointer-events-auto hover:border-cyan-400 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284c7] dark:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO PORTFOLIO</span>
          </button>
          
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-mono-code uppercase text-[#0284c7] dark:text-cyan-400 font-bold tracking-wider">
            // LEGAL AGREEMENT
          </span>
        </div>

        {/* Hero Title Header */}
        <div className="space-y-3 lg:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <Scale className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            <span>SERVICE TERMS & GOVERNANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-lg font-light leading-relaxed max-w-4xl">
            Effective Date: August 17, 2026. Please read these terms carefully prior to engaging software development, UI engineering, or consulting services.
          </p>
        </div>

        {/* Policy Content Sections (Responsive Layout for 1024px vs 1440px+) */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-8 xl:p-12 2xl:p-16 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 lg:space-y-10 xl:space-y-12 text-slate-700 dark:text-slate-300 text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-lg leading-relaxed">
          
          <section className="space-y-3 lg:space-y-4">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              1. Scope of Services
            </h2>
            <p>
              Yogeshwaran Ravishankar provides frontend software engineering, React/Redux UI design systems, 3D WebGL product storefronts, GSAP animation integration, and web performance optimization services as outlined in individual project proposals and client contracts.
            </p>
          </section>

          <section className="space-y-3 lg:space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 lg:pt-8">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              2. Intellectual Property Rights
            </h2>
            <p>
              Upon receipt of full payment for completed milestones, all custom source code, design assets, and component libraries developed specifically for the client shall be transferred to the client. Pre-existing open-source libraries (such as React, GSAP, Tailwind CSS, Three.js) remain subject to their respective open-source licenses.
            </p>
          </section>

          <section className="space-y-3 lg:space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 lg:pt-8">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              3. Service Packages & Payments
            </h2>
            <p>
              Inquiry estimates submitted via the web portal (including Starter, Professional, and Enterprise packages) serve as initial scoping guidelines. Final project timelines and payment terms will be formalized in written service agreements prior to development commencement.
            </p>
          </section>

          <section className="space-y-3 lg:space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 lg:pt-8">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              4. Limitation of Liability & Contact
            </h2>
            <p>
              Services are provided with professional care and code quality standards. In no event shall Yogeshwaran Ravishankar be liable for indirect or consequential damages arising from third-party hosting outages or unauthorized client server modifications.
            </p>
            <div className="p-4 lg:p-5 rounded-xl lg:rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 font-mono-code text-xs sm:text-sm lg:text-sm xl:text-base text-[#0284c7] dark:text-cyan-400 font-bold">
              Inquiries: yogeshwar11012k02@gmail.com | Phone: +91-6382755066
            </div>
          </section>

        </div>

      </div>

      <Footer onNavigate={onNavigate} activeRoute="terms-conditions" />
    </div>
  );
};
