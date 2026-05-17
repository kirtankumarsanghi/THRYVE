import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import { useGoals } from '../../context/GoalContext';

const goalSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  strategic_area: z.string().optional(),
  quarter: z.enum(['Q1', 'Q2', 'Q3', 'Q4']),
  target_value: z.coerce.number().min(0),
  achieved_value: z.coerce.number().min(0).optional(),
  weightage: z.coerce.number().min(10).max(100),
  uom_type: z.enum(['Numeric', 'Percentage', 'Timeline', 'Zero-based']),
  uom_direction: z.enum(['Higher is Better', 'Lower is Better']),
  target_date: z.string().optional(),
});

export default function CreateGoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addGoal, updateGoal, goals } = useGoals();
  const existingGoal = id ? goals.find((g) => String(g.id) === String(id)) : null;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      quarter: 'Q1',
      weightage: 10,
      uom_type: 'Numeric',
      uom_direction: 'Higher is Better',
      achieved_value: 0,
    }
  });

  const uomType = watch('uom_type');

  React.useEffect(() => {
    if (existingGoal) {
      reset({
        ...existingGoal,
        target_date: existingGoal.target_date || '',
      });
    }
  }, [existingGoal, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      target_date: data.target_date || null,
      description: data.description || '',
      strategic_area: data.strategic_area || '',
      status: existingGoal?.status || 'Not Started',
    };
    if (existingGoal) {
      await updateGoal(existingGoal.id, payload);
    } else {
      await addGoal(payload);
    }
    navigate('/employee/goals');
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/employee/goals')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Goals
        </button>

        <h1 className="text-3xl font-bold text-white mb-6">{existingGoal ? 'Edit Goal' : 'Create Goal'}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Goal Title</label>
              <input {...register('title')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white" />
              {errors.title && <p className="text-red-400 text-xs mt-1">Required</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
              <textarea {...register('description')} rows="3" className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Strategic Area</label>
              <input {...register('strategic_area')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Quarter</label>
              <select {...register('quarter')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white">
                <option value="Q1">Q1</option><option value="Q2">Q2</option><option value="Q3">Q3</option><option value="Q4">Q4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">UoM Type</label>
              <select {...register('uom_type')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white">
                <option value="Numeric">Numeric</option>
                <option value="Percentage">Percentage</option>
                <option value="Timeline">Timeline</option>
                <option value="Zero-based">Zero-based</option>
              </select>
            </div>

            {(uomType === 'Numeric' || uomType === 'Percentage') && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Direction</label>
                <select {...register('uom_direction')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white">
                  <option value="Higher is Better">Higher is Better</option>
                  <option value="Lower is Better">Lower is Better</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Target Value</label>
              <input type="number" step="0.01" {...register('target_value')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Achieved Value</label>
              <input type="number" step="0.01" {...register('achieved_value')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Target Date</label>
              <input type="date" {...register('target_date')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white [color-scheme:dark]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Weightage (%)</label>
              <input type="number" {...register('weightage')} className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white" />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold">
              <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
