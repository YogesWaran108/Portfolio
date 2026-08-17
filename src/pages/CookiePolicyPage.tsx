import React from 'react';
import { Cookie, ArrowLeft, Settings, Database, CheckCircle2 } from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigate: (route: string) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => {
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
            // COOKIES & STORAGE
          </span>
        </div>

        {/* Hero Title Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <Cookie className="w-3.5 h-3.5" />
            <span>LOCAL STORAGE & COOKIES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Effective Date: August 17, 2026. Learn how we use local browser storage and minimal functional cookies to enhance site performance and save your user preferences.
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              1. What Are Cookies & Local Storage?
            </h2>
            <p>
              Cookies and local storage are small text files or key-value data stores placed on your device by your web browser. They allow websites to remember your settings and provide a seamless, personalized experience.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              2. How We Use Storage
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10">
                <p className="font-bold text-slate-900 dark:text-white mb-1">Theme Preference Storage (`theme-mode`):</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Saves your chosen color theme (Light, Dark, or System preference) across page reloads.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10">
                <p className="font-bold text-slate-900 dark:text-white mb-1">Session Authentication (`isAdminAuth`):</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Temporary session key storing authorized admin access state during active browser sessions.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              3. No Advertising or Tracking Cookies
            </h2>
            <p>
              We do NOT use third-party advertising cookies, behavioral tracking pixels, or cross-site telemetry networks. All stored data is strictly functional.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              4. Managing Your Preferences
            </h2>
            <p>
              You can clear your local storage and cookies at any time through your browser settings. Clearing storage will reset your theme preference to the system default.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 font-mono-code text-xs text-[#0284c7] dark:text-cyan-400">
              Questions: yogeshwar11012k02@gmail.com
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
