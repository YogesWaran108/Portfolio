import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, FileText, Globe } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
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
            // LEGAL DOCUMENT
          </span>
        </div>

        {/* Hero Title Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DATA PROTECTION STANDARDS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Effective Date: August 17, 2026. This policy outlines how Yogeshwaran Ravishankar collects, uses, and safeguards client and visitor data across web platforms and backend services.
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-white dark:bg-[#0b1329] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              1. Information We Collect
            </h2>
            <p>
              When you submit a project inquiry or contact request through our web platforms, we collect personal details including your name, work email address, selected service packages, technical engineering preferences, and project scope details.
            </p>
            <p>
              Additionally, our servers automatically record standard browser telemetries such as device type, IP address, operating system, and navigation paths to maintain security and optimize performance.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To evaluate project proposals and respond to direct client inquiries.</li>
              <li>To dispatch automated inquiry confirmation receipts and project reference IDs.</li>
              <li>To maintain technical infrastructure and protect against unauthorized or malicious network activity.</li>
              <li>To deliver technical engineering deliverables as agreed upon in project scopes.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              3. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard encryption protocols (TLS/SSL) for all data in transit. Client data is securely processed through encrypted PostgreSQL database clusters hosted on Supabase and Render infrastructure with strict Row-Level Security (RLS) policies.
            </p>
            <p>
              We never sell, rent, or trade your personal information to third-party advertisers or data brokers.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-6">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              4. Your Privacy Rights & Contact
            </h2>
            <p>
              You have the right to request access to, update, or permanently delete your stored personal data at any time. For privacy inquiries or data requests, please contact directly at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 font-mono-code text-xs text-[#0284c7] dark:text-cyan-400">
              Email: yogeshwar11012k02@gmail.com | Phone: +91-6382755066
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
