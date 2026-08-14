import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, CheckCircle2, Award, Laptop, Smartphone, Sparkles, Layers } from 'lucide-react';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn cursor-pointer"
      data-lenis-prevent
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0d1322] text-white border border-white/15 rounded-3xl max-w-4xl w-full my-4 sm:my-8 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] cursor-default"
        data-lenis-prevent
      >
        {/* Modal Top Navigation Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#060a14] shrink-0 rounded-t-3xl z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-code px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 uppercase font-bold">
              {project.category}
            </span>
            <span className="text-xs font-mono-code text-neutral-400 font-medium hidden sm:inline">
              {project.year} // {project.client}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Preview Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 px-3 rounded-full text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer ${
                  deviceView === 'desktop' ? 'bg-blue-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 px-3 rounded-full text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer ${
                  deviceView === 'mobile' ? 'bg-blue-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="group p-2 rounded-full bg-transparent hover:bg-transparent text-white hover:text-red-400 transition-all cursor-pointer focus:outline-none translate-x-2"
              title="Close Case Study"
            >
              <X className="w-5.5 h-5.5 transition-transform duration-300 group-hover:rotate-90 group-active:rotate-180" />
            </button>
          </div>
        </div>

        {/* Modal Body Content (Scrollable Container) */}
        <div
          data-lenis-prevent
          className="p-6 sm:p-10 flex-1 overflow-y-auto overscroll-contain modal-scrollbar space-y-10 bg-[#0f172a]"
        >
          {/* Project Title Header */}
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <p className="text-base sm:text-xl text-neutral-300 font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Device Image Showcase (Rounded Curved Corners) */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 group">
            <div className={`transition-all duration-300 mx-auto ${deviceView === 'mobile' ? 'max-w-xs py-8' : 'w-full'}`}>
              <img
                src={project.featuredImage}
                alt={project.title}
                className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono-code text-[#60a5fa]">
              Role: {project.role}
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <p className="font-display text-2xl font-extrabold text-[#3b82f6]">{metric.value}</p>
                <p className="text-xs text-neutral-300 font-mono-code uppercase mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Project Overview */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#3b82f6] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              OVERVIEW & BUSINESS IMPACT
            </h3>
            <p className="text-neutral-300 text-base leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technical Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-blue-400">
                // THE ARCHITECTURAL CHALLENGE
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-cyan-400">
                // THE ENGINEERED SOLUTION
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#3b82f6] mb-4">
              KEY DELIVERABLES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#3b82f6] mb-3">
              TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        {project.liveUrl && (
          <div className="p-4 sm:p-6 border-t border-white/10 bg-[#060a14] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 rounded-b-3xl">
            <div className="text-xs font-mono-code text-neutral-400 hidden sm:block">
              Live Webpage URL
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold text-xs font-mono-code uppercase tracking-wider transition-all shadow-lg shadow-blue-500/25 border border-blue-400/30 group"
            >
              <span>VISIT SITE</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
