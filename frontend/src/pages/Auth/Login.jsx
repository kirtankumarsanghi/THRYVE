import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, Zap, Target, Users, Shield, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Demo user presets
const DEMO_USERS = [
  {
    role: "employee",
    label: "Login as Employee",
    name: "Alex Johnson",
    email: "alex@thryve.io",
    desc: "Goals, Check-ins, Progress",
    icon: Target,
    color: "blue",
    classes: {
      btn: "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: "text-blue-400",
    },
  },
  {
    role: "manager",
    label: "Login as Manager",
    name: "Sarah Chen",
    email: "sarah@thryve.io",
    desc: "Approvals, Team, Analytics",
    icon: Users,
    color: "purple",
    classes: {
      btn: "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      icon: "text-purple-400",
    },
  },
  {
    role: "admin",
    label: "Login as Admin",
    name: "Marcus Rivera",
    email: "marcus@thryve.io",
    desc: "Governance, Audit, Users",
    icon: Shield,
    color: "red",
    classes: {
      btn: "bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Already logged in → redirect to dashboard
  if (!loading && token && currentRole) {
    return <Navigate to={`/${currentRole}/dashboard`} replace />;
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError("");
    try {
      // ── Real API call would go here ──────────────────────────────
      // const res = await axios.post("/api/auth/login", data);
      // const { token, role, user } = res.data;
      // login(role, user, token);
      // navigate(`/${role}/dashboard`);
      // ─────────────────────────────────────────────────────────────

      // Fallback: For now simulate a small delay then use mock
      await new Promise(r => setTimeout(r, 1000));
      // Extract role from email for the demo (real apps parse JWT)
      const mockRole = data.email.includes("admin")
        ? "admin"
        : data.email.includes("manager")
        ? "manager"
        : "employee";
      login(mockRole, { name: "User", email: data.email });
      navigate(`/${mockRole}/dashboard`);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (demo) => {
    setDemoLoading(demo.role);
    await new Promise(r => setTimeout(r, 500)); // Slight delay for UX
    login(demo.role, { name: demo.name, email: demo.email });
    navigate(`/${demo.role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#060D1F] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated background orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-[#8B7FFF]/15 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[45%] h-[45%] bg-[#10B981]/10 blur-[140px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[40%] right-[15%] w-[25%] h-[25%] bg-blue-500/8 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "3s" }} />

      {/* Grid overlay texture */}
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
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Card */}
        <div className="bg-[#0B1437]/80 backdrop-blur-2xl border border-white/8 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Header */}
          <div className="px-8 pt-10 pb-8 border-b border-white/5 text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B7FFF] to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,127,255,0.4)]">
                <Target size={22} className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-widest text-white">THRYVE</span>
            </Link>
            <h1 className="text-xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your enterprise workspace</p>
          </div>

          {/* Login Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={`w-full bg-white/3 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                        : "border-white/8 focus:border-[#8B7FFF]/60 focus:ring-1 focus:ring-[#8B7FFF]/20"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs mt-1.5 ml-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Password
                  </label>
                  <button type="button" className="text-xs text-[#8B7FFF] hover:text-[#8B7FFF]/80 transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`w-full bg-white/3 border rounded-xl pl-11 pr-12 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                      errors.password
                        ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                        : "border-white/8 focus:border-[#8B7FFF]/60 focus:ring-1 focus:ring-[#8B7FFF]/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs mt-1.5 ml-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* API Error */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300"
                  >
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B7FFF] to-indigo-600 hover:from-[#8B7FFF]/90 hover:to-indigo-600/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-[0_0_25px_rgba(139,127,255,0.3)] hover:shadow-[0_0_35px_rgba(139,127,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Demo Quick Access */}
          <div className="px-8 pb-8">
            <div className="border border-dashed border-white/10 rounded-2xl p-6 bg-white/2">
              {/* Demo Header */}
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                  For Hackathon Demo Only
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-5">
                Skip authentication and instantly access any role dashboard
              </p>

              {/* Demo Buttons */}
              <div className="space-y-3">
                {DEMO_USERS.map((demo) => {
                  const Icon = demo.icon;
                  const isLoading = demoLoading === demo.role;

                  return (
                    <button
                      key={demo.role}
                      onClick={() => handleDemoLogin(demo)}
                      disabled={demoLoading !== null}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${demo.classes.btn}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${demo.classes.badge}`}>
                        {isLoading ? (
                          <Loader2 size={16} className={`animate-spin ${demo.classes.icon}`} />
                        ) : (
                          <Icon size={16} className={demo.classes.icon} />
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <div>{demo.label}</div>
                        <div className="text-[10px] font-normal opacity-60 mt-0.5">{demo.desc}</div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${demo.classes.badge}`}>
                        {demo.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-700 mt-6">
          &copy; {new Date().getFullYear()} Thryve Enterprise · Align. Achieve. Thryve.
        </p>
      </motion.div>
    </div>
  );
}
