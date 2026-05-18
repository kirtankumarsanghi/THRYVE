import os

team_goals_content = """import React, { useState, useEffect } from "react";
import { Target, Search, Filter, Plus, ChevronRight, BarChart2 } from "lucide-react";
import { getGoals } from "../../api/goalsApi";
import { motion } from "framer-motion";

export default function TeamGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await getGoals();
      setGoals(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGoals = filter === "All" ? goals : goals.filter(g => g.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen text-white">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Team Goals</h1>
          <p className="text-gray-400">Track and manage Objectives and Key Results across your team.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={18} /> Assign New Goal
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 p-1 bg-[#131B2F] border border-white/5 rounded-xl shadow-xl overflow-x-auto">
          {['All', 'On Track', 'At Risk', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                filter === f 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search goals..."
            className="w-full h-full min-h-[44px] bg-[#131B2F] border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGoals.map(goal => (
          <motion.div 
            key={goal.id}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${
                goal.status === 'On Track' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                goal.status === 'At Risk' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              }`}>
                {goal.status}
              </span>
              <span className="text-xs text-gray-500 font-bold">{goal.dueDate}</span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{goal.title}</h3>
            <p className="text-sm text-gray-400 mb-6 line-clamp-2">{goal.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{goal.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${goal.status === 'At Risk' ? 'bg-red-400' : 'bg-indigo-500'}`} 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                  {goal.assignee ? goal.assignee.charAt(0) : 'T'}
                </div>
                <span className="text-xs font-bold text-gray-400">{goal.assignee || 'Team Goal'}</span>
              </div>
              <button className="text-indigo-400 hover:text-indigo-300">
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
"""

feedback_content = """import React from "react";
import EmployeeFeedbackHistory from "../employee/FeedbackHistory";

// Re-using the EmployeeFeedbackHistory layout for the manager view but adding team context
export default function FeedbackRecognition() {
  return (
    <div className="manager-feedback-wrapper">
       <EmployeeFeedbackHistory />
    </div>
  );
}
"""

performance_content = """import React, { useState, useEffect } from "react";
import { TrendingUp, BarChart2, Users, Star, ArrowUpRight } from "lucide-react";
import { getAnalyticsData } from "../../api/analyticsApi";

export default function PerformanceInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAnalyticsData();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Performance Insights</h1>
        <p className="text-gray-400">Deep dive into team metrics, skill matrices, and output analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Metric Cards */}
        <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Team Velocity</p>
            <h2 className="text-3xl font-bold text-white mb-2">92<span className="text-lg text-gray-500">pts</span></h2>
            <p className="text-[10px] font-bold text-green-400 flex items-center gap-1"><ArrowUpRight size={12}/> +12% this sprint</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">High Performers</p>
            <h2 className="text-3xl font-bold text-white mb-2">4<span className="text-lg text-gray-500">/12</span></h2>
            <p className="text-[10px] font-bold text-green-400 flex items-center gap-1"><ArrowUpRight size={12}/> Top quartile</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
            <Star size={24} />
          </div>
        </div>

        <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Skill Gap Index</p>
            <h2 className="text-3xl font-bold text-white mb-2">14<span className="text-lg text-gray-500">%</span></h2>
            <p className="text-[10px] font-bold text-amber-400 flex items-center gap-1">Needs attention</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
            <BarChart2 size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6">Performance 9-Box Grid</h2>
          <div className="aspect-square w-full bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-8">
             <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-2">
               {/* Just a placeholder for the grid UI */}
               {[...Array(9)].map((_, i) => (
                 <div key={i} className={`rounded-lg flex items-center justify-center ${i === 2 || i === 5 ? 'bg-green-500/20' : i === 8 || i === 7 ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                    {i === 2 && <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>}
                    {i === 4 && <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>}
                    {i === 4 && <div className="w-4 h-4 bg-white/80 rounded-full ml-2"></div>}
                 </div>
               ))}
             </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-4 font-bold uppercase tracking-wider">
            <span>Potential &rarr;</span>
            <span>Performance &uarr;</span>
          </div>
        </div>

        <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
           <h2 className="text-lg font-bold text-white mb-6">Team Output Distribution</h2>
           <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-white">Feature Development</span>
                  <span className="text-indigo-400">45%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-white">Bug Fixes & Maintenance</span>
                  <span className="text-cyan-400">30%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-white">Infrastructure</span>
                  <span className="text-purple-400">15%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-white">Documentation</span>
                  <span className="text-gray-400">10%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full">
                  <div className="h-full bg-gray-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\manager\TeamGoals.jsx", "w", encoding="utf-8") as f:
    f.write(team_goals_content)

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\manager\FeedbackRecognition.jsx", "w", encoding="utf-8") as f:
    f.write(feedback_content)

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\manager\PerformanceInsights.jsx", "w", encoding="utf-8") as f:
    f.write(performance_content)

