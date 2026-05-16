export const departments = [
  { id: 'DEP-001', name: 'Engineering', head: 'MGR-001', employeeCount: 45, completionRate: 88, activeGoals: 124 },
  { id: 'DEP-002', name: 'Product', head: 'MGR-002', employeeCount: 12, completionRate: 92, activeGoals: 36 },
  { id: 'DEP-003', name: 'Sales', head: 'MGR-003', employeeCount: 28, completionRate: 75, activeGoals: 84 },
  { id: 'DEP-004', name: 'Marketing', head: 'MGR-004', employeeCount: 15, completionRate: 81, activeGoals: 42 },
];

export const allUsers = [
  { id: 'EMP-101', name: 'Alex Chen', role: 'Senior Product Manager', department: 'Product', status: 'active' },
  { id: 'EMP-102', name: 'Sarah Miller', role: 'Frontend Engineer', department: 'Engineering', status: 'active' },
  { id: 'EMP-103', name: 'David Kim', role: 'Backend Engineer', department: 'Engineering', status: 'active' },
  { id: 'EMP-104', name: 'Emma Wilson', role: 'UX Designer', department: 'Product', status: 'active' },
  { id: 'MGR-001', name: 'James Carter', role: 'VP of Engineering', department: 'Engineering', status: 'active' },
  { id: 'MGR-002', name: 'Elena Rodriguez', role: 'VP of Product', department: 'Product', status: 'active' },
];

export const orgKPIs = {
  totalEmployees: 100,
  activeGoals: 286,
  completionRate: 84,
  pendingApprovals: 24,
  goalsAtRisk: 12,
  systemHealth: 99.9,
};

export const auditLogs = [
  { id: 'AUD-001', timestamp: '2026-05-16T10:30:00Z', actor: 'Admin User', action: 'UNLOCKED_GOAL', target: 'GOAL-001', details: 'Unlocked for Q2 modifications' },
  { id: 'AUD-002', timestamp: '2026-05-15T14:20:00Z', actor: 'Elena Rodriguez', action: 'APPROVED_GOAL', target: 'GOAL-005', details: 'Approved Q3 objective' },
  { id: 'AUD-003', timestamp: '2026-05-14T09:15:00Z', actor: 'System', action: 'CYCLE_CLOSED', target: 'Q1-2026', details: 'Automated cycle closure' },
];

export const reviewCycles = [
  { id: 'CYC-001', name: 'Q1 2026 Review', startDate: '2026-03-15', endDate: '2026-04-15', status: 'closed' },
  { id: 'CYC-002', name: 'Q2 2026 Planning', startDate: '2026-04-01', endDate: '2026-04-30', status: 'closed' },
  { id: 'CYC-003', name: 'Q2 2026 Review', startDate: '2026-06-15', endDate: '2026-07-15', status: 'active' },
  { id: 'CYC-004', name: 'Q3 2026 Planning', startDate: '2026-07-01', endDate: '2026-07-31', status: 'upcoming' },
];
