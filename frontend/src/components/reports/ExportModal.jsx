import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExportModal({ isOpen, onClose }) {
  const [exportType, setExportType] = useState('full');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Report generated successfully!');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" /> Generate Report
          </h2>
          <p className="text-sm text-gray-400 mt-1">Select the type of data to export to CSV.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <label className="flex items-start gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-dark/50 transition-colors">
            <input 
              type="radio" 
              name="exportType" 
              value="full" 
              checked={exportType === 'full'} 
              onChange={() => setExportType('full')}
              className="mt-1"
            />
            <div>
              <p className="text-white font-medium">Full Organization Audit</p>
              <p className="text-xs text-gray-400 mt-1">All goals, progress, users, and audit logs.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-dark/50 transition-colors">
            <input 
              type="radio" 
              name="exportType" 
              value="department" 
              checked={exportType === 'department'} 
              onChange={() => setExportType('department')}
              className="mt-1"
            />
            <div>
              <p className="text-white font-medium">Department Completion Matrix</p>
              <p className="text-xs text-gray-400 mt-1">Aggregated statistics by department.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-dark/50 transition-colors">
            <input 
              type="radio" 
              name="exportType" 
              value="users" 
              checked={exportType === 'users'} 
              onChange={() => setExportType('users')}
              className="mt-1"
            />
            <div>
              <p className="text-white font-medium">User Status Report</p>
              <p className="text-xs text-gray-400 mt-1">List of all active/disabled users and roles.</p>
            </div>
          </label>
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
            {isExporting ? 'Generating...' : 'Export CSV'}
          </button>
        </div>
      </div>
    </div>
  );
}
