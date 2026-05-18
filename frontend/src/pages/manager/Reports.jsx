import { useState, useEffect } from "react";
import { Download, FileText, Table, BarChart2, Users, CheckCircle2, Search, Bell, HelpCircle, RefreshCw, ChevronRight, FileSpreadsheet, Calendar, Filter, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import { useManager } from "../../context/ManagerContext";
import { useAuth } from "../../context/AuthContext";
import { generateManagerReportPDF } from "../../utils/pdfExport";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const REPORT_TYPES = [
  { 
    id: "achievement", 
    label: "Achievement Report", 
    desc: "Team goals, progress, and completion metrics", 
    icon: BarChart2, 
    color: "text-indigo-400", 
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  { 
    id: "team", 
    label: "Team Overview", 
    desc: "Member list with roles, departments, and status", 
    icon: Users, 
    color: "text-cyan-400", 
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  { 
    id: "completion", 
    label: "Completion Dashboard", 
    desc: "Check-in completion rates and status", 
    icon: CheckCircle2, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function Reports() {
  const { team, refreshData } = useManager();
  const { user } = useAuth();
  const [format, setFormat] = useState("pdf");
  const [selectedReport, setSelectedReport] = useState("achievement");
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [department, setDepartment] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Load report preview
  const loadReportPreview = async () => {
    setLoadingPreview(true);
    try {
      const response = await api.get(
        "/reports/achievement",
        {
          params: department ? { department } : {}
        }
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Failed to load report preview:", error);
      toast.error("Failed to load report preview");
    } finally {
      setLoadingPreview(false);
    }
  };

  useEffect(() => {
    if (selectedReport === "achievement") {
      loadReportPreview();
    }
  }, [selectedReport, department]);

  // Convert JSON data to CSV
  const convertToCSV = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return "No data available\n";
    }
    
    try {
      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(","),
        ...data.map(row => 
          headers.map(header => {
            let value = row[header];
            if (value === null || value === undefined) return "";
            value = String(value);
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(",")
        )
      ];
      return csvRows.join("\n");
    } catch (error) {
      console.error("CSV conversion error:", error);
      return "Error converting data to CSV\n";
    }
  };

  // Main download function
  const handleDownload = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Generating report...");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated. Please login again.");
      }

      let endpoint = "";
      let filename = "";
      const timestamp = new Date().toISOString().split('T')[0];

      // ── PDF: generate client-side from already-loaded data ──
      if (format === "pdf") {
        // Fetch fresh data if not already loaded
        let pdfData = reportData;
        if (!pdfData || selectedReport !== "achievement") {
          const resp = await api.get(
            "/reports/achievement",
            { params: department ? { department } : {} }
          );
          pdfData = resp.data;
        }
        generateManagerReportPDF(pdfData, team, user?.full_name || "Manager");
        toast.success("PDF report downloaded!", { id: loadingToast });
        setLoading(false);
        return;
      }

      // Determine endpoint based on report type
      if (selectedReport === "achievement") {
        if (format === "csv") {
          endpoint = "/reports/achievement/export/csv";
          filename = `achievement_report_${timestamp}.csv`;
        } else {
          endpoint = "/reports/achievement/export/xlsx";
          filename = `achievement_report_${timestamp}.xlsx`;
        }
      } else if (selectedReport === "team") {
        endpoint = "/analytics/team";
        filename = `team_overview_${timestamp}.${format}`;
      } else if (selectedReport === "completion") {
        endpoint = "/reports/completion-dashboard";
        filename = `completion_dashboard_${timestamp}.${format}`;
      }

      // Add department filter if selected
      const params = {};
      if (department) params.department = department;

      console.log("Downloading from:", endpoint);
      console.log("Params:", params);

      // For achievement reports with CSV/XLSX, expect blob response
      if (selectedReport === "achievement") {
        const response = await api.get(endpoint, {
          params,
          responseType: "blob"
        });

        // Create blob from response
        const blob = new Blob([response.data], { 
          type: response.headers['content-type'] || 'application/octet-stream'
        });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);

      } else {
        // For other reports, get JSON and convert
        const response = await api.get(endpoint, {
          params
        });

        let content;
        let mimeType;

        if (format === "csv") {
          content = convertToCSV(response.data);
          mimeType = "text/csv;charset=utf-8;";
        } else {
          content = JSON.stringify(response.data, null, 2);
          mimeType = "application/json";
        }

        // Create blob and download
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";
        
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);
      }

      toast.success(`Report downloaded: ${filename}`, { id: loadingToast });
      
    } catch (error) {
      console.error("Download error:", error);
      let errorMessage = "Failed to download report. ";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage += "Please login again.";
        } else if (error.response.status === 403) {
          errorMessage += "You don't have permission to download reports.";
        } else if (error.response.status === 404) {
          errorMessage += "No data available for this report.";
        } else if (error.response.data?.detail) {
          errorMessage += error.response.data.detail;
        } else {
          errorMessage += "Please try again.";
        }
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please check your connection and try again.";
      }
      
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  // Test download function
  const testDownload = () => {
    try {
      const testData = "Column1,Column2,Column3\nValue1,Value2,Value3\nTest1,Test2,Test3";
      const blob = new Blob([testData], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `test_download_${Date.now()}.csv`;
      link.style.display = "none";
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      toast.success("Test file downloaded successfully!");
    } catch (error) {
      console.error("Test download failed:", error);
      toast.error("Test download failed: " + error.message);
    }
  };

  const selectedReportType = REPORT_TYPES.find(r => r.id === selectedReport);

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6 text-white">

        {/* Header */}
        <motion.div {...fade(0)} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <span>Manager</span>
              <ChevronRight size={14} />
              <span className="text-indigo-400">Reports & Export</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Reports & Export</h2>
            <p className="text-sm text-slate-400 mt-1">Generate and download team performance reports</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors border border-white/10"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </motion.div>

        <LiveDataNotice source="Reports API" hint="Real-time report generation from team data" />

        {/* Report Type Selection */}
        <motion.div {...fade(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {REPORT_TYPES.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedReport(r.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                selectedReport === r.id
                  ? "bg-[#0B132C] border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                  : "bg-[#0B132C]/40 border-white/[0.06] hover:border-white/10"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${r.bg} border flex items-center justify-center mb-3`}>
                <r.icon size={18} className={r.color} />
              </div>
              <h3 className={`text-sm font-bold mb-1 ${selectedReport === r.id ? "text-white" : "text-gray-300"}`}>
                {r.label}
              </h3>
              <p className="text-[11px] text-gray-500">{r.desc}</p>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Export Configuration */}
          <motion.div {...fade(0.2)} className="lg:col-span-1 bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <FileText className="text-indigo-400" size={20} />
              <h2 className="text-lg font-bold text-white">Export Settings</h2>
            </div>

            <div className="space-y-5">
              {/* Department Filter */}
              {selectedReport === "achievement" && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Department Filter
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              )}

              {/* Output Format */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Output Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "pdf", label: "PDF", desc: "Professional report", icon: FileDown },
                    { val: "csv", label: "CSV", desc: "Comma-separated", icon: Table },
                    { val: "xlsx", label: "Excel", desc: "Microsoft Excel", icon: FileSpreadsheet },
                  ].map(f => (
                    <button
                      key={f.val}
                      onClick={() => setFormat(f.val)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        format === f.val
                          ? "bg-indigo-500/10 border-indigo-500/25 text-white"
                          : "bg-black/20 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <f.icon size={20} className={format === f.val ? "text-indigo-400" : "text-gray-500"} />
                        <div className="text-center">
                          <p className="text-xs font-bold">{f.label}</p>
                          <p className="text-[9px] text-gray-500">{f.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
              >
                <Download size={18} />
                {loading ? "Generating..." : `Download ${format.toUpperCase()}`}
              </button>

              {/* Test Download Button (Development only) */}
              {import.meta.env.DEV && (
                <button
                  onClick={testDownload}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 text-sm font-medium rounded-xl transition-all border border-gray-500/20"
                >
                  <Download size={14} />
                  Test Download
                </button>
              )}

              {/* Report Info */}
              <div className="pt-4 border-t border-white/5">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Report Type</span>
                    <span className="text-white font-medium">{selectedReportType?.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Format</span>
                    <span className="text-white font-medium">{format.toUpperCase()}</span>
                  </div>
                  {department && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Department</span>
                      <span className="text-white font-medium">{department}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Team Size</span>
                    <span className="text-white font-medium">{team.length} members</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Report Preview */}
          <motion.div {...fade(0.3)} className="lg:col-span-2 bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Report Preview</h2>
              <button
                onClick={loadReportPreview}
                disabled={loadingPreview}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors disabled:opacity-50"
              >
                {loadingPreview ? "Loading..." : "Refresh Preview"}
              </button>
            </div>

            {loadingPreview ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : reportData ? (
              <div className="space-y-4">
                {/* Report Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Total Records</p>
                    <p className="text-2xl font-bold text-white">{reportData.total_records || 0}</p>
                  </div>
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Department</p>
                    <p className="text-lg font-bold text-white">{reportData.department || "All"}</p>
                  </div>
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Report Type</p>
                    <p className="text-sm font-bold text-white truncate">{reportData.report_type}</p>
                  </div>
                </div>

                {/* Data Table Preview */}
                <div className="border border-white/5 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-black/40 sticky top-0">
                        <tr className="border-b border-white/5">
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Goal</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Progress</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Achievement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {reportData.data?.slice(0, 10).map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3 text-white font-medium">{row.employee_name}</td>
                            <td className="px-4 py-3 text-gray-400 truncate max-w-[200px]">{row.goal_title}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-black/40 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                    style={{ width: `${row.progress || 0}%` }}
                                  />
                                </div>
                                <span className="text-xs text-white font-bold">{row.progress || 0}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${
                                row.approval_status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                row.approval_status === "rejected" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }`}>
                                {row.approval_status || "pending"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-white font-bold">{row.achievement_percentage || 0}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {reportData.data?.length > 10 && (
                    <div className="bg-black/20 border-t border-white/5 px-4 py-3 text-center text-xs text-gray-500">
                      Showing 10 of {reportData.data.length} records. Download full report to see all data.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FileText size={48} className="text-gray-600 mb-4" />
                <p className="text-gray-400 font-medium mb-2">No preview available</p>
                <p className="text-xs text-gray-500">Select a report type and click "Refresh Preview"</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div {...fade(0.4)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0B132C] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users size={16} className="text-indigo-400" />
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Team Size</span>
            </div>
            <p className="text-2xl font-bold text-white">{team.length}</p>
          </div>
          <div className="bg-[#0B132C] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <BarChart2 size={16} className="text-emerald-400" />
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Avg Progress</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {team.length > 0 
                ? Math.round(team.reduce((sum, m) => sum + (m.completion_rate || 0), 0) / team.length)
                : 0}%
            </p>
          </div>
          <div className="bg-[#0B132C] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 size={16} className="text-cyan-400" />
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">On Track</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {team.filter(m => (m.completion_rate || 0) >= 60).length}
            </p>
          </div>
          <div className="bg-[#0B132C] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={16} className="text-amber-400" />
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">This Quarter</span>
            </div>
            <p className="text-lg font-bold text-white">Q3 FY26</p>
          </div>
        </motion.div>
    </div>
  );
}
