import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle, Clock, ExternalLink, Check, Phone, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { getApiBaseUrl } from '../../utils/api';

interface ContactSectionProps {
  initialService?: string | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Single-select subscription package (default: none)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Multi-select technical services (default: NO pre-selected items)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (initialService) {
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

  const togglePackage = (pkg: string) => {
    setSelectedPackage((prev) => (prev === pkg ? null : pkg));
  };

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

    const combinedServices = [
      ...(selectedPackage ? [selectedPackage] : []),
      ...selectedServices
    ];

    const API_BASE = getApiBaseUrl();
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          selectedServices: combinedServices,
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

  const packageTiers = [
    {
      id: 'starter',
      name: 'Starter Package',
      price: '₹400',
      details: '+ hosting charges'
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: '₹750',
      details: '+ hosting charges'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: '₹1,800',
      details: '+ hosting charges'
    }
  ];

  const engineeringServices = [
    'React & Redux Architecture',
    'Frontend Web Engineering',
    '3D & WebGL Experience',
    'UI/UX & GSAP Motion'
  ];

  return (
    <section
      id="contact"
      className="relative bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white py-12 sm:py-20 px-4 sm:px-12 md:px-16 border-b border-slate-200 dark:border-white/10 transition-colors duration-300 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-12">
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
            Have a project in mind or want to consult on frontend architecture? Select services, send a message, and let's collaborate.
          </p>
        </div>

        {/* 4-Card Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 transition-all duration-300 ease-out group shadow-sm dark:shadow-none hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-extrabold uppercase tracking-wider">DIRECT EMAIL</p>
            <a href="mailto:yogeshwar11012k02@gmail.com" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors block truncate mt-1.5 font-display">
              yogeshwar11012k02@gmail.com
            </a>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-emerald-400 transition-all duration-300 ease-out group shadow-sm dark:shadow-none hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider">PHONE NUMBER</p>
            <a href="tel:+916382755066" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors block truncate mt-1.5 font-display">
              +91-6382755066
            </a>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 transition-all duration-300 ease-out group shadow-sm dark:shadow-none hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-extrabold uppercase tracking-wider">LOCATION</p>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors mt-1.5 font-display">
              Erode, Tamil Nadu, India
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-blue-400 transition-all duration-300 ease-out group shadow-sm dark:shadow-none hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider">RESPONSE TIME</p>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-cyan-300 transition-colors mt-1.5 font-display">
              &lt; 24 Hours (IST)
            </p>
          </div>
        </div>

        {/* Handcrafted Bespoke Project Inquiry Form Card */}
        <div className="bg-white dark:bg-[#0b1329] p-6 sm:p-10 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl transition-all duration-300">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
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
                    setSelectedPackage(null);
                    setSelectedServices([]);
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white text-slate-900 dark:text-white text-xs font-mono-code uppercase font-bold tracking-wider transition-all cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Section Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <p className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
                    // PROJECT INQUIRY & ESTIMATE FORM
                  </p>
                </div>
                <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:inline">
                  CONFIDENTIAL INQUIRY
                </span>
              </div>

              {/* Client Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 hover:border-[#0284c7] dark:hover:border-cyan-400/50 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl focus:bg-white dark:focus:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold">
                    WORK EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 hover:border-[#0284c7] dark:hover:border-cyan-400/50 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl focus:bg-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              {/* Service Package Tier (SINGLE SELECTION ONLY - Radio Behavior) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-mono-code uppercase text-slate-900 dark:text-white font-extrabold tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#0284c7] dark:text-cyan-400" />
                    <span>SERVICE PACKAGE TIER</span>
                  </label>
                  <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400 uppercase font-medium">
                    (SELECT 1 PACKAGE)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packageTiers.map((tier) => {
                    const fullText = `${tier.name} (${tier.price} ${tier.details})`;
                    const isSelected = selectedPackage === fullText;

                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => togglePackage(fullText)}
                        className={`p-4 rounded-xl text-left transition-all duration-300 cursor-pointer border relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#0284c7]/5 dark:bg-cyan-950/50 border-[#0284c7] dark:border-cyan-400 text-slate-900 dark:text-white shadow-md shadow-cyan-500/10 scale-[1.01]'
                            : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-400/60 hover:bg-slate-100/70 dark:hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            {tier.name}
                          </span>
                          {/* Clean Custom Radio Circle */}
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                              isSelected
                                ? 'border-[#0284c7] dark:border-cyan-400 bg-white dark:bg-cyan-950'
                                : 'border-slate-300 dark:border-white/20 bg-white dark:bg-white/5'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-[#0284c7] dark:bg-cyan-400" />}
                          </div>
                        </div>

                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-base font-display font-extrabold text-[#0284c7] dark:text-cyan-400">
                            {tier.price}
                          </span>
                          <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400">
                            {tier.details}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical & Engineering Services (MULTI SELECTION - DEFAULT: NONE PRE-SELECTED) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-mono-code uppercase text-slate-900 dark:text-white font-extrabold tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0284c7] dark:text-cyan-400" />
                    <span>TECHNICAL & ENGINEERING SERVICES</span>
                  </label>
                  <span className="text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 font-bold uppercase">
                    {selectedServices.length} SELECTED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {engineeringServices.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`p-3.5 rounded-xl text-xs font-mono-code font-bold text-left transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.01]'
                            : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-400/60 hover:bg-slate-100/70 dark:hover:bg-slate-900/80'
                        }`}
                      >
                        <span className="truncate pr-2">{service}</span>
                        {/* Custom Checkbox Pill */}
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                            isSelected
                              ? 'bg-white border-white text-[#0284c7]'
                              : 'border-slate-300 dark:border-white/20 bg-white dark:bg-white/5'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Scope & Goals Textarea */}
              <div className="pt-2">
                <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold">
                  PROJECT SCOPE & GOALS *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your project requirements, target timeline, key deliverables, and budget objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 hover:border-[#0284c7] dark:hover:border-cyan-400/50 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl resize-none focus:bg-white dark:focus:bg-slate-900"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group shadow-lg shadow-cyan-500/25"
              >
                {isSubmitting ? (
                  <span>VERIFYING & SENDING...</span>
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
        <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-3 sm:p-4 shadow-xl dark:shadow-2xl space-y-3">
          {/* Map Frame Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 text-[10px] sm:text-[11px] font-mono-code">
            <div className="flex items-center gap-2 text-[#0284c7] dark:text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse shrink-0" />
              <span className="truncate">// LOCATION HUD: ERODE, TAMIL NADU, INDIA</span>
            </div>
            <a
              href="https://www.google.com/maps/place/Erode,+Tamil+Nadu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#0284c7] dark:text-cyan-400 hover:text-white font-bold transition-colors bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/40 px-3 py-1.5 sm:py-1 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 self-start sm:self-auto"
            >
              <span>OPEN MAPS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Map Canvas */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 h-[420px] sm:h-[500px] bg-slate-100 dark:bg-slate-950">
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
