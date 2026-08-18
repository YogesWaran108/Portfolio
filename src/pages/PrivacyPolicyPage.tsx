import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface PrivacyPolicyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white pt-32 sm:pt-36 lg:pt-40 xl:pt-44 font-sans select-none transition-colors duration-300 flex flex-col justify-between relative z-10">
      {/* 
        Container max-width & padding tuned for all viewports:
        - 1024px laptops (lg): max-w-4xl lg:max-w-4xl with lg:px-20 so card fits cleanly INSIDE space between Y. logo & top-right navbar menu icons.
        - 1280px+ & 1440px+ desktops (xl/2xl): expands to xl:max-w-6xl 2xl:max-w-7xl with large fonts & rich padding!
      */}
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
            // LEGAL DOCUMENT
          </span>
        </div>

        {/* Hero Title Header */}
        <div className="space-y-3 lg:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            <span>DATA PROTECTION STANDARDS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-lg font-light leading-relaxed max-w-4xl">
            Effective Date: August 17, 2026. This policy outlines how Yogeshwaran Ravishankar collects, uses, and safeguards client and visitor data across web platforms and backend services.
          </p>
        </div>

        {/* Policy Content Sections (Responsive Layout for 1024px vs 1440px+) */}
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-8 xl:p-12 2xl:p-16 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 lg:space-y-10 xl:space-y-12 text-slate-700 dark:text-slate-300 text-xs sm:text-sm lg:text-sm xl:text-base 2xl:text-lg leading-relaxed">
          
          <section className="space-y-3 lg:space-y-4">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              1. Information We Collect
            </h2>
            <p>
              When you submit a project inquiry or contact request through our web platforms, we collect personal details including your name, work email address, selected service packages, technical engineering preferences, and project scope details.
            </p>
            <p>
              Additionally, our servers automatically record standard browser telemetries such as device type, IP address, operating system, and navigation paths to maintain security and optimize performance.
            </p>
          </section>

          <section className="space-y-3 lg:space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 lg:pt-8">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 lg:pl-6 space-y-2 lg:space-y-3">
              <li>To evaluate project proposals and respond to direct client inquiries.</li>
              <li>To dispatch automated inquiry confirmation receipts and project reference IDs.</li>
              <li>To maintain technical infrastructure and protect against unauthorized or malicious network activity.</li>
              <li>To deliver technical engineering deliverables as agreed upon in project scopes.</li>
            </ul>
          </section>

          <section className="space-y-3 lg:space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 lg:pt-8">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              3. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption protocols (TLS/SSL) for all data in transit. Client data is securely processed through encrypted PostgreSQL database clusters hosted on Supabase and Render infrastructure with strict Row-Level Security (RLS) policies.
            </p>
            <p>
              We never sell, rent, or trade your personal information to third-party advertisers or data brokers.
            </p>
          </section>

          <section className="space-y-3 lg:space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 lg:pt-8">
            <h2 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              4. Your Privacy Rights & Contact
            </h2>
            <p>
              You have the right to request access to, update, or permanently delete your stored personal data at any time. For privacy inquiries or data requests, please contact directly at:
            </p>
            <div className="p-4 lg:p-5 rounded-xl lg:rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 font-mono-code text-xs sm:text-sm lg:text-sm xl:text-base text-[#0284c7] dark:text-cyan-400 font-bold">
              Email: yogeshwar11012k02@gmail.com | Phone: +91-6382755066
            </div>
          </section>

        </div>

      </div>

      <Footer onNavigate={onNavigate} activeRoute="privacy-policy" />
    </div>
  );
};
