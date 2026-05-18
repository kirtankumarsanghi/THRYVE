import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThryveLogo from "../../components/branding/ThryveLogo";
import {
  Target,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Zap,
  Lock,
  MessageSquare,
  Award,
  ArrowRight,
  Sparkles,
  Rocket,
  LineChart,
  Globe,
  Clock,
  Star,
  CheckCircle,
  TrendingDown,
  Activity,
  Calendar,
  FileText,
  Settings,
  Eye,
  Heart,
  Briefcase,
  Building2
} from "lucide-react";

export default function LandingPage() {
  const { token, role, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [previewTilt, setPreviewTilt] = useState({ x: 0, y: 0 });
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreviewMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 8;
    setPreviewTilt({ x: rotateX, y: rotateY });
  };

  const handlePreviewMouseLeave = () => {
    setPreviewTilt({ x: 0, y: 0 });
  };

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setHeroTilt({
      x: (0.5 - py) * 4,
      y: (px - 0.5) * 6,
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  // Redirect if authenticated
  if (!loading && token && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  const features = [
    {
      title: "Strategic Goal Setting",
      description: "Define, track, and align OKRs across the entire organization with real-time progress indicators.",
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Performance Analytics",
      description: "Data-driven insights to measure individual and team growth through comprehensive dashboards.",
      icon: BarChart3,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "Continuous Feedback",
      description: "Foster a culture of growth with 360-degree feedback, 1-on-1s, and peer recognition.",
      icon: MessageSquare,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    {
      title: "Team Alignment",
      description: "Managers can effortlessly oversee team progress, approve check-ins, and clear blockers.",
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    },
    {
      title: "Enterprise Governance",
      description: "Admins maintain complete control over departments, roles, review cycles, and audit logs.",
      icon: Shield,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      title: "Growth & Development",
      description: "Track personal development plans, achievements, and long-term career trajectories.",
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <div className="bg-[#030712] text-gray-300 font-sans min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px] pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-cyan-500/10 via-blue-500/6 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-indigo-500/10 via-blue-500/6 to-transparent pointer-events-none" />
      <div className="absolute inset-0 subtle-grid opacity-[0.14] pointer-events-none" />
      <div className="absolute top-[18%] left-[8%] w-56 h-56 rounded-full border border-cyan-300/10 bg-cyan-300/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-[14%] right-[7%] w-64 h-64 rounded-full border border-blue-300/10 bg-blue-300/5 blur-2xl pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="hero-logo-3d">
          <ThryveLogo size="md" />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-white transition-colors">Features</a>
          <a href="#roles" className="text-sm font-medium hover:text-white transition-colors">Platform Roles</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main
        className="flex-1 relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-6"
        style={{ perspective: "1200px" }}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div
          className="max-w-4xl mx-auto text-center transition-transform duration-200 will-change-transform"
          style={{
            transform: `rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg) translateZ(0px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="hero-spotlight" />
          <div className="absolute left-[-120px] top-[170px] hidden xl:flex hero-side-chip hero-side-chip-left">
            <span className="text-[11px] text-cyan-200/90 font-semibold">+32% execution velocity</span>
          </div>
          <div className="absolute right-[-120px] top-[230px] hidden xl:flex hero-side-chip hero-side-chip-right">
            <span className="text-[11px] text-indigo-200/90 font-semibold">4.8/5 team confidence</span>
          </div>
          <div className="absolute left-[-90px] bottom-[124px] hidden xl:flex hero-stat-pill hero-stat-pill-left">
            <span className="text-cyan-300 font-bold text-sm">1.9x</span>
            <span className="text-gray-300 text-xs ml-2">goal completion</span>
          </div>
          <div className="absolute right-[-92px] bottom-[142px] hidden xl:flex hero-stat-pill hero-stat-pill-right">
            <span className="text-indigo-300 font-bold text-sm">-41%</span>
            <span className="text-gray-300 text-xs ml-2">review delays</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-9 backdrop-blur-sm hero-badge-3d">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-xs md:text-sm font-semibold text-blue-200 tracking-wide uppercase">
              Trusted by leading organizations
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-[-0.02em] mb-7 leading-[1.05] hero-title-3d">
            Turn Ambition into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 animate-gradient">
              Measurable Momentum
            </span>
            <span className="block">Across Every Team</span>
          </h1>
          <div className="mx-auto mb-8 h-[3px] w-40 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400 to-indigo-400/20 hero-title-underline" />
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-200 mb-5 max-w-3xl mx-auto leading-relaxed font-medium">
            Align goals, coaching, and accountability in one operating system for performance.
          </p>
          <p className="text-base md:text-lg text-gray-400 mb-11 max-w-2xl mx-auto leading-relaxed">
            Give leaders real-time clarity and give teams the focus to execute faster with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 p-3 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-md hero-cta-shell">
            <Link
              to="/login"
              className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/20 hero-btn-3d"
            >
              Start your free trial
              <Rocket className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#features"
              className="group w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/15 hover:border-white/30 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2.5 hero-btn-3d"
            >
              Explore platform
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-7 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
              <span>Enterprise-ready security</span>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Preview */}
        <div
          className="w-full max-w-6xl mx-auto mt-28 relative group"
          style={{ perspective: "1400px" }}
          onMouseMove={handlePreviewMouseMove}
          onMouseLeave={handlePreviewMouseLeave}
        >
          <div className="absolute -top-8 -right-4 px-3 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/10 text-[11px] text-blue-200 font-semibold backdrop-blur-sm animate-float-soft">
            Live Performance
          </div>
          <div className="absolute -bottom-6 -left-4 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-[11px] text-emerald-200 font-semibold backdrop-blur-sm animate-float-soft-delayed">
            AI Insights Active
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl opacity-20 blur-3xl group-hover:opacity-30 transition duration-1000 animate-pulse"></div>
          
          {/* Main preview container */}
          <div
            className="relative bg-gradient-to-br from-[#0B1221] to-[#060D1A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden transition-transform duration-200 will-change-transform"
            style={{
              transform: `rotateX(${previewTilt.x}deg) rotateY(${previewTilt.y}deg) translateZ(0px)`,
            }}
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(96,165,250,0.18),transparent_42%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.12),transparent_38%)]" />
            {/* Browser chrome */}
            <div className="h-14 border-b border-white/5 bg-[#060D1A]/80 backdrop-blur-sm flex items-center px-6 justify-between">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 hover:bg-red-400 transition-colors cursor-pointer"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 hover:bg-green-400 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex-1 max-w-md mx-8">
                <div className="h-8 bg-white/5 rounded-lg flex items-center px-4 gap-2">
                  <Lock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500 font-mono">app.thryve.com/dashboard</span>
                </div>
              </div>
              <div className="w-20"></div>
            </div>
            
            {/* Dashboard content */}
            <div className="flex p-8 gap-8 h-[500px] bg-gradient-to-br from-[#0A1224]/50 to-[#060D1A]/50">
              {/* Sidebar */}
              <div className="w-56 flex flex-col gap-4">
                <div className="h-10 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl w-full mb-6 flex items-center px-4">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/30"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-10 bg-white/10 rounded-lg w-full flex items-center px-4 gap-3">
                    <div className="w-4 h-4 rounded bg-blue-400/50"></div>
                    <span className="text-xs text-white font-semibold">Executive Summary</span>
                  </div>
                  <div className="h-10 bg-white/5 rounded-lg w-full flex items-center px-4 gap-3">
                    <div className="w-4 h-4 rounded bg-white/20"></div>
                    <span className="text-xs text-gray-300">Goals</span>
                  </div>
                  <div className="h-10 bg-white/5 rounded-lg w-full flex items-center px-4 gap-3">
                    <div className="w-4 h-4 rounded bg-white/20"></div>
                    <span className="text-xs text-gray-300">Check-ins</span>
                  </div>
                  <div className="h-10 bg-white/5 rounded-lg w-full flex items-center px-4 gap-3">
                    <div className="w-4 h-4 rounded bg-white/20"></div>
                    <span className="text-xs text-gray-300">Analytics</span>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-5">
                  <div className="h-28 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-400/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-300 font-semibold">Completion</span>
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-2xl text-blue-300 font-bold">84%</span>
                  </div>
                  <div className="h-28 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-400/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-300 font-semibold">Active OKRs</span>
                      <Target className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-2xl text-purple-300 font-bold">36</span>
                  </div>
                  <div className="h-28 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-300 font-semibold">Top Performers</span>
                      <Award className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-2xl text-emerald-300 font-bold">112</span>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm text-white font-bold tracking-wide">Quarterly Goal Progress</h4>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                      <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-xs text-gray-300">Sales</span>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-[85%] shadow-lg shadow-blue-500/50"></div>
                      </div>
                      <span className="w-12 text-right text-xs text-blue-300 font-semibold">85%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-xs text-gray-300">Product</span>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full w-[60%] shadow-lg shadow-indigo-500/50"></div>
                      </div>
                      <span className="w-12 text-right text-xs text-indigo-300 font-semibold">60%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-xs text-gray-300">People Ops</span>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full w-[95%] shadow-lg shadow-purple-500/50"></div>
                      </div>
                      <span className="w-12 text-right text-xs text-purple-300 font-semibold">95%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-20 text-xs text-gray-300">Finance</span>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[72%] shadow-lg shadow-emerald-500/50"></div>
                      </div>
                      <span className="w-12 text-right text-xs text-emerald-300 font-semibold">72%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-20 px-6 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3">
                10K+
              </div>
              <div className="text-gray-400 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                500+
              </div>
              <div className="text-gray-400 font-medium">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 mb-3">
                98%
              </div>
              <div className="text-gray-400 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3">
                24/7
              </div>
              <div className="text-gray-400 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-6 bg-[#060D1A] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-300 tracking-wide">POWERFUL FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">A complete performance management ecosystem designed for modern organizations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 hover:from-white/10 hover:to-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.border} border group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Thryve Section */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-purple-300 tracking-wide">WHY THRYVE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Built for the Future of Work
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Thryve combines cutting-edge technology with intuitive design to create a performance management experience that people actually love to use.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                    <p className="text-gray-400">Built with modern technology for instant load times and real-time updates</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Beautiful Interface</h3>
                    <p className="text-gray-400">Designed with attention to detail for an experience that delights users</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Enterprise Security</h3>
                    <p className="text-gray-400">Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Customer Success</h3>
                    <p className="text-gray-400">Dedicated support team and onboarding specialists to ensure your success</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-[#0B1221] to-[#060D1A] rounded-3xl border border-white/10 p-8 space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <LineChart className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-white font-semibold mb-1">Performance Trends</h4>
                      <p className="text-xs text-gray-400">Live KPI movement across quarters</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-white font-semibold mb-1">Team Collaboration</h4>
                      <p className="text-xs text-gray-400">Manager and employee alignment view</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-white font-semibold mb-1">Goal Precision</h4>
                      <p className="text-xs text-gray-400">Track outcomes with clear milestones</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-bold text-blue-300">AI-POWERED INSIGHTS</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Smart recommendations highlight at-risk goals, suggest next best actions, and surface coaching opportunities automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-28 px-6 relative z-10 bg-[#060D1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-indigo-300 tracking-wide">FOR EVERY ROLE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Tailored Experiences</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Customized portals designed to give every user exactly the tools they need to succeed</p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Employee */}
            <div className="flex flex-col md:flex-row items-center gap-12 bg-blue-500/5 border border-blue-500/10 rounded-3xl p-8 md:p-12 hover:border-blue-500/20 transition-all duration-500 group">
              <div className="flex-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 mb-6 border border-blue-500/30">EMPLOYEE PORTAL</span>
                <h3 className="text-2xl font-bold text-white mb-4">Focus on what matters most</h3>
                <p className="text-gray-400 mb-6">Employees get a unified dashboard to track their OKRs, complete quarterly check-ins, request 1-on-1s, and monitor their own development trajectory.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Goal setting & tracking</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Peer feedback & recognition</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Career development planning</li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="aspect-[4/3] bg-gradient-to-br from-[#0A1224] to-[#060D1A] rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 flex items-center justify-center overflow-hidden group-hover:border-blue-400/30 transition-all">
                    <div className="w-full h-full p-6 flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-6 bg-gradient-to-r from-blue-500/30 to-blue-600/20 rounded-lg w-1/3 animate-pulse flex items-center px-3">
                          <span className="text-xs font-bold text-blue-300">My Dashboard</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500/20 transition-all">
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats Cards */}
                      <div className="flex gap-3">
                        <div className="h-20 bg-blue-500/10 border border-blue-500/20 rounded-xl flex-1 p-3 flex flex-col justify-between hover:border-blue-400/30 transition-all">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] text-blue-300 font-semibold">Progress</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-blue-300">78%</span>
                            <span className="text-[8px] text-blue-400/60">+12%</span>
                          </div>
                        </div>
                        <div className="h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex-1 p-3 flex flex-col justify-between hover:border-emerald-400/30 transition-all">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] text-emerald-300 font-semibold">Goals</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-emerald-300">5/7</span>
                            <span className="text-[8px] text-emerald-400/60">active</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Goals List */}
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold text-white">Active OKRs</span>
                          </div>
                          <span className="text-[10px] text-gray-400">Q2 2026</span>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-blue-400/30 transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs text-white font-medium">Improve customer satisfaction</span>
                              <span className="text-[10px] text-emerald-400 font-bold">85%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[85%]"></div>
                            </div>
                            <span className="text-[9px] text-gray-400">Due: Jun 30</span>
                          </div>
                          <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-purple-400/30 transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs text-white font-medium">Launch new feature module</span>
                              <span className="text-[10px] text-purple-400 font-bold">62%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full w-[62%]"></div>
                            </div>
                            <span className="text-[9px] text-gray-400">Due: Jun 15</span>
                          </div>
                          <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-amber-400/30 transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs text-white font-medium">Complete training program</span>
                              <span className="text-[10px] text-amber-400 font-bold">40%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-[40%]"></div>
                            </div>
                            <span className="text-[9px] text-gray-400">Due: Jun 20</span>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Manager */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-purple-500/5 border border-purple-500/10 rounded-3xl p-8 md:p-12 hover:border-purple-500/20 transition-all duration-500 group">
              <div className="flex-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 mb-6 border border-purple-500/30">MANAGER PORTAL</span>
                <h3 className="text-2xl font-bold text-white mb-4">Lead with clarity and confidence</h3>
                <p className="text-gray-400 mb-6">Managers get powerful tools to oversee team performance, approve check-ins, provide feedback, and identify blockers before they become problems.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Team performance dashboard</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Check-in approvals & feedback</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Real-time progress tracking</li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="aspect-[4/3] bg-gradient-to-br from-[#0A1224] to-[#060D1A] rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 flex items-center justify-center overflow-hidden group-hover:border-purple-400/30 transition-all">
                    <div className="w-full h-full p-6 flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-6 bg-gradient-to-r from-purple-500/30 to-purple-600/20 rounded-lg w-1/3 animate-pulse flex items-center px-3">
                          <span className="text-xs font-bold text-purple-300">Team Overview</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center hover:bg-purple-500/20 transition-all">
                            <Users className="w-4 h-4 text-purple-400" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Team Overview Card */}
                      <div className="h-32 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center gap-4 hover:border-purple-400/30 transition-all">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                          <Users className="w-10 h-10 text-purple-300" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <span className="text-sm font-bold text-purple-200">Engineering Team</span>
                          <div className="text-[10px] text-gray-400">12 members â€¢ 48 active goals</div>
                          <div className="flex gap-2 mt-3">
                            <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center gap-1">
                              <span className="text-[10px] text-emerald-300 font-semibold">8 On Track</span>
                            </div>
                            <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center gap-1">
                              <span className="text-[10px] text-amber-300 font-semibold">4 At Risk</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Approvals List */}
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-bold text-white">Pending Approvals</span>
                          </div>
                          <div className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                            <span className="text-[10px] text-amber-300 font-bold">3</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-purple-400/30 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                              <span className="text-xs text-white font-medium">Sarah Chen</span>
                            </div>
                            <span className="text-[10px] text-gray-400 block mb-3">Q2 Check-in â€¢ Submitted 2h ago</span>
                            <div className="flex gap-2">
                              <button className="flex-1 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded hover:bg-emerald-500/30 transition-all">
                                <span className="text-[10px] text-emerald-300 font-semibold">Approve</span>
                              </button>
                              <button className="flex-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30 transition-all">
                                <span className="text-[10px] text-red-300 font-semibold">Request Changes</span>
                              </button>
                            </div>
                          </div>
                          <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-purple-400/30 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600"></div>
                              <span className="text-xs text-white font-medium">Mike Johnson</span>
                            </div>
                            <span className="text-[10px] text-gray-400 block mb-3">Goal Update â€¢ Submitted 5h ago</span>
                            <div className="flex gap-2">
                              <button className="flex-1 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded hover:bg-emerald-500/30 transition-all">
                                <span className="text-[10px] text-emerald-300 font-semibold">Approve</span>
                              </button>
                              <button className="flex-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded hover:bg-red-500/30 transition-all">
                                <span className="text-[10px] text-red-300 font-semibold">Request Changes</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Admin */}
            <div className="flex flex-col md:flex-row items-center gap-12 bg-red-500/5 border border-red-500/10 rounded-3xl p-8 md:p-12 hover:border-red-500/20 transition-all duration-500 group">
              <div className="flex-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 mb-6 border border-red-500/30">ADMIN CONSOLE</span>
                <h3 className="text-2xl font-bold text-white mb-4">Complete organizational control</h3>
                <p className="text-gray-400 mb-6">Administrators can configure the entire platform. Manage users, create departments, set review cycles, and monitor audit logs seamlessly.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-red-400" /> User & Role Management</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-red-400" /> Organization-wide analytics</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-red-400" /> Compliance & Audit Logs</li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="aspect-[4/3] bg-gradient-to-br from-[#0A1224] to-[#060D1A] rounded-2xl border border-red-500/20 shadow-2xl shadow-red-500/10 flex items-center justify-center overflow-hidden group-hover:border-red-400/30 transition-all">
                    <div className="w-full h-full p-6 flex flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-6 bg-gradient-to-r from-red-500/30 to-red-600/20 rounded-lg w-1/3 animate-pulse flex items-center px-3">
                          <span className="text-xs font-bold text-red-300">Admin Console</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all">
                            <Shield className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all">
                            <Settings className="w-4 h-4 text-red-400" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:border-red-400/30 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-3 h-3 text-red-400" />
                            <span className="text-[10px] text-red-300 font-semibold">Total Users</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-red-300">247</span>
                            <span className="text-[8px] text-red-400/60">+12 this month</span>
                          </div>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:border-indigo-400/30 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-3 h-3 text-indigo-400" />
                            <span className="text-[10px] text-indigo-300 font-semibold">Departments</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-indigo-300">8</span>
                            <span className="text-[8px] text-indigo-400/60">active</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* User Management Table */}
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-bold text-white">Recent Activity</span>
                          </div>
                          <span className="text-[10px] text-gray-400">Last 24h</span>
                        </div>
                        <div className="space-y-2">
                          {/* Table Header */}
                          <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/10">
                            <span className="text-[10px] text-gray-400 font-semibold">User</span>
                            <span className="text-[10px] text-gray-400 font-semibold">Role</span>
                            <span className="text-[10px] text-gray-400 font-semibold">Status</span>
                          </div>
                          {/* Table Rows */}
                          <div className="grid grid-cols-3 gap-2 py-2 hover:bg-white/5 rounded transition-all">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                              <span className="text-[10px] text-white font-medium">Alex Kim</span>
                            </div>
                            <span className="text-[10px] text-blue-400 font-medium">Manager</span>
                            <span className="text-[10px] text-emerald-400 font-medium">Active</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-2 hover:bg-white/5 rounded transition-all">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600"></div>
                              <span className="text-[10px] text-white font-medium">Emma Davis</span>
                            </div>
                            <span className="text-[10px] text-purple-400 font-medium">Employee</span>
                            <span className="text-[10px] text-emerald-400 font-medium">Active</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-2 hover:bg-white/5 rounded transition-all">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600"></div>
                              <span className="text-[10px] text-white font-medium">John Smith</span>
                            </div>
                            <span className="text-[10px] text-red-400 font-medium">Admin</span>
                            <span className="text-[10px] text-emerald-400 font-medium">Active</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-2 hover:bg-white/5 rounded transition-all">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
                              <span className="text-[10px] text-white font-medium">Lisa Wong</span>
                            </div>
                            <span className="text-[10px] text-purple-400 font-medium">Employee</span>
                            <span className="text-[10px] text-gray-400 font-medium">Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-28 px-6 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-[2.5rem] p-12 md:p-16 text-center backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-8">
              <Rocket className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-bold text-blue-200 tracking-wide">START YOUR JOURNEY</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Performance Culture?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of organizations using Thryve to drive alignment, engagement, and results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/login"
                className="group w-full sm:w-auto px-10 py-5 bg-white text-gray-900 hover:bg-gray-100 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transform"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/30 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5" />
                Schedule Demo
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#030712] py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <ThryveLogo size="md" className="mb-6" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
                Thryve is the modern performance management platform that connects strategy to execution, empowering teams to achieve their best work.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all">
                  <Globe className="w-5 h-5 text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all">
                  <Activity className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#roles" className="text-gray-400 hover:text-white transition-colors text-sm">Platform Roles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Thryve Enterprise. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px) translateZ(0); }
          50% { transform: translateY(-7px) translateZ(0); }
        }
        @keyframes logoOrbit {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg) translateY(0); }
          50% { transform: rotateX(8deg) rotateY(-8deg) translateY(-2px); }
        }
        @keyframes chipDriftLeft {
          0%, 100% { transform: translateY(0) translateX(0) rotate(-2deg); }
          50% { transform: translateY(-8px) translateX(-4px) rotate(-1deg); }
        }
        @keyframes chipDriftRight {
          0%, 100% { transform: translateY(0) translateX(0) rotate(2deg); }
          50% { transform: translateY(-8px) translateX(4px) rotate(1deg); }
        }
        @keyframes titleUnderlinePulse {
          0%, 100% { opacity: 0.7; filter: blur(0); }
          50% { opacity: 1; filter: blur(1px); }
        }
        @keyframes spotlightShift {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.5; }
          50% { transform: translateX(-46%) scale(1.08); opacity: 0.72; }
        }
        @keyframes statDrift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-float-soft {
          animation: floatSoft 4.2s ease-in-out infinite;
        }
        .animate-float-soft-delayed {
          animation: floatSoft 4.8s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .hero-logo-3d {
          transform-style: preserve-3d;
          animation: logoOrbit 6s ease-in-out infinite;
          filter: drop-shadow(0 10px 25px rgba(59, 130, 246, 0.25));
        }
        .hero-badge-3d {
          transform: translateZ(20px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 30px rgba(8, 14, 40, 0.35);
        }
        .hero-title-3d {
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 45px rgba(0, 0, 0, 0.45);
          transform: translateZ(34px);
        }
        .hero-btn-3d {
          transform: translateZ(22px);
          box-shadow: 0 10px 25px rgba(12, 18, 38, 0.35);
        }
        .hero-btn-3d:hover {
          transform: translateZ(34px) translateY(-2px);
        }
        .hero-side-chip {
          padding: 0.55rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 34px rgba(2, 8, 30, 0.4);
          transform-style: preserve-3d;
        }
        .hero-side-chip-left {
          animation: chipDriftLeft 5s ease-in-out infinite;
        }
        .hero-side-chip-right {
          animation: chipDriftRight 5.5s ease-in-out infinite;
          animation-delay: 0.35s;
        }
        .hero-spotlight {
          position: absolute;
          left: 50%;
          top: 16%;
          width: 540px;
          height: 220px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.28) 0%, rgba(59, 130, 246, 0.09) 46%, rgba(2, 6, 23, 0) 78%);
          filter: blur(22px);
          pointer-events: none;
          animation: spotlightShift 6.5s ease-in-out infinite;
          z-index: -1;
        }
        .hero-title-underline {
          animation: titleUnderlinePulse 3.2s ease-in-out infinite;
          box-shadow: 0 0 35px rgba(59, 130, 246, 0.35);
        }
        .hero-cta-shell {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 14px 36px rgba(0, 0, 0, 0.36);
          transform: translateZ(14px);
        }
        .hero-stat-pill {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: linear-gradient(180deg, rgba(10, 20, 46, 0.88), rgba(8, 16, 38, 0.7));
          box-shadow: 0 18px 34px rgba(2, 8, 30, 0.42);
          backdrop-filter: blur(10px);
          transform-style: preserve-3d;
        }
        .hero-stat-pill-left {
          animation: statDrift 4.6s ease-in-out infinite;
        }
        .hero-stat-pill-right {
          animation: statDrift 5.2s ease-in-out infinite;
          animation-delay: 0.35s;
        }
      `}</style>
    </div>
  );
}

