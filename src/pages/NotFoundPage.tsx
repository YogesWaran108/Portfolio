import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white flex items-center justify-center p-6 relative overflow-hidden font-sans pt-24 pb-16 transition-colors duration-300 select-none">
      
      {/* Dynamic CSS Keyframe Glitch Animations */}
      <style>{`
        @keyframes glitch-slice {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(-4px, -2px);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(4px, 2px);
          }
          40% {
            clip-path: inset(10% 0 85% 0);
            transform: translate(-3px, 3px);
          }
          60% {
            clip-path: inset(65% 0 20% 0);
            transform: translate(3px, -2px);
          }
          80% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(-2px, 1px);
          }
          100% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(0);
          }
        }

        @keyframes glitch-subtle-shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(2px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, -2px); }
          60% { transform: translate(2px, 1px); }
          70% { transform: translate(-2px, -1px); }
          80% { transform: translate(1px, 2px); }
          90% { transform: translate(-1px, 1px); }
        }

        .glitch-404-container {
          position: relative;
          display: inline-block;
          animation: glitch-subtle-shake 4s infinite ease-in-out;
        }

        .glitch-404-text {
          position: relative;
          color: currentColor;
          font-weight: 900;
        }

        .glitch-404-text::before,
        .glitch-404-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-404-text::before {
          left: 3px;
          text-shadow: -2px 0 #0284c7;
          animation: glitch-slice 2.5s infinite linear alternate-reverse;
          opacity: 0.85;
        }

        .glitch-404-text::after {
          left: -3px;
          text-shadow: 2px 0 #06b6d4;
          animation: glitch-slice 3.2s infinite linear alternate;
          opacity: 0.85;
        }
      `}</style>

      {/* Background Neon Grid Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(2,132,199,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
        
        {/* Ashley-Style 404 Glitch Title */}
        <div className="glitch-404-container my-4">
          <h1
            data-text="404"
            className="glitch-404-text font-display text-[120px] sm:text-[180px] md:text-[220px] leading-none tracking-tight text-slate-900 dark:text-white"
          >
            404
          </h1>
        </div>

        {/* Narrative Ashley Text Subtitle */}
        <div className="space-y-3 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>// PAGE NOT FOUND</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Oops! Something went wrong : (
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Ashley Template Pill Button: BACK TO HOMEPAGE -> */}
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-extrabold text-xs sm:text-sm font-mono-code uppercase tracking-widest transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 cursor-pointer border border-cyan-400/30"
          >
            <span>BACK TO HOMEPAGE</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1 shadow-inner">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
