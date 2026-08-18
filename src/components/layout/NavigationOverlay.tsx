import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Sun, Moon, Monitor, Volume2, VolumeX, MousePointer } from 'lucide-react';
import { ThemeMode } from '../ui/ThemeSwitcher';
import { MenuSinglePolygon } from '../ui/MenuSinglePolygon';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isMuted?: boolean;
  setIsMuted?: (muted: boolean) => void;
  customCursor?: boolean;
  setCustomCursor?: (cursor: boolean) => void;
  theme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' }
];

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({
  isOpen,
  onClose,
  onNavigate,
  activeSection,
  isMuted = false,
  setIsMuted,
  customCursor = true,
  setCustomCursor,
  theme = 'system',
  onThemeChange
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Kill any active timeline to make enter/exit completely interruptible on fast clicks
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const overlay = overlayRef.current;
    const navLinks = linksRef.current ? Array.from(linksRef.current.children) : [];

    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timelineRef.current = tl;

      tl.set(overlay, { pointerEvents: 'auto', display: 'flex', opacity: 1 })
        .fromTo(overlay, { yPercent: -100 }, { yPercent: 0, duration: 0.45 })
        .fromTo(
          navLinks,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.07 },
          '-=0.2'
        );
    } else {
      document.body.style.overflow = 'auto';

      const tl = gsap.timeline({
        defaults: { ease: 'power3.in' },
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'none', display: 'none' });
        }
      });
      timelineRef.current = tl;

      tl.to(navLinks, { y: -20, opacity: 0, duration: 0.2, stagger: 0.03 })
        .to(overlay, { yPercent: -100, duration: 0.35 }, '-=0.1');
    }
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-slate-50/98 dark:bg-[#060a14]/98 backdrop-blur-2xl text-slate-900 dark:text-white flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-20 sm:pt-24 pb-8 overflow-y-auto pointer-events-none hidden"
    >
      {/* Interactive 3D Single Polygon Background (Follows Mouse Cursor) */}
      <MenuSinglePolygon className="opacity-60 dark:opacity-70 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 sm:mt-10 mb-auto pt-2">
        {/* Left Side: Navigation Links (Shifted to the right) */}
        <div className="lg:col-span-7 flex flex-col justify-center pl-0 sm:pl-8 lg:pl-16 xl:pl-24">
          <p className="text-xs font-mono-code tracking-widest text-cyan-400 uppercase mb-3 sm:mb-5 font-bold">
            // NAVIGATION MENU
          </p>

          <nav ref={linksRef} className="flex flex-col gap-3 sm:gap-4">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeSection === item.id ||
                (item.id === 'home' && (
                  activeSection === 'home' ||
                  activeSection === 'hero' ||
                  activeSection === 'about' ||
                  activeSection === 'stack' ||
                  activeSection === 'homepage' ||
                  !activeSection
                ));
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className="group flex items-center gap-4 text-left focus:outline-none py-1 cursor-pointer"
                >
                  {isActive && (
                    <span className="w-2 h-7 sm:h-9 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.9)] shrink-0" />
                  )}
                  <span
                    className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-300 ${
                      isActive
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 translate-x-2'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-2'
                    }`}
                  >
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className={`w-6 h-6 transition-all ${
                      isActive
                        ? 'text-cyan-500 dark:text-cyan-400 opacity-100 translate-x-0'
                        : 'text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Preferences / Settings & Quick Contact */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 pt-6 lg:pt-0 lg:pl-10 space-y-6">
          {/* Settings Section inside Menu */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-white/10 space-y-5 shadow-xl dark:shadow-none">
            <p className="text-xs font-mono-code uppercase tracking-wider text-[#1d4ed8] dark:text-cyan-400 font-bold">
              // SYSTEM PREFERENCES
            </p>

            {/* Theme Mode Toggles */}
            {onThemeChange && (
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-mono-code uppercase font-semibold">THEME MODE</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onThemeChange('light')}
                    className={`px-3 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-mono-code font-bold transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>LIGHT</span>
                  </button>
                  <button
                    onClick={() => onThemeChange('dark')}
                    className={`px-3 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-mono-code font-bold transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>DARK</span>
                  </button>
                  <button
                    onClick={() => onThemeChange('system')}
                    className={`px-3 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-mono-code font-bold transition-all cursor-pointer ${
                      theme === 'system'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>AUTO</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sound & Cursor Toggles */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
              {setIsMuted && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-xl flex items-center justify-between text-xs font-mono-code font-bold border transition-all cursor-pointer ${
                    !isMuted
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400'
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>SOUND FX</span>
                  {!isMuted ? <Volume2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
              )}

              {setCustomCursor && (
                <button
                  onClick={() => setCustomCursor(!customCursor)}
                  className={`p-3 rounded-xl flex items-center justify-between text-xs font-mono-code font-bold border transition-all cursor-pointer ${
                    customCursor
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400'
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>CURSOR</span>
                  <MousePointer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </button>
              )}
            </div>
          </div>

          {/* Direct Inquiries & Socials */}
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-[#1d4ed8] dark:text-cyan-400 mb-1.5 font-bold">
                // DIRECT INQUIRIES
              </p>
              <a
                href="mailto:yogeshwar11012k02@gmail.com"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-2.5"
              >
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>yogeshwar11012k02@gmail.com</span>
              </a>
            </div>

            <div>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-[#1d4ed8] dark:text-cyan-400 mb-1.5 font-bold">
                // LOCATION
              </p>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono-code font-medium">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Erode, Tamil Nadu, India / Remote</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-[#1d4ed8] dark:text-cyan-400 mb-2.5 font-bold">
                // CONNECT
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/YogesWaran108"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-none"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yogeshwaran-ravishankar-300414233/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-none"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono-code text-slate-600 dark:text-slate-400 font-medium">
            <p>© 2026 YOGESHWARAN RAVISHANKAR</p>
          </div>
        </div>
      </div>
    </div>
  );
};
