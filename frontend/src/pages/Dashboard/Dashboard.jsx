import React from 'react';
import { Plus, TrendingUp, Target, ClipboardList, CheckCircle2, Activity } from 'lucide-react';
import { goals, mockActivities } from '../../data/mockData';
import GoalCompletionChart from '../../components/charts/GoalCompletionChart';

export default function Dashboard() {
  const activeGoals = goals.slice(0, 2); // Get "Implement OKR" and "Reduce Cloud Spend"

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Overview
          </h1>
          <p className="text-gray-400 text-sm">
            Here's your executive performance snapshot for Q3.
          </p>
        </div>
        <button className="bg-[#5952FF] hover:bg-[#4A44CC] text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-[#5952FF]/20">
          <Plus size={18} />
          Create Goal
        </button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Overall Performance Score */}
        <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-5 lg:col-span-1 shadow-sm">
          <h3 className="text-gray-400 text-xs font-semibold mb-2">Overall Performance Score</h3>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-5xl font-bold text-white">88</span>
            <span className="text-[#22D3EE] font-medium text-lg">/100</span>
          </div>
          <div className="w-full bg-[#1E2A4A] rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#22D3EE] to-[#8B7FFF] h-full rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>

        {/* Quarterly Progress */}
        <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 text-xs font-semibold">Quarterly<br />Progress</h3>
            <TrendingUp size={16} className="text-[#8B7FFF]" />
          </div>
          <div className="text-4xl font-bold text-white mt-4">65%</div>
        </div>

        {/* Total Goals */}
        <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 text-xs font-semibold">Total Goals</h3>
            <Target size={16} className="text-[#8B7FFF]" />
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-bold text-white">5</span>
            <span className="text-gray-400 text-sm">Active</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 text-xs font-semibold">Pending<br />Approvals</h3>
            <ClipboardList size={16} className="text-[#f59e0b]" />
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-bold text-white">1</span>
            <span className="text-[#f59e0b] text-sm">Action Req</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Thrusts */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-white">Active Thrusts</h2>
            <button className="text-[#8B7FFF] text-sm font-medium hover:text-white transition-colors">View All</button>
          </div>

          <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#8B7FFF]/50 transition-colors">
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22D3EE]"></div>
            
            <div className="flex items-start justify-between mb-4">
              <span className="bg-[#1E2A4A] text-gray-300 text-[10px] font-semibold tracking-wider px-2 py-1 rounded">QUARTERLY THRUST</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22D3EE]"></div>
                <span className="text-gray-300 text-sm">In Progress</span>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-white mb-1 mt-2">Implement OKR Tracking Protocol</h3>
            <p className="text-gray-400 text-sm mb-6">Roll out automated performance tracking across engineering pods.</p>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-[#1E2A4A] rounded-full h-1">
                <div className="h-full rounded-full bg-[#22D3EE]" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs font-medium text-white">75%</span>
            </div>
          </div>

          <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#8B7FFF]/50 transition-colors">
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8B7FFF]"></div>
            
            <div className="flex items-start justify-between mb-4">
              <span className="bg-[#1E2A4A] text-gray-300 text-[10px] font-semibold tracking-wider px-2 py-1 rounded">QUARTERLY THRUST</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B7FFF]"></div>
                <span className="text-gray-300 text-sm">On Track</span>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-white mb-1 mt-2">Reduce Cloud Infrastructure Spend</h3>
            <p className="text-gray-400 text-sm mb-6">Optimize AWS usage to decrease monthly burn by 15%.</p>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-[#1E2A4A] rounded-full h-1">
                <div className="h-full rounded-full bg-[#8B7FFF]" style={{ width: '40%' }}></div>
              </div>
              <span className="text-xs font-medium text-white">40%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Charts and Activity */}
        <div className="flex flex-col gap-6">
          {/* Progress Distribution */}
          <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-2">Progress Distribution</h2>
            <div className="relative mt-2">
              <GoalCompletionChart />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-white">5</span>
                <span className="text-gray-400 text-[10px] font-medium tracking-wider mt-1">TOTAL</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B7FFF]"></div>
                <span className="text-xs text-gray-300">Active (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]"></div>
                <span className="text-xs text-gray-300">Done (2)</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#101935] border border-[#1E2A4A] rounded-2xl p-6 flex-1">
            <h2 className="text-lg font-medium text-white mb-6">Recent Activity</h2>
            
            <div className="relative border-l border-[#1E2A4A] ml-4 space-y-8 pb-2">
              <div className="relative pl-6">
                <div className="absolute -left-3.5 top-0 bg-[#101935] border border-[#1E2A4A] rounded-full p-1.5 z-10">
                  <CheckCircle2 size={14} className="text-[#8B7FFF]" />
                </div>
                <div className="bg-[#192240] rounded-xl p-4 inline-block max-w-[200px]">
                  <p className="text-sm text-gray-200">Goal Approved: Q3 Hiring Plan</p>
                  <span className="text-xs text-gray-400 mt-2 block">2 hours ago</span>
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-3.5 top-0 bg-[#101935] border border-[#1E2A4A] rounded-full p-1.5 z-10">
                  <Activity size={14} className="text-[#22D3EE]" />
                </div>
                <div className="bg-[#192240] rounded-xl p-4 inline-block max-w-[200px]">
                  <p className="text-sm text-gray-200">Milestone Reached: 75% Completion</p>
                  <span className="text-xs text-gray-400 mt-2 block">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
