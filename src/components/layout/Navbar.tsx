import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Settings, Volume2, VolumeX, MousePointer, Sun, Moon, Monitor } from 'lucide-react';
import { ThemeMode } from '../ui/ThemeSwitcher';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  customCursor: boolean;
  setCustomCursor: (cursor: boolean) => void;
  theme: ThemeMode;
  onThemeChange: (newTheme: ThemeMode) => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  isMuted,
  setIsMuted,
  customCursor,
  setCustomCursor,
  theme,
  onThemeChange,
  onNavigate
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-transparent border-none pointer-events-none transition-colors duration-300">
      <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Minimal Left: "Y." Logo */}
        <button
          onClick={() => {
            if (isMenuOpen) setIsMenuOpen(false);
            onNavigate('hero');
          }}
          className="group flex items-center gap-2 focus:outline-none shrink-0 pl-2 sm:pl-4 md:pl-6"
          title="Yogeshwaran - Homepage"
        >
          <span className={`font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight uppercase transition-colors ${
            isMenuOpen ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'
          } group-hover:text-blue-600 dark:group-hover:text-blue-500`}>
            Y<span className="text-blue-600 font-normal">.</span>
          </span>
        </button>

        {/* Minimal Right: Settings Icon & Animated Menu / Close Toggle Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Settings Icon Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2.5 sm:p-3 rounded-full transition-all flex items-center justify-center focus:outline-none bg-transparent ${
                isSettingsOpen
                  ? 'text-blue-600 dark:text-blue-500 bg-blue-500/10'
                  : 'text-slate-800 dark:text-neutral-100 hover:bg-slate-200/50 dark:hover:bg-white/10'
              }`}
              title="Settings & Preferences"
              aria-label="Toggle Settings Menu"
            >
              <Settings className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] transition-transform duration-300 ${isSettingsOpen ? 'rotate-90 text-blue-600 dark:text-blue-500' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-60 p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/15 shadow-2xl z-50 text-xs space-y-3.5">
                <div>
                  <p className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-1.5 font-bold">
                    THEME MODE
                  </p>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                    <button
                      onClick={() => onThemeChange('light')}
                      className={`p-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                        theme === 'light'
                          ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm font-bold'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title="Light Theme"
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onThemeChange('dark')}
                      className={`p-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-sm font-bold'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title="Dark Theme"
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onThemeChange('system')}
                      className={`p-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                        theme === 'system'
                          ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm font-bold'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title="System Theme"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-white/10 pt-2 space-y-1">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-neutral-200 font-medium"
                  >
                    <span>UI Audio Effects</span>
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => setCustomCursor(!customCursor)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-neutral-200 font-medium"
                  >
                    <span>Custom Cursor</span>
                    <MousePointer className={`w-4 h-4 ${customCursor ? 'text-blue-600' : 'text-slate-400'}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 focus:outline-none bg-transparent hover:bg-transparent ${
              isMenuOpen
                ? 'text-slate-900 dark:text-white rotate-90 scale-105'
                : 'text-slate-900 dark:text-white hover:scale-105'
            }`}
            aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            title={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              <Menu
                className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] absolute inset-0 transition-all duration-300 transform ${
                  isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] absolute inset-0 transition-all duration-300 transform ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100 text-slate-900 dark:text-white' : 'opacity-0 -rotate-90 scale-50'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
