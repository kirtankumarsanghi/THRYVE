import os

content = """import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Search, Filter, MessageSquare, AlertTriangle } from "lucide-react";
import { getPendingApprovals, approveRequest, rejectRequest } from "../../api/approvalsApi";
import { motion, AnimatePresence } from "framer-motion";

export default function ManagerApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      // live call to approvals API
      const res = await getPendingApprovals();
      setApprovals(res);
    } catch (err) {
      console.error("Error fetching approvals:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveRequest(id, "Approved");
      fetchApprovals();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id, "Requires revision");
      fetchApprovals();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApprovals = activeFilter === "All" ? approvals : approvals.filter(a => a.type === activeFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Pending Approvals</h1>
          <p className="text-gray-400">Review and manage team requests, goals, and feedback.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#131B2F] p-2 rounded-xl border border-white/5 shadow-xl">
          <div className="flex items-center px-3 gap-2 border-r border-white/10">
            <Clock size={16} className="text-amber-400" />
            <span className="font-bold text-sm text-white">{approvals.length} Pending</span>
          </div>
          <div className="flex items-center px-3 gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            <span className="font-bold text-sm text-white">{approvals.filter(a => a.priority === "High").length} Urgent</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 p-1 bg-[#131B2F] border border-white/5 rounded-xl shadow-xl overflow-x-auto">
          {['All', 'Goal', 'Feedback', 'Check-in'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === filter 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by employee name or request type..."
            className="w-full h-full min-h-[44px] bg-[#131B2F] border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xl"
          />
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredApprovals.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-[#131B2F] rounded-2xl border border-white/5 shadow-xl"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
              <p className="text-gray-400">You have no pending approvals at the moment.</p>
            </motion.div>
          ) : (
            filteredApprovals.map((approval) => (
              <motion.div 
                key={approval.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-colors group"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {approval.employeeName ? approval.employeeName.split(' ').map(n=>n[0]).join('') : "U"}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-white text-lg">{approval.employeeName}</h3>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                          approval.type === 'Goal' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                          approval.type === 'Feedback' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {approval.type}
                        </span>
                        {approval.priority === "High" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 rounded border border-red-500/20 flex items-center gap-1">
                            <AlertTriangle size={10} /> Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 font-medium mb-2">{approval.title || approval.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock size={12}/> Submitted {approval.date || "recently"}</span>
                        {approval.dueDate && <span className="text-amber-400 flex items-center gap-1">Due: {approval.dueDate}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleReject(approval.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 border border-red-500/20 transition-colors"
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                    <button 
                      onClick={() => handleApprove(approval.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-green-500/10 text-green-400 font-bold hover:bg-green-500/20 border border-green-500/20 transition-colors"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                  </div>

                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
"""

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\manager\ManagerApprovals.jsx", "w", encoding="utf-8") as f:
    f.write(content)
