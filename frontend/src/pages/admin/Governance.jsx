import { useState, useEffect } from "react";
import { ArrowLeft, Save, Bell, Settings, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const PHASES = [
  { id: "phase1", label: "Phase 1 - Goal Setting" },
  { id: "q1", label: "Q1 Check-in" },
  { id: "q2", label: "Q2 Check-in" },
  { id: "q3", label: "Q3 Check-in" },
  { id: "q4", label: "Q4 Check-in" },
];

export default function Governance() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [windows, setWindows] = useState({
    phase1: { start_month: 5, start_day: 1, end_month: 5, end_day: 31 },
    q1: { start_month: 7, start_day: 1, end_month: 7, end_day: 31 },
    q2: { start_month: 10, start_day: 1, end_month: 10, end_day: 31 },
    q3: { start_month: 1, start_day: 1, end_month: 1, end_day: 31 },
    q4: { start_month: 3, start_day: 1, end_month: 4, end_day: 30 },
  });

  useEffect(() => {
    loadWindows();
  }, []);

  const loadWindows = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await axios.get(`${baseURL}/api/reports/quarterly-window`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        // Map backend data to frontend format
        const mappedWindows = {};
        Object.keys(response.data).forEach(key => {
          const window = response.data[key];
          mappedWindows[key] = {
            start_month: window.start_month || 1,
            start_day: window.start_day || 1,
            end_month: window.end_month || 1,
            end_day: window.end_day || 31,
          };
        });
        setWindows(mappedWindows);
      }
    } catch (error) {
      console.error("Failed to load windows:", error);
      toast.error("Failed to load quarterly windows");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (phase, field, value) => {
    const numValue = parseInt(value) || 1;
    setWindows(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        [field]: numValue
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const loadingToast = toast.loading("Saving quarterly windows...");
    
    try {
      const token = localStorage.getItem("token");
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      // Save each window
      for (const [phase, data] of Object.entries(windows)) {
        await axios.post(
          `${baseURL}/api/admin/quarterly-windows`,
          {
            phase_name: phase,
            ...data
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
      
      toast.success("Quarterly windows saved successfully!", { id: loadingToast });
      await loadWindows();
    } catch (error) {
      console.error("Failed to save windows:", error);
      toast.error(error?.response?.data?.detail || "Failed to save windows", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Top Bar */}
      <div className="bg-[#0F1629] border-b border-white/5 px-8 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">Admin Console</h1>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400">Marcus Rivers</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
              • ADMIN MODE
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#0F1629] px-8 py-3 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto flex items-center gap-2 text-sm">
          <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
            🏠
          </Link>
          <span className="text-gray-600">›</span>
          <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
            Admin
          </Link>
          <span className="text-gray-600">›</span>
          <span className="text-indigo-400">Governance</span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <motion.div {...fade(0)} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Governance Center</h1>
              <p className="text-gray-400">Configure quarterly windows and monitor system status.</p>
            </div>
            <button
              onClick={loadWindows}
              disabled={loading}
              className="p-3 hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw size={20} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Quarterly Window Configuration */}
        <motion.div {...fade(0.1)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Quarterly Window Configuration</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 pb-4 border-b border-white/5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phase Name</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Start Month (1-12)</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Start Day (1-31)</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">End Month (1-12)</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">End Day (1-31)</div>
              </div>

              {/* Table Rows */}
              {PHASES.map((phase, idx) => (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="grid grid-cols-5 gap-4 items-center"
                >
                  <div className="text-white font-medium">{phase.label}</div>
                  
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={windows[phase.id]?.start_month || 1}
                    onChange={(e) => handleInputChange(phase.id, 'start_month', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={windows[phase.id]?.start_day || 1}
                    onChange={(e) => handleInputChange(phase.id, 'start_day', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={windows[phase.id]?.end_month || 1}
                    onChange={(e) => handleInputChange(phase.id, 'end_month', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={windows[phase.id]?.end_day || 31}
                    onChange={(e) => handleInputChange(phase.id, 'end_day', e.target.value)}
                    className="bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </motion.div>
              ))}

              {/* Save Button */}
              <div className="pt-6 flex items-center gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Windows"}
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
    </div>
  );
}
