import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export default function RiskAnalysisCard({ goalName, riskLevel, reason }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-500/20 rounded-lg shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <h4 className="text-white font-medium text-sm">{goalName}</h4>
          <p className="text-xs text-gray-400 mt-1">{reason}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
          {riskLevel} Risk
        </span>
        <button className="text-gray-400 hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
