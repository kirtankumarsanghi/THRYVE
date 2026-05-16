import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Award, Activity, MessageSquare, CheckCircle } from 'lucide-react';
import AnimatedContainer from '../components/common/AnimatedContainer';
import GlassCard from '../components/common/GlassCard';
import GradientBorderCard from '../components/common/GradientBorderCard';
import GlowButton from '../components/common/GlowButton';
import DashboardSkeleton from '../components/loaders/DashboardSkeleton';
import AIInsightsPanel from '../components/ai/AIInsightsPanel';
import { useAuth } from '../context/AuthContext'; // assuming we might have this, or we can just use static

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Simulate network request to show off the skeleton loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="md:ml-[280px] pt-24 px-4 md:px-8 pb-24 max-w-7xl mx-auto min-h-screen">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <AnimatedContainer className="md:ml-[280px] pt-24 px-4 md:px-8 pb-24 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Welcome Back
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Dashboard Overview
          </h2>
          <GlowButton variant="primary" onClick={() => console.log('Action')}>
            Generate Report
          </GlowButton>
        </div>
      </header>

      {/* Stats Grid */}
      <AnimatedContainer stagger={true} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-primary" />
            <span className="text-xs font-medium text-gray-400">Active</span>
          </div>
          <div className="text-4xl font-bold text-white mb-1">12</div>
          <p className="text-sm text-gray-400">Active Goals</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <span className="text-xs font-medium text-gray-400">Rate</span>
          </div>
          <div className="text-4xl font-bold text-white mb-1">84%</div>
          <p className="text-sm text-gray-400">Completion Rate</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-info" />
            <span className="text-xs font-medium text-gray-400">Score</span>
          </div>
          <div className="text-4xl font-bold text-white mb-1">92%</div>
          <p className="text-sm text-gray-400">Team Alignment</p>
        </GlassCard>

        <GradientBorderCard>
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-primary" />
            <span className="text-xs font-medium text-gray-400">Total</span>
          </div>
          <div className="text-4xl font-bold text-white mb-1">8</div>
          <p className="text-sm text-gray-400">Achievements</p>
        </GradientBorderCard>
      </AnimatedContainer>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Performance Trend</h3>
                <p className="text-sm text-gray-400">Your quarterly performance trajectory</p>
              </div>
              <button className="text-gray-400 hover:text-primary transition-colors">
                <Activity className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center border border-dashed border-border/50 rounded-xl bg-dark/30 min-h-[250px]">
              <div className="text-center">
                <Activity className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm">Interactive chart loading...</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* AI Insights replacing the old static one */}
        <div className="lg:col-span-1">
          <AIInsightsPanel />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <motion.div whileHover={{ x: 4 }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark/50 border border-transparent hover:border-border/50 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Goal "Increase Revenue" updated</p>
                <p className="text-xs text-gray-400 mt-0.5">2 hours ago</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 4 }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark/50 border border-transparent hover:border-border/50 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">New comment on "Product Launch"</p>
                <p className="text-xs text-gray-400 mt-0.5">5 hours ago</p>
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </AnimatedContainer>
  );
}
