import { useEffect, useState } from "react";
import { getTeamAnalytics } from "../../api/analyticsApi";

export default function OneOnOnes() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await getTeamAnalytics();
        setTeam(t || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">1-on-1 Meetings</h1>
        <p className="text-sm text-gray-400">Live team list for 1-on-1 planning.</p>
      </div>

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-sm text-gray-300 mb-4">Meeting scheduler integration is pending. Use this queue to run weekly check-ins manually.</p>
          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            {team.map((m) => (
              <div key={m.employee_id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{m.employee_name}</p>
                  <p className="text-xs text-gray-400">{m.department}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs">Mark Reviewed</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
