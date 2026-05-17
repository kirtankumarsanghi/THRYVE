import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function TeamCalendar() {
  const [windowInfo, setWindowInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/reports/quarterly-window');
        setWindowInfo(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Team Calendar</h1>
        <p className="text-sm text-gray-400">Organization cycle windows and check-in schedule.</p>
      </div>

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-medium mb-2">Current Window: {windowInfo?.current_window || 'No active window'}</p>
          <p className="text-gray-400 text-sm mb-4">Next Window: {windowInfo?.next_window || '-'}</p>

          <div className="space-y-2">
            {(windowInfo?.windows || []).map((w) => (
              <div key={w.window_name} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <p className="text-white text-sm">{w.window_name}</p>
                <p className="text-xs text-gray-300">{w.start} to {w.end}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
