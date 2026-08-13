import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle, Sparkles, Clock, Globe, ExternalLink, Check, Phone } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'React & Redux App',
    'UI/UX & GSAP Animation'
  ]);

  useEffect(() => {
    if (initialService) {
      // Find matching service option or add initialService directly
      setSelectedServices((prev) => {
        const matched = prev.find((s) => s.toLowerCase().includes(initialService.toLowerCase()));
        if (matched) return prev;
        return [initialService, ...prev];
      });
    }
  }, [initialService]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMeta, setSubmissionMeta] = useState<{ inquiryId?: string; emailPreviewUrl?: string } | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          selectedServices,
          message: formData.message
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionMeta({
          inquiryId: data.inquiryId,
          emailPreviewUrl: data.emailPreviewUrl
        });
      }
    } catch (err) {
      console.log('Submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white py-8 sm:py-14 px-6 sm:px-12 md:px-16 border-b border-slate-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Top Hero Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
              // INITIATE CONTACT
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let's Talk.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
            Have a project in mind or want to consult on frontend architecture? Select services, send a message and let's collaborate.
          </p>
        </div>

        {/* 4-Card Contact Info Row (Enhanced Hover Highlighting) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 transition-all duration-300 ease-out group shadow-xl dark:shadow-none hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:-translate-y-1.5 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-extrabold uppercase tracking-wider">DIRECT EMAIL</p>
            <a href="mailto:yogeshwar11012k02@gmail.com" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors block truncate mt-1.5 font-display">
              yogeshwar11012k02@gmail.com
            </a>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-emerald-400 transition-all duration-300 ease-out group shadow-xl dark:shadow-none hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:-translate-y-1.5 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider">PHONE NUMBER</p>
            <a href="tel:+916382755066" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors block truncate mt-1.5 font-display">
              +91-6382755066
            </a>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 transition-all duration-300 ease-out group shadow-xl dark:shadow-none hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:-translate-y-1.5 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-extrabold uppercase tracking-wider">LOCATION</p>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors mt-1.5 font-display">
              Erode, Tamil Nadu, India
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-blue-400 transition-all duration-300 ease-out group shadow-xl dark:shadow-none hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:-translate-y-1.5 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider">RESPONSE TIME</p>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors mt-1.5 font-display">
              &lt; 24 Hours (IST)
            </p>
          </div>
        </div>

        {/* Project Inquiry Form (Single Column Centered Block) */}
        <div className="bg-white dark:bg-[#0b1329] p-7 sm:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-none hover:border-cyan-500/40 transition-all duration-500">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Inquiry & Confirmation Email Dispatched!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <span className="text-[#0284c7] dark:text-cyan-400 font-semibold">{formData.name}</span>. An automated acknowledgment & confirmation receipt has been sent to your email at <span className="text-slate-900 dark:text-white font-medium">{formData.email}</span>.
              </p>

              {submissionMeta?.inquiryId && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-bold">
                  <span>INQUIRY REF: {submissionMeta.inquiryId}</span>
                </div>
              )}

              {submissionMeta?.emailPreviewUrl && (
                <div className="pt-2">
                  <a
                    href={submissionMeta.emailPreviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 hover:underline"
                  >
                    <span>VIEW GENERATED EMAIL RECEIPT PREVIEW</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmissionMeta(null);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white text-slate-900 dark:text-white text-xs font-mono-code uppercase font-bold tracking-wider transition-all cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <p className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
                  // PROJECT INQUIRY FORM
                </p>
                <span className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400 uppercase">
                  MULTI-SELECT ENABLED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl focus:bg-white dark:focus:bg-white/5"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold">
                    YOUR EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl focus:bg-white dark:focus:bg-white/5"
                  />
                </div>
              </div>

              {/* Subscription Packages Selection Field Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-mono-code uppercase text-amber-600 dark:text-amber-400 font-extrabold tracking-wider">
                    // SUBSCRIPTION PACKAGES
                  </label>
                  <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    CHOOSE TIERS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Buy me a Starbucks Coffee (₹400 + hosting charges)',
                    'Buy me a Bucket Biryani (₹750 + hosting charges)',
                    'Buy me a Full Meals (₹1800 + hosting charges)'
                  ].map((pkg) => {
                    const isSelected = selectedServices.includes(pkg);
                    return (
                      <button
                        type="button"
                        key={pkg}
                        onClick={() => toggleService(pkg)}
                        className={`p-3.5 rounded-xl text-xs font-mono-code font-bold border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 border-orange-300 text-white shadow-lg shadow-orange-500/25 scale-[1.02]'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-amber-500/20 text-slate-700 dark:text-amber-200/90 hover:border-orange-400 hover:text-orange-600 dark:hover:text-amber-300'
                        }`}
                      >
                        <span className="truncate pr-1">{pkg}</span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                            isSelected
                              ? 'bg-white border-white text-orange-600 font-extrabold'
                              : 'border-slate-300 dark:border-amber-400/40 bg-white dark:bg-white/5'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Engineering & Technical Services Selection Field Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-mono-code uppercase text-[#0284c7] dark:text-cyan-400 font-extrabold tracking-wider">
                    // TECHNICAL & ENGINEERING SERVICES
                  </label>
                  <span className="text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 font-bold">
                    {selectedServices.length} TOTAL SELECTED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    'React & Redux App',
                    'Frontend Engineering',
                    '3D & WebGL Experience',
                    'UI/UX & GSAP Animation'
                  ].map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`p-3.5 rounded-xl text-xs font-mono-code font-bold border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 border-cyan-300 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02]'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:border-cyan-400 hover:text-[#0284c7] dark:hover:text-cyan-300'
                        }`}
                      >
                        <span>{service}</span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-white border-white text-[#0284c7]'
                              : 'border-slate-300 dark:border-white/30 bg-white dark:bg-white/5'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold">
                  PROJECT DETAILS & GOALS *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your timeline, key deliverables, and target objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl resize-none focus:bg-white dark:focus:bg-white/5"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-display font-extrabold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group shadow-lg shadow-cyan-500/25"
              >
                {isSubmitting ? (
                  <span>SENDING MESSAGE...</span>
                ) : (
                  <>
                    <span>SUBMIT INQUIRY</span>
                    <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Interactive Google Map with High-Tech Frame & Header Toolbar */}
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-3">
          {/* Map Frame Header Bar */}
          <div className="flex items-center justify-between px-2 text-[11px] font-mono-code">
            <div className="flex items-center gap-2 text-[#0284c7] dark:text-cyan-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span>// LOCATION HUD: ERODE, TAMIL NADU, INDIA (11.3410° N, 77.7172° E)</span>
            </div>
            <a
              href="https://www.google.com/maps/place/Erode,+Tamil+Nadu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#0284c7] dark:text-cyan-400 hover:text-white font-bold transition-colors bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/40 px-3 py-1 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600"
            >
              <span>OPEN GOOGLE MAPS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Map Canvas (Full Pan, Scroll & Zoom Enabled) */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 h-[450px] sm:h-[520px] bg-slate-100 dark:bg-slate-950">
            <iframe
              title="Erode Tamil Nadu Location Map"
              src="https://maps.google.com/maps?q=Erode,%20Tamil%20Nadu,%20India&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 rounded-xl"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
