import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPendingApprovals, approveGoal, rejectGoal } from "../../api/approvalsApi";
import { CheckCircle2, XCircle, Clock, Target, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PendingApprovals() {
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getPendingApprovals();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveGoal(id, comments[id] || "Approved");
      toast.success("Goal approved");
      await load();
    } catch (error) {
      toast.error("Failed to approve goal");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectGoal(id, comments[id] || "Please revise and resubmit");
      toast.success("Goal rejected");
      await load();
    } catch (error) {
      toast.error("Failed to reject goal");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pending Approvals</h1>
          <p className="text-sm text-gray-400">Review and manage goals awaiting your approval.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#131B2F]/60 backdrop-blur-md border border-white/5 px-4 py-2 rounded-xl">
          <Clock size={16} className="text-purple-400" />
          <span className="text-sm font-semibold text-white">{items.length} Pending</span>
        </div>
      </div>

      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-10 text-center shadow-xl"
        >
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <CheckCircle2 className="text-emerald-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
          <p className="text-gray-400">You have no pending goal approvals at the moment.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-xl hover:border-purple-500/20 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">
                          {item.employee_name ? item.employee_name.split(' ').map(n=>n[0]).join('') : "E"}
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{item.employee_name}</h3>
                          <p className="text-xs text-purple-300 font-medium">{item.department} • {item.quarter}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertCircle size={12} />
                        Needs Review
                      </span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <Target size={16} className="text-purple-400" />
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-black/20 rounded-lg px-3 py-2 border border-white/5">
                          <span className="block text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Target Value</span>
                          <span className="text-sm font-semibold text-white">{item.target_value} {item.uom_type}</span>
                        </div>
                        <div className="bg-black/20 rounded-lg px-3 py-2 border border-white/5">
                          <span className="block text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Weightage</span>
                          <span className="text-sm font-semibold text-white">{item.weightage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-72 flex flex-col justify-end space-y-4">
                    <textarea
                      rows={3}
                      value={comments[item.id] || ""}
                      onChange={(e) => setComments((p) => ({ ...p, [item.id]: e.target.value }))}
                      placeholder="Add a comment for the employee..."
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none transition-all shadow-inner"
                    />
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleReject(item.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500/20 border border-red-500/20 transition-colors"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-bold hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
