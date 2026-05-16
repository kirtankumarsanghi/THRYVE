import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function EmployeeGoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with actual API call
  const goal = {
    id: id,
    title: "Launch Enterprise Portal",
    description: "Develop and deploy a comprehensive enterprise portal for internal use with advanced features including user management, analytics dashboard, and integration with existing systems.",
    thrustArea: "Innovation & Growth",
    progress: 85,
    status: "In Progress",
    dueDate: "2024-03-30",
    createdDate: "2024-01-15",
    weightage: 30,
    metrics: "Complete development and deploy to production",
    owner: "John Doe",
    manager: "Jane Smith"
  };

  const milestones = [
    { id: 1, title: "Requirements Gathering", status: "Completed", date: "2024-01-20", progress: 100 },
    { id: 2, title: "Design Phase", status: "Completed", date: "2024-02-05", progress: 100 },
    { id: 3, title: "Development", status: "In Progress", date: "2024-03-15", progress: 85 },
    { id: 4, title: "Testing & QA", status: "Not Started", date: "2024-03-25", progress: 0 },
    { id: 5, title: "Deployment", status: "Not Started", date: "2024-03-30", progress: 0 },
  ];

  const comments = [
    { id: 1, author: "Jane Smith", role: "Manager", text: "Great progress on the development phase! Keep up the good work.", date: "2024-03-10", time: "14:30" },
    { id: 2, author: "John Doe", role: "Employee", text: "Thank you! I'm on track to complete development by next week.", date: "2024-03-10", time: "15:45" },
  ];

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment);
      setNewComment("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-secondary/20 text-secondary border-secondary/30";
      case "In Progress": return "bg-primary/20 text-primary border-primary/30";
      case "Not Started": return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
      default: return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
    }
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/employee/goals" label="Back to Goals" />

      <header className="mb-10 mt-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">flag</span>
              <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
                Goal Details
              </span>
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">
              {goal.title}
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant">
              {goal.description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className={`px-4 py-2 rounded-lg text-[12px] font-label-caps uppercase tracking-wider border text-center ${getStatusColor(goal.status)}`}>
              {goal.status}
            </span>
            <button 
              onClick={() => navigate(`/employee/goals/${id}/edit`)}
              className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit Goal
            </button>
          </div>
        </div>
      </header>

      {/* Progress Card */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            Overall Progress
          </h3>
          <div className="text-right">
            <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">
              {goal.progress}%
            </div>
            <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider">Complete</p>
          </div>
        </div>
        <div className="w-full h-3 bg-surface-variant rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary via-primary to-tertiary rounded-full transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-outline-variant/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 font-body-sm text-body-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("milestones")}
          className={`px-4 py-3 font-body-sm text-body-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "milestones"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Milestones
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-3 font-body-sm text-body-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "comments"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Comments ({comments.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">info</span>
              Goal Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Strategic Thrust Area</p>
                <p className="font-body-sm text-body-sm text-on-surface">{goal.thrustArea}</p>
              </div>
              <div>
                <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Weightage</p>
                <p className="font-body-sm text-body-sm text-on-surface">{goal.weightage}%</p>
              </div>
              <div>
                <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Success Metrics</p>
                <p className="font-body-sm text-body-sm text-on-surface">{goal.metrics}</p>
              </div>
              <div>
                <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Owner</p>
                <p className="font-body-sm text-body-sm text-on-surface">{goal.owner}</p>
              </div>
              <div>
                <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Manager</p>
                <p className="font-body-sm text-body-sm text-on-surface">{goal.manager}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">calendar_today</span>
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-[20px]">add_circle</span>
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider">Created</p>
                  <p className="font-body-sm text-body-sm text-on-surface">{goal.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider">Due Date</p>
                  <p className="font-body-sm text-body-sm text-on-surface">{goal.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">timelapse</span>
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider">Days Remaining</p>
                  <p className="font-body-sm text-body-sm text-on-surface">15 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "milestones" && (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    milestone.status === "Completed" 
                      ? "bg-secondary/20 border-secondary text-secondary"
                      : milestone.status === "In Progress"
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-surface-variant border-outline-variant text-on-surface-variant"
                  }`}>
                    {milestone.status === "Completed" ? (
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    ) : (
                      <span className="font-body-sm text-body-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${
                      milestone.status === "Completed" ? "bg-secondary/30" : "bg-outline-variant/20"
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-title-md text-body-base text-on-surface mb-1">{milestone.title}</h4>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Target: {milestone.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[12px] mb-2">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="text-on-surface font-medium">{milestone.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "comments" && (
        <div className="space-y-6">
          {/* Add Comment */}
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
            <h3 className="font-title-md text-body-base text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_comment</span>
              Add Comment
            </h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts, updates, or questions..."
              className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none mb-4"
              rows={4}
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="px-6 py-2.5 bg-primary hover:bg-primary-fixed disabled:opacity-50 disabled:cursor-not-allowed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Post Comment
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-md font-bold flex-shrink-0">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-body-sm text-body-sm text-on-surface font-medium">{comment.author}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                        {comment.role}
                      </span>
                      <span className="text-[12px] text-on-surface-variant">•</span>
                      <span className="text-[12px] text-on-surface-variant">{comment.date} at {comment.time}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
