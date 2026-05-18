import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bell, Settings, Search, Filter, Download, RefreshCw, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getAuditLogs, exportAuditLogsCSV, downloadCSV } from "../../api/adminApi";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const getActionColor = (action) => {
  if (action?.includes('approved') || action?.includes('approve')) return 'text-emerald-400';
  if (action?.includes('rejected') || action?.includes('reject')) return 'text-red-400';
  if (action?.includes('created') || action?.includes('create')) return 'text-blue-400';
  if (action?.includes('updated') || action?.includes('update')) return 'text-purple-400';
  if (action?.includes('deleted') || action?.includes('delete')) return 'text-red-400';
  if (action?.includes('unlocked') || action?.includes('unlock')) return 'text-amber-400';
  if (action?.includes('role_changed')) return 'text-cyan-400';
  return 'text-gray-400';
};

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await getAuditLogs({ limit: 300 });
      setLogs(data || []);
    } catch (error) {
      console.error("Failed to load audit logs:", error);
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadLogs();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const s = `${l.user_email || ''} ${l.target || ''} ${l.details || ''}`.toLowerCase();
      const okSearch = s.includes(searchTerm.toLowerCase());
      const okAction = filterAction === 'all' || l.action === filterAction;
      return okSearch && okAction;
    });
  }, [logs, searchTerm, filterAction]);

  const exportLogs = async () => {
    setExporting(true);
    const loadingToast = toast.loading("Exporting audit logs...");
    try {
      const blob = await exportAuditLogsCSV(1000);
      downloadCSV(blob, `audit_logs_${Date.now()}.csv`);
      toast.success("Audit logs exported successfully!", { id: loadingToast });
    } catch (error) {
      console.error("Failed to export logs:", error);
      toast.error("Failed to export audit logs", { id: loadingToast });
    } finally {
      setExporting(false);
    }
  };

  // Get unique actions for filter
  const uniqueActions = useMemo(() => {
    const actions = new Set(logs.map(l => l.action).filter(Boolean));
    return Array.from(actions).sort();
  }, [logs]);

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
          <span className="text-indigo-400">Audit Logs</span>
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
                <Shield className="text-indigo-400" size={32} />
                <h1 className="text-4xl font-bold text-white">Audit Logs</h1>
              </div>
              <p className="text-gray-400">Live security and compliance activity stream for system monitoring.</p>
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
                onClick={exportLogs}
                disabled={exporting}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Download size={18} />
                {exporting ? "Exporting..." : "Export Logs"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <motion.div {...fade(0.05)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Shield className="text-indigo-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Logs</p>
                <p className="text-3xl font-bold text-white">{logs.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Clock className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Filtered Results</p>
                <p className="text-3xl font-bold text-emerald-400">{filtered.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.15)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Filter className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Action Types</p>
                <p className="text-3xl font-bold text-purple-400">{uniqueActions.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div {...fade(0.2)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by user, target, or details..."
                className="w-full bg-[#1A2235] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full bg-[#1A2235] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Logs List */}
        <motion.div {...fade(0.25)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Activity Stream</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="text-gray-600 mx-auto mb-4" size={48} />
              <p className="text-gray-400 text-lg">No audit logs found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {filtered.map((log, idx) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="p-4 bg-[#1A2235]/30 border border-white/5 rounded-xl hover:border-indigo-500/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={18} className="text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-relaxed">
                        <span className="font-bold">{log.user_email || `User #${log.user_id}`}</span>
                        {' '}
                        <span className={`${getActionColor(log.action)} font-semibold`}>
                          {log.action?.replace(/_/g, ' ')}
                        </span>
                        {' '}
                        <span className="text-gray-400">{log.target}</span>
                      </p>
                      {log.details && (
                        <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                      )}
                      <p className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                        <Clock size={12} />
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Unknown time'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
