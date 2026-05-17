import { useEffect, useState } from "react";
import { getEmployeeRanking } from "../../api/analyticsApi";

export default function FeedbackRecognition() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEmployeeRanking(10);
        setRankings(data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Feedback & Recognition</h1>
        <p className="text-sm text-gray-400">Use this live leaderboard to recognize top performers.</p>
      </div>

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="space-y-2">
            {rankings.map((r) => (
              <div key={r.employee_id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">#{r.rank} {r.employee_name}</p>
                  <p className="text-xs text-gray-400">{r.department}</p>
                </div>
                <p className="text-sm text-emerald-300">{Math.round(r.completion_rate || 0)}%</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Direct feedback message composer can be added next; data source is now live.</p>
        </div>
      )}
    </div>
  );
}
