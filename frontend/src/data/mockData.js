// ─── Goals ───────────────────────────────────────────────────
export const goals = [
  {
    id: "g1",
    title: "Increase Q3 Revenue by 20%",
    description: "Drive quarterly revenue growth through strategic sales initiatives and enterprise client acquisition.",
    thrustArea: "Operational Excellence",
    progress: 85,
    status: "Approved",
    weightage: 30,
    dueDate: "2025-09-30",
    milestones: [
      { quarter: "Q1", target: 5, actual: 5, status: "Completed" },
      { quarter: "Q2", target: 10, actual: 9, status: "On Track" },
      { quarter: "Q3", target: 15, actual: 12, status: "On Track" },
      { quarter: "Q4", target: 20, actual: 0, status: "Not Started" },
    ],
  },
  {
    id: "g2",
    title: "Launch AI Insights Module",
    description: "Build and ship the AI-powered performance insights dashboard for HR stakeholders.",
    thrustArea: "AI Enablement",
    progress: 60,
    status: "At Risk",
    weightage: 25,
    dueDate: "2025-08-15",
    milestones: [
      { quarter: "Q1", target: 25, actual: 25, status: "Completed" },
      { quarter: "Q2", target: 50, actual: 45, status: "Delayed" },
      { quarter: "Q3", target: 75, actual: 0, status: "Not Started" },
      { quarter: "Q4", target: 100, actual: 0, status: "Not Started" },
    ],
  },
  {
    id: "g3",
    title: "Hire 5 Senior Engineers",
    description: "Recruit and onboard five senior-level engineers to scale the platform engineering team.",
    thrustArea: "People Operations",
    progress: 100,
    status: "Completed",
    weightage: 20,
    dueDate: "2025-06-30",
    milestones: [
      { quarter: "Q1", target: 2, actual: 2, status: "Completed" },
      { quarter: "Q2", target: 3, actual: 3, status: "Completed" },
      { quarter: "Q3", target: 0, actual: 0, status: "Completed" },
      { quarter: "Q4", target: 0, actual: 0, status: "Completed" },
    ],
  },
  {
    id: "g4",
    title: "Reduce Customer Churn by 2%",
    description: "Implement retention strategies to bring customer churn rate below 5%.",
    thrustArea: "Operational Excellence",
    progress: 20,
    status: "Delayed",
    weightage: 25,
    dueDate: "2025-12-31",
    milestones: [
      { quarter: "Q1", target: 0.5, actual: 0.2, status: "Delayed" },
      { quarter: "Q2", target: 1.0, actual: 0.4, status: "Delayed" },
      { quarter: "Q3", target: 1.5, actual: 0, status: "Not Started" },
      { quarter: "Q4", target: 2.0, actual: 0, status: "Not Started" },
    ],
  },
];

// Legacy alias for any component that imports `mockGoals`
export const mockGoals = goals;

// ─── Check-ins ───────────────────────────────────────────────
export const checkins = [
  {
    quarter: "Q1",
    updates: [
      { goalId: "g1", status: "On Track", planned: "5% revenue lift", actual: "5% achieved", comment: "Strong start with two enterprise deals closed." },
      { goalId: "g2", status: "On Track", planned: "25% module completion", actual: "25% delivered", comment: "Design phase completed on schedule." },
      { goalId: "g3", status: "Completed", planned: "Hire 2 engineers", actual: "2 hired", comment: "Both offers accepted within 3 weeks." },
    ],
  },
  {
    quarter: "Q2",
    updates: [
      { goalId: "g1", status: "On Track", planned: "10% revenue lift", actual: "9% achieved", comment: "Slightly behind due to delayed contract signing." },
      { goalId: "g2", status: "Delayed", planned: "50% module completion", actual: "45% delivered", comment: "API integration delayed by dependency team." },
      { goalId: "g4", status: "Delayed", planned: "1% churn reduction", actual: "0.4% achieved", comment: "Retention campaigns underperforming expectations." },
    ],
  },
  {
    quarter: "Q3",
    updates: [
      { goalId: "g1", status: "On Track", planned: "15% revenue lift", actual: "12% achieved", comment: "Pipeline looks strong for Q3 close." },
      { goalId: "g2", status: "At Risk", planned: "75% module completion", actual: "60% delivered", comment: "Resource constraints impacting timeline." },
    ],
  },
  {
    quarter: "Q4",
    updates: [],
  },
];

// ─── Quarterly Trends (line chart) ──────────────────────────
export const quarterlyTrends = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 55 },
  { name: "Apr", value: 45 },
  { name: "May", value: 70 },
  { name: "Jun", value: 65 },
  { name: "Jul", value: 85 },
];

// ─── Goal Completion (pie chart) ────────────────────────────
export const goalCompletionData = [
  { name: "Completed", value: 12 },
  { name: "On Track", value: 8 },
  { name: "At Risk", value: 3 },
  { name: "Delayed", value: 1 },
];

// ─── KPI Stats (analytics page) ─────────────────────────────
export const kpiStats = [
  { id: "kpi1", title: "Goal Completion Rate", value: "78%", trend: "+12%", trendDirection: "up", badge: "On Track" },
  { id: "kpi2", title: "Team Alignment Score", value: "91", trend: "+5%", trendDirection: "up", badge: "Strong" },
  { id: "kpi3", title: "Active Goals", value: "34", trend: "+6", trendDirection: "up", badge: "Growing" },
  { id: "kpi4", title: "Check-in Compliance", value: "96%", trend: "+2%", trendDirection: "up", badge: "Excellent" },
];

// ─── Heatmap Data (analytics page) ──────────────────────────
export const heatmapData = [
  { department: "Engineering", q1: 88, q2: 92, q3: 85, q4: 78 },
  { department: "Product", q1: 75, q2: 80, q3: 82, q4: 70 },
  { department: "Sales", q1: 90, q2: 85, q3: 88, q4: 95 },
  { department: "HR", q1: 70, q2: 78, q3: 80, q4: 72 },
  { department: "Finance", q1: 82, q2: 79, q3: 84, q4: 80 },
];

// ─── Manager Effectiveness (analytics page) ─────────────────
export const managerEffectiveness = [
  { name: "Sarah Chen", team: "Engineering", score: 94 },
  { name: "James Wilson", team: "Product", score: 87 },
  { name: "Maria Lopez", team: "Sales", score: 91 },
  { name: "David Kim", team: "HR", score: 78 },
];

// ─── Activities ─────────────────────────────────────────────
export const mockActivities = [
  { id: 1, text: "Sarah updated 'Launch AI Module' progress to 60%", time: "2 hours ago", type: "update" },
  { id: 2, text: "Goal 'Hire 5 Engineers' marked as Completed", time: "1 day ago", type: "achievement" },
  { id: 3, text: "Q3 Check-in submitted by Engineering team", time: "2 days ago", type: "checkin" },
];

// ─── AI Insights ─────────────────────────────────────────────
export const mockInsights = [
  { id: 1, text: "Revenue goal is trending 5% above target. Consider adjusting Q4 forecast.", type: "positive", impact: "High" },
  { id: 2, text: "Product launch is at risk due to delayed dependencies. Recommend allocating extra resources.", type: "risk", impact: "Critical" },
  { id: 3, text: "Team alignment score improved by 12% after recent 1:1 check-ins.", type: "info", impact: "Medium" },
];
