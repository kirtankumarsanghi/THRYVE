import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../styles/animations';

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <motion.div
      variants={animations.staggerItem}
      whileHover={animations.hoverCard.whileHover}
      className={`bg-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
