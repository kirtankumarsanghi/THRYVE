import { useCallback, useEffect, useState } from "react";
import * as analyticsApi from "../api/analyticsApi";

export default function useAnalytics() {
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState(null);
  const [status, setStatus] = useState(null);
  const [strategicAreas, setStrategicAreas] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [ov, tr, st, sa, rk, dep] = await Promise.all([
        analyticsApi.getOverview(),
        analyticsApi.getQuarterlyTrends(),
        analyticsApi.getGoalStatusDistribution(),
        analyticsApi.getStrategicAreaBreakdown(),
        analyticsApi.getEmployeeRanking(8),
        analyticsApi.getDepartmentAnalytics(),
      ]);
      setOverview(ov);
      setTrends(tr);
      setStatus(st);
      setStrategicAreas(sa || []);
      setRankings(rk || []);
      setDepartments(dep || []);
    } catch (e) {
      setError(e?.response?.data?.detail || "Unable to load analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    overview,
    trends,
    status,
    strategicAreas,
    rankings,
    departments,
    loading,
    error,
    refresh,
  };
}
