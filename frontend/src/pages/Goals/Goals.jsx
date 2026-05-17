import React, { useMemo, useState } from 'react';
import { Plus, Search, Filter, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import GoalCard from '../../components/goals/GoalCard';
import { useGoals } from '../../context/GoalContext';

export default function Goals() {
  const navigate = useNavigate();
  const { goals } = useGoals();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredGoals = useMemo(
    () =>
      goals.filter((goal) => {
        const text = `${goal.title} ${goal.description || ''}`.toLowerCase();
        const matchesSearch = text.includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || goal.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [goals, searchTerm, statusFilter]
  );

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <SectionHeader
          title="Strategic Goals"
          subtitle="Manage, track, and align enterprise objectives across all departments."
        />
        <button 
          onClick={() => navigate('create')}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(139,127,255,0.25)] whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          New Goal
        </button>
      </div>

      {/* Filters Area */}
      <div className="surface-card p-4 sm:p-5 flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search objectives..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full enterprise-input pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="enterprise-input pl-9 pr-8 py-2.5 text-white appearance-none min-w-[160px]"
            >
              <option value="All">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="On Track">On Track</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Goal Grid */}
      {filteredGoals.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
        >
          {filteredGoals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-border rounded-xl surface-card subtle-grid">
          <Target className="w-12 h-12 text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No goals found</h3>
          <p className="text-gray-400 text-center max-w-md">
            Try adjusting your search or filters, or create a new strategic goal to get started.
          </p>
        </div>
      )}
    </PageContainer>
  );
}
