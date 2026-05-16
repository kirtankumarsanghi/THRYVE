import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ChevronRight } from 'lucide-react';

export default function SmartRecommendation({ title, description, actionText, onAction }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="p-4 bg-dark/40 border border-border rounded-xl hover:border-primary/40 transition-colors group cursor-pointer"
      onClick={onAction}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-400/10 rounded-lg shrink-0">
          <Lightbulb className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          <p className="text-xs text-gray-400 mt-1 mb-3 leading-relaxed">{description}</p>
          <div className="flex items-center text-xs font-semibold text-primary group-hover:text-primaryHover transition-colors">
            {actionText} <ChevronRight className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
