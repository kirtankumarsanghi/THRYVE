import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
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
    <main className="app-shell pt-8 pb-24 min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-8 mt-6">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Governance Center</h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">Configure quarterly windows and monitor system status.</p>
      </header>

      <div className="surface-card p-6 mb-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-4">Quarterly Window Configuration</h3>
        <div className="space-y-3">
          {windows.map((w, idx) => (
            <div key={w.window_name} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-outline-variant/20 rounded-lg">
              <div className="text-on-surface font-medium">{w.window_name}</div>
              <input type="number" value={w.start_month} onChange={(e) => updateField(idx, 'start_month', e.target.value)} className="enterprise-input px-3 py-2" min="1" max="12" />
              <input type="number" value={w.start_day} onChange={(e) => updateField(idx, 'start_day', e.target.value)} className="enterprise-input px-3 py-2" min="1" max="31" />
              <input type="number" value={w.end_month} onChange={(e) => updateField(idx, 'end_month', e.target.value)} className="enterprise-input px-3 py-2" min="1" max="12" />
              <input type="number" value={w.end_day} onChange={(e) => updateField(idx, 'end_day', e.target.value)} className="enterprise-input px-3 py-2" min="1" max="31" />
            </div>
          ))}
        </div>
        <button onClick={saveWindows} disabled={saving} className="mt-4 px-6 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg">
          {saving ? 'Saving...' : 'Save Windows'}
        </button>
      </div>

      <div className="surface-card p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-4">System Health</h3>
        {health ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-on-surface">
            <div>Total Users: {health.total_users}</div>
            <div>Total Goals: {health.total_goals}</div>
            <div>Pending Approvals: {health.pending_approvals}</div>
            <div>Status: {health.status}</div>
          </div>
        ) : <p className="text-on-surface-variant">Loading...</p>}
      </div>
    </main>
  );
}
