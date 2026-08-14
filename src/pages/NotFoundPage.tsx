import React from 'react';
import { Home, AlertTriangle, ArrowLeft, Terminal } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#060a14] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans pt-24 pb-16">
      {/* Background Neon Grid & Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(2,132,199,0.2),transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* Large 404 Visual Header */}
        <div className="relative inline-block">
          <h1 className="font-display text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 select-none">
            404
          </h1>
          <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-mono-code font-bold uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>PATH_NOT_FOUND</span>
          </div>
        </div>

        {/* Narrative Message */}
        <div className="space-y-3 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>// ERROR: UNRECOGNIZED SYSTEM ROUTE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Lost in the Cyber Matrix?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            The requested page coordinate does not exist or has been relocated within the grid system.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-extrabold text-xs font-mono-code uppercase tracking-widest hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
          >
            <Home className="w-4 h-4 text-white" />
            <span>RETURN TO HOMEPAGE</span>
          </button>
          
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs font-mono-code uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>REPORT ISSUES</span>
          </button>
        </div>
      </div>
    </div>
  );
};
