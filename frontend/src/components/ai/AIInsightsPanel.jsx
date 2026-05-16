import React from 'react';
import { motion } from 'framer-motion';
import PredictionCard from './PredictionCard';
import RiskAnalysisCard from './RiskAnalysisCard';
import SmartRecommendation from './SmartRecommendation';
import { BrainCircuit } from 'lucide-react';
import { animations } from '../../styles/animations';

export default function AIInsightsPanel() {
  return (
    <motion.div 
      variants={animations.staggerContainer}
      initial="hidden"
      animate="show"
      className="bg-card border border-primary/20 rounded-2xl overflow-hidden relative"
    >
      {/* Decorative AI background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="p-6 border-b border-border/50 flex items-center gap-3 relative z-10">
        <div className="p-2 bg-primary/20 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Thryve Intelligence</h3>
          <p className="text-xs text-primary">AI-Powered Forecasting & Insights</p>
        </div>
      </div>

      <div className="p-6 space-y-6 relative z-10">
        {/* Predictions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PredictionCard 
            title="Projected Q2 Completion" 
            value="88%" 
            trend="+4% vs Q1" 
            isPositive={true} 
          />
          <PredictionCard 
            title="Bottleneck Probability" 
            value="14%" 
            trend="-2% vs Q1" 
            isPositive={true} 
          />
        </div>

        {/* Risks */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Identified Risks</h4>
          <div className="space-y-3">
            <RiskAnalysisCard 
              goalName="Q2 Infrastructure Migration" 
              riskLevel="High" 
              reason="Delayed dependencies from Platform team."
            />
            <RiskAnalysisCard 
              goalName="Enterprise Sales Target" 
              riskLevel="Medium" 
              reason="Pipeline velocity is 12% behind required trajectory."
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Smart Recommendations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmartRecommendation 
              title="Realign Engineering Resources" 
              description="Deploy 2 engineers from Backend to Platform to mitigate Infrastructure Migration risk." 
              actionText="View Resource Model"
              onAction={() => console.log('Action')}
            />
            <SmartRecommendation 
              title="Extend Review Deadline" 
              description="30% of Product team has not submitted Q2 planning. Extending by 2 days is recommended." 
              actionText="Adjust Cycle Details"
              onAction={() => console.log('Action')}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
