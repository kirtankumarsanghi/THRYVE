import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, Target, Users, Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { healthAuth } from "../../api/authApi";
import { API_BASE_URL } from "../../api/axios";
import ThryveLogo from "../../components/branding/ThryveLogo";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const DEMO_USERS = [
  { role: "employee", label: "Employee", icon: Target },
  { role: "manager", label: "Manager", icon: Users },
  { role: "admin", label: "Admin", icon: Shield },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, token, role: currentRole, loading } = useAuth();
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
    setIsSubmitting(true);
    setApiError("");
    const result = await login(data.email, data.password);
    if (result?.ok) {
      const userRole = result.user?.role || "employee";
      navigate(`/${userRole}/dashboard`);
    } else {
      setApiError(result?.error || "Login failed. Please check your credentials.");
    }
    setIsSubmitting(false);
  };

  const handleDemoLogin = async (demo) => {
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
      setApiError(result?.error || "Demo login failed.");
    }

    setDemoLoading(null);
  };

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#060D1F]">
      {/* Left Panel: Branding & Advertising */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-[#0B132C] border-r border-white/5 flex-col justify-between overflow-hidden">
        
        {/* Rich Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#040814] via-[#09122C] to-[#040814] z-0" />
        
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -left-[20%] w-[70%] h-[70%] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" 
        />

        {/* Professional Isometric Dashboard Mockup */}
        <div className="absolute right-[-15%] top-[15%] w-[90%] h-[80%] pointer-events-none z-0 perspective-[2000px]">
          <motion.div 
            initial={{ opacity: 0, rotateY: -15, rotateX: 10, y: 50 }}
            animate={{ opacity: 1, rotateY: -12, rotateX: 8, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[120%] bg-[#0B132C]/80 backdrop-blur-3xl border border-white/10 rounded-l-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Mock Header */}
            <div className="h-16 border-b border-white/5 flex items-center px-8 gap-6 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Target size={14} className="text-blue-400" />
              </div>
              <div className="h-4 w-32 bg-white/10 rounded-full" />
              <div className="flex-1" />
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-white/5" />
                <div className="h-8 w-24 rounded-lg bg-white/10" />
              </div>
            </div>

            {/* Mock Content */}
            <div className="flex-1 flex p-8 gap-8">
              {/* Mock Sidebar */}
              <div className="w-48 flex flex-col gap-4">
                <div className="h-8 w-full bg-blue-500/10 border border-blue-500/20 rounded-lg" />
                <div className="h-8 w-[80%] bg-white/5 rounded-lg" />
                <div className="h-8 w-[90%] bg-white/5 rounded-lg" />
                <div className="h-8 w-[75%] bg-white/5 rounded-lg" />
                
                <div className="mt-8 h-4 w-16 bg-white/10 rounded-full mb-2" />
                <div className="h-8 w-full bg-white/5 rounded-lg" />
                <div className="h-8 w-[85%] bg-white/5 rounded-lg" />
              </div>

              {/* Mock Main Area */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="h-8 w-48 bg-white/10 rounded-lg mb-3" />
                    <div className="h-4 w-64 bg-white/5 rounded-full" />
                  </div>
                  <div className="h-10 w-32 bg-blue-500 rounded-lg opacity-80" />
                </div>

                {/* Mock KPI Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="h-4 w-16 bg-white/10 rounded-full" />
                        <div className="h-6 w-6 rounded-full bg-white/5" />
                      </div>
                      <div>
                        <div className="h-8 w-24 bg-white/20 rounded-lg mb-2" />
                        <div className="h-3 w-12 bg-emerald-500/40 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock Chart Area */}
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col">
                  <div className="h-5 w-32 bg-white/10 rounded-lg mb-6" />
                  <div className="flex-1 flex items-end gap-3 pb-2 border-b border-white/5">
                    {[40, 70, 45, 90, 65, 80, 55, 75, 40, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-500/20 to-indigo-400/40 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle decorative grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }}
        />
        
        {/* Top Navigation */}
        <div className="relative z-10 p-8 xl:p-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to main site</span>
          </Link>
        </div>

        {/* Branding Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 xl:px-12 2xl:px-16 pb-16 xl:pb-24 w-full max-w-2xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#030712] border border-white/10 mb-8 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl blur-md" />
            <Target size={28} className="text-blue-400 relative z-10" />
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-[3rem] xl:text-[4rem] font-bold text-white tracking-tight leading-[1.05] mb-6 drop-shadow-2xl">
            Strategic clarity.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Perfect execution.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg xl:text-xl text-slate-400 leading-relaxed mb-12 max-w-xl font-medium">
            Join thousands of teams using THRYVE's enterprise platform to align their goals, track KPIs, and accelerate growth.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-blue-400" />
                <span className="text-slate-200 font-semibold text-[15px]">OKRs & Goals</span>
              </div>
              <p className="text-sm text-slate-500 ml-7 leading-relaxed">Align every team member with company-wide strategic objectives.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-indigo-400" />
                <span className="text-slate-200 font-semibold text-[15px]">Real-time Analytics</span>
              </div>
              <p className="text-sm text-slate-500 ml-7 leading-relaxed">Instantly identify bottlenecks with intelligent KPI dashboards.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-purple-400" />
                <span className="text-slate-200 font-semibold text-[15px]">Multi-tier Roles</span>
              </div>
              <p className="text-sm text-slate-500 ml-7 leading-relaxed">Built for employees, managers, and executives to collaborate.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-emerald-400" />
                <span className="text-slate-200 font-semibold text-[15px]">Enterprise Security</span>
              </div>
              <p className="text-sm text-slate-500 ml-7 leading-relaxed">Bank-grade encryption, SSO integration, and full audit logs.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex-1 flex items-center justify-center relative p-6 bg-[#030712] lg:bg-transparent shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Mobile Only Logo */}
          <div className="lg:hidden mb-10 text-center flex justify-center">
            <ThryveLogo size="md" />
          </div>

          <div className="mb-8">
            <h2 className="text-[1.75rem] font-bold text-white tracking-tight mb-2">Sign in</h2>
            <p className="text-slate-400 font-medium">Enter your credentials to continue to your workspace.</p>
          </div>

          <div className="bg-[#0B132C]/80 border border-white/[0.08] rounded-3xl p-7 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl relative overflow-hidden">
            {/* Subtle inner highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {backendStatus !== "up" && (
              <div className="mb-6 flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <Zap size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-[13px] text-amber-200/90 leading-relaxed font-medium">
                  {backendStatus === "checking"
                    ? "Checking backend connectivity..."
                    : `Backend may be waking up or unreachable at ${API_BASE_URL}. You can still try signing in.`}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-[13px] font-semibold text-slate-300 mb-2">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={`w-full bg-[#030712]/50 border rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                      : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:bg-[#030712]/80"
                  }`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs font-medium mt-2">
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-slate-300">Password</label>
                  <button type="button" className="text-[13px] font-medium text-blue-400 hover:text-blue-300 transition-colors">Forgot?</button>
                </div>
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full bg-[#030712]/50 border rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner ${
                    errors.password
                      ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                      : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:bg-[#030712]/80"
                  }`}
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs font-medium mt-2">
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {apiError && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-[13px] font-medium text-red-400">
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3.5 rounded-xl transition-all mt-4 text-[15px] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>Continue <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 mb-5 justify-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Demo Access</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {DEMO_USERS.map((demo) => {
                  const isLoading = demoLoading === demo.role;
                  return (
                    <button
                      key={demo.role}
                      onClick={() => handleDemoLogin(demo)}
                      disabled={demoLoading !== null}
                      className="group flex flex-col items-center justify-center gap-2.5 bg-black/20 hover:bg-black/40 border border-white/[0.05] hover:border-white/10 rounded-xl p-3 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 size={18} className="animate-spin text-slate-400" />
                      ) : (
                        <demo.icon size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                      )}
                      <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors tracking-wide">{demo.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 mt-8">
            <p className="text-center text-sm text-slate-500 font-medium">&copy; {new Date().getFullYear()} Thryve Enterprise.</p>
            <div className="flex gap-4 text-xs text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
