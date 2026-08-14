import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [passkey, setPasskey] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMsg(null);

    setTimeout(() => {
      // Default passkey for Admin Access (or customizable via env)
      const validPasskeys = ['admin123', 'yogesh2026', 'admin', 'passkey'];
      if (validPasskeys.includes(passkey.trim().toLowerCase())) {
        sessionStorage.setItem('isAdminAuth', 'true');
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid Security Passkey. Access Denied.');
      }
      setIsVerifying(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Neon Grid Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.15),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 bg-[#0b1329] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl">
        {/* Top Header Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[#0284c7] dark:text-cyan-400 text-[11px] font-mono-code uppercase tracking-widest font-extrabold">
            // RESTRICTED ACCESS GATE
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Admin Authentication
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Enter authorized security passkey to access client response HUD.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-mono-code uppercase text-slate-300 mb-2 font-semibold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>SECURITY PASSKEY</span>
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder="Enter admin passkey..."
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 focus:border-cyan-400 px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl font-mono-code"
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono-code flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-display font-extrabold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group shadow-lg"
          >
            {isVerifying ? (
              <span>VERIFYING CREDENTIALS...</span>
            ) : (
              <>
                <span>AUTHENTICATE ACCESS</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Quick Hint & Return Link */}
        <div className="pt-2 text-center space-y-3 border-t border-white/10">
          <p className="text-[11px] font-mono-code text-slate-500">
            Passkey hint: <span className="text-cyan-400 font-bold">admin123</span> or <span className="text-cyan-400 font-bold">yogesh2026</span>
          </p>
          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer font-mono-code underline underline-offset-4"
          >
            ← Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
