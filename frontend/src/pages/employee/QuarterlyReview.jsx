import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function EmployeeQuarterlyReview() {
  const [selectedQuarter, setSelectedQuarter] = useState("Q3-2024");
  const [formData, setFormData] = useState({
    achievements: "",
    challenges: "",
    learnings: "",
    nextQuarterGoals: "",
    managerFeedback: ""
  });

  const quarters = [
    { id: "Q3-2024", label: "Q3 2024", status: "current", dueDate: "2024-03-31" },
    { id: "Q2-2024", label: "Q2 2024", status: "completed", dueDate: "2024-12-31" },
    { id: "Q1-2024", label: "Q1 2024", status: "completed", dueDate: "2023-09-30" },
  ];

  const goals = [
    { id: 1, title: "Launch Enterprise Portal", progress: 85, status: "In Progress", rating: null },
    { id: 2, title: "Improve Customer Satisfaction", progress: 100, status: "Completed", rating: 5 },
    { id: 3, title: "Team Training Program", progress: 60, status: "In Progress", rating: null },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting check-in:", formData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "current": return "bg-primary/20 text-primary border-primary/30";
      case "completed": return "bg-secondary/20 text-secondary border-secondary/30";
      default: return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
    }
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/employee/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">assignment</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-tertiary">
            Performance Review
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Quarterly Check-in
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Review your quarterly performance and submit your check-in
        </p>
      </header>

      {/* Quarter Selector */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {quarters.map((quarter) => (
          <button
            key={quarter.id}
            onClick={() => setSelectedQuarter(quarter.id)}
            className={`px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${
              selectedQuarter === quarter.id
                ? "bg-primary/20 border-primary text-primary"
                : "bg-[#0F172A] border-white/5 text-on-surface-variant hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-title-md text-body-sm font-semibold">{quarter.label}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider border ${getStatusColor(quarter.status)}`}>
                {quarter.status}
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">Due: {quarter.dueDate}</p>
          </button>
        ))}
      </div>

      {/* Goals Summary */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mb-8">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">flag</span>
          Goals Summary - {quarters.find(q => q.id === selectedQuarter)?.label}
        </h3>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-lg bg-surface-container/50 border border-outline-variant/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-2">{goal.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider border ${
                      goal.status === "Completed" 
                        ? "bg-secondary/20 text-secondary border-secondary/30"
                        : "bg-primary/20 text-primary border-primary/30"
                    }`}>
                      {goal.status}
                    </span>
                    {goal.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`material-symbols-outlined text-[16px] ${
                              i < goal.rating ? "text-secondary" : "text-on-surface-variant/30"
                            }`}
                            style={{ fontVariationSettings: i < goal.rating ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display-xl text-[24px] font-bold text-on-surface leading-none mb-1">
                    {goal.progress}%
                  </div>
                  <p className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Progress</p>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Check-in Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">edit_note</span>
            Self-Assessment
          </h3>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-secondary text-[20px]">emoji_events</span>
                Key Achievements
                <span className="text-error">*</span>
              </label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your major accomplishments this quarter..."
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                required
              />
              <p className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
                Highlight your most significant contributions and successes
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                Challenges Faced
                <span className="text-error">*</span>
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={5}
                placeholder="Describe any obstacles or difficulties encountered..."
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                required
              />
              <p className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
                Be honest about challenges - this helps identify areas for support
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-tertiary text-[20px]">school</span>
                Key Learnings
                <span className="text-error">*</span>
              </label>
              <textarea
                name="learnings"
                value={formData.learnings}
                onChange={handleChange}
                rows={5}
                placeholder="What did you learn this quarter? How have you grown?"
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                required
              />
              <p className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
                Reflect on skills developed and insights gained
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                Next Quarter Goals
              </label>
              <textarea
                name="nextQuarterGoals"
                value={formData.nextQuarterGoals}
                onChange={handleChange}
                rows={5}
                placeholder="What do you plan to focus on next quarter?"
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
              <p className="mt-2 font-body-sm text-[12px] text-on-surface-variant">
                Optional: Share your thoughts on upcoming priorities
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 font-body-sm text-body-sm font-semibold text-on-surface mb-3">
                <span className="material-symbols-outlined text-secondary text-[20px]">feedback</span>
                Manager Feedback Request
              </label>
              <textarea
                name="managerFeedback"
                value={formData.managerFeedback}
                onChange={handleChange}
                rows={3}
                placeholder="Any specific areas where you'd like feedback from your manager?"
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
          <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">info</span>
          <div>
            <p className="font-body-sm text-body-sm text-on-surface font-medium mb-1">
              Check-in Guidelines
            </p>
            <ul className="font-body-sm text-[12px] text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Be specific and provide examples where possible</li>
              <li>Focus on both successes and areas for improvement</li>
              <li>Your manager will review and provide feedback within 5 business days</li>
            </ul>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
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
              className="flex-1 sm:flex-none px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Submit Check-in</span>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
