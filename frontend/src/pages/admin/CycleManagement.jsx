import { useEffect, useState } from "react";
import { ArrowLeft, Save, Bell, Settings, Calendar, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getQuarterlyWindows, updateQuarterlyWindows } from "../../api/adminApi";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const PHASE_LABELS = {
  phase1: "Phase 1 - Goal Setting",
  q1: "Q1 Check-in",
  q2: "Q2 Check-in",
  q3: "Q3 Check-in",
  q4: "Q4 Check-in",
};

export default function CycleManagement() {
  const [windows, setWindows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadWindows();
  }, []);

  const loadWindows = async () => {
    setLoading(true);
    try {
      const data = await getQuarterlyWindows();
      setWindows(data.windows || []);
    } catch (error) {
      console.error("Failed to load windows:", error);
      toast.error("Failed to load quarterly windows");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (idx, field, value) => {
    const numValue = parseInt(value) || 1;
    setWindows((prev) => prev.map((w, i) => i === idx ? { ...w, [field]: numValue } : w));
  };

  const save = async () => {
    setSaving(true);
    const loadingToast = toast.loading("Saving cycle configuration...");
    
    try {
      await updateQuarterlyWindows(windows);
      toast.success("Cycle windows updated successfully!", { id: loadingToast });
      await loadWindows();
    } catch (error) {
      console.error("Failed to save windows:", error);
      toast.error(error?.response?.data?.detail || "Failed to save windows", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Admin</span>
            <span className="text-gray-600">&gt;</span>
            <span className="text-indigo-400">Cycle Management</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Cycle Management</h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Configure quarterly cycle windows and performance periods.
          </p>
        </div>
      </div>

        {/* Live Status Indicator */}
        <motion.div {...fade(0.05)} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <p className="text-emerald-400 font-bold text-sm">SYSTEM LIVE</p>
            <p className="text-emerald-300/70 text-xs">Changes will affect all users immediately</p>
          </div>
        </motion.div>

        {/* Cycle Configuration Card */}
        <motion.div {...fade(0.1)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Quarterly Cycle Configuration</h2>
            </div>
            <button
              onClick={loadWindows}
              disabled={loading}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw size={20} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 pb-4 border-b border-white/5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cycle Phase</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Start Month (1-12)</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Start Day (1-31)</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">End Month (1-12)</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">End Day (1-31)</div>
              </div>

              {/* Table Rows */}
              {windows.map((w, idx) => (
                <motion.div 
                  key={w.window_name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="grid grid-cols-5 gap-4 items-center p-4 bg-[#1A2235]/30 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-indigo-400" />
                    <span className="text-white font-medium">{PHASE_LABELS[w.window_name] || w.window_name}</span>
                  </div>
                  
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={w.start_month}
                    onChange={(e) => updateField(idx, 'start_month', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={w.start_day}
                    onChange={(e) => updateField(idx, 'start_day', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={w.end_month}
                    onChange={(e) => updateField(idx, 'end_month', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={w.end_day}
                    onChange={(e) => updateField(idx, 'end_day', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </motion.div>
              ))}

              {/* Save Button */}
              <div className="pt-6 flex items-center gap-4">
                <button
                  onClick={save}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Configuration"}
                </button>
                <p className="text-sm text-gray-500">
                  Changes will be applied immediately to all users
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Info Card */}
        <motion.div {...fade(0.15)} className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-lg">ℹ️</span>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Configuration Guidelines</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Months are numbered 1-12 (January = 1, December = 12)</li>
                <li>• Days are numbered 1-31 based on the month</li>
                <li>• Ensure cycles don't overlap to avoid conflicts</li>
                <li>• Phase 1 is typically the goal-setting period at the start of the fiscal year</li>
                <li>• Q1-Q4 check-ins should be evenly distributed throughout the year</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
  );
}


