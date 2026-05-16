import React from 'react';
import { motion } from 'framer-motion';

export default function GlowButton({ children, onClick, disabled, variant = 'primary', className = '', ...props }) {
  const getStyles = () => {
    switch(variant) {
      case 'primary':
        return 'bg-primary text-white shadow-[0_0_15px_rgba(139,127,255,0.4)] border-primary hover:shadow-[0_0_25px_rgba(139,127,255,0.6)]';
      case 'success':
        return 'bg-emerald-500 text-dark shadow-[0_0_15px_rgba(52,211,153,0.4)] border-emerald-500 hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]';
      case 'danger':
        return 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]';
      default:
        return 'bg-dark text-white border-border hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,127,255,0.2)]';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-semibold border transition-all disabled:opacity-50 disabled:pointer-events-none ${getStyles()} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
