import { useEffect, useMemo, useState } from "react";
import { ClipboardList, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import toast from "react-hot-toast";

const statusConfig = {
  completed: { label: "Completed", classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", icon: CheckCircle2 },
  "in-progress": { label: "In Progress", classes: "bg-blue-500/15 text-blue-400 border-blue-500/25", icon: Clock },
  pending: { label: "Pending", classes: "bg-amber-500/15 text-amber-400 border-amber-500/25", icon: AlertTriangle },
};

function Initials({ name }) {
  const init = (name || "U").split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg flex-shrink-0">
      {init}
    </div>
  );
}

export default function TeamCheckins() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await api.get("/reports/completion-dashboard");
        const data = Array.isArray(response.data?.data) ? response.data.data : [];

        const normalized = data.map((r, idx) => {
          const progress = Number.isFinite(r.completion_rate) ? Math.round(r.completion_rate) : 0;
          const status = progress >= 100 ? "completed" : progress > 0 ? "in-progress" : "pending";
          return {
            id: r.employee_id ?? idx,
            employee: r.employee_name || "Unknown Employee",
            quarter: r.quarter || "Current Quarter",
            status,
            progress,
            highlights: r.last_comment || "No recent highlights.",
            blockers: r.blockers || "",
          };
        });

        setRows(normalized);
      } catch (error) {
        console.error("Failed to load team check-ins:", error);
        setRows([]);
        toast.error("Unable to load team check-ins.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const completionRate = useMemo(() => {
    if (!rows.length) return 0;
    return Math.round((rows.filter((c) => c.status === "completed").length / rows.length) * 100);
  }, [rows]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
            <ClipboardList className="text-purple-400" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Team Check-ins</h1>
            <p className="text-sm text-gray-400">{rows.filter((c) => c.status === "completed").length} of {rows.length} submitted</p>
          </div>
        </div>
      </div>

      <div className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-300">Team Submission Rate</span>
          <span className="text-xl font-bold text-white">{completionRate}%</span>
        </div>
        <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rows.map((c, idx) => {
            const status = statusConfig[c.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                key={c.id}
                className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <Initials name={c.employee} />
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-white">{c.employee}</p>
                        <p className="text-xs text-purple-300 font-medium">{c.quarter} Check-in</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${status.classes}`}>
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16">Progress</span>
                      <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="text-sm text-white font-bold w-10 text-right">{c.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {!rows.length && (
            <div className="text-center py-12 text-gray-400">No team check-in records found.</div>
          )}
        </div>
      )}
    </div>
  );
}
