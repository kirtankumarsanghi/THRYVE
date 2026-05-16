import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // For demo, redirect based on email
      if (email.includes('admin')) {
        localStorage.setItem('role', 'admin');
        navigate('/admin/dashboard');
      } else if (email.includes('manager')) {
        localStorage.setItem('role', 'manager');
        navigate('/manager/dashboard');
      } else {
        localStorage.setItem('role', 'employee');
        navigate('/employee/dashboard');
      }
      localStorage.setItem('token', 'demo-token');
    }, 1500);
  };

  const quickLogin = (role, name, email) => {
    localStorage.setItem('role', role);
    localStorage.setItem('token', 'demo-token');
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#8b7fff]/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#4cd7f6]/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Back to Home
      </button>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(139,127,255,0.2)]">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b7fff] to-[#6b5dd3] mb-4 shadow-[0_0_30px_rgba(139,127,255,0.4)]">
              <span className="material-symbols-outlined text-white text-[32px]">auto_awesome</span>
            </div>
            <h1 className="text-[28px] font-bold mb-2 tracking-tight">THRYVE</h1>
            <p className="text-[18px] font-semibold text-white mb-1">Welcome back</p>
            <p className="text-sm text-gray-400">Sign in to your enterprise workspace</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                Work Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-[#8b7fff]/50 focus:ring-2 focus:ring-[#8b7fff]/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-[#8b7fff] hover:text-[#7a6eef] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-500 focus:border-[#8b7fff]/50 focus:ring-2 focus:ring-[#8b7fff]/20 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8b7fff] hover:bg-[#7a6eef] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3.5 font-semibold transition-all shadow-[0_0_20px_rgba(139,127,255,0.3)] hover:shadow-[0_0_30px_rgba(139,127,255,0.5)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Section */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">code</span>
              <span className="text-sm font-semibold text-[#f59e0b] uppercase tracking-wider">
                For Hackathon Demo Only
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              No credentials required. Just select a role to explore:
            </p>

            <div className="space-y-3">
              {/* Employee Login */}
              <button
                onClick={() => quickLogin('employee', 'John Doe', 'john@company.com')}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4cd7f6]/30 rounded-xl p-4 transition-all group text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4cd7f6]/20 border border-[#4cd7f6]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">person</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Login as Employee</p>
                      <p className="text-xs text-gray-400">John, Check-ins, Progress</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#4cd7f6]/20 text-[#4cd7f6] rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#4cd7f6]/30">
                    Employee
                  </span>
                </div>
              </button>

              {/* Manager Login */}
              <button
                onClick={() => quickLogin('manager', 'Sarah Williams', 'sarah@company.com')}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ddb7ff]/30 rounded-xl p-4 transition-all group text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ddb7ff]/20 border border-[#ddb7ff]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#ddb7ff] text-[20px]">supervisor_account</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Login as Manager</p>
                      <p className="text-xs text-gray-400">Approvals, Team, Analytics</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#ddb7ff]/20 text-[#ddb7ff] rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#ddb7ff]/30">
                    Manager
                  </span>
                </div>
              </button>

              {/* Admin Login */}
              <button
                onClick={() => quickLogin('admin', 'Lisa Anderson', 'lisa@company.com')}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ffb4ab]/30 rounded-xl p-4 transition-all group text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ffb4ab]/20 border border-[#ffb4ab]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#ffb4ab] text-[20px]">admin_panel_settings</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Login as Admin</p>
                      <p className="text-xs text-gray-400">Governance, Audit, Users</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#ffb4ab]/20 text-[#ffb4ab] rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#ffb4ab]/30">
                    Admin
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2024 Thryve Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
