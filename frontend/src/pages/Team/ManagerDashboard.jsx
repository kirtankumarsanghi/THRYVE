import { useState, useEffect } from "react";
import { 
  Users, CheckCircle2, TrendingUp, AlertCircle, 
  ChevronRight, ArrowRight, X, User, Target, Weight, FileText
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Mock API Data
const MOCK_API_DATA = {
  stats: {
    teamSize: 8,
    pendingApproval: 4,
    avgProgress: 45,
    overdueCheckins: 2
  },
  team: [
    { id: 1, name: "Alex Johnson", goalsSet: 5, approved: 3, avgProgress: 68, lastCheckin: "2 days ago" },
    { id: 2, name: "Priya Patel", goalsSet: 4, approved: 4, avgProgress: 52, lastCheckin: "1 week ago" },
    { id: 3, name: "Marcus Lee", goalsSet: 6, approved: 6, avgProgress: 80, lastCheckin: "On time" },
    { id: 4, name: "Sofia Garcia", goalsSet: 3, approved: 1, avgProgress: 20, lastCheckin: "Overdue" },
    { id: 5, name: "Jordan Kim", goalsSet: 4, approved: 4, avgProgress: 100, lastCheckin: "On time" },
  ],
  pendingApprovals: [
    { 
      id: 101, 
      employee: "Sofia Garcia", 
      title: "Migrate frontend to Vite + React 18", 
      submitted: "Yesterday", 
      target: 100, 
      uom: "%", 
      weightage: 20, 
      description: "Rewrite build tooling and upgrade to React 18 for performance." 
    },
    { 
      id: 102, 
      employee: "Alex Johnson", 
      title: "Increase API response time by 40%", 
      submitted: "2 hours ago", 
      target: 40, 
      uom: "%", 
      weightage: 30, 
      description: "Optimize database queries and add Redis caching." 
    },
  ]
};

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300 flex-shrink-0">
      {init}
    </div>
  );
}

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [editTarget, setEditTarget] = useState("");
  const [editWeightage, setEditWeightage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 1200));
      setData(MOCK_API_DATA);
      setLoading(false);
    };
    fetchData();
  }, []);

  const openSlideOver = (approval) => {
    setSelectedApproval(approval);
    setEditTarget(approval.target);
    setEditWeightage(approval.weightage);
  };

  const closeSlideOver = () => {
    setSelectedApproval(null);
  };

  const handleApprove = () => {
    // Make API call here
    setData(prev => ({
      ...prev,
      pendingApprovals: prev.pendingApprovals.filter(a => a.id !== selectedApproval.id),
      stats: { ...prev.stats, pendingApproval: prev.stats.pendingApproval - 1 }
    }));
    closeSlideOver();
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-white/5 rounded-2xl border border-white/5"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 h-96 bg-white/5 rounded-2xl border border-white/5"></div>
          <div className="lg:col-span-1 h-96 bg-white/5 rounded-2xl border border-white/5"></div>
        </div>
      </div>
    );
  }

  const { stats, team, pendingApprovals } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in font-sans relative">
      
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
        <p className="text-sm text-gray-400">Team performance and approval queue overview.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Users className="text-purple-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Team Size</p>
            <p className="text-2xl font-bold text-white">{stats.teamSize} <span className="text-sm text-gray-500">Reports</span></p>
          </div>
        </div>
        
        <Link to="/manager/approvals" className="bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/10 hover:border-orange-500/30 transition-all rounded-2xl p-5 flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <CheckCircle2 className="text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium group-hover:text-orange-300 transition-colors">Pending My Approval</p>
              <p className="text-2xl font-bold text-orange-400">{stats.pendingApproval}</p>
            </div>
          </div>
          <ChevronRight className="text-orange-400/50 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
        </Link>

        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <TrendingUp className="text-emerald-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Team Average Progress</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.avgProgress}%</p>
          </div>
        </div>

        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <AlertCircle className="text-red-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Check-ins Overdue</p>
            <p className="text-2xl font-bold text-red-400">{stats.overdueCheckins}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Section: Team Members Table */}
        <div className="lg:col-span-2 bg-white/2 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h2 className="text-base font-bold text-white">Team Members</h2>
            <Link to="/manager/team" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Employee Name</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Goals Set</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Approved</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg Progress</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Check-in</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {team.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Initials name={member.name} />
                        <span className="text-sm font-medium text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300 text-center">{member.goalsSet}</td>
                    <td className="px-4 py-4 text-sm text-gray-300 text-center">
                      <span className={member.approved < member.goalsSet ? "text-orange-400 font-bold" : "text-emerald-400"}>
                        {member.approved}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-1.5 bg-white/10 rounded-full w-16">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${member.avgProgress}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{member.avgProgress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2 py-1 rounded-md border ${
                        member.lastCheckin === 'Overdue' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : 'bg-white/5 text-gray-300 border-white/10'
                      }`}>
                        {member.lastCheckin}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/manager/review/${member.id}`)}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-2 rounded-lg transition-colors"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals Panel */}
        <div className="lg:col-span-1 bg-white/2 border border-white/5 rounded-2xl flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-orange-500/[0.02]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-400" />
              <h2 className="text-base font-bold text-white">Pending Approvals</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
              {pendingApprovals.length}
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="mx-auto text-emerald-500/30 mb-3" size={32} />
                <p className="text-gray-400 text-sm">All caught up!</p>
              </div>
            ) : (
              pendingApprovals.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Initials name={item.employee} />
                    <span className="text-xs text-gray-400">{item.employee}</span>
                    <span className="text-[10px] text-gray-500 ml-auto">{item.submitted}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-4 line-clamp-2 leading-snug">{item.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => openSlideOver(item)}
                      className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 transition-colors"
                    >
                      Review & Approve
                    </button>
                    <button 
                      className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold rounded-lg border border-white/10 transition-colors"
                    >
                      Return
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Slide-over Panel for Approval */}
      <AnimatePresence>
        {selectedApproval && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSlideOver}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Slide-over */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0B1437] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
                <h2 className="text-lg font-bold text-white">Review Goal</h2>
                <button 
                  onClick={closeSlideOver}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Employee Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-300">
                    {selectedApproval.employee.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{selectedApproval.employee}</p>
                    <p className="text-xs text-gray-500">Submitted {selectedApproval.submitted}</p>
                  </div>
                </div>

                {/* Goal Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                      <FileText size={14} /> Goal Title
                    </label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-medium">
                      {selectedApproval.title}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                      Description
                    </label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 leading-relaxed">
                      {selectedApproval.description}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-5">
                  <h3 className="text-sm font-bold text-white">Review & Adjust Parameters</h3>
                  
                  {/* Target & UoM */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                      <Target size={14} /> Target & UoM
                    </label>
                    <div className="flex gap-3">
                      <input 
                        type="number" 
                        value={editTarget}
                        onChange={(e) => setEditTarget(e.target.value)}
                        className="flex-1 bg-[#060D1F] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                      <div className="w-24 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 text-sm flex items-center justify-center cursor-not-allowed">
                        {selectedApproval.uom}
                      </div>
                    </div>
                  </div>

                  {/* Weightage */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                      <Weight size={14} /> Weightage (%)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={editWeightage}
                        onChange={(e) => setEditWeightage(e.target.value)}
                        className="w-full bg-[#060D1F] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">Adjusting weightage will affect the employee's overall score calculation.</p>
                  </div>
                </div>

              </div>

              {/* Slide-over Footer Actions */}
              <div className="p-6 border-t border-white/10 bg-white/[0.02] grid grid-cols-2 gap-3">
                <button 
                  onClick={closeSlideOver}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Return for Rework
                </button>
                <button 
                  onClick={handleApprove}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  Approve Goal
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
