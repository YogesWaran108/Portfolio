import React, { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../../utils/api';
import {
  Inbox,
  Search,
  Filter,
  RefreshCw,
  Mail,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  Copy,
  Check,
  Package,
  Layers,
  ArrowLeft,
  X,
  Send,
  Sparkles,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  selectedServices: string[];
  message: string;
  submittedAt: string;
  status: 'RECEIVED' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  emailPreviewUrl?: string;
}

interface AdminDashboardProps {
  onBackToSite?: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onLogout }) => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // In-App Direct Reply Drawer / Modal State
  const [replyingInquiry, setReplyingInquiry] = useState<InquiryItem | null>(null);
  const [replyEmail, setReplyEmail] = useState<string>('');
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [replySubject, setReplySubject] = useState<string>('');
  const [replyBody, setReplyBody] = useState<string>('');
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  const [replySuccessMessage, setReplySuccessMessage] = useState<string | null>(null);

  const fetchInquiries = async () => {
    const API_BASE = getApiBaseUrl();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/contact/inquiries`);
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Fetch inquiries error:', err);
      setError(err.message || 'Failed to fetch inquiries from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (replyingInquiry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [replyingInquiry]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const API_BASE = getApiBaseUrl();
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE}/api/contact/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const API_BASE = getApiBaseUrl();
    if (!window.confirm(`Are you sure you want to delete inquiry ${id}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/contact/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Direct In-App Reply Modal
  const handleOpenReplyModal = (inquiry: InquiryItem) => {
    setReplyingInquiry(inquiry);
    setReplyEmail(inquiry.email);
    setIsEditingEmail(false);
    setReplySuccessMessage(null);
    setReplySubject(`Re: Inquiry [${inquiry.id}] - Project Proposal & Consultation`);

    const chosenServicesStr = inquiry.selectedServices.length > 0
      ? inquiry.selectedServices.join(', ')
      : 'your requested services';

    setReplyBody(
`Hi ${inquiry.name},

Thank you for reaching out regarding your inquiry (${inquiry.id}) for ${chosenServicesStr}.

I have reviewed your specifications carefully and would love to collaborate with you on this project.

Next Steps & Discussion Points:
1. Review Architecture & Key Deliverables
2. Confirm Project Timeline & Scope
3. Schedule an Intro Discussion (Google Meet / Zoom)

Please let me know if you would like to schedule a 15-minute quick call.

Best regards,
Yogeshwaran Ravishankar
Frontend Software Engineer
yogeshwar11012k02@gmail.com | +91-6382755066`
    );
  };

  // Preset Template Fillers
  const applyPresetTemplate = (templateType: 'proposal' | 'call' | 'pricing') => {
    if (!replyingInquiry) return;
    const { name, id, selectedServices } = replyingInquiry;
    const servicesStr = selectedServices.join(', ') || 'your project specs';

    if (templateType === 'proposal') {
      setReplySubject(`Re: Inquiry [${id}] - Technical Proposal & Strategy`);
      setReplyBody(
`Hi ${name},

Thanks for reaching out! I've reviewed your request for ${servicesStr}.

Here is my technical proposal:
- Component Architecture: Clean, modular React/TypeScript setup
- Design & Motion: Custom Tailwind styling & smooth GSAP animations
- Delivery Timeline: 1-2 Weeks with milestone checkpoints

I'm ready to begin as soon as you give the green light.

Best regards,
Yogeshwaran Ravishankar`
      );
    } else if (templateType === 'call') {
      setReplySubject(`Re: Inquiry [${id}] - Schedule 15-Min Intro Call`);
      setReplyBody(
`Hi ${name},

Thank you for your project inquiry (${id}).

I would love to invite you to a quick 15-minute intro discussion via Google Meet or Zoom to go over your goals for ${servicesStr}.

Please let me know a few time slots that work best for you this week!

Best regards,
Yogeshwaran Ravishankar`
      );
    } else if (templateType === 'pricing') {
      setReplySubject(`Re: Inquiry [${id}] - Package Scope & Hosting Breakdown`);
      setReplyBody(
`Hi ${name},

Thanks for choosing ${servicesStr}!

Here is a quick breakdown of package deliverables:
- Production Build & Performance Optimization
- Mobile-Responsive Layout & Accessibility
- Deployment & Hosting Setup Assistance

Let me know if you have any questions before we start!

Best regards,
Yogeshwaran Ravishankar`
      );
    }
  };

  // Send Direct Reply Email via Backend API
  const handleSendReply = async () => {
    if (!replyingInquiry || !replyBody.trim()) return;

    const API_BASE = getApiBaseUrl();
    setIsSendingReply(true);
    setReplySuccessMessage(null);

    try {
      const res = await fetch(`${API_BASE}/api/contact/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: replyingInquiry.id,
          clientEmail: replyEmail || replyingInquiry.email,
          clientName: replyingInquiry.name,
          subject: replySubject,
          replyMessage: replyBody
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReplySuccessMessage(`Reply delivered successfully to ${replyingInquiry.email}!`);
        // Update inquiry status to CONTACTED locally
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === replyingInquiry.id ? { ...item, status: 'CONTACTED' } : item
          )
        );
        setTimeout(() => {
          setReplyingInquiry(null);
          setReplySuccessMessage(null);
        }, 1800);
      } else {
        alert(data.error || 'Failed to send reply email.');
      }
    } catch (err: any) {
      alert(err.message || 'Error sending reply email.');
    } finally {
      setIsSendingReply(false);
    }
  };

  // Filtered list based on search and status
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'RECEIVED' || !i.status).length;
  const contactedCount = inquiries.filter((i) => i.status === 'CONTACTED').length;
  const completedCount = inquiries.filter((i) => i.status === 'COMPLETED').length;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'CONTACTED':
        return 'bg-cyan-500/10 text-[#0284c7] dark:text-cyan-400 border-cyan-500/30';
      case 'IN_PROGRESS':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'ARCHIVED':
        return 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/30';
      default:
        return 'bg-cyan-500/10 text-[#0284c7] dark:text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white pt-24 pb-16 px-6 sm:px-12 md:px-16 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & HUD Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {onBackToSite && (
                <button
                  onClick={onBackToSite}
                  className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-400 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-sm"
                  title="Back to Website"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
                // INQUIRIES MANAGEMENT HUD
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Admin Response Center.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-mono-code font-bold text-slate-800 dark:text-white transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#0284c7]' : ''}`} />
              <span>REFRESH DATA</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono-code font-bold text-red-600 dark:text-red-400 transition-all cursor-pointer shadow-sm"
                title="Log out of Admin HUD"
              >
                <span>LOG OUT</span>
              </button>
            )}
          </div>
        </div>

        {/* Key Metrics Counter Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono-code font-semibold uppercase">
              <span>TOTAL INQUIRIES</span>
              <Inbox className="w-4 h-4 text-[#0284c7] dark:text-cyan-400" />
            </div>
            <p className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">{totalCount}</p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none space-y-1">
            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 text-xs font-mono-code font-semibold uppercase">
              <span>NEW / RECEIVED</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="font-display text-3xl font-extrabold text-amber-600 dark:text-amber-400">{newCount}</p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none space-y-1">
            <div className="flex items-center justify-between text-[#0284c7] dark:text-cyan-400 text-xs font-mono-code font-semibold uppercase">
              <span>CONTACTED</span>
              <Mail className="w-4 h-4 text-[#0284c7] dark:text-cyan-400" />
            </div>
            <p className="font-display text-3xl font-extrabold text-[#0284c7] dark:text-cyan-400">{contactedCount}</p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none space-y-1">
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-xs font-mono-code font-semibold uppercase">
              <span>RESOLVED / CLOSED</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="font-display text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{completedCount}</p>
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0b1329] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, email, ref ID or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono-code text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#0284c7] dark:focus:border-cyan-400"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-code">
            <span className="text-slate-400 mr-2 flex items-center gap-1 font-semibold">
              <Filter className="w-3.5 h-3.5 text-[#0284c7]" /> FILTER:
            </span>
            {['ALL', 'RECEIVED', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-mono-code flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>{error}</span>
            </div>
            <button onClick={fetchInquiries} className="underline font-bold">Retry</button>
          </div>
        )}

        {/* Main Data Table / List Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
            <RefreshCw className="w-8 h-8 text-[#0284c7] animate-spin mx-auto" />
            <p className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Loading client inquiry database...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white dark:bg-[#0b1329] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
            <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No Inquiries Found</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-code">No records match your search or filter selection.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => {
              const subscriptionTiers = inquiry.selectedServices.filter((s) => s.includes('Buy me a'));
              const techServices = inquiry.selectedServices.filter((s) => !s.includes('Buy me a'));

              return (
                <div
                  key={inquiry.id}
                  className="bg-white dark:bg-[#0b1329] p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 transition-all duration-300 shadow-xl dark:shadow-none space-y-4"
                >
                  {/* Top Bar: Reference ID, Status Dropdown & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-extrabold">
                        <span>{inquiry.id}</span>
                        <button
                          onClick={() => handleCopyId(inquiry.id)}
                          className="hover:text-cyan-600 transition-colors cursor-pointer"
                          title="Copy Inquiry ID"
                        >
                          {copiedId === inquiry.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="relative">
                        <select
                          value={inquiry.status || 'RECEIVED'}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          disabled={updatingId === inquiry.id}
                          className={`text-xs font-mono-code font-bold px-3 py-1 rounded-lg border appearance-none pr-8 cursor-pointer focus:outline-none ${getStatusBadgeClass(
                            inquiry.status || 'RECEIVED'
                          )}`}
                        >
                          <option value="RECEIVED">RECEIVED</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(inquiry.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Main Info: Client Name, Email, & Services Tags */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-4 space-y-1">
                      <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                        {inquiry.name}
                      </h3>
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#0284c7] dark:text-cyan-400 font-bold hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{inquiry.email}</span>
                      </a>
                    </div>

                    <div className="lg:col-span-8 space-y-2">
                      {/* Subscription Packages Pills */}
                      {subscriptionTiers.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono-code uppercase font-bold text-amber-600 dark:text-amber-400 mr-1 flex items-center gap-1">
                            <Package className="w-3 h-3" /> TIERS:
                          </span>
                          {subscriptionTiers.map((tier, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Technical Services Pills */}
                      {techServices.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono-code uppercase font-bold text-[#0284c7] dark:text-cyan-400 mr-1 flex items-center gap-1">
                            <Layers className="w-3 h-3" /> SERVICES:
                          </span>
                          {techServices.map((service, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 text-[#0284c7] dark:text-cyan-300"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client Message Preview */}
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-1">
                    <p className="text-[10px] font-mono-code uppercase text-slate-400 font-bold">MESSAGE / SPECIFICATIONS:</p>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Interactive In-App Direct Reply Trigger */}
                      <button
                        onClick={() => handleOpenReplyModal(inquiry)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white text-xs font-mono-code font-bold hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>REPLY TO CLIENT</span>
                      </button>

                      {inquiry.emailPreviewUrl && (
                        <a
                          href={inquiry.emailPreviewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-all"
                        >
                          <span>EMAIL RECEIPT PREVIEW</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 transition-all cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DIRECT IN-APP EMAIL REPLY MODAL COMPOSER                      */}
      {/* ------------------------------------------------------------- */}
      {replyingInquiry && (
        <div
          className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-white/15 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden">
            {/* Modal Close Button */}
            <button
              onClick={() => setReplyingInquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 transition-all cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title & Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono-code uppercase tracking-widest text-[#0284c7] dark:text-cyan-400 font-bold">
                  // IN-APP DIRECT EMAIL COMPOSER
                </span>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                Reply to {replyingInquiry.name}
              </h2>
            </div>

            {/* Preset Quick Template Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-code uppercase text-slate-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#0284c7]" /> QUICK RESPONSE TEMPLATES:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('proposal')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 border border-slate-200 dark:border-white/10 text-xs font-mono-code font-bold text-slate-800 dark:text-slate-200 hover:text-[#0284c7] transition-all cursor-pointer"
                >
                  🚀 Proposal & Timeline
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('call')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 border border-slate-200 dark:border-white/10 text-xs font-mono-code font-bold text-slate-800 dark:text-slate-200 hover:text-[#0284c7] transition-all cursor-pointer"
                >
                  🗓️ Schedule Intro Call
                </button>
                <button
                  type="button"
                  onClick={() => applyPresetTemplate('pricing')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 border border-slate-200 dark:border-white/10 text-xs font-mono-code font-bold text-slate-800 dark:text-slate-200 hover:text-[#0284c7] transition-all cursor-pointer"
                >
                  💰 Hosting & Package Scope
                </button>
              </div>
            </div>

            {/* Form Controls - Non-scrolling Fixed Container */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono-code uppercase text-slate-500 dark:text-slate-400 font-bold">
                    RECIPIENT EMAIL *
                  </label>
                  {!isEditingEmail ? (
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(true)}
                      className="text-[10px] font-mono-code text-[#0284c7] dark:text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3 h-3 text-[#0284c7] dark:text-cyan-400" /> UNLOCK & EDIT EMAIL
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingEmail(false);
                        if (replyingInquiry) setReplyEmail(replyingInquiry.email);
                      }}
                      className="text-[10px] font-mono-code text-slate-500 hover:text-slate-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Unlock className="w-3 h-3 text-amber-500" /> RESET & LOCK
                    </button>
                  )}
                </div>

                <input
                  type="email"
                  disabled={!isEditingEmail}
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono-code font-bold transition-all ${
                    !isEditingEmail
                      ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-80'
                      : 'bg-amber-500/10 border-amber-500/50 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500'
                  }`}
                />

                {isEditingEmail && (
                  <div className="mt-2 text-[11px] font-mono-code text-amber-700 dark:text-amber-300 flex items-start gap-2 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30 animate-fadeIn">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                    <span><strong>⚠️ Caution:</strong> Email editing is unlocked. Direct response will be dispatched to <strong>{replyEmail || 'this custom address'}</strong> instead of default ({replyingInquiry.email}).</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono-code uppercase text-slate-500 dark:text-slate-400 font-bold mb-1">
                  SUBJECT LINE
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono-code text-slate-900 dark:text-white focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-code uppercase text-slate-500 dark:text-slate-400 font-bold mb-1">
                  REPLY MESSAGE *
                </label>
                <style>{`
                  .admin-reply-textarea {
                    scrollbar-width: thin !important;
                    scrollbar-color: #06b6d4 #060a14 !important;
                  }
                  .admin-reply-textarea::-webkit-scrollbar {
                    display: block !important;
                    width: 10px !important;
                    height: 10px !important;
                    background-color: #060a14 !important;
                  }
                  .admin-reply-textarea::-webkit-scrollbar-track {
                    background-color: #060a14 !important;
                    border-radius: 0 8px 8px 0 !important;
                  }
                  .admin-reply-textarea::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #06b6d4 0%, #0284c7 100%) !important;
                    border-radius: 9999px !important;
                    border: 2px solid #060a14 !important;
                    min-height: 48px !important;
                  }
                  .admin-reply-textarea::-webkit-scrollbar-thumb:hover {
                    background: #38bdf8 !important;
                  }
                `}</style>
                <textarea
                  rows={6}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  onWheel={(e) => e.stopPropagation()}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#06b6d4 #060a14'
                  }}
                  className="w-full h-52 min-h-[160px] max-h-[280px] overflow-y-scroll admin-reply-textarea px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono-code text-slate-900 dark:text-white focus:outline-none focus:border-[#0284c7] leading-relaxed resize-y overscroll-contain"
                />
              </div>

              {/* Success Alert */}
              {replySuccessMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono-code flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{replySuccessMessage}</span>
                </div>
              )}
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReplyingInquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer border border-slate-200 dark:border-white/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendReply}
                disabled={isSendingReply}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white text-xs font-mono-code font-extrabold uppercase hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
              >
                {isSendingReply ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <span>SEND REPLY EMAIL</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
