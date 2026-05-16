import React from 'react';
import { motion } from 'framer-motion';

export default function GradientBorderCard({ children, className = '' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative p-[1px] rounded-2xl bg-gradient-to-br from-primary/50 via-dark to-emerald-400/30 overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="bg-card w-full h-full rounded-[15px] p-6 relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
