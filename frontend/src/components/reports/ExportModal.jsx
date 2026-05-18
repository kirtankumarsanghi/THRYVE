import React, { useState } from 'react';
import { Download, FileText, FileDown, Table } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { animations } from '../../styles/animations';
import { generateGenericPDF } from '../../utils/pdfExport';

export default function ExportModal({ isOpen, onClose }) {
  const [exportType, setExportType] = useState('full');
  const [format, setFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    const loadingToast = toast.loading('Generating report...');
    
    try {
      const token = localStorage.getItem('token');
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

      // Determine which backend endpoint to call
      let endpoint = '';
      let title = '';
      let subtitle = '';
      let headers = [];
      let mapRow = (r) => [];

      if (exportType === 'full') {
        endpoint = '/api/admin/export/goals';
        title = 'Full Organization Audit';
        subtitle = 'All goals, progress, and achievement data';
        headers = ['Employee', 'Goal', 'Department', 'Status', 'Progress'];
        mapRow = (r) => [
          r.employee_name || '—',
          (r.goal_title || '—').substring(0, 40),
          r.department || '—',
          r.status || '—',
          (r.achievement_percentage || 0) + '%',
        ];
      } else if (exportType === 'department') {
        endpoint = '/api/admin/export/analytics';
        title = 'Department Completion Matrix';
        subtitle = 'Aggregated statistics by department';
        headers = ['Department', 'Total Goals', 'Completed', 'Completion Rate'];
      } else if (exportType === 'users') {
        endpoint = '/api/admin/export/users';
        title = 'User Status Report';
        subtitle = 'All active and disabled users with roles';
        headers = ['Name', 'Email', 'Role', 'Department', 'Status'];
        mapRow = (r) => [
          r.full_name || '—',
          r.email || '—',
          r.role || '—',
          r.department || '—',
          r.status || '—',
        ];
      }

      if (format === 'pdf') {
        // Fetch JSON data from the achievement report endpoint
        const reportEndpoint = exportType === 'users' 
          ? '/api/admin/users' 
          : '/api/reports/achievement';
        
        const resp = await axios.get(baseURL + reportEndpoint, {
          headers: { Authorization: 'Bearer ' + token },
        });

        let rows = [];
        if (exportType === 'users') {
          const users = resp.data.users || resp.data || [];
          rows = users.map(u => [
            u.full_name || '—',
            u.email || '—',
            u.role || '—',
            u.department || '—',
            u.status || '—',
          ]);
        } else {
          const data = resp.data.data || resp.data || [];
          rows = data.map(r => [
            r.employee_name || '—',
            (r.goal_title || '—').substring(0, 40),
            r.department || '—',
            r.status || '—',
            (r.achievement_percentage || 0) + '%',
          ]);
        }

        generateGenericPDF(title, subtitle, headers, rows, exportType);
        toast.success('PDF report downloaded!', { id: loadingToast });
      } else {
        // CSV download from backend
        const resp = await axios.get(baseURL + endpoint, {
          headers: { Authorization: 'Bearer ' + token },
          responseType: 'blob',
        });

        const blob = new Blob([resp.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'thryve_' + exportType + '_' + new Date().toISOString().split('T')[0] + '.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        toast.success('CSV exported successfully!', { id: loadingToast });
      }

      onClose();
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Export failed: ' + (err.response?.data?.detail || err.message), { id: loadingToast });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close export dialog" onClick={onClose} />
          <motion.div {...animations.modalTransition} role="dialog" aria-modal="true" aria-label="Export report dialog" className="surface-card w-full max-w-md overflow-hidden relative z-10">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" /> Generate Report
          </h2>
          <p className="text-sm text-gray-400 mt-1">Select report type and format to export.</p>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Report type selection */}
          {[
            { val: 'full', label: 'Full Organization Audit', desc: 'All goals, progress, users, and audit logs.' },
            { val: 'department', label: 'Department Completion Matrix', desc: 'Aggregated statistics by department.' },
            { val: 'users', label: 'User Status Report', desc: 'List of all active/disabled users and roles.' },
          ].map(opt => (
            <label key={opt.val} className="flex items-start gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-dark/50 transition-colors">
              <input 
                type="radio" 
                name="exportType" 
                value={opt.val} 
                checked={exportType === opt.val} 
                onChange={() => setExportType(opt.val)}
                className="mt-1"
              />
              <div>
                <p className="text-white font-medium">{opt.label}</p>
                <p className="text-xs text-gray-400 mt-1">{opt.desc}</p>
              </div>
            </label>
          ))}

          {/* Format selection */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Output Format</p>
            <div className="flex gap-3">
              <button
                onClick={() => setFormat('pdf')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-semibold ${
                  format === 'pdf' 
                    ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400' 
                    : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                <FileDown size={16} /> PDF
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-semibold ${
                  format === 'csv' 
                    ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400' 
                    : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                <Table size={16} /> CSV
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-dark/30 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold flex items-center gap-2 disabled:opacity-70"
          >
            {isExporting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            {isExporting ? 'Generating...' : `Export ${format.toUpperCase()}`}
          </button>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
