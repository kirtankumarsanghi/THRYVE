import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { getQuarterlyWindows, updateQuarterlyWindows, getSystemHealth } from "../../api/adminApi";

export default function GovernanceCenter() {
  const [windows, setWindows] = useState([]);
  const [health, setHealth] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const w = await getQuarterlyWindows();
      setWindows(w.windows || []);
      const h = await getSystemHealth();
      setHealth(h);
    };
    load();
  }, []);

  const updateField = (idx, field, value) => {
    setWindows((prev) => prev.map((w, i) => (i === idx ? { ...w, [field]: Number(value) } : w)));
  };

  const saveWindows = async () => {
    setSaving(true);
    try {
      await updateQuarterlyWindows(windows);
      alert('Quarterly windows updated successfully');
    } catch (e) {
      alert(e?.response?.data?.detail || 'Failed to update windows');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6 text-white">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Admin</span>
            <span className="text-gray-600">&gt;</span>
            <span className="text-red-400">Governance Center</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Governance Center</h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">Configure quarterly windows and monitor system status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={saveWindows} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/20 border border-red-400/30">
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card bg-[#0F1629] p-6 border border-white/5 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Quarterly Window Configuration</h3>
          <div className="space-y-4">
            {windows.map((w, idx) => (
              <div key={w.window_name} className="flex flex-col md:flex-row gap-4 p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                <div className="w-32 flex items-center">
                  <span className="text-white font-semibold">{w.window_name}</span>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Start Month</label>
                    <input type="number" value={w.start_month} onChange={(e) => updateField(idx, 'start_month', e.target.value)} className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" min="1" max="12" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Start Day</label>
                    <input type="number" value={w.start_day} onChange={(e) => updateField(idx, 'start_day', e.target.value)} className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" min="1" max="31" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">End Month</label>
                    <input type="number" value={w.end_month} onChange={(e) => updateField(idx, 'end_month', e.target.value)} className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" min="1" max="12" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">End Day</label>
                    <input type="number" value={w.end_day} onChange={(e) => updateField(idx, 'end_day', e.target.value)} className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500" min="1" max="31" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card bg-[#0F1629] p-6 border border-white/5 rounded-2xl h-fit">
          <h3 className="text-xl font-bold text-white mb-6">System Health</h3>
          {health ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm text-slate-400 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-white">{health.total_users}</p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm text-slate-400 mb-1">Total Goals</p>
                <p className="text-2xl font-bold text-white">{health.total_goals}</p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm text-slate-400 mb-1">Pending Approvals</p>
                <p className="text-2xl font-bold text-amber-400">{health.pending_approvals}</p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm text-slate-400 mb-1">Status</p>
                <p className="text-2xl font-bold text-emerald-400 uppercase">{health.status}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


