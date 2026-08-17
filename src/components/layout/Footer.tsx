import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowRight, Github, Linkedin, Mail, Twitter, Globe, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onNavigate?: (route: string) => void;
  onScrollTop?: () => void;
  activeRoute?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollTop, activeRoute = 'home' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const FOOTER_NAV = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin HUD' }
  ];

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.children;
      gsap.fromTo(
        items,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'bounce.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const handleLinkClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(route);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (onScrollTop) {
      onScrollTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-black dark:bg-black text-white pt-24 pb-12 px-8 sm:px-16 md:px-20 lg:px-28 xl:px-36 overflow-hidden font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Upper Main Footer Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Brand Title & Social Media */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none -ml-2 sm:-ml-2.5">
              Yogesh.
            </h2>
            <p className="text-slate-400 text-sm font-light pt-2">
              Follow me on Social Media:
            </p>

            {/* Social Links Row */}
            <div className="flex items-center gap-6 text-white text-sm font-bold pt-2">
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors font-mono-code cursor-pointer"
                title="Behance"
              >
                Bē
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors cursor-pointer"
                title="Dribbble"
              >
                <Globe className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors cursor-pointer"
                title="Twitter"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://github.com/YogesWaran108"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yogeshwaran-ravishankar-300414233/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Middle Column: Primary Navigation Links */}
          <div className="lg:col-span-4 lg:-ml-2 xl:-ml-4">
            <ul className="space-y-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {FOOTER_NAV.map((link) => {
                const isActive = activeRoute === link.id;
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => handleLinkClick(link.id)}
                      className={`transition-colors cursor-pointer text-left block ${
                        isActive
                          ? 'text-blue-500 font-bold'
                          : 'text-white hover:text-blue-400 font-bold'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Legal Links */}
          <div className="lg:col-span-3 space-y-4 text-sm text-slate-400 font-normal pt-1">
            <button
              type="button"
              onClick={() => handleLinkClick('privacy-policy')}
              className="block hover:text-white transition-colors cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('terms-conditions')}
              className="block hover:text-white transition-colors cursor-pointer text-left"
            >
              Terms and conditions
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('cookie-policy')}
              className="block hover:text-white transition-colors cursor-pointer text-left"
            >
              Cookie Policy
            </button>
          </div>
        </div>

        {/* Bottom Centered Copyright Line (Redirects to Admin Page View) */}
        <div className="pt-8 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={() => handleLinkClick('admin')}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer font-light hover:underline"
            title="Admin Portal Access"
          >
            © Copyright 2026 - Yogeshwaran Ravishankar. All Rights Reserved.
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
