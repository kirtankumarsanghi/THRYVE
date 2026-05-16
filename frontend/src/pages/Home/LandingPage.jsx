import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Target, Users, Shield, ArrowRight, CheckCircle2, BarChart3,
  TrendingUp, Award, Workflow 
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
  const { token, role, loading } = useAuth();

  if (!loading && token && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#081028] text-white font-sans selection:bg-[#8B7FFF]/30 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#8B7FFF]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#10B981]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B7FFF] to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,127,255,0.5)]">
            <Target size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-wide">THRYVE</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors hidden md:block">Features</a>
          <a href="#roles" className="text-gray-400 hover:text-white transition-colors hidden md:block">Roles</a>
          <Link 
            to="/login"
            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-medium backdrop-blur-md"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B7FFF]/10 border border-[#8B7FFF]/20 text-[#8B7FFF] text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B7FFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B7FFF]"></span>
              </span>
              Enterprise Performance v2.0
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Align. Achieve. </span>
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B7FFF] to-cyan-400">Thryve.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mt-6">
              The unified goal setting and performance tracking portal designed for modern enterprises. Align individual ambition with organizational strategy.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <Link 
                to="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#8B7FFF] to-indigo-600 text-white font-semibold shadow-[0_0_30px_rgba(139,127,255,0.3)] hover:shadow-[0_0_40px_rgba(139,127,255,0.5)] transition-all hover:-translate-y-1"
              >
                Get Started
              </Link>
              <a 
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 backdrop-blur-md"
              >
                View Demo <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-6 bg-[#0B1437]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Complete Performance OS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything your organization needs to set, track, and accomplish ambitious objectives at scale.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#8B7FFF]/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#8B7FFF]/20 flex items-center justify-center mb-6">
                <Target size={28} className="text-[#8B7FFF]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Employee Goals</h3>
              <p className="text-gray-400 leading-relaxed">
                Empower your workforce to set meaningful OKRs. Connect daily tasks to overarching company missions with real-time progress tracking.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center mb-6">
                <Users size={28} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Manager Reviews</h3>
              <p className="text-gray-400 leading-relaxed">
                Streamline approval workflows. Conduct quarterly check-ins, unblock team bottlenecks, and foster a culture of continuous feedback.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[#10B981]/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#10B981]/20 flex items-center justify-center mb-6">
                <Shield size={28} className="text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Admin Governance</h3>
              <p className="text-gray-400 leading-relaxed">
                Total organizational control. Manage review cycles, monitor global analytics, and maintain unalterable audit logs for compliance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Thryve Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A frictionless workflow designed to keep everyone moving forward.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#8B7FFF]/20 via-cyan-400/20 to-[#10B981]/20 -translate-y-1/2 z-0" />
            
            {[
              { title: "Set Goals", icon: Target, desc: "Define SMART objectives", color: "text-[#8B7FFF]", bg: "bg-[#8B7FFF]/20", border: "border-[#8B7FFF]/30" },
              { title: "Get Approved", icon: CheckCircle2, desc: "Manager alignment", color: "text-cyan-400", bg: "bg-cyan-400/20", border: "border-cyan-400/30" },
              { title: "Track Progress", icon: TrendingUp, desc: "Continuous execution", color: "text-[#10B981]", bg: "bg-[#10B981]/20", border: "border-[#10B981]/30" }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center mb-12 md:mb-0 bg-[#081028] p-4 rounded-full"
              >
                <div className={`w-20 h-20 rounded-full ${step.bg} border ${step.border} flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md`}>
                  <step.icon size={32} className={step.color} />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Showcase */}
      <section id="roles" className="relative z-10 py-24 px-6 bg-[#0B1437]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored for Every Persona</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Different responsibilities require different tools. Thryve adapts to you.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Employee Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Award className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">The Employee</h3>
                  <p className="text-sm text-gray-400">Execution & Growth</p>
                </div>
              </div>
              <ul className="space-y-4">
                {['Create and update OKRs', 'Log quarterly check-ins', 'View personal analytics', 'Request manager feedback'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={16} className="text-[#8B7FFF]" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Manager Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-b from-[#8B7FFF]/20 to-white/5 border border-[#8B7FFF]/30 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_30px_rgba(139,127,255,0.15)]"
            >
              <div className="absolute top-[-20px] right-[-20px] p-4 opacity-10 pointer-events-none">
                <Users size={160} />
              </div>
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-[#8B7FFF]/20 rounded-xl border border-[#8B7FFF]/30">
                  <Workflow className="text-[#8B7FFF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The Manager</h3>
                  <p className="text-sm text-[#8B7FFF]">Alignment & Coaching</p>
                </div>
              </div>
              <ul className="space-y-4 relative z-10">
                {['Approve/Reject goals', 'Team performance dashboard', 'Conduct performance reviews', 'Identify team bottlenecks'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={16} className="text-cyan-400" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Admin Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Shield className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">The Admin</h3>
                  <p className="text-sm text-gray-400">Governance & Control</p>
                </div>
              </div>
              <ul className="space-y-4">
                {['Manage goal cycles', 'System-wide audit logs', 'Organizational analytics', 'Role & user management'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={16} className="text-[#10B981]" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#060C1E] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B7FFF] to-cyan-400 flex items-center justify-center">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wide">THRYVE</span>
              <p className="text-xs text-gray-500">Align. Achieve. Thryve.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
          
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Thryve Enterprise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
