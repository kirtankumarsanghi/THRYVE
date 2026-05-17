import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getOrgAnalytics, exportAnalyticsCSV, downloadCSV } from "../../api/adminApi";
import LiveDataNotice from "../../components/common/LiveDataNotice";

export default function OrganizationAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getOrgAnalytics();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const exportReport = async () => {
    const blob = await exportAnalyticsCSV("overview");
    downloadCSV(blob, `org_analytics_${Date.now()}.csv`);
  };

  const overview = data?.overview || {};
  const departments = data?.departments || [];
  const top = data?.top_performers || [];

  return (
    <main className="app-shell pt-8 pb-24 min-h-screen">
      <LiveDataNotice source="Org Analytics API" hint="Ask employees to submit check-ins and managers to approve goals for richer trends." />
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-8 mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Organization Analytics</h2>
          <p className="text-on-surface-variant text-sm">Live organization metrics from backend.</p>
        </div>
        <button onClick={exportReport} className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg">Export CSV</button>
      </header>

      {loading ? <p className="text-on-surface-variant">Loading...</p> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card label="Total Goals" value={overview.total_goals || 0} />
            <Card label="Completed" value={overview.completed_goals || 0} />
            <Card label="Pending" value={overview.pending_goals || 0} />
            <Card label="Completion" value={`${Math.round(overview.completion_rate || 0)}%`} />
            <Card label="Employees" value={overview.total_employees || 0} />
          </div>

          <div className="surface-card p-6 mb-6">
            <h3 className="text-on-surface font-semibold mb-4">Department Performance</h3>
            <div className="space-y-3">
              {departments.map((d) => (
                <div key={d.department} className="p-3 bg-surface-container/40 rounded-lg border border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <p className="text-on-surface font-medium">{d.department}</p>
                    <p className="text-xs text-on-surface-variant">{d.employee_count} employees • {d.total_goals} goals</p>
                  </div>
                  <p className="text-secondary font-semibold">{Math.round(d.completion_rate || 0)}%</p>
                </div>
              ))}
              {departments.length === 0 && <p className="text-on-surface-variant text-sm">No department metrics yet.</p>}
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="text-on-surface font-semibold mb-4">Top Performers</h3>
            <div className="space-y-3">
              {top.slice(0, 10).map((p) => (
                <div key={p.employee_id} className="p-3 bg-surface-container/40 rounded-lg border border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <p className="text-on-surface">{p.employee_name}</p>
                    <p className="text-xs text-on-surface-variant">{p.department}</p>
                  </div>
                  <p className="text-primary font-semibold">{Math.round(p.completion_rate || 0)}%</p>
                </div>
              ))}
              {top.length === 0 && <p className="text-on-surface-variant text-sm">No ranking data yet.</p>}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-[#0F172A] border border-white/5 rounded-xl p-4">
      <p className="text-xs text-on-surface-variant">{label}</p>
      <p className="text-xl font-bold text-on-surface">{value}</p>
    </div>
  );
}
