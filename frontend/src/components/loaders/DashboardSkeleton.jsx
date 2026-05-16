import React from 'react';
import { motion } from 'framer-motion';

const Shimmer = ({ className }) => (
  <div className={`relative overflow-hidden bg-dark/50 rounded-lg ${className}`}>
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5, 
        ease: 'linear' 
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
    />
  </div>
);

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 mb-8">
        <Shimmer className="w-48 h-8" />
        <Shimmer className="w-96 h-4" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-6 bg-card border border-border/50 rounded-2xl">
            <div className="flex items-center gap-4">
              <Shimmer className="w-12 h-12 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Shimmer className="w-24 h-3" />
                <Shimmer className="w-16 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-card border border-border/50 rounded-2xl h-[400px] flex flex-col">
            <Shimmer className="w-48 h-6 mb-6" />
            <Shimmer className="w-full flex-1 rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 bg-card border border-border/50 rounded-2xl h-[400px] flex flex-col">
            <Shimmer className="w-32 h-6 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <Shimmer className="w-10 h-10 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Shimmer className="w-full h-4" />
                    <Shimmer className="w-2/3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
