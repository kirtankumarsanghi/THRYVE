import os

content = """import React, { useState, useEffect } from "react";
import { Activity, Target, Briefcase, Award, TrendingUp, ChevronRight, Zap, BookOpen } from "lucide-react";
import { getEmployeeDevelopment } from "../../api/employeeApi";

export default function EmployeeDevelopment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Growth Plan");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getEmployeeDevelopment();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Development</h1>
        <div className="flex gap-8 border-b border-white/10">
          {['Growth Plan', 'Skills', 'Certifications'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Growth Plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Skill Proficiency Matrix */}
          <div className="col-span-1 lg:col-span-3 bg-[#131B2F] border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-lg font-bold text-white">Skill Proficiency Matrix</h2>
                <p className="text-xs text-gray-400">Current state vs. Target trajectory</p>
              </div>
              <Activity className="text-indigo-400" size={20} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Fake Radar Chart label area */}
              <div className="flex-1 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                <div className="mb-2">Soft</div>
                <div className="mb-2">Skills</div>
                <div className="mb-2 text-white">LeadershipStrategy</div>
                <div>Technical</div>
              </div>

              {/* Progress bars */}
              <div className="flex-[2] space-y-8 w-full">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white">Technical Mastery</span>
                    <span className="text-cyan-400">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white">Leadership Presence</span>
                    <span className="text-indigo-400">64%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white">System Architecture</span>
                    <span className="text-purple-400">45%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Trajectory */}
          <div className="col-span-1 lg:col-span-2 bg-[#131B2F] border border-white/5 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-6">Career Trajectory</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10">
              <div className="relative flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-indigo-500 bg-[#131B2F] z-10 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current Role</p>
                  <p className="text-white font-bold">Senior Engineer II</p>
                  <p className="text-xs text-gray-500 mt-1">Focused on scalable backend services</p>
                </div>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-white/10 bg-[#131B2F] z-10 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Next Milestone (Est. Q4)</p>
                  <p className="text-white font-bold">Staff Engineer</p>
                  <p className="text-xs text-gray-500 mt-1">Strategic infrastructure &amp; leadership</p>
                </div>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-white/10 bg-[#131B2F] z-10 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Future Path</p>
                  <p className="text-gray-500 font-bold">Principal Architect</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm italic text-indigo-200">
              "You are 3 critical skills away from reaching Staff Engineer eligibility."
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Growth Plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Objectives */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-3">
                Active Objectives 
                <span className="bg-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wider">3 Active</span>
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-[#131B2F] border border-white/5 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <Target className="text-cyan-400" size={16} />
                    <span className="font-bold text-sm">Master System Design Architecture</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-cyan-500/10 text-cyan-400 uppercase tracking-wider rounded-md border border-cyan-500/20">In Progress</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">75% Complete</span>
                </div>
              </div>

              <div className="bg-[#131B2F] border border-white/5 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <Award className="text-indigo-400" size={16} />
                    <span className="font-bold text-sm">Executive Leadership Program</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/10 text-indigo-400 uppercase tracking-wider rounded-md border border-indigo-500/20">On Track</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">30% Complete</span>
                </div>
              </div>

              <div className="bg-[#131B2F] border border-white/5 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <Zap className="text-purple-400" size={16} />
                    <span className="font-bold text-sm">Rust Performance Optimization</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-white/5 text-gray-400 uppercase tracking-wider rounded-md border border-white/10">Early Stage</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">15% Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI Recommendations</h3>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <div className="space-y-4">
              <div className="bg-[#131B2F] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                <div className="h-24 bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 border-b border-white/5"></div>
                <div className="p-5">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-2">Internal Project</p>
                  <h4 className="font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Project: Nebula Engine Refactor</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Apply your system architecture skills by participating in the core engine rewrite phase.</p>
                </div>
              </div>

              <div className="bg-[#131B2F] border border-white/5 p-4 rounded-2xl flex gap-4 items-center group cursor-pointer shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex-shrink-0 border border-white/10"></div>
                <div>
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Premium Course</p>
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors mb-1">Strategic Decision Making</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><BookOpen size={12}/> 4.5 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"""

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\employee\MyDevelopment.jsx", "w", encoding="utf-8") as f:
    f.write(content)
