import { useEffect, useState } from "react";
import { getOverview, getQuarterlyTrends, getDepartmentAnalytics } from "../../api/analyticsApi";

export default function PerformanceInsights() {
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState(null);
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [o, t, d] = await Promise.all([getOverview(), getQuarterlyTrends(), getDepartmentAnalytics()]);
      setOverview(o);
      setTrends(t);
      setDepts(d || []);
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Performance Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card label="Avg Progress" value={`${Math.round(overview?.avg_progress || 0)}%`} />
        <Card label="Completion Rate" value={`${Math.round(overview?.completion_rate || 0)}%`} />
        <Card label="Completed Goals" value={overview?.completed_goals || 0} />
        <Card label="Departments" value={overview?.total_departments || 0} />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-white font-semibold mb-3">Quarterly Completion</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(trends?.quarters || []).map((q, i) => (
            <div key={q} className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-white">{q}</p>
              <p className="text-xs text-gray-400">{Math.round(trends?.completion_rates?.[i] || 0)}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-white font-semibold mb-3">Department Comparison</h2>
        <div className="space-y-2">
          {depts.map((d) => (
            <div key={d.department} className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
              <p className="text-sm text-white">{d.department}</p>
              <p className="text-xs text-gray-300">{Math.round(d.completion_rate || 0)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return <div className="bg-white/5 border border-white/10 rounded-2xl p-4"><p className="text-xs text-gray-400">{label}</p><p className="text-xl text-white font-bold">{value}</p></div>;
}
