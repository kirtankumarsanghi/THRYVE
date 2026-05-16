import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import { useGoals } from '../../context/GoalContext';
import { validateGoals } from '../../utils/goalValidation';

const goalSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  thrustArea: z.string().min(1, 'Thrust Area is required'),
  target: z.coerce.number().min(1, 'Target must be greater than 0'),
  uom: z.string().min(1, 'Unit of Measurement is required'),
  weightage: z.coerce.number().min(10, 'Minimum weightage is 10%').max(100, 'Maximum weightage is 100%'),
  quarter: z.string().min(1, 'Quarter is required'),
  dueDate: z.string().min(1, 'Due Date is required'),
  status: z.string().optional(),
  progress: z.coerce.number().optional(),
  actual: z.coerce.number().optional(),
});

export default function CreateGoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addGoal, updateGoal, goals } = useGoals();
  const isEditing = !!id;
  const existingGoal = isEditing ? goals.find(g => g.id === id) : null;
  
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      status: 'Draft',
      weightage: 10,
    }
  });

  useEffect(() => {
    if (isEditing && existingGoal) {
      if (existingGoal.locked) {
        toast.error('This goal is locked by a manager and cannot be edited.');
        navigate('/goals');
        return;
      }
      reset(existingGoal);
    } else if (isEditing && !existingGoal) {
      toast.error('Goal not found');
      navigate('/goals');
    }
  }, [isEditing, existingGoal, reset, navigate]);

  const weightage = watch('weightage') || 0;
  
  const onSubmit = async (data) => {
    const testGoals = isEditing 
      ? goals.map(g => g.id === id ? { ...g, ...data, weightage: Number(data.weightage) } : g)
      : [...goals, { ...data, weightage: Number(data.weightage) }];
      
    const validation = validateGoals(testGoals);
    
    if (!validation.isValid) {
      validation.errors.forEach(err => toast.error(err));
      return;
    }
    
    if (validation.warnings.length > 0) {
      validation.warnings.forEach(warn => toast.custom((t) => (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-lg shadow-lg flex items-start gap-3">
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{warn}</p>
        </div>
      )));
    }

    try {
      if (isEditing) {
        updateGoal({ ...existingGoal, ...data, weightage: Number(data.weightage) });
        toast.success('Strategic goal updated successfully');
      } else {
        addGoal(data);
        toast.success('Strategic goal created successfully');
      }
      navigate('/goals');
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} goal`);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/goals')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Goals
        </button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{isEditing ? 'Edit Strategic Goal' : 'Create Strategic Goal'}</h1>
          <p className="text-gray-400">{isEditing ? 'Update your enterprise objective details and alignment.' : 'Define a new objective aligned with enterprise thrust areas.'}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Goal Title</label>
                <input 
                  {...register('title')}
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. Expand Enterprise Market Share"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1.5">{errors.title.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                <textarea 
                  {...register('description')}
                  rows="3"
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Detail the specific outcomes and approach..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1.5">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Thrust Area</label>
                <select 
                  {...register('thrustArea')}
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="">Select Thrust Area</option>
                  <option value="Market Expansion">Market Expansion</option>
                  <option value="Product Innovation">Product Innovation</option>
                  <option value="Operational Excellence">Operational Excellence</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
                {errors.thrustArea && <p className="text-red-400 text-xs mt-1.5">{errors.thrustArea.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Target Quarter</label>
                <select 
                  {...register('quarter')}
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="">Select Quarter</option>
                  <option value="Q1 2024">Q1 2024</option>
                  <option value="Q2 2024">Q2 2024</option>
                  <option value="Q3 2024">Q3 2024</option>
                  <option value="Q4 2024">Q4 2024</option>
                </select>
                {errors.quarter && <p className="text-red-400 text-xs mt-1.5">{errors.quarter.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Target Value</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input 
                      type="number"
                      {...register('target')}
                      className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div className="w-1/3">
                    <input 
                      {...register('uom')}
                      className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="UoM (%, $, qty)"
                    />
                  </div>
                </div>
                {(errors.target || errors.uom) && (
                  <p className="text-red-400 text-xs mt-1.5">Valid target and unit required.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Due Date</label>
                <input 
                  type="date"
                  {...register('dueDate')}
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all [color-scheme:dark]"
                />
                {errors.dueDate && <p className="text-red-400 text-xs mt-1.5">{errors.dueDate.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Weightage Allocation ({weightage}%)
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    {...register('weightage')}
                    className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="w-16 px-3 py-1.5 bg-dark border border-border rounded-lg text-center text-white font-semibold">
                    {weightage}%
                  </div>
                </div>
                {errors.weightage && <p className="text-red-400 text-xs mt-1.5">{errors.weightage.message}</p>}
              </div>

            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button 
              type="button"
              onClick={() => navigate('/goals')}
              className="px-6 py-2.5 rounded-lg font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-[0_0_15px_rgba(139,127,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
