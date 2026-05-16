export const teamMembers = [
  {
    id: "EMP-101",
    name: "Alex Chen",
    role: "Senior Product Manager",
    department: "Product",
    managerId: "MGR-001",
    avatar: "https://i.pravatar.cc/150?u=EMP-101",
    performanceScore: 4.8,
    activeGoals: 4,
    completedGoals: 2,
    atRiskGoals: 0,
  },
  {
    id: "EMP-102",
    name: "Sarah Jenkins",
    role: "Engineering Lead",
    department: "Engineering",
    managerId: "MGR-001",
    avatar: "https://i.pravatar.cc/150?u=EMP-102",
    performanceScore: 4.5,
    activeGoals: 5,
    completedGoals: 1,
    atRiskGoals: 1,
  },
  {
    id: "EMP-103",
    name: "Marcus Rodriguez",
    role: "Product Designer",
    department: "Design",
    managerId: "MGR-001",
    avatar: "https://i.pravatar.cc/150?u=EMP-103",
    performanceScore: 4.2,
    activeGoals: 3,
    completedGoals: 3,
    atRiskGoals: 0,
  },
  {
    id: "EMP-104",
    name: "Emma Watson",
    role: "Data Analyst",
    department: "Analytics",
    managerId: "MGR-001",
    avatar: "https://i.pravatar.cc/150?u=EMP-104",
    performanceScore: 4.9,
    activeGoals: 4,
    completedGoals: 4,
    atRiskGoals: 0,
  }
];

export const pendingApprovalsData = [
  {
    id: "APP-001",
    type: "GOAL_CREATION",
    employeeId: "EMP-101",
    employeeName: "Alex Chen",
    goalId: "GOAL-882",
    goalTitle: "Launch AI-Powered Feature Recommendations",
    thrustArea: "Product Innovation",
    weightage: 25,
    submittedAt: "2024-05-15T09:30:00Z",
    status: "Pending",
    comments: [],
  },
  {
    id: "APP-002",
    type: "QUARTERLY_CHECKIN",
    employeeId: "EMP-102",
    employeeName: "Sarah Jenkins",
    goalId: "GOAL-991",
    goalTitle: "Reduce Cloud Infrastructure Costs by 15%",
    thrustArea: "Operational Excellence",
    weightage: 20,
    submittedAt: "2024-05-14T14:45:00Z",
    status: "Pending",
    comments: [
      {
        id: "COM-1",
        author: "Sarah Jenkins",
        text: "We achieved 12% cost reduction so far, slightly behind the 15% target due to unexpected traffic spikes.",
        timestamp: "2024-05-14T14:45:00Z"
      }
    ],
    updateData: {
      actual: 12,
      target: 15,
      progress: 80,
      status: "Delayed"
    }
  }
];

export const departmentStats = [
  { name: "Engineering", score: 4.6, completionRate: 85, activeEmployees: 42 },
  { name: "Product", score: 4.8, completionRate: 92, activeEmployees: 18 },
  { name: "Design", score: 4.4, completionRate: 78, activeEmployees: 12 },
  { name: "Sales", score: 4.2, completionRate: 71, activeEmployees: 35 },
];
