import { useEffect, useState } from "react";
import { getTeamAnalytics } from "../../api/analyticsApi";
import { motion } from "framer-motion";
import { Calendar, Video, Clock, MessageSquare, ChevronRight, User } from "lucide-react";
import toast from "react-hot-toast";

export default function OneOnOnes() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await getTeamAnalytics();
        setTeam(Array.isArray(t) ? t : []);
      } catch (error) {
        console.error("Failed to load team members for 1-on-1s:", error);
        setTeam([]);
        toast.error("Could not load team check-in members.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">1-on-1 Meetings</h1>
          <p className="text-sm text-gray-400">Manage and schedule weekly check-ins with your team members.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-purple-500/20">
          <Calendar size={18} />
          Schedule New
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <Video className="text-purple-400" size={24} />
                <h2 className="text-lg font-bold text-white">Upcoming & Pending Check-ins</h2>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {team.map((m, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={m.employee_id} 
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-500/30 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg flex-shrink-0">
                        {m.employee_name ? m.employee_name.split(' ').map(n=>n[0]).join('') : "U"}
                      </div>
                      <div>
                        <p className="text-white font-bold">{m.employee_name}</p>
                        <p className="text-xs text-purple-300 font-medium mb-1">{m.department}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock size={12}/> Needs scheduling</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors border border-white/5">
                        <MessageSquare size={14} />
                        Notes
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs font-bold transition-colors border border-purple-500/30">
                        Schedule
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                {team.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No team members found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">0</div>
                  <div className="text-sm text-gray-400">Meetings this week</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">{team.length}</div>
                  <div className="text-sm text-gray-400">Pending check-ins</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl p-6 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Video className="text-purple-400" size={20} />
              </div>
              <h3 className="text-white font-bold mb-2">Integration Pending</h3>
              <p className="text-sm text-gray-300 mb-4">
                Google Calendar and Zoom integrations are currently being set up. Use this dashboard to track who needs a check-in manually for now.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
