import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../styles/animations';

export default function AnimatedContainer({ children, className = '', stagger = false }) {
  if (stagger) {
    return (
      <motion.div
        variants={animations.staggerContainer}
        initial="hidden"
        animate="show"
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={animations.pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
