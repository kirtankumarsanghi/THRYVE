import { useEffect, useMemo, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getAuditLogs, exportAuditLogsCSV, downloadCSV } from "../../api/adminApi";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  useEffect(() => {
    const load = async () => {
      const data = await getAuditLogs({ limit: 300 });
      setLogs(data || []);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const s = `${l.user_email || ''} ${l.target || ''} ${l.details || ''}`.toLowerCase();
      const okSearch = s.includes(searchTerm.toLowerCase());
      const okAction = filterAction === 'all' || l.action === filterAction;
      return okSearch && okAction;
    });
  }, [logs, searchTerm, filterAction]);

  const exportLogs = async () => {
    const blob = await exportAuditLogsCSV(1000);
    downloadCSV(blob, `audit_logs_${Date.now()}.csv`);
  };

  return (
    <main className="app-shell pt-8 pb-24 min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-6 mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Audit Logs</h2>
          <p className="text-on-surface-variant text-sm">Live security/compliance activity stream.</p>
        </div>
        <button onClick={exportLogs} className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg">Export Logs</button>
      </header>

      <div className="surface-card p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search logs..." className="enterprise-input px-3 py-2" />
        <input value={filterAction} onChange={(e) => setFilterAction(e.target.value)} placeholder="Filter action (or all)" className="enterprise-input px-3 py-2" />
      </div>

      <div className="surface-card p-4 space-y-2">
        {filtered.map((log) => (
          <div key={log.id} className="p-3 border border-outline-variant/20 rounded-lg bg-surface-container/30">
            <p className="text-on-surface text-sm"><span className="font-semibold">{log.user_email || `User#${log.user_id}`}</span> {log.action} {log.target}</p>
            <p className="text-on-surface-variant text-xs mt-1">{log.details || ''}</p>
            <p className="text-on-surface-variant text-[11px] mt-1">{log.timestamp}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-on-surface-variant">No logs found.</p>}
      </div>
    </main>
  );
}
