import os

content = """import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Search, ChevronRight, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getPendingApprovals } from "../../api/approvalsApi";

export default function EmployeeQuarterlyReview() {
  const [loading, setLoading] = useState(true);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    // using approvalsApi to simulate checkins data or you could use goalsApi
    const fetchCheckins = async () => {
      try {
        const res = await getPendingApprovals();
        // Mock filtering/transforming to Check-in data
        const checkinData = res.filter(r => r.type === 'Check-in').length > 0 
          ? res.filter(r => r.type === 'Check-in')
          : [
              { id: 101, title: 'Q3 Goal Progress Check-in', employeeName: 'Alice Johnson', date: '2026-09-01', status: 'Pending', type: 'Check-in', priority: 'High' },
              { id: 102, title: 'Q3 Development Check-in', employeeName: 'Bob Smith', date: '2026-09-05', status: 'Completed', type: 'Check-in', priority: 'Normal' }
            ];
        setCheckins(checkinData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckins();
  }, []);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Quarterly Check-ins</h1>
        <p className="text-gray-400">Review employee progress, blockers, and achievements for the current quarter.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main List */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <div className="flex gap-4 items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search check-ins by name or keyword..."
                className="w-full h-full min-h-[44px] bg-[#131B2F] border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all shadow-xl"
              />
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all shadow-lg shadow-indigo-500/20 whitespace-nowrap">
              Initiate Check-in
            </button>
          </div>

          <div className="space-y-4">
            {checkins.map(checkin => (
              <motion.div 
                key={checkin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl hover:border-indigo-500/30 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                    checkin.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {checkin.status === 'Completed' ? <CheckCircle size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">{checkin.title}</h3>
                    <p className="text-sm text-gray-400 font-medium">{checkin.employeeName || 'Self'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-gray-400 mb-1">Date</span>
                    <span className="font-bold text-white">{checkin.date}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-400 mb-1">Status</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${
                      checkin.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {checkin.status}
                    </span>
                  </div>
                  <ChevronRight className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="text-indigo-400" size={20} />
              Q3 Completion
            </h3>
            
            <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="65, 100" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">65%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Completed</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Assigned</span>
                <span className="font-bold text-white">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed</span>
                <span className="font-bold text-green-400">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending</span>
                <span className="font-bold text-amber-400">4</span>
              </div>
            </div>
          </div>

          <div className="bg-[#131B2F] border border-red-500/20 p-6 rounded-2xl shadow-xl">
             <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Action Required
            </h3>
            <p className="text-sm text-gray-400 mb-4">You have 2 direct reports whose Q3 check-ins are overdue by more than 5 days.</p>
            <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-bold text-sm transition-colors">
              Send Reminders
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
"""

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\employee\QuarterlyReview.jsx", "w", encoding="utf-8") as f:
    f.write(content)
