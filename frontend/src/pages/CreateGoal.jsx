import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGoal() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thrustArea: "",
    weightage: 25,
    targetDate: "",
    metrics: "",
    uomType: "Min",
    targetValue: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Goal Data:", formData);
      setIsSubmitting(false);
      navigate("/goals");
    }, 1500);
  };

  return (
    <main className="md:ml-[280px] pt-24 md:pt-24 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/goals')}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="font-body-sm text-body-sm">Back to Goals</span>
      </button>

      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            New Objective
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Create New Goal
        </h2>
      </header>

      {/* Form */}
      <div className="max-w-3xl">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-medium text-on-surface mb-2">
                <span className="material-symbols-outlined text-primary text-[20px]">flag</span>
                Goal Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="e.g., Launch new enterprise portal"
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-medium text-on-surface mb-2">
                <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the objective and expected outcomes..."
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thrust Area */}
              <div>
                <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-2">
                  Strategic Thrust Area
                </label>
                <select
                  name="thrustArea"
                  value={formData.thrustArea}
                  onChange={handleChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all appearance-none"
                  required
                >
                  <option value="">Select an area...</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Customer">Customer</option>
                  <option value="People">People</option>
                  <option value="Operations">Operations</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>

              {/* Weightage */}
              <div>
                <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-2">
                  Weightage (%)
                </label>
                <input
                  name="weightage"
                  value={formData.weightage}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max="100"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Date */}
              <div>
                <label className="flex items-center gap-2 font-body-sm text-body-sm font-medium text-on-surface mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                  Target Completion Date
                </label>
                <input
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  style={{ colorScheme: 'dark' }}
                  required
                />
              </div>

              {/* Metrics */}
              <div>
                <label className="flex items-center gap-2 font-body-sm text-body-sm font-medium text-on-surface mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
                  Success Metrics
                </label>
                <input
                  name="metrics"
                  value={formData.metrics}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., Reach 10,000 MAU"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UoM Type */}
              <div>
                <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-2">
                  UoM Type
                </label>
                <select
                  name="uomType"
                  value={formData.uomType}
                  onChange={handleChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all appearance-none"
                >
                  <option value="Min">Min (Numeric/%) — higher is better</option>
                  <option value="Max">Max (Numeric/%) — lower is better</option>
                  <option value="Timeline">Timeline — date-based completion</option>
                  <option value="Zero">Zero — zero = success</option>
                </select>
              </div>

              {/* Target Value */}
              <div>
                <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-2">
                  Target Value (if applicable)
                </label>
                <input
                  name="targetValue"
                  value={formData.targetValue}
                  onChange={handleChange}
                  type="number"
                  placeholder="e.g., 10000"
                  disabled={formData.uomType === 'Timeline' || formData.uomType === 'Zero'}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/goals')}
                className="px-6 py-3 rounded-lg font-title-md text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-fixed disabled:opacity-50 disabled:cursor-not-allowed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-colors shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>Save Goal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
