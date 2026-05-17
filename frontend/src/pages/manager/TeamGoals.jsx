import { useEffect, useMemo, useState } from "react";
import { Plus, Users, Send } from "lucide-react";
import { getEmployees } from "../../api/usersApi";
import { createSharedGoal } from "../../api/goalsApi";

export default function TeamGoals() {
  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    strategic_area: "",
    target_value: 0,
    uom_type: "Numeric",
    uom_direction: "Higher is Better",
    target_date: "",
    quarter: "Q1",
    default_weightage: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getEmployees();
      setEmployees(data || []);
    };
    load();
  }, []);

  const selectableEmployees = useMemo(
    () => employees.filter((e) => e.status === "active"),
    [employees]
  );

  const toggleRecipient = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      alert("Select at least one employee");
      return;
    }
    setLoading(true);
    try {
      await createSharedGoal({
        ...form,
        target_value: Number(form.target_value || 0),
        default_weightage: Number(form.default_weightage || 10),
        target_date: form.target_date || null,
        recipient_ids: selectedIds,
      });
      alert("Shared goal created successfully");
      setSelectedIds([]);
      setForm((s) => ({ ...s, title: "", description: "" }));
    } catch (err) {
      alert(err?.response?.data?.detail || "Failed to create shared goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Shared Team Goals</h1>
        <p className="text-sm text-gray-400">Push departmental KPIs to multiple employees.</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-sm text-gray-300">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mt-1 bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white" required />
          </div>
          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mt-1 bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Strategic Area" value={form.strategic_area} onChange={(e) => setForm({ ...form, strategic_area: e.target.value })} className="bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white" />
            <select value={form.quarter} onChange={(e) => setForm({ ...form, quarter: e.target.value })} className="bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white">
              <option value="Q1">Q1</option><option value="Q2">Q2</option><option value="Q3">Q3</option><option value="Q4">Q4</option>
            </select>
            <input type="number" step="0.01" placeholder="Target value" value={form.target_value} onChange={(e) => setForm({ ...form, target_value: e.target.value })} className="bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white" />
            <input type="number" placeholder="Default weightage" value={form.default_weightage} onChange={(e) => setForm({ ...form, default_weightage: e.target.value })} className="bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white" />
            <select value={form.uom_type} onChange={(e) => setForm({ ...form, uom_type: e.target.value })} className="bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white">
              <option value="Numeric">Numeric</option><option value="Percentage">Percentage</option><option value="Timeline">Timeline</option><option value="Zero-based">Zero-based</option>
            </select>
            <select value={form.uom_direction} onChange={(e) => setForm({ ...form, uom_direction: e.target.value })} className="bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white">
              <option value="Higher is Better">Higher is Better</option><option value="Lower is Better">Lower is Better</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-300">Target date (optional)</label>
            <input type="date" value={form.target_date} onChange={(e) => setForm({ ...form, target_date: e.target.value })} className="w-full mt-1 bg-[#060D1F] border border-white/10 rounded-lg p-2.5 text-white [color-scheme:dark]" />
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2.5">
            <Send size={16} /> {loading ? "Pushing..." : "Push Shared Goal"}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold flex items-center gap-2 mb-3"><Users size={18} /> Recipients ({selectedIds.length})</h3>
          <div className="space-y-2 max-h-[480px] overflow-y-auto">
            {selectableEmployees.map((emp) => (
              <label key={emp.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                <input type="checkbox" checked={selectedIds.includes(emp.id)} onChange={() => toggleRecipient(emp.id)} />
                <div>
                  <p className="text-sm text-white">{emp.full_name}</p>
                  <p className="text-xs text-gray-400">{emp.email}</p>
                </div>
              </label>
            ))}
          </div>
          <button type="button" onClick={() => setSelectedIds(selectableEmployees.map((e) => e.id))} className="mt-3 w-full border border-white/20 text-white rounded-lg py-2 text-sm flex items-center justify-center gap-2">
            <Plus size={14} /> Select All Active Employees
          </button>
        </div>
      </form>
    </div>
  );
}
