import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
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
      title: "Goal Alignment",
      description: "Ensure every team member's goals are aligned with company objectives and strategic priorities."
    },
    {
      icon: "analytics",
      title: "Analytics Dashboard",
      description: "Real-time performance insights with powerful analytics and predictive indicators."
    },
    {
      icon: "verified",
      title: "Smart Approvals",
      description: "Streamline goal approval workflow with automated routing and intelligent notifications."
    },
    {
      icon: "calendar_month",
      title: "Quarterly Tracking",
      description: "Structured quarterly check-ins and performance reviews with automated reminders."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b7fff] to-[#6b5dd3] flex items-center justify-center shadow-[0_0_30px_rgba(139,127,255,0.4)]">
                <span className="material-symbols-outlined text-white text-[24px]">auto_awesome</span>
              </div>
              <span className="text-[28px] font-bold tracking-tight">Thryve</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
              <a href="#demo" className="text-gray-400 hover:text-white transition-colors text-sm">Demo</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-[#8b7fff] hover:bg-[#7a6eef] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_20px_rgba(139,127,255,0.3)] hover:shadow-[0_0_30px_rgba(139,127,255,0.5)]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8b7fff]/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#4cd7f6]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[#8b7fff] text-[16px]">auto_awesome</span>
              <span className="text-sm text-gray-300 uppercase tracking-wider font-semibold">Thryve 2.0 is Live</span>
            </div>
            
            <h1 className="text-[56px] md:text-[72px] lg:text-[84px] font-bold leading-[1.1] mb-6 tracking-tight">
              Align. Achieve.{" "}
              <span className="bg-gradient-to-r from-[#8b7fff] via-[#4cd7f6] to-[#ddb7ff] bg-clip-text text-transparent">
                Thryve.
              </span>
            </h1>
            
            <p className="text-[18px] md:text-[20px] text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The intelligent goal-driven platform for high-performance teams — measure strategy, deliver results, and unlock measurable daily outcomes in a structured, scalable system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 bg-[#8b7fff] hover:bg-[#7a6eef] text-white rounded-xl font-semibold transition-all shadow-[0_0_30px_rgba(139,127,255,0.4)] hover:shadow-[0_0_40px_rgba(139,127,255,0.6)] flex items-center justify-center gap-2 text-[16px]"
              >
                Get Started
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button 
                onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-[16px] backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                View Demo
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div id="demo" className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(139,127,255,0.2)] backdrop-blur-sm bg-[#0f1420]/50">
              {/* Browser Chrome */}
              <div className="bg-[#1a1f2e] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="flex-1 mx-4 bg-[#0f1420] rounded-lg px-3 py-1.5 text-xs text-gray-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  app.thryve.io/dashboard
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="bg-gradient-to-br from-[#0f1420] to-[#1a1f2e] p-8">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Active Goals", value: "24", color: "#8b7fff" },
                    { label: "Completion", value: "87%", color: "#4cd7f6" },
                    { label: "Team Members", value: "156", color: "#ddb7ff" },
                    { label: "This Quarter", value: "Q3", color: "#10b981" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#8b7fff]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#8b7fff] text-[18px]">show_chart</span>
                      </div>
                      <span className="text-sm font-semibold">Performance Trend</span>
                    </div>
                    <div className="space-y-2">
                      {[85, 70, 92, 78].map((height, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-12 text-xs text-gray-500">Q{i+1}</div>
                          <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#8b7fff] to-[#4cd7f6] rounded-lg transition-all duration-1000"
                              style={{ width: `${height}%` }}
                            ></div>
                          </div>
                          <div className="w-12 text-xs text-gray-400 text-right">{height}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#4cd7f6]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">donut_small</span>
                      </div>
                      <span className="text-sm font-semibold">Goal Distribution</span>
                    </div>
                    <div className="flex items-center justify-center h-32">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12"/>
                          <circle cx="64" cy="64" r="56" fill="none" stroke="#4cd7f6" strokeWidth="12" strokeDasharray="220 352" strokeLinecap="round"/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold">87%</div>
                            <div className="text-xs text-gray-400">Complete</div>
                          </div>
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

      {/* Executive Intelligence Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#0f1420]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] md:text-[52px] font-bold mb-6 leading-tight">
              Executive Intelligence
            </h2>
            <p className="text-[18px] text-gray-400 max-w-2xl mx-auto">
              A unified dashboard designed for clarity, momentum, and authentic performance insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#8b7fff]/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b7fff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-[#8b7fff]/10 border border-[#8b7fff]/20 flex items-center justify-center mb-6 group-hover:bg-[#8b7fff]/20 group-hover:scale-110 transition-all">
                    <span className="material-symbols-outlined text-[#8b7fff] text-[28px]">{feature.icon}</span>
                  </div>
                  <h3 className="text-[20px] font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b7fff]/20 via-[#4cd7f6]/20 to-[#ddb7ff]/20 blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-[38px] md:text-[48px] font-bold mb-6 leading-tight">
                Ready to transform your team's performance?
              </h2>
              <p className="text-[18px] text-gray-400 mb-10">
                Join thousands of organizations using Thryve to achieve their goals.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-[#8b7fff] hover:bg-[#7a6eef] text-white rounded-xl font-semibold transition-all shadow-[0_0_30px_rgba(139,127,255,0.4)] hover:shadow-[0_0_40px_rgba(139,127,255,0.6)] inline-flex items-center gap-2 text-[16px]"
              >
                Get Started Free
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b7fff] to-[#6b5dd3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[18px]">auto_awesome</span>
                </div>
                <span className="text-[20px] font-bold">Thryve</span>
              </div>
              <p className="text-sm text-gray-400">
                Scalable, goal-driven productivity platform for modern businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">© 2024 Thryve Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">language</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
