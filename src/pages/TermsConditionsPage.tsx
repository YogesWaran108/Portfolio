import React from 'react';
import { FileText, ArrowLeft, Shield, Scale, CheckCircle2 } from 'lucide-react';

interface TermsConditionsPageProps {
  onNavigate: (route: string) => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white pt-24 pb-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans select-none transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-mono-code font-bold text-slate-800 dark:text-white transition-all cursor-pointer shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284c7] dark:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO PORTFOLIO</span>
          </button>
          
          <span className="text-[11px] font-mono-code uppercase text-[#0284c7] dark:text-cyan-400 font-bold tracking-wider">
            // LEGAL AGREEMENT
          </span>
        </div>

        {/* Hero Title Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>SERVICE TERMS & GOVERNANCE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Effective Date: August 17, 2026. Please read these terms carefully prior to engaging software development, UI engineering, or consulting services.
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              1. Scope of Services
            </h2>
            <p>
              Yogeshwaran Ravishankar provides frontend software engineering, React/Redux UI design systems, 3D WebGL product storefronts, GSAP animation integration, and web performance optimization services as outlined in individual project proposals and client contracts.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              2. Intellectual Property Rights
            </h2>
            <p>
              Upon receipt of full payment for completed milestones, all custom source code, design assets, and component libraries developed specifically for the client shall be transferred to the client. Pre-existing open-source libraries (such as React, GSAP, Tailwind CSS, Three.js) remain subject to their respective open-source licenses.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              3. Service Packages & Payments
            </h2>
            <p>
              Inquiry estimates submitted via the web portal (including Starter, Professional, and Enterprise packages) serve as initial scoping guidelines. Final project timelines and payment terms will be formalized in written service agreements prior to development commencement.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              4. Limitation of Liability & Contact
            </h2>
            <p>
              Services are provided with professional care and code quality standards. In no event shall Yogeshwaran Ravishankar be liable for indirect or consequential damages arising from third-party hosting outages or unauthorized client server modifications.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 font-mono-code text-xs text-[#0284c7] dark:text-cyan-400">
              Inquiries: yogeshwar11012k02@gmail.com | Phone: +91-6382755066
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
