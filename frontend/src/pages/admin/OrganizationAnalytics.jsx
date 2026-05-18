import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Settings, Download, RefreshCw, TrendingUp, Users, Target, Award, Building2, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getOrgAnalytics, exportAnalyticsCSV, downloadCSV } from "../../api/adminApi";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

export default function OrganizationAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getOrgAnalytics();
      setData(res);
    } catch (error) {
      console.error("Failed to load org analytics:", error);
      toast.error("Failed to load organization analytics");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const exportReport = async () => {
    setExporting(true);
    const loadingToast = toast.loading("Exporting analytics report...");
    try {
      const blob = await exportAnalyticsCSV("overview");
      downloadCSV(blob, `org_analytics_${Date.now()}.csv`);
      toast.success("Analytics exported successfully!", { id: loadingToast });
    } catch (error) {
      console.error("Failed to export analytics:", error);
      toast.error("Failed to export analytics", { id: loadingToast });
    } finally {
      setExporting(false);
    }
  };

  const overview = data?.overview || {};
  const departments = data?.departments || [];
  const top = data?.top_performers || [];

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Top Bar */}
      <div className="bg-[#0F1629] border-b border-white/5 px-8 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">Admin Console</h1>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400">Marcus Rivers</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
              • ADMIN MODE
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#0F1629] px-8 py-3 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto flex items-center gap-2 text-sm">
          <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
            🏠
          </Link>
          <span className="text-gray-600">›</span>
          <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
            Admin
          </Link>
          <span className="text-gray-600">›</span>
          <span className="text-indigo-400">Organization Analytics</span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <motion.div {...fade(0)} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="text-indigo-400" size={32} />
                <h1 className="text-4xl font-bold text-white">Organization Analytics</h1>
              </div>
              <p className="text-gray-400">Comprehensive organization metrics and performance insights.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-3 hover:bg-white/5 rounded-lg transition-colors"
              >
                <RefreshCw size={20} className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={exportReport}
                disabled={exporting}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Download size={18} />
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Data Notice */}
        <motion.div {...fade(0.05)} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <p className="text-emerald-400 font-bold text-sm">LIVE DATA</p>
            <p className="text-emerald-300/70 text-xs">Real-time organization metrics from backend API</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading analytics data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-8">
              <motion.div {...fade(0.1)}>
                <StatCard label="Total Goals" value={overview.total_goals || 0} icon={Target} color="indigo" />
              </motion.div>
              <motion.div {...fade(0.15)}>
                <StatCard label="Completed" value={overview.completed_goals || 0} icon={Award} color="emerald" />
              </motion.div>
              <motion.div {...fade(0.2)}>
                <StatCard label="Pending" value={overview.pending_goals || 0} icon={TrendingUp} color="amber" />
              </motion.div>
              <motion.div {...fade(0.25)}>
                <StatCard label="Completion" value={`${Math.round(overview.completion_rate || 0)}%`} icon={BarChart3} color="purple" />
              </motion.div>
              <motion.div {...fade(0.3)}>
                <StatCard label="Employees" value={overview.total_employees || 0} icon={Users} color="cyan" />
              </motion.div>
            </div>

            {/* Department Performance */}
            <motion.div {...fade(0.35)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Department Performance</h2>
              </div>
              <div className="space-y-4">
                {departments.length > 0 ? departments.map((d, idx) => (
                  <motion.div
                    key={d.department}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-5 bg-[#1A2235]/30 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <Building2 className="text-indigo-400" size={24} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">{d.department}</p>
                          <p className="text-sm text-gray-400">{d.employee_count} employees · {d.total_goals} goals</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-indigo-400">{Math.round(d.completion_rate || 0)}%</p>
                        <p className="text-xs text-gray-500">Completion Rate</p>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-12">
                    <Building2 className="text-gray-600 mx-auto mb-3" size={48} />
                    <p className="text-gray-400">No department metrics available yet</p>
                    <p className="text-gray-500 text-sm mt-1">Data will appear as employees create goals</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Top Performers */}
            <motion.div {...fade(0.4)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Top Performers</h2>
              </div>
              <div className="space-y-3">
                {top.length > 0 ? top.slice(0, 10).map((p, idx) => (
                  <motion.div
                    key={p.employee_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="p-4 bg-[#1A2235]/30 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{p.employee_name}</p>
                        <p className="text-sm text-gray-400">{p.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">{Math.round(p.completion_rate || 0)}%</p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-12">
                    <Award className="text-gray-600 mx-auto mb-3" size={48} />
                    <p className="text-gray-400">No ranking data available yet</p>
                    <p className="text-gray-500 text-sm mt-1">Top performers will appear as goals are completed</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  };

  const c = colors[color] || colors.indigo;

  return (
    <div className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center border ${c.border}`}>
          <Icon className={c.text} size={24} />
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${c.text}`}>{value}</p>
    </div>
  );
}
