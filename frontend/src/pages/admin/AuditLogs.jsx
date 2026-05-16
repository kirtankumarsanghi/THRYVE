import React, { useState } from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { useAdmin } from '../../context/AdminContext';
import { Search, Filter, Shield } from 'lucide-react';

export default function AuditLogs() {
  const { auditLogs } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <SectionHeader 
        title="Audit Logs" 
        subtitle="System-wide activity tracking and compliance monitoring."
      />

      <DashboardCard>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by action, actor, or target ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-dark border border-border rounded-lg text-sm text-white hover:text-primary transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          <div className="space-y-6 mt-4">
            {filteredLogs.length > 0 ? filteredLogs.map((log) => (
              <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-dark/50 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{log.action}</h4>
                    <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">Actor: <span className="text-white">{log.actor}</span></p>
                  <p className="text-sm text-gray-400 mb-1">Target: <span className="text-primary">{log.target}</span></p>
                  <p className="text-sm text-gray-400">{log.details}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 text-gray-500 relative z-10 bg-card rounded-xl border border-border">
                No audit logs found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
