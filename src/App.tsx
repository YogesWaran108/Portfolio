import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Navbar } from './components/layout/Navbar';
import { NavigationOverlay } from './components/layout/NavigationOverlay';
import { SideLabels } from './components/layout/SideLabels';
import { CustomCursor } from './components/ui/CustomCursor';
import { ThemeMode } from './components/ui/ThemeSwitcher';
import { DeviceMode } from './components/ui/DeviceFrameSwitcher';

// Import modular Page Views from src/pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

gsap.registerPlugin(ScrollTrigger, Flip);

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [customCursor, setCustomCursor] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | 'services' | 'contact' | 'admin'>('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  // Theme State: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    return saved || 'system';
  });

  // Sync active theme with document root & system OS preference
  useEffect(() => {
    localStorage.setItem('theme-mode', theme);
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    if (theme === 'dark') {
      applyTheme(true);
    } else if (theme === 'light') {
      applyTheme(false);
    } else {
      // System mode: Query Mac / Windows / Browser OS setting
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    }
  }, [theme]);

  // Initialize GSAP Fluid Smooth Scroll via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  // Pause / Resume Lenis when menu overlay is opened/closed
  useEffect(() => {
    if (!lenisInstance) return;
    if (isMenuOpen) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }, [isMenuOpen, lenisInstance]);

  // Scroll to top and refresh ScrollTrigger on page navigation for all current & future pages
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentPage, lenisInstance]);

  // Web Audio click synthesizer on interactive clicks if not muted
  useEffect(() => {
    const playClickSound = () => {
      if (isMuted) return;
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } catch (e) {
        // AudioContext fallback
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        playClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isMuted]);

  // IntersectionObserver to auto-update active section label on single-page scroll (without modifying URL hash)
  useEffect(() => {
    if (currentPage !== 'home') return;
    const sectionIds = ['hero', 'about', 'services', 'portfolio', 'stack', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.25 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentPage]);

  // Handle URL Pathname sync on initial load and browser navigation
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();

      if (pathname === 'portfolio') {
        setCurrentPage('portfolio');
        setActiveSection('portfolio');
      } else if (pathname === 'services') {
        setCurrentPage('services');
        setActiveSection('services');
      } else if (pathname === 'contact') {
        setCurrentPage('contact');
        setActiveSection('contact');
      } else {
        setCurrentPage('home');
        setActiveSection('hero');
      }

      // If any trailing hash exists in URL, strip it silently
      if (window.location.hash) {
        const cleanPath = window.location.pathname || '/';
        window.history.replaceState(null, '', cleanPath);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    syncRouteFromUrl();

    window.addEventListener('popstate', syncRouteFromUrl);

    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
    };
  }, []);

  // Dynamic Navigation & Clean URL Path Redirection Handler
  const handleNavigate = (pageOrSection: string, selectedService?: string) => {
    setIsMenuOpen(false);

    if (selectedService) {
      setPreselectedService(selectedService);
    }

    if (lenisInstance) {
      lenisInstance.start();
    }
    document.body.style.overflow = 'auto';

    const normalized = pageOrSection.toLowerCase();

    if (normalized === 'portfolio') {
      setCurrentPage('portfolio');
      setActiveSection('portfolio');
      window.history.pushState(null, '', '/portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (normalized === 'services') {
      setCurrentPage('services');
      setActiveSection('services');
      window.history.pushState(null, '', '/services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (normalized === 'contact' || normalized === 'newsletter') {
      setCurrentPage('contact');
      setActiveSection('contact');
      window.history.pushState(null, '', '/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (normalized === 'admin' || normalized === 'inquiries') {
      setCurrentPage('admin');
      setActiveSection('admin');
      window.history.pushState(null, '', '/admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (normalized === 'hero' || normalized === 'homepage' || normalized === 'home') {
      setCurrentPage('home');
      setActiveSection('hero');
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        window.history.pushState(null, '', '/');
      }
      
      setActiveSection(normalized);

      setTimeout(() => {
        const element = document.getElementById(normalized);
        if (element) {
          if (lenisInstance) {
            lenisInstance.scrollTo(element, { offset: -20, duration: 1.0 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  const handleScrollTop = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper for device frame sizing
  const getDeviceFrameClass = () => {
    switch (deviceMode) {
      case 'laptop':
        return 'max-w-5xl mx-auto border-x border-slate-300 dark:border-white/15 shadow-2xl my-4 rounded-xl overflow-hidden device-mode-laptop';
      case 'tablet':
        return 'max-w-3xl mx-auto border-x border-slate-300 dark:border-white/15 shadow-2xl my-4 rounded-xl overflow-hidden device-mode-tablet';
      case 'mobile':
        return 'max-w-sm mx-auto border-x border-slate-300 dark:border-white/15 shadow-2xl my-4 rounded-2xl overflow-hidden device-mode-mobile';
      case 'desktop':
      default:
        return 'w-full device-mode-desktop';
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white transition-colors duration-300 selection:bg-blue-600 selection:text-white font-sans">
      {/* Custom Physics Follower Cursor */}
      <CustomCursor enabled={customCursor} />

      {/* Side Progress & Back-to-Top / Active Page Labels */}
      <SideLabels onScrollTop={handleScrollTop} activeSection={currentPage === 'home' ? activeSection : currentPage} />

      {/* FIXED TOP CONTAINER: MAIN NAVBAR */}
      <div className="fixed top-7 sm:top-10 md:top-12 left-0 right-0 z-[110] w-full pointer-events-none">
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          customCursor={customCursor}
          setCustomCursor={setCustomCursor}
          theme={theme}
          onThemeChange={setTheme}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Full Screen Navigation Menu Overlay */}
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        activeSection={currentPage === 'home' ? activeSection : currentPage}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        customCursor={customCursor}
        setCustomCursor={setCustomCursor}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Standalone Multi-Page Route Views */}
      <main
        id="app-main-frame"
        className={`bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-[max-width,width] duration-300 ease-in-out ${getDeviceFrameClass()}`}
      >
        {currentPage === 'portfolio' ? (
          <PortfolioPage onNavigate={handleNavigate} />
        ) : currentPage === 'services' ? (
          <ServicesPage onNavigate={handleNavigate} />
        ) : currentPage === 'contact' ? (
          <ContactPage onNavigate={handleNavigate} initialService={preselectedService} />
        ) : currentPage === 'admin' ? (
          <AdminDashboard onBackToSite={() => handleNavigate('home')} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}

export default App;
