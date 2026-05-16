import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import GlowButton from './GlowButton';

export default function EmptyState({ 
  icon: Icon = FolderOpen, 
  title = "No Data Found", 
  description = "Get started by creating your first item.",
  actionText,
  onAction
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border/60 rounded-2xl bg-dark/20"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <GlowButton variant="primary" onClick={onAction}>
          {actionText}
        </GlowButton>
      )}
    </motion.div>
  );
}
