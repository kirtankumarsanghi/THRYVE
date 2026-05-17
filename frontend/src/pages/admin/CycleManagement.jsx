import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getQuarterlyWindows, updateQuarterlyWindows } from "../../api/adminApi";

export default function CycleManagement() {
  const [windows, setWindows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getQuarterlyWindows();
        setWindows(data.windows || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateField = (idx, field, value) => {
    setWindows((prev) => prev.map((w, i) => i === idx ? { ...w, [field]: Number(value) } : w));
  };

  const save = async () => {
    await updateQuarterlyWindows(windows);
    alert("Cycle windows updated");
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />
      <header className="mb-8 mt-6">
        <h2 className="text-2xl font-bold text-on-surface">Cycle Management</h2>
        <p className="text-on-surface-variant text-sm">Live quarterly cycle configuration.</p>
      </header>

      {loading ? <p className="text-on-surface-variant">Loading...</p> : (
        <div className="surface-card p-6 space-y-3">
          {windows.map((w, idx) => (
            <div key={w.window_name} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 border border-outline-variant/20 rounded-lg">
              <p className="text-on-surface">{w.window_name}</p>
              <input type="number" value={w.start_month} onChange={(e) => updateField(idx, 'start_month', e.target.value)} className="enterprise-input px-2 py-2" />
              <input type="number" value={w.start_day} onChange={(e) => updateField(idx, 'start_day', e.target.value)} className="enterprise-input px-2 py-2" />
              <input type="number" value={w.end_month} onChange={(e) => updateField(idx, 'end_month', e.target.value)} className="enterprise-input px-2 py-2" />
              <input type="number" value={w.end_day} onChange={(e) => updateField(idx, 'end_day', e.target.value)} className="enterprise-input px-2 py-2" />
            </div>
          ))}
          <button onClick={save} className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg">Save Cycles</button>
        </div>
      )}
    </main>
  );
}
