import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Monitor, Laptop, Tablet, Smartphone } from 'lucide-react';

gsap.registerPlugin(Flip);

export type DeviceMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

interface DeviceFrameSwitcherProps {
  activeMode: DeviceMode;
  onModeChange: (mode: DeviceMode) => void;
}

export const DeviceFrameSwitcher: React.FC<DeviceFrameSwitcherProps> = ({
  activeMode,
  onModeChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwitch = (newMode: DeviceMode) => {
    if (newMode === activeMode) return;

    // Get GSAP Flip state for smooth layout morph
    const mainWrapper = document.getElementById('app-main-frame');
    if (mainWrapper) {
      const state = Flip.getState(mainWrapper);
      onModeChange(newMode);

      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.6,
          ease: 'power3.inOut',
          absolute: false
        });
      });
    } else {
      onModeChange(newMode);
    }
  };

  const devices: { mode: DeviceMode; size: string; icon: React.ReactNode }[] = [
    {
      mode: 'desktop',
      size: '>16"',
      icon: <Monitor className="w-3.5 h-3.5" />
    },
    {
      mode: 'laptop',
      size: '16"-13"',
      icon: <Laptop className="w-3.5 h-3.5" />
    },
    {
      mode: 'tablet',
      size: '12"-9"',
      icon: <Tablet className="w-3.5 h-3.5" />
    },
    {
      mode: 'mobile',
      size: '9"-6"',
      icon: <Smartphone className="w-3.5 h-3.5" />
    }
  ];

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center gap-1 bg-slate-200/90 dark:bg-[#080d1a]/95 backdrop-blur-md p-1 rounded-full border border-slate-300 dark:border-white/15 shadow-md text-xs font-mono-code z-40 transition-colors duration-300"
    >
      <span className="px-2 text-[10px] text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-semibold border-r border-slate-300 dark:border-white/10 flex items-center gap-1">
        VIEWPORT
      </span>

      {devices.map((d) => {
        const isActive = activeMode === d.mode;
        return (
          <button
            key={d.mode}
            onClick={() => handleSwitch(d.mode)}
            title={`Viewport ${d.size}`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 focus:outline-none ${
              isActive
                ? 'bg-[#2563eb] text-white font-bold shadow-md shadow-blue-500/30 scale-105'
                : 'text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-white/10'
            }`}
          >
            {d.icon}
            <span className="text-[10px] font-bold font-mono-code">{d.size}</span>
          </button>
        );
      })}
    </div>
  );
};
