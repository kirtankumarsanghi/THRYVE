import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
  const { token, role, loading } = useAuth();

  // If user is already authenticated, redirect them to their dashboard
  if (!loading && token && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return (
    <div className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Ambient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-tertiary-container/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Navigation Header (Transactional Context, not main app nav) */}
      <header className="w-full flex items-center justify-between px-margin-mobile md:px-margin-desktop py-gutter z-50 relative">
        <div className="flex items-center gap-unit">
          <span className="material-symbols-outlined text-primary text-[32px]">hexagon</span>
          <span className="font-title-md text-title-md font-bold tracking-tight text-on-surface">Thryve</span>
        </div>
        <nav className="hidden md:flex items-center gap-gutter">
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#features">Features</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#solutions">Solutions</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#pricing">Pricing</a>
        </nav>
        <div className="flex items-center gap-unit">
          <Link className="hidden md:inline-flex px-4 py-2 font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors" to="/login">Log In</Link>
          <Link className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] transition-all" to="/login">Get Started</Link>
        </div>
      </header>

      <main className="flex-grow z-10 relative">
        {/* Hero Section */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">Thryve 2.0 is live</span>
          </div>

          <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl max-w-4xl text-on-surface mb-6 leading-tight">
            Align. Achieve. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary-container">Thryve.</span>
          </h1>

          <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mb-12">
            The intelligent execution platform for high-performance teams. Translate strategic vision into measurable daily outcomes with executive-grade clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-semibold hover:bg-primary-container hover:shadow-[0_0_30px_rgba(192,193,255,0.4)] transition-all flex items-center justify-center">
              Get Started
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface font-body-sm text-body-sm hover:bg-surface-variant hover:border-outline-variant/50 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              View Demo
            </button>
          </div>

          {/* Dashboard Preview Graphic */}
          <div className="w-full mt-24 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-tertiary-container to-secondary rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0F172A] rounded-xl border border-white/5 shadow-2xl overflow-hidden aspect-[16/9] max-w-5xl mx-auto flex flex-col">
              {/* Faux App Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-surface-container/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
                  <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
                  <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
                </div>
                <div className="h-6 w-48 bg-surface-container-high rounded flex items-center px-2">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant mr-2">search</span>
                  <div className="h-2 w-24 bg-outline-variant/30 rounded"></div>
                </div>
              </div>

              {/* Faux App Content Area */}
              <div className="flex-grow flex p-6 gap-6">
                {/* Sidebar Faux */}
                <div className="hidden md:flex flex-col w-56 gap-2 border-r border-white/5 pr-6">
                  <div className="text-xs font-semibold text-outline-variant uppercase tracking-wider mb-2 px-3">Navigation</div>
                  <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    <span className="text-sm font-medium">Overview</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[18px]">track_changes</span>
                    <span className="text-sm font-medium">Strategic Goals</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                    <span className="text-sm font-medium">Team Alignment</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[18px]">assessment</span>
                    <span className="text-sm font-medium">Analytics</span>
                  </div>
                </div>

                {/* Main Content Faux Bento */}
                <div className="flex-grow grid grid-cols-3 gap-6">
                  
                  {/* Top KPIs */}
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    <div className="bg-surface-container-low rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
                      <div className="text-xs text-on-surface-variant mb-1">Company OKR Progress</div>
                      <div className="text-2xl font-bold text-on-surface">68%</div>
                      <div className="absolute bottom-0 left-0 h-1 bg-primary w-[68%]"></div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
                      <div className="text-xs text-on-surface-variant mb-1">Goals On Track</div>
                      <div className="text-2xl font-bold text-secondary">24 <span className="text-base text-on-surface-variant font-normal">/ 32</span></div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
                      <div className="text-xs text-on-surface-variant mb-1">Team Engagement</div>
                      <div className="text-2xl font-bold text-tertiary-container">94%</div>
                      <div className="flex -space-x-2 mt-2">
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-[#0F172A]"></div>
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-green-400 to-teal-500 border-2 border-[#0F172A]"></div>
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 border-2 border-[#0F172A]"></div>
                         <div className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-[#0F172A] flex items-center justify-center text-[10px] text-on-surface">+8</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Chart / Active Goal */}
                  <div className="col-span-3 md:col-span-2 bg-surface-container-low rounded-xl border border-white/5 p-5 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[50px]"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div>
                        <h3 className="text-lg font-semibold text-on-surface">Q3 Strategic Objective</h3>
                        <p className="text-sm text-on-surface-variant">Expand enterprise market share by 15%</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium border border-secondary/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> On Track
                      </span>
                    </div>
                    
                    {/* Faux Key Results */}
                    <div className="space-y-4 relative z-10 mt-auto">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-on-surface font-medium">KR1: Close 5 enterprise deals</span>
                          <span className="text-primary font-bold">80%</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[80%] rounded-full relative">
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-on-surface font-medium">KR2: Launch SSO integration</span>
                          <span className="text-secondary font-bold">100%</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-secondary w-full rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-on-surface font-medium">KR3: Achieve SOC2 compliance</span>
                          <span className="text-on-surface-variant font-bold">45%</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary-container w-[45%] rounded-full relative"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Side Metric - Alignment Score */}
                  <div className="col-span-3 md:col-span-1 bg-surface-container-low rounded-xl border border-white/5 p-5 flex flex-col items-center justify-center relative overflow-hidden">
                    <h3 className="text-sm font-medium text-on-surface-variant mb-6 self-start w-full text-center">Org Alignment Score</h3>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      {/* Faux Circular Progress */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="stroke-surface-container-high" strokeWidth="8" fill="none" />
                        <circle cx="50" cy="50" r="40" className="stroke-tertiary-container drop-shadow-[0_0_8px_rgba(202,196,208,0.5)]" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="45" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-on-surface">82<span className="text-lg text-on-surface-variant">%</span></span>
                        <span className="text-[10px] text-secondary flex items-center"><span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> +5%</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Bento Grid */}
        <section id="features" className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
          <div className="mb-16 md:text-center max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Executive Intelligence</h2>
            <p className="font-body-base text-body-base text-on-surface-variant">A unified ecosystem designed for clarity, momentum, and authority.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-gutter">
            {/* Feature 1: Goal Alignment (Large) */}
            <div className="md:col-span-8 bg-[#0F172A] rounded-xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="material-symbols-outlined text-primary text-[32px] mb-4">account_tree</span>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Goal Alignment</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">Cascade strategic objectives down to individual tasks effortlessly. Ensure every team member understands their contribution to the bigger picture.</p>
                <div className="mt-auto w-full max-w-sm">
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary w-[75%] rounded-full relative">
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30"></div>
                    </div>
                  </div>
                  <div className="flex justify-between font-label-caps text-label-caps text-on-surface-variant">
                    <span>Q3 Objectives</span>
                    <span className="text-primary">75%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Analytics Dashboard (Small) */}
            <div className="md:col-span-4 bg-[#0F172A] rounded-xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col">
              <span className="material-symbols-outlined text-tertiary-container text-[32px] mb-4">monitoring</span>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Analytics Dashboard</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time performance metrics visualized with clarity.</p>
              <div className="mt-auto h-24 w-full bg-surface-container-high/50 rounded flex items-end px-2 gap-2">
                {/* Simple bar chart visual */}
                <div className="w-full bg-tertiary-container/20 h-1/3 rounded-t"></div>
                <div className="w-full bg-tertiary-container/40 h-2/3 rounded-t"></div>
                <div className="w-full bg-tertiary-container/60 h-1/2 rounded-t"></div>
                <div className="w-full bg-tertiary-container h-full rounded-t relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div></div>
              </div>
            </div>

            {/* Feature 3: Smart Approvals (Small) */}
            <div className="md:col-span-4 bg-[#0F172A] rounded-xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-4">fact_check</span>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Smart Approvals</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Streamline workflows with automated approval routing.</p>
              <div className="mt-auto space-y-2">
                <div className="p-3 bg-surface-container-high rounded flex justify-between items-center">
                  <div className="w-20 h-2 bg-outline-variant/30 rounded"></div>
                  <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                </div>
                <div className="p-3 bg-surface-container-high rounded flex justify-between items-center opacity-50">
                  <div className="w-16 h-2 bg-outline-variant/30 rounded"></div>
                  <span className="material-symbols-outlined text-outline-variant text-[16px]">schedule</span>
                </div>
              </div>
            </div>

            {/* Feature 4: Quarterly Tracking (Large) */}
            <div className="md:col-span-8 bg-[#0F172A] rounded-xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="material-symbols-outlined text-on-surface text-[32px] mb-4">calendar_month</span>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Quarterly Tracking</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">Maintain momentum across quarters with deep historical context and predictive pacing models.</p>
                <div className="mt-auto grid grid-cols-4 gap-2">
                  <div className="bg-surface-container p-3 rounded border border-white/5 text-center">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Q1</span>
                    <span className="text-primary font-semibold">100%</span>
                  </div>
                  <div className="bg-surface-container p-3 rounded border border-white/5 text-center">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Q2</span>
                    <span className="text-primary font-semibold">100%</span>
                  </div>
                  <div className="bg-surface-container-high p-3 rounded border border-primary/30 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <span className="font-label-caps text-label-caps text-primary block mb-1 relative z-10">Q3</span>
                    <span className="text-on-surface font-semibold relative z-10">In Progress</span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded border border-white/5 text-center opacity-50">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Q4</span>
                    <span className="text-on-surface-variant font-semibold">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="w-full border-t border-outline-variant/10 bg-surface-container-lowest pt-16 pb-8 px-margin-mobile md:px-margin-desktop mt-24">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-unit mb-6">
              <span className="material-symbols-outlined text-primary text-[24px]">hexagon</span>
              <span className="font-title-md text-[18px] font-bold tracking-tight text-on-surface">Thryve</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Executive-grade execution platform for modern enterprises.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-on-surface">Product</span>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Changelog</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-on-surface">Company</span>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About Us</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Careers</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-on-surface">Legal</span>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
        
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/10">
          <p className="font-body-sm text-[12px] text-on-surface-variant mb-4 md:mb-0">© {new Date().getFullYear()} Thryve Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-[20px]">language</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-[20px]">mail</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
