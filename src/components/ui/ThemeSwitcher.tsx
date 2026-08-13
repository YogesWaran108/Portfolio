import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeSwitcherProps {
  theme: ThemeMode;
  onThemeChange: (newTheme: ThemeMode) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-blue-400" /> },
    { mode: 'system', label: 'System', icon: <Laptop className="w-4 h-4 text-slate-400" /> }
  ];

  const currentOption = options.find((o) => o.mode === theme) || options[1];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs font-mono-code transition-all duration-200 shadow-sm"
        title="Change Theme Mode"
      >
        {currentOption.icon}
        <span className="capitalize font-semibold hidden sm:inline">{theme}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1 bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl border border-slate-200 dark:border-white/15 z-50 text-xs font-mono-code overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.mode}
              onClick={() => {
                onThemeChange(opt.mode);
                setIsOpen(false);
              }}
              className={`w-full px-3.5 py-2 flex items-center justify-between text-left transition-colors ${
                theme === opt.mode
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              {theme === opt.mode && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
