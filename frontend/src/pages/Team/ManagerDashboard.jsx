import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getOverview, getTeamAnalytics } from "../../api/analyticsApi";
import { getPendingApprovals } from "../../api/approvalsApi";
import LiveDataNotice from "../../components/common/LiveDataNotice";

export default function ManagerDashboard() {
  const [overview, setOverview] = useState(null);
  const [team, setTeam] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [o, t, p] = await Promise.all([getOverview(), getTeamAnalytics(), getPendingApprovals()]);
        setOverview(o);
        setTeam(t || []);
        setPending(p || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const avgCompletion = useMemo(() => {
    if (!team.length) return 0;
    return Math.round(team.reduce((s, x) => s + (x.completion_rate || 0), 0) / team.length);
  }, [team]);

  if (loading) return <div className="p-6 text-white">Loading manager dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <LiveDataNotice source="Approvals + Analytics APIs" hint="Employee submissions appear here in real time for manager action." />

      <div>
        <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
        <p className="text-sm text-gray-400">Live team performance and approvals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Team Members" value={team.length} />
        <Stat label="Pending Approvals" value={pending.length} highlight="text-orange-400" />
        <Stat label="Team Completion" value={`${avgCompletion}%`} highlight="text-emerald-400" />
        <Stat label="Org Goals" value={overview?.total_goals || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">Pending Approval Queue</h2>
            <Link to="/manager/approvals" className="text-purple-400 text-sm">Open Queue</Link>
          </div>
          <div className="space-y-2">
            {pending.length === 0 && <p className="text-gray-400 text-sm">No pending approvals. Ask employees to submit goals/check-ins to populate this queue.</p>}
            {pending.slice(0, 6).map((g) => (
              <div key={g.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white text-sm font-medium">{g.title}</p>
                <p className="text-xs text-gray-400">{g.employee_name} • {g.department}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-3">Team Snapshot</h2>
          <div className="space-y-2 max-h-[360px] overflow-y-auto">
            {team.map((m) => (
              <div key={m.employee_id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{m.employee_name}</p>
                  <p className="text-xs text-gray-400">{m.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-300">{Math.round(m.completion_rate || 0)}%</p>
                  <p className="text-xs text-gray-400">{m.completed_goals}/{m.total_goals}</p>
                </div>
              </div>
            ))}
            {team.length === 0 && <p className="text-gray-400 text-sm">No team data yet. Create employees and goals to populate this view.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight = "text-white" }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${highlight}`}>{value}</p>
    </div>
  );
}
