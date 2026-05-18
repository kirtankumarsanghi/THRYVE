import os

content = """import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Star, TrendingUp, AlertCircle, Award } from "lucide-react";
import { getAnalyticsData } from "../../api/analyticsApi";

export default function EmployeeFeedbackHistory() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or use getAnalyticsData
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Feedback History</h1>
        <p className="text-gray-400">Quarterly synthesis and sentiment analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Activity Feed</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-md border border-indigo-500/20">All</span>
              <span className="px-3 py-1 bg-[#131B2F] text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider rounded-md border border-white/5 cursor-pointer">Praise</span>
              <span className="px-3 py-1 bg-[#131B2F] text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider rounded-md border border-white/5 cursor-pointer">Constructive</span>
            </div>
          </div>

          {/* Feed Items */}
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl flex gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[10px] font-bold px-2 py-1 bg-green-500/10 text-green-400 uppercase tracking-wider rounded-md border border-green-500/20">Peer Review</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              JS
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-white">James Smith</h3>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                "Incredible work on the Q3 architecture redesign. You managed to reduce API latency by 40% while also taking the time to document the entire process for the junior engineers. That level of ownership is exactly what we need on the core team."
              </p>
              <div className="flex items-center gap-4 text-xs font-bold">
                <button className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors">
                  <ThumbsUp size={14} /> 2
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors">
                  <MessageSquare size={14} /> Reply
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl flex gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/10 text-indigo-400 uppercase tracking-wider rounded-md border border-indigo-500/20">Manager 1:1</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg flex-shrink-0">
              AL
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-white">Alex Lee</h3>
                <span className="text-xs text-gray-500">Last Week</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                "Great progress on your technical milestones. Let's start focusing a bit more on cross-team communication, particularly ensuring the frontend team is aligned before we lock in the schema changes."
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          
          {/* Sentiment Trend */}
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white">Sentiment Trend</h3>
              <TrendingUp className="text-green-400" size={18} />
            </div>
            
            <div className="h-32 flex items-end justify-between gap-2 pb-2">
              <div className="w-full bg-green-500/20 rounded-t-sm" style={{ height: '60%' }}></div>
              <div className="w-full bg-green-500/40 rounded-t-sm" style={{ height: '40%' }}></div>
              <div className="w-full bg-green-500/60 rounded-t-sm" style={{ height: '70%' }}></div>
              <div className="w-full bg-green-500/80 rounded-t-sm" style={{ height: '90%' }}></div>
              <div className="w-full bg-green-500 rounded-t-sm shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ height: '100%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mt-2">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span className="text-green-400">Sep</span>
            </div>
          </div>

          {/* Velocity */}
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10">
              <span className="text-2xl font-bold text-white">4.2</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Feedback Velocity</h3>
              <p className="text-xs text-gray-400">Events per month</p>
              <p className="text-[10px] font-bold text-green-400 mt-2">+15% from last quarter</p>
            </div>
          </div>

          {/* Strengths & Opportunities */}
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-white mb-6">Top Strengths</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Star size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Technical Architecture</span>
                    <span className="text-indigo-400">92%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <Award size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Mentorship</span>
                    <span className="text-cyan-400">85%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-white mb-6">Development Opportunities</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                  <AlertCircle size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Cross-team Syncs</span>
                    <span className="text-amber-400">Needs Focus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"""

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\employee\FeedbackHistory.jsx", "w", encoding="utf-8") as f:
    f.write(content)
