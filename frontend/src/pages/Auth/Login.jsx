import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, Zap, Target, Users, Shield, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { healthAuth } from "../../api/authApi";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const DEMO_USERS = [
  {
    role: "employee",
    label: "Login as Employee",
    desc: "Goals, Check-ins, Progress",
    icon: Target,
    classes: {
      btn: "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/50",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: "text-blue-400",
    },
  },
  {
    role: "manager",
    label: "Login as Manager",
    desc: "Approvals, Team, Analytics",
    icon: Users,
    classes: {
      btn: "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      icon: "text-purple-400",
    },
  },
  {
    role: "admin",
    label: "Login as Admin",
    desc: "Governance, Audit, Users",
    icon: Shield,
    classes: {
      btn: "bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-500/50",
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      icon: "text-red-400",
    },
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, token, role: currentRole, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);
  const [apiError, setApiError] = useState("");
  const [backendStatus, setBackendStatus] = useState("checking");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  if (!loading && token && currentRole) {
    return <Navigate to={`/${currentRole}/dashboard`} replace />;
  }

  useEffect(() => {
    let mounted = true;
    const checkBackend = async () => {
      try {
        await healthAuth();
        if (mounted) setBackendStatus("up");
      } catch {
        if (mounted) setBackendStatus("down");
      }
    };
    checkBackend();
    const timer = setInterval(checkBackend, 15000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const onSubmit = async (data) => {
    if (backendStatus !== "up") {
      setApiError("Backend is not reachable. Start the API server, then try again.");
      return;
    }

    setIsSubmitting(true);
    setApiError("");
    const result = await login(data.email, data.password);
    if (result?.ok) {
      const userRole = result.user?.role || "employee";
      navigate(`/${userRole}/dashboard`);
    } else {
      setApiError(result?.error || "Login failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handleDemoLogin = async (demo) => {
    if (backendStatus !== "up") {
      setApiError("Backend is not reachable. Start the API server, then try again.");
      return;
    }

    setDemoLoading(demo.role);
    setApiError("");

    const demoCredentials = {
      employee: { email: "employee@thryve.com", password: "employee123" },
      manager: { email: "manager@thryve.com", password: "manager123" },
      admin: { email: "admin@thryve.com", password: "admin123" },
    };

    const creds = demoCredentials[demo.role];
    const result = await login(creds.email, creds.password);

    if (result?.ok) {
      const userRole = result.user?.role || demo.role;
      navigate(`/${userRole}/dashboard`);
    } else {
      setApiError(result?.error || "Demo login failed. Please try again.");
    }

    setDemoLoading(null);
  };

  return (
    <div className="min-h-screen bg-[#060D1F] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-[#8B7FFF]/15 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[45%] h-[45%] bg-[#10B981]/10 blur-[140px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[40%] right-[15%] w-[25%] h-[25%] bg-blue-500/8 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "3s" }} />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-[2rem] border border-white/12 bg-gradient-to-br from-[#101a3f] via-[#0b1431] to-[#091028] p-8 lg:p-10 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-indigo-500/12 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B7FFF] to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,127,255,0.45)]">
                  <Target size={22} className="text-white" />
                </div>
                <span className="text-3xl font-bold tracking-[0.12em] text-white">THRYVE</span>
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">Performance Platform</p>
              <h2 className="text-3xl font-bold text-white leading-tight mb-4">Align teams, accelerate goals, and scale execution.</h2>
              <p className="text-slate-300 leading-relaxed max-w-md">
                THRYVE gives your organization a single command center for strategic planning, quarterly check-ins,
                manager approvals, and live analytics.
              </p>

              <div className="mt-10 space-y-4">
                <Feature label="Goal lifecycle from draft to approval" />
                <Feature label="Quarterly check-ins with progress tracking" />
                <Feature label="Live dashboards for employee, manager, and admin" />
              </div>
            </div>
          </div>

          <div className="bg-[#0B1437]/82 backdrop-blur-2xl border border-white/12 rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.58)] overflow-hidden">
            <div className="px-8 pt-10 pb-8 border-b border-white/10 text-center relative">
              <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-cyan-300/30 via-violet-400/60 to-cyan-300/30" />
              <h1 className="text-[2rem] leading-tight font-bold text-white mb-1">Welcome back</h1>
              <p className="text-sm text-slate-400">Sign in to your enterprise workspace</p>
            </div>

            <div className="px-8 py-8 bg-gradient-to-b from-white/[0.01] to-transparent">
              {backendStatus !== "up" && (
                <div className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-amber-200">
                  {backendStatus === "checking"
                    ? "Checking backend connectivity..."
                    : "Backend appears offline. Please start the API server (http://127.0.0.1:8000)."}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={`w-full bg-white/90 border rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                          : "border-white/10 focus:border-[#8B7FFF]/60 focus:ring-1 focus:ring-[#8B7FFF]/20"
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1.5 ml-1">
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                    <button type="button" className="text-xs text-[#8B7FFF] hover:text-[#8B7FFF]/80 transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={`w-full bg-white/90 border rounded-xl pl-11 pr-12 py-3 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none transition-all ${
                        errors.password
                          ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                          : "border-white/10 focus:border-[#8B7FFF]/60 focus:ring-1 focus:ring-[#8B7FFF]/20"
                      }`}
                    />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1.5 ml-1">
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {apiError && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300">
                      {apiError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting || backendStatus !== "up"}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B7FFF] to-indigo-600 hover:from-[#8B7FFF]/90 hover:to-indigo-600/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_14px_34px_rgba(99,102,241,0.42)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="px-8 pb-8">
              <div className="border border-dashed border-white/12 rounded-2xl p-6 bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={14} className="text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">For Hackathon Demo Only</span>
                </div>
                <p className="text-xs text-slate-500 mb-5">Skip authentication and instantly access any role dashboard</p>

                <div className="space-y-3">
                  {DEMO_USERS.map((demo) => {
                    const Icon = demo.icon;
                    const isLoading = demoLoading === demo.role;

                    return (
                      <button
                        key={demo.role}
                        onClick={() => handleDemoLogin(demo)}
                        disabled={demoLoading !== null || backendStatus !== "up"}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 disabled:opacity-50 hover:translate-x-0.5 ${demo.classes.btn}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${demo.classes.badge}`}>
                          {isLoading ? <Loader2 size={16} className={`animate-spin ${demo.classes.icon}`} /> : <Icon size={16} className={demo.classes.icon} />}
                        </div>
                        <div className="text-left flex-1">
                          <div>{demo.label}</div>
                          <div className="text-[10px] font-normal opacity-60 mt-0.5">{demo.desc}</div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${demo.classes.badge}`}>{demo.role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">&copy; {new Date().getFullYear()} Thryve Enterprise · Align. Achieve. Thryve.</p>
      </motion.div>
    </div>
  );
}

function Feature({ label }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-cyan-300 mt-2" />
      <p className="text-slate-300 text-sm">{label}</p>
    </div>
  );
}
