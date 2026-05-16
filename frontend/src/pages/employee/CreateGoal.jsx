import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function EmployeeCreateGoal() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thrustArea: "",
    weightage: 25,
    targetDate: "",
    metrics: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Goal Data:", formData);
      setIsSubmitting(false);
      navigate("/employee/goals");
    }, 1500);
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/employee/goals" label="Back to Goals" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">add_circle</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            New Objective
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Create New Goal
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Define a new objective aligned with your quarterly targets and company strategy.
        </p>
      </header>

      <div className="max-w-4xl">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-primary text-[20px]">flag</span>
                Goal Title
                <span className="text-error">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="e.g., Launch new enterprise portal"
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
              <p className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
                Choose a clear, concise title that describes your objective
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                Description
                <span className="text-error">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the objective, expected outcomes, and success criteria..."
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">category</span>
                  Strategic Thrust Area
                  <span className="text-error">*</span>
                </label>
                <select
                  name="thrustArea"
                  value={formData.thrustArea}
                  onChange={handleChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select an area...</option>
                  <option value="Innovation">Innovation & Growth</option>
                  <option value="Operational Excellence">Operational Excellence</option>
                  <option value="Customer Success">Customer Success</option>
                  <option value="Team Development">Team Development</option>
                  <option value="Financial Performance">Financial Performance</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">percent</span>
                  Weightage (%)
                  <span className="text-error">*</span>
                </label>
                <input
                  name="weightage"
                  value={formData.weightage}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max="100"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
                <p className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
                  Relative importance (1-100)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                  Target Completion Date
                  <span className="text-error">*</span>
                </label>
                <input
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  style={{ colorScheme: 'dark' }}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
                  Success Metrics
                  <span className="text-error">*</span>
                </label>
                <input
                  name="metrics"
                  value={formData.metrics}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., Reach 10,000 MAU"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">info</span>
              <div>
                <p className="font-body-sm text-body-sm text-on-surface font-medium mb-1">
                  Goal Creation Tips
                </p>
                <ul className="font-body-sm text-[12px] text-on-surface-variant space-y-1 list-disc list-inside">
                  <li>Make goals specific, measurable, and time-bound</li>
                  <li>Align with your team's quarterly objectives</li>
                  <li>Set realistic but challenging targets</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex flex-col-reverse sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate('/employee/goals')}
                className="px-6 py-3 rounded-lg font-title-md text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all border border-outline-variant/20 hover:border-outline-variant/40"
              >
                Cancel
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 sm:flex-none px-6 py-3 bg-surface-variant/30 text-on-surface border border-outline-variant/20 hover:bg-surface-variant/50 rounded-lg font-title-md text-body-sm transition-all"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-3 bg-primary hover:bg-primary-fixed disabled:opacity-50 disabled:cursor-not-allowed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Create Goal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
