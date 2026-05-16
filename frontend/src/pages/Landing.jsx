import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: "flag",
      title: "Goal Management",
      description: "Set, track, and achieve your quarterly objectives with intelligent goal tracking and progress monitoring."
    },
    {
      icon: "groups",
      title: "Team Collaboration",
      description: "Foster alignment across your organization with transparent goal sharing and collaborative check-ins."
    },
    {
      icon: "monitoring",
      title: "Real-time Analytics",
      description: "Gain insights with powerful analytics dashboards and predictive performance indicators."
    },
    {
      icon: "auto_awesome",
      title: "AI-Powered Insights",
      description: "Leverage artificial intelligence to identify risks, suggest improvements, and optimize team performance."
    },
    {
      icon: "shield",
      title: "Enterprise Security",
      description: "Bank-level security with role-based access control, audit logs, and compliance features."
    },
    {
      icon: "trending_up",
      title: "Performance Reviews",
      description: "Streamline quarterly reviews with structured check-ins, manager approvals, and feedback loops."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "50K+", label: "Goals Tracked" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(192,193,255,0.3)]">
                <span className="font-display-xl text-[24px] font-bold text-surface-container-lowest">T</span>
              </div>
              <span className="font-display-xl text-[32px] font-bold text-primary tracking-tight">Thryve</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors">How It Works</a>
              <a href="#pricing" className="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-title-md text-body-sm transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-title-md text-body-sm font-semibold hover:bg-primary-fixed transition-colors shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)]"
              >
                Get Started
              </button>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="md:hidden text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <span className="material-symbols-outlined text-primary text-[16px]">auto_awesome</span>
              <span className="font-label-caps text-label-caps text-primary">AI-Powered Performance Management</span>
            </div>
            
            <h1 className="font-display-xl text-[48px] md:text-[72px] font-bold text-on-surface leading-tight mb-6 tracking-tight">
              Align. Achieve.{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                Thryve.
              </span>
            </h1>
            
            <p className="font-body-base text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              Transform your organization's performance with intelligent goal tracking, real-time analytics, and AI-powered insights. Built for modern teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-lg font-title-md text-body-base font-semibold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:shadow-[0_0_30px_rgba(192,193,255,0.5)] flex items-center justify-center gap-2"
              >
                Start Free Trial
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button 
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-surface-variant/30 text-on-surface border border-outline-variant/20 hover:bg-surface-variant/50 rounded-lg font-title-md text-body-base transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-outline-variant/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display-xl text-[36px] md:text-[48px] font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8 bg-surface-container/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">Features</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-6">
              Everything you need to succeed
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto">
              Powerful features designed to help your team set goals, track progress, and achieve exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#0F172A] border border-white/5 rounded-xl p-8 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-primary text-[28px]">{feature.icon}</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-3">{feature.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">Process</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-6">
              Simple, powerful workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Set Goals", desc: "Define clear, measurable objectives aligned with company strategy", icon: "flag" },
              { step: "02", title: "Track Progress", desc: "Monitor real-time progress with intuitive dashboards and analytics", icon: "show_chart" },
              { step: "03", title: "Achieve Results", desc: "Complete quarterly reviews and celebrate team achievements", icon: "emoji_events" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-[#0F172A] border border-white/5 rounded-xl p-8 text-center">
                  <div className="inline-flex w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-[32px]">{item.icon}</span>
                  </div>
                  <div className="font-label-caps text-label-caps text-primary mb-3">{item.step}</div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-3">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-tertiary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
            Ready to transform your team's performance?
          </h2>
          <p className="font-body-base text-body-base text-on-surface-variant mb-10">
            Join thousands of organizations using Thryve to achieve their goals.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-primary text-on-primary rounded-lg font-title-md text-body-base font-semibold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:shadow-[0_0_30px_rgba(192,193,255,0.5)] inline-flex items-center gap-2"
          >
            Get Started Free
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-display-xl text-[18px] font-bold text-surface-container-lowest">T</span>
              </div>
              <span className="font-display-xl text-[24px] font-bold text-primary">Thryve</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Terms</a>
              <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              © 2024 Thryve. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
