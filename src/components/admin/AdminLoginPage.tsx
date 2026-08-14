import React, { useState } from 'react';
import { Lock, User, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMsg(null);

    setTimeout(() => {
      const targetUser = 'yogeshwar11012k02@gmail.com';
      const targetPass = 'yogesh@123';

      const userMatch = username.trim().toLowerCase() === targetUser.toLowerCase();
      const passMatch = password.trim() === targetPass;

      if (userMatch && passMatch) {
        sessionStorage.setItem('isAdminAuth', 'true');
        sessionStorage.setItem('adminUser', username.trim());
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid Credentials. Access Denied.');
      }
      setIsVerifying(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a14] text-slate-900 dark:text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans select-none transition-colors duration-300">
      {/* Background Neon Grid Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.12),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl transition-colors duration-300">
        {/* Top Header Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-[#0284c7] dark:text-cyan-400 mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/40 text-[#0284c7] dark:text-cyan-400 text-[11px] font-mono-code uppercase tracking-widest font-extrabold">
            // RESTRICTED ACCESS GATE
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin Portal Login
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
            Authenticate with your authorized administrator credentials.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Address Input Field */}
          <div>
            <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0284c7] dark:text-cyan-400" />
              <span>EMAIL ADDRESS</span>
            </label>
            <input
              type="email"
              required
              autoFocus
              autoComplete="username"
              spellCheck={false}
              placeholder="name@domain.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/15 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl font-mono-code"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-[11px] font-mono-code uppercase text-slate-700 dark:text-slate-300 mb-2 font-semibold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#0284c7] dark:text-cyan-400" />
              <span>PASSWORD</span>
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/15 focus:border-[#0284c7] dark:focus:border-cyan-400 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all text-sm rounded-xl font-mono-code"
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono-code flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-display font-extrabold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group shadow-lg mt-2"
          >
            {isVerifying ? (
              <span>VERIFYING CREDENTIALS...</span>
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Return Link (Strictly Secure, No Hints) */}
        <div className="pt-2 text-center border-t border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer font-mono-code underline underline-offset-4 block mx-auto pt-2"
          >
            ← Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
