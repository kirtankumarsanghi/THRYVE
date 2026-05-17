import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPendingApprovals, approveGoal, rejectGoal } from "../../api/approvalsApi";

export default function PendingApprovals() {
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getPendingApprovals();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    await approveGoal(id, comments[id] || "Approved");
    toast.success("Goal approved");
    await load();
  };

  const handleReject = async (id) => {
    await rejectGoal(id, comments[id] || "Please revise and resubmit");
    toast.success("Goal rejected");
    await load();
  };

  if (loading) return <div className="app-shell py-6 text-white">Loading approvals...</div>;

  return (
    <div className="app-shell py-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-white mb-2">Pending Approvals</h1>
      <p className="text-sm text-gray-400 mb-6">{items.length} goals awaiting your review</p>

      {items.length === 0 ? (
        <p className="text-gray-400">All caught up.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="surface-card p-5">
              <p className="text-white font-semibold">{item.title}</p>
              <p className="text-sm text-gray-400">{item.employee_name} • {item.department} • {item.quarter}</p>
              <p className="text-sm text-gray-300 mt-2">{item.description}</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mt-3">
                <span>Target: {item.target_value}</span>
                <span>Weightage: {item.weightage}%</span>
                <span>UoM: {item.uom_type}</span>
              </div>

              <textarea
                rows={2}
                value={comments[item.id] || ""}
                onChange={(e) => setComments((p) => ({ ...p, [item.id]: e.target.value }))}
                placeholder="Optional manager comment"
                className="w-full mt-3 enterprise-input px-3 py-2 text-sm text-white"
              />

              <div className="flex gap-3 mt-3">
                <button onClick={() => handleApprove(item.id)} className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300">Approve</button>
                <button onClick={() => handleReject(item.id)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
