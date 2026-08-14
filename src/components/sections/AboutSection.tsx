import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { METRICS, PROCESS_STEPS, WORK_EXPERIENCE, EDUCATION_DATA, USER_INFO } from '../../data/portfolioData';
import { CheckCircle2, ArrowRight, Award, Briefcase, GraduationCap, Globe2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-slate-50 dark:bg-[#0b1329] text-slate-900 dark:text-white py-16 sm:py-24 px-6 sm:px-12 md:px-16 overflow-hidden border-b border-slate-200 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600" />
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
            // ABOUT ME & EXPERIENCE
          </span>
        </div>

        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column: Heading & Paragraphs */}
          <div className="lg:col-span-7 space-y-5">
            <h2
              ref={titleRef}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] text-slate-900 dark:text-white"
            >
              Yogeshwaran Ravishankar.{' '}
              <span className="font-normal italic text-slate-600 dark:text-neutral-300 block mt-1 text-2xl sm:text-3xl">
                Engineering scalable web applications with React, Redux & TypeScript.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 dark:text-neutral-300 leading-relaxed font-normal">
              {USER_INFO.aboutMe}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm text-slate-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] dark:text-cyan-400 shrink-0" />
                <span>React.js & Redux State Architecture</span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm text-slate-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] dark:text-cyan-400 shrink-0" />
                <span>TypeScript Type Safety & Clean Code</span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm text-slate-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] dark:text-cyan-400 shrink-0" />
                <span>RESTful API Integration & Performance</span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm text-slate-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] dark:text-cyan-400 shrink-0" />
                <span>Cross-Functional Team Collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
                alt="Workspace and Frontend Development Studio"
                className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[11px] font-mono-code uppercase tracking-widest text-cyan-400 mb-1 font-bold">
                  ERODE, TAMIL NADU // INDIA
                </p>
                <p className="text-sm sm:text-base font-semibold font-display">
                  "Writing clean, maintainable code to power high-traffic applications."
                </p>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white dark:bg-[#080d1a] text-slate-900 dark:text-white p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-[#3b82f6]/40 max-w-[220px]">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#0284c7] dark:text-cyan-400 font-extrabold">
                  2.5+ YEARS EXP
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-tight">
                Proven track record in Sculpxtech Labs & Accenture.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Counter Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 bg-white/90 dark:bg-[#0b1329]/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none mb-20">
          {METRICS.map((metric, i) => (
            <div key={i} className="metric-item space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white flex items-baseline">
                <span>{metric.value}</span>
                <span className="text-[#0284c7] dark:text-cyan-400 ml-0.5 font-black">{metric.suffix}</span>
              </div>
              <p className="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200">{metric.label}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{metric.subtext}</p>
            </div>
          ))}
        </div>

        {/* Work Experience Timeline Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
                  // CAREER TIMELINE
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Work Experience.
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-extrabold">
              <Briefcase className="w-4 h-4 text-[#0284c7] dark:text-cyan-400" />
              <span>2.5+ YEARS EXPERIENCE</span>
            </div>
          </div>

          {/* Vertical Timeline Thread Container */}
          <div className="relative border-l-2 border-cyan-500/40 dark:border-blue-500/20 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-8">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-white dark:bg-[#080d1a] border-2 border-[#0284c7] dark:border-cyan-400 group-hover:bg-[#0284c7] dark:group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_12px_rgba(2,132,199,0.5)] dark:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                <div className="exp-card relative overflow-hidden bg-white dark:bg-[#0b1329] p-7 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500 transition-all duration-500 ease-out shadow-xl dark:shadow-none hover:shadow-2xl hover:-translate-y-1">
                  {/* Top Glowing Gradient Line sweep animation on hover */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 transition-all duration-500 ease-out group-hover:w-full" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 font-bold uppercase tracking-wider">
                          {exp.period}
                        </span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors">
                        {exp.role} <span className="text-[#0284c7] dark:text-cyan-400 font-extrabold">@ {exp.company}</span>
                      </h4>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] dark:bg-cyan-400 shadow-[0_0_8px_rgba(2,132,199,0.6)] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Languages Cyber Tech Credential Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {/* Education Credential Card */}
          <div className="md:col-span-7 relative overflow-hidden bg-white dark:bg-[#0b1329] p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500 transition-all duration-500 ease-out shadow-xl dark:shadow-none hover:-translate-y-1 group flex flex-col justify-between">
            {/* Top Glowing Gradient Line sweep animation on hover */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 transition-all duration-500 ease-out group-hover:w-full" />
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 font-bold uppercase tracking-widest">
                      // ACADEMIC CREDENTIAL
                    </span>
                    <h4 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors">
                      {EDUCATION_DATA.institution}
                    </h4>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 font-bold uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] dark:text-cyan-400" />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Degree Title & Specialization Tags */}
              <div className="mb-6">
                <p className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0284c7] dark:text-blue-400" />
                  <span>{EDUCATION_DATA.degree}</span>
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Data Structures', 'Web Engineering', 'Software Architecture', 'Database Systems'].map((subject, sIdx) => (
                    <span key={sIdx} className="text-[11px] font-mono-code text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md group-hover:border-cyan-400 transition-colors">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Integrated CGPA Score Bar */}
            <div className="pt-5 border-t border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">ACADEMIC PERFORMANCE</span>
                <span className="text-[#0284c7] dark:text-cyan-400 font-extrabold text-sm">CGPA {EDUCATION_DATA.cgpa} / 10.0</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
                <div className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 rounded-full w-[76.6%] transition-all duration-700" />
              </div>
            </div>
          </div>

          {/* Spoken Languages Terminal Matrix Card */}
          <div className="md:col-span-5 relative overflow-hidden bg-white dark:bg-[#0b1329] text-slate-900 dark:text-white p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500 transition-all duration-500 ease-out shadow-xl dark:shadow-none hover:-translate-y-1 group flex flex-col justify-between">
            {/* Top Glowing Gradient Line sweep animation on hover */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 transition-all duration-500 ease-out group-hover:w-full" />
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-13 h-13 rounded-xl bg-cyan-50 dark:bg-blue-500/10 border border-cyan-200 dark:border-blue-500/30 group-hover:bg-cyan-100 dark:group-hover:bg-blue-500/20 transition-all duration-300 flex items-center justify-center text-[#0284c7] dark:text-blue-400 group-hover:text-cyan-500 shrink-0">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 font-bold uppercase tracking-widest">
                    // SPOKEN LANGUAGES
                  </span>
                  <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors">
                    Global Fluency
                  </h4>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-cyan-400 transition-colors space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm font-mono-code">TAMIL</span>
                    <span className="font-mono-code text-[#0284c7] dark:text-cyan-400 text-[11px] font-bold border border-cyan-200 dark:border-cyan-500/30 px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50">NATIVE</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-1.5 flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-cyan-400 transition-colors space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm font-mono-code">ENGLISH</span>
                    <span className="font-mono-code text-[#0284c7] dark:text-blue-400 text-[11px] font-bold border border-cyan-200 dark:border-blue-500/30 px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-blue-950/50">PROFESSIONAL</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1.5 flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                    ))}
                    <div className="h-1.5 flex-1 bg-slate-200 dark:bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono-code text-slate-500 dark:text-slate-400">
              <span className="uppercase tracking-wider">Communication Mode</span>
              <span className="text-[#0284c7] dark:text-cyan-400 font-bold">100% REMOTE READY</span>
            </div>
          </div>
        </div>

        {/* Process Steps Section */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-blue-400 font-bold">
                  // HOW I WORK
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Execution Framework.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative overflow-hidden bg-white dark:bg-[#0b1329] p-7 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500 transition-all duration-500 ease-out shadow-xl dark:shadow-none hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between"
              >
                {/* Top Glowing Gradient Line sweep animation on hover */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 transition-all duration-500 ease-out group-hover:w-full" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 group-hover:scale-105 transition-all duration-300">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-blue-600/10 border border-cyan-200 dark:border-blue-500/20 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 flex items-center justify-center text-[#0284c7] dark:text-blue-400 group-hover:rotate-[-45deg] shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
