import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PredictionCard({ title, value, trend, isPositive = true }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-primary/10 to-dark border border-primary/20 rounded-xl p-5 relative overflow-hidden"
    >
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
        <Sparkles className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`flex items-center gap-1 text-xs font-semibold mb-1 ${isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
          <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
